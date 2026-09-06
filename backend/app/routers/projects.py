from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.database import Project, Task
from app.core.schemas import ProjectCreate, ProjectUpdate, ProjectResponse, TaskResponse
from app.services.orchestrator import orchestrator

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.post("/", response_model=ProjectResponse)
async def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    """创建新项目"""
    db_project = Project(
        name=project.name,
        description=project.description,
        idea=project.idea,
        status="pending"
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@router.get("/", response_model=List[ProjectResponse])
async def list_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """列出所有项目"""
    projects = db.query(Project).offset(skip).limit(limit).all()
    return projects


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: int, db: Session = Depends(get_db)):
    """获取项目详情"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(project_id: int, project_update: ProjectUpdate, db: Session = Depends(get_db)):
    """更新项目"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    for field, value in project_update.model_dump(exclude_unset=True).items():
        setattr(project, field, value)

    db.commit()
    db.refresh(project)
    return project


@router.delete("/{project_id}")
async def delete_project(project_id: int, db: Session = Depends(get_db)):
    """删除项目"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}


@router.post("/{project_id}/research")
async def research_project(project_id: int, db: Session = Depends(get_db)):
    """启动项目调研（OpenManus）"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project.status = "researching"
    db.commit()

    # 创建任务记录
    task = Task(
        project_id=project_id,
        agent_role="researcher",
        task_type="research",
        status="running",
        input_data=project.idea
    )
    db.add(task)
    db.commit()

    # 调用 OpenManus 调研
    result = await orchestrator.run_phase(project_id, "research", {"idea": project.idea})

    task.status = "completed"
    task.output_data = str(result)
    db.commit()

    project.status = "researched"
    db.commit()

    return {"project_id": project_id, "phase": "research", "result": result}


@router.post("/{project_id}/develop")
async def develop_project(project_id: int, db: Session = Depends(get_db)):
    """启动项目开发（MetaGPT）"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project.status = "developing"
    db.commit()

    task = Task(
        project_id=project_id,
        agent_role="engineer",
        task_type="code",
        status="running",
        input_data=project.idea
    )
    db.add(task)
    db.commit()

    # 调用 MetaGPT 开发
    result = await orchestrator.run_phase(project_id, "full_workflow", {
        "idea": project.idea,
        "name": project.name
    })

    task.status = "completed"
    task.output_data = str(result)
    db.commit()

    project.status = "developed"
    db.commit()

    return {"project_id": project_id, "phase": "develop", "result": result}


@router.get("/{project_id}/tasks", response_model=List[TaskResponse])
async def get_project_tasks(project_id: int, db: Session = Depends(get_db)):
    """获取项目任务列表"""
    tasks = db.query(Task).filter(Task.project_id == project_id).all()
    return tasks
