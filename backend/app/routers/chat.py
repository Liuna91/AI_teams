from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict, List
from app.core.schemas import ChatRequest, ChatResponse
from app.services.orchestrator import orchestrator
from app.services.llm_service import chat_completion

router = APIRouter(prefix="/chat", tags=["Chat"])

# 存储 WebSocket 连接
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket

    def disconnect(self, client_id: str):
        if client_id in self.active_connections:
            del self.active_connections[client_id]

    async def send_message(self, client_id: str, message: dict):
        if client_id in self.active_connections:
            await self.active_connections[client_id].send_json(message)

manager = ConnectionManager()


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """与 AI 团队对话（HTTP）"""
    project_context = {}
    if request.project_id:
        project_context = {"project_id": request.project_id}

    result = await orchestrator.chat_with_team(request.message, project_context)
    return ChatResponse(
        response=result["response"],
        agent_name=result.get("agent", "AI 团队"),
        actions=result.get("actions")
    )


@router.websocket("/ws/{client_id}")
async def websocket_chat(websocket: WebSocket, client_id: str):
    """WebSocket 实时对话"""
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_json()
            message = data.get("message", "")
            project_id = data.get("project_id")

            # 发送思考中状态
            await manager.send_message(client_id, {
                "type": "thinking",
                "content": "AI 团队正在分析..."
            })

            # 调用 AI
            project_context = {"project_id": project_id} if project_id else {}
            result = await orchestrator.chat_with_team(message, project_context)

            # 发送回复
            await manager.send_message(client_id, {
                "type": "message",
                "content": result["response"],
                "agent": result.get("agent", "AI 团队"),
                "timestamp": str(datetime.now()) if 'datetime' in dir() else "2025-01-01"
            })
    except WebSocketDisconnect:
        manager.disconnect(client_id)
    except Exception as e:
        await manager.send_message(client_id, {
            "type": "error",
            "content": str(e)
        })
        manager.disconnect(client_id)
