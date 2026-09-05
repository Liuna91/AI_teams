from fastapi import APIRouter
from typing import List
from app.core.schemas import AgentInfo

router = APIRouter(prefix="/agents", tags=["Agents"])

AGENTS = [
    AgentInfo(
        id="iris",
        name="小研",
        role="深度研究员",
        description="通过深度调研发现真实需求和市场机会",
        status="online",
        capabilities=["market_research", "competitor_analysis", "trend_spotting"],
        icon="Search"
    ),
    AgentInfo(
        id="bob",
        name="阿构",
        role="系统架构师",
        description="设计系统蓝图，确保应用可扩展、高可用",
        status="online",
        capabilities=["system_design", "tech_selection", "database_design"],
        icon="Cpu"
    ),
    AgentInfo(
        id="emma",
        name="小产",
        role="产品经理",
        description="将想法转化为清晰的产品定义和范围",
        status="online",
        capabilities=["prd_writing", "user_story", "scope_management"],
        icon="PenTool"
    ),
    AgentInfo(
        id="mike",
        name="老管",
        role="团队负责人",
        description="端到端协调 AI 代理，把控进度并请求确认",
        status="online",
        capabilities=["project_management", "coordination", "reporting"],
        icon="Users"
    ),
    AgentInfo(
        id="sarah",
        name="小优",
        role="SEO 专家",
        description="自动生成 SEO 页面，驱动自然流量增长",
        status="online",
        capabilities=["seo_optimization", "content_strategy", "ranking"],
        icon="Globe"
    ),
    AgentInfo(
        id="alex",
        name="阿工",
        role="全栈工程师",
        description="构建生产级全栈应用，前后端一体化交付",
        status="online",
        capabilities=["frontend", "backend", "deployment", "integration"],
        icon="Code2"
    ),
    AgentInfo(
        id="adrian",
        name="小广",
        role="广告专员",
        description="自动投放和优化广告，降低获客成本",
        status="online",
        capabilities=["google_ads", "campaign_management", "optimization"],
        icon="Megaphone"
    ),
    AgentInfo(
        id="david",
        name="小数",
        role="数据分析师",
        description="分析海量数据，发现营销机会和洞察",
        status="online",
        capabilities=["data_analysis", "visualization", "insight_generation"],
        icon="BarChart3"
    ),
]


@router.get("/", response_model=List[AgentInfo])
async def list_agents():
    """获取所有 AI 代理信息"""
    return AGENTS


@router.get("/{agent_id}", response_model=AgentInfo)
async def get_agent(agent_id: str):
    """获取单个代理信息"""
    for agent in AGENTS:
        if agent.id == agent_id:
            return agent
    raise HTTPException(status_code=404, detail="Agent not found")
