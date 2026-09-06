"""MetaGPT 集成服务 - 模拟多角色协作开发流程"""
import os
import json
from datetime import datetime
from typing import Optional, List
from app.services.llm_service import chat_completion, structured_output


class MetaGPTService:
    """模拟 MetaGPT 的多角色协作开发流程"""

    ROLES = {
        "pm": {
            "name": "Emma",
            "role": "Product Manager",
            "system_prompt": """你是一位资深产品经理 Emma。你的职责是将用户的想法转化为清晰的产品需求文档（PRD）。
你需要：
1. 分析用户需求，提炼核心功能
2. 编写详细的 PRD，包括功能列表、用户故事、优先级
3. 定义产品范围和 MVP 功能
4. 输出结构化的需求文档

请用中文回复。"""
        },
        "architect": {
            "name": "Bob",
            "role": "System Architect", 
            "system_prompt": """你是一位系统架构师 Bob。你的职责是设计系统蓝图，确保应用可扩展、高可用。
你需要：
1. 根据 PRD 设计技术架构
2. 选择合适的技术栈
3. 设计数据库结构
4. 定义 API 接口
5. 输出架构设计文档

请用中文回复。"""
        },
        "engineer": {
            "name": "Alex",
            "role": "Full-Stack Engineer",
            "system_prompt": """你是一位全栈工程师 Alex。你的职责是构建生产级应用。
你需要：
1. 根据架构设计编写前后端代码
2. 实现核心功能模块
3. 确保代码质量和可维护性
4. 输出可运行的代码和部署说明

请用中文回复，代码块使用标准 markdown 格式。"""
        },
        "qa": {
            "name": "QA Team",
            "role": "Quality Assurance",
            "system_prompt": """你是一位 QA 工程师。你的职责是测试应用并确保质量。
你需要：
1. 编写测试用例
2. 进行功能测试
3. 发现潜在问题
4. 输出测试报告

请用中文回复。"""
        }
    }

    def __init__(self, workspace_dir: str = "./workspace"):
        self.workspace_dir = workspace_dir
        os.makedirs(workspace_dir, exist_ok=True)

    async def run_workflow(self, idea: str, project_name: str) -> dict:
        """运行完整的 MetaGPT 工作流"""
        project_dir = os.path.join(self.workspace_dir, project_name)
        os.makedirs(project_dir, exist_ok=True)

        results = {
            "project_name": project_name,
            "idea": idea,
            "phases": [],
            "status": "running"
        }

        # Phase 1: PM - 需求分析
        prd = await self._run_role("pm", idea, project_dir)
        results["phases"].append({"phase": "需求分析", "agent": "Emma", "output": prd})

        # Phase 2: Architect - 架构设计
        arch = await self._run_role("architect", prd, project_dir)
        results["phases"].append({"phase": "架构设计", "agent": "Bob", "output": arch})

        # Phase 3: Engineer - 代码实现
        code = await self._run_role("engineer", arch, project_dir)
        results["phases"].append({"phase": "代码实现", "agent": "Alex", "output": code})

        # Phase 4: QA - 测试
        test = await self._run_role("qa", code, project_dir)
        results["phases"].append({"phase": "质量测试", "agent": "QA Team", "output": test})

        results["status"] = "completed"
        results["project_dir"] = project_dir

        # 保存完整报告
        with open(os.path.join(project_dir, "report.json"), "w", encoding="utf-8") as f:
            json.dump(results, f, ensure_ascii=False, indent=2)

        return results

    async def _run_role(self, role_key: str, input_content: str, project_dir: str) -> str:
        """运行单个角色"""
        role = self.ROLES[role_key]

        messages = [
            {"role": "system", "content": role["system_prompt"]},
            {"role": "user", "content": f"请基于以下内容进行{role['role']}工作：\n\n{input_content}"}
        ]

        response = await chat_completion(messages, temperature=0.7)

        # 保存角色输出
        filename = f"{role_key}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
        with open(os.path.join(project_dir, filename), "w", encoding="utf-8") as f:
            f.write(f"# {role['name']} - {role['role']}\n\n")
            f.write(response)

        return response

    async def generate_code(self, requirements: str, tech_stack: str = "nextjs") -> dict:
        """直接生成代码"""
        prompt = f"""基于以下需求，生成一个完整的 {tech_stack} 项目代码：

需求：
{requirements}

请输出：
1. 项目结构说明
2. 关键文件的完整代码（package.json, 主要页面, API 路由等）
3. 部署说明

请确保代码可以直接运行。"""

        messages = [
            {"role": "system", "content": self.ROLES["engineer"]["system_prompt"]},
            {"role": "user", "content": prompt}
        ]

        response = await chat_completion(messages, temperature=0.3, max_tokens=8000)
        return {"code": response, "tech_stack": tech_stack}


# 单例
metagpt_service = MetaGPTService()
