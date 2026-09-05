from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


# Project Schemas
class ProjectCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    idea: str = Field(..., min_length=1)


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


class ProjectResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    status: str
    idea: Optional[str]
    requirements: Optional[str]
    architecture: Optional[str]
    code_repo_url: Optional[str]
    deploy_url: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Task Schemas
class TaskResponse(BaseModel):
    id: int
    project_id: int
    agent_role: str
    task_type: str
    status: str
    input_data: Optional[str]
    output_data: Optional[str]
    created_at: datetime
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True


# Message Schemas
class MessageCreate(BaseModel):
    role: str
    content: str
    agent_name: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


class MessageResponse(BaseModel):
    id: int
    project_id: int
    role: str
    agent_name: Optional[str]
    content: str
    metadata: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True


# Chat Schemas
class ChatRequest(BaseModel):
    message: str
    project_id: Optional[int] = None
    context: Optional[List[Dict[str, str]]] = None


class ChatResponse(BaseModel):
    response: str
    agent_name: Optional[str] = None
    actions: Optional[List[Dict[str, Any]]] = None


# Agent Schemas
class AgentInfo(BaseModel):
    id: str
    name: str
    role: str
    description: str
    status: str
    capabilities: List[str]
    icon: str


class AgentActionRequest(BaseModel):
    agent_id: str
    action: str
    params: Optional[Dict[str, Any]] = None
