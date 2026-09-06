"""编排服务 - 协调 MetaGPT 和 OpenManus"""
from typing import Optional, Dict, Any
from app.services.metagpt_service import metagpt_service
from app.services.openmanus_service import openmanus_service


class Orchestrator:
    """项目编排器，协调 AI 团队完成端到端开发"""

    async def create_project(self, idea: str, name: str) -> dict:
        """创建新项目并启动工作流"""
        return {
            "project_id": 1,
            "name": name,
            "idea": idea,
            "status": "created",
            "next_steps": ["research", "design", "develop", "deploy"]
        }

    async def run_phase(self, project_id: int, phase: str, context: dict) -> dict:
        """运行项目某个阶段"""

        if phase == "research":
            # OpenManus 做调研
            result = await openmanus_service.research(context.get("idea", ""))
            return {"phase": "research", "result": result, "agent": "Iris (OpenManus)"}

        elif phase == "competitor_analysis":
            result = await openmanus_service.analyze_competitors(context.get("idea", ""))
            return {"phase": "competitor_analysis", "result": result, "agent": "Iris (OpenManus)"}

        elif phase == "design":
            # MetaGPT PM + Architect
            prd = await metagpt_service._run_role("pm", context.get("idea", ""), f"./workspace/project_{project_id}")
            arch = await metagpt_service._run_role("architect", prd, f"./workspace/project_{project_id}")
            return {"phase": "design", "prd": prd, "architecture": arch, "agents": ["Emma", "Bob"]}

        elif phase == "develop":
            # MetaGPT Engineer
            code = await metagpt_service.generate_code(context.get("requirements", ""))
            return {"phase": "develop", "result": code, "agent": "Alex"}

        elif phase == "full_workflow":
            # 完整工作流
            result = await metagpt_service.run_workflow(context.get("idea", ""), context.get("name", "project"))
            return {"phase": "full_workflow", "result": result, "agents": ["Emma", "Bob", "Alex", "QA"]}

        return {"error": f"Unknown phase: {phase}"}

    async def chat_with_team(self, message: str, project_context: dict) -> dict:
        """与 AI 团队对话"""
        from app.services.llm_service import chat_completion

        system_prompt = """你是 AI 智能公司的团队协调员。你代表整个 AI 团队（研究员、架构师、产品经理、工程师等）与用户对话。
根据用户的问题，判断应该由哪个角色回答，并以该角色的身份回复。

角色说明：
- 小研（研究员）：负责市场调研、竞品分析
- 阿构（架构师）：负责技术选型、系统设计
- 小产（产品经理）：负责需求分析、功能规划
- 阿工（工程师）：负责代码实现、技术问题
- 老管（团队负责人）：负责整体协调、进度管理

请用中文回复，语气专业但友好。"""

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"项目背景：{json.dumps(project_context, ensure_ascii=False)}\n\n用户问题：{message}"}
        ]

        response = await chat_completion(messages, temperature=0.7)
        return {"response": response, "agent": "AI 团队"}


# 单例
orchestrator = Orchestrator()
