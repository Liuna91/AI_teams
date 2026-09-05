#!/bin/bash
set -e

echo "🚀 AI 智能公司部署脚本"
echo "========================"

# 检查依赖
command -v docker >/dev/null 2>&1 || { echo "❌ Docker 未安装"; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "❌ Docker Compose 未安装"; exit 1; }

# 检查环境变量
if [ ! -f .env ]; then
    echo "⚠️  .env 文件不存在，从示例复制..."
    cp .env.example .env
    echo "📝 请编辑 .env 文件，填入你的 OPENAI_API_KEY"
    exit 1
fi

if grep -q "sk-your-api-key-here" .env; then
    echo "❌ 请先在 .env 中设置有效的 OPENAI_API_KEY"
    exit 1
fi

# 构建并启动
echo "🔨 构建镜像..."
docker-compose build

echo "🚀 启动服务..."
docker-compose up -d

echo ""
echo "✅ 部署完成！"
echo ""
echo "📱 前端访问: http://localhost:3000"
echo "🔌 API 访问: http://localhost:8000"
echo "📚 API 文档: http://localhost:8000/docs"
echo ""
echo "查看日志: docker-compose logs -f"
echo "停止服务: docker-compose down"
