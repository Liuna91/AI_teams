> 基于 MetaGPT + OpenManus 的多智能体开发平台

一个完整的 AI 智能公司系统，包含：
- **前端官网**：Next.js 15 + React 19 + Tailwind CSS + Framer Motion
- **后端 API**：FastAPI + SQLAlchemy + Redis
- **AI 引擎**：集成 MetaGPT（多角色协作开发）+ OpenManus（通用代理执行）
- **部署方案**：Docker + Docker Compose 一键部署

## 项目结构

```
AI_teams/
├── frontend/          # Next.js 前端
│   ├── app/           # 页面路由
│   ├── components/    # 共享组件
│   ├── lib/           # API 客户端
│   └── Dockerfile[deploy.sh](deploy.sh)
├── backend/           # FastAPI 后端
│   ├── app/
│   │   ├── routers/   # API 路由
│   │   ├── services/  # 业务逻辑（LLM、MetaGPT、OpenManus）
│   │   └── core/      # 配置、数据库、模型
│   └── Dockerfile
├── docker-compose.yml # 一键编排
└── README.md
```

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/Liuna91/AI_teams.git
cd AI_teams
```

### 2. 配置环境变量
[deploy.sh](deploy.sh)
```bash
cp .env.example .env
# 编辑 .env，填入你的 OpenAI API Key
```

### 3. 一键启动（Docker）

```bash
docker-compose up -d
```

访问：
- 前端：`http://localhost:3000`
- 后端 API：`http://localhost:8000`
- API 文档：`http://localhost:8000/docs`

### 4. 本地开发

**后端：**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**前端：**
```bash
cd frontend
npm install
npm run dev
```

## 核心功能

### AI 团队角色

| 角色 | 名称 | 能力 | 来源 |
|------|------|------|------|
| 深度研究员 | 小研 | 市场调研、竞品分析 | OpenManus |
| 系统架构师 | 阿构 | 技术选型、系统设计 | MetaGPT |
| 产品经理 | 小产 | PRD 编写、需求分析 | MetaGPT |
| 团队负责人 | 老管 | 项目协调、进度管理 | MetaGPT |
| SEO 专家 | 小优 | 搜索引擎优化 | MetaGPT |
| 全栈工程师 | 阿工 | 前后端开发、部署 | MetaGPT |
| 广告专员 | 小广 | 广告投放优化 | OpenManus |
| 数据分析师 | 小数 | 数据分析、洞察 | OpenManus |

### 工作流程

1. **创建项目**：输入产品想法
2. **深度调研**：OpenManus 分析市场和竞品
3. **架构设计**：MetaGPT 架构师设计系统
4. **产品开发**：MetaGPT 工程师编写代码
5. **质量测试**：MetaGPT QA 验证
6. **部署上线**：OpenManus 自动化部署

## API 接口

### 项目管理
- `POST /api/v1/projects/` - 创建项目
- `GET /api/v1/projects/` - 项目列表
- `GET /api/v1/projects/{id}` - 项目详情
- `POST /api/v1/projects/{id}/research` - 启动调研
- `POST /api/v1/projects/{id}/develop` - 启动开发

### AI 代理
- `GET /api/v1/agents/` - 获取 AI 团队信息

### 对话
- `POST /api/v1/chat/` - 与 AI 团队对话
- `WS /api/v1/chat/ws/{client_id}` - WebSocket 实时对话

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion |
| 后端 | FastAPI, Python 3.11, SQLAlchemy, Pydantic |
| AI | OpenAI API, MetaGPT, OpenManus |
| 数据 | SQLite (开发), PostgreSQL (生产), Redis |
| 部署 | Docker, Docker Compose, Vercel (前端可选) |

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | 必填 |
| `OPENAI_BASE_URL` | API 基础地址 | `https://api.openai.com/v1` |
| `OPENAI_MODEL` | 使用模型 | `gpt-4o` |
| `DATABASE_URL` | 数据库连接 | `sqlite:///./ai_teams.db` |
| `REDIS_URL` | Redis 连接 | `redis://localhost:6379` |
| `SECRET_KEY` | 应用密钥 | `change-me` |

## 部署到生产

### Vercel（前端）
```bash
cd frontend
vercel --prod
```

### 云服务器（全栈）
```bash
# 1. 上传代码到服务器
# 2. 配置 .env
# 3. 启动
docker-compose -f docker-compose.yml up -d

# 4. 配置 Nginx 反向代理
# 5. 配置 SSL (Let\'s Encrypt)
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
'''