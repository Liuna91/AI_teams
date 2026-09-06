FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
# 使用 npmmirror 镜像加速（海外环境可移除 --registry 参数）
RUN npm install --registry=https://registry.npmmirror.com

COPY . .
RUN npm run build

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]
