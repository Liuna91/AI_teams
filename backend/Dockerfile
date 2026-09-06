FROM python:3.11-slim

WORKDIR /app

# Install Python dependencies
# 使用清华 PyPI 镜像加速（海外环境可移除 -i 参数）
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# Install MetaGPT (optional, for full integration)
# RUN pip install metagpt

# Copy application
COPY app/ ./app/

# Create workspace directories
RUN mkdir -p /app/data /app/workspace

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
