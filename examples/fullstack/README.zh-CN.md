# Fullstack 示例启动指南（Express + Vue3）

## 环境要求
- Node.js `>= 18`
- 建议使用 `pnpm`

## 一次性构建库
- 在仓库根目录执行：
  - `pnpm install`
  - `pnpm run build`

> 说明：前端与后端示例通过别名引入库的 `dist/index.js`，必须先构建库。

## 启动后端（Express）
- 安装并启动：
  - `pnpm -C examples/fullstack/server install`
  - `pnpm -C examples/fullstack/server start`
- 访问：
  - `http://localhost:3000/health`

### 后端端点
- `GET /health`：健康检查
- `GET /keys/public`：提供服务端接收方加密公开密钥（`epub`）
- `POST /secure`：接收加密请求体并在服务端解密后返回
- `GET /secure/respond`：服务端用客户端公开密钥加密响应并返回（请求头 `x-unsea-target-epub` 指定客户端的 `epub`）

## 启动前端（Vue3 + Vite）
- 安装并启动：
  - `pnpm -C examples/fullstack/client install`
  - `pnpm -C examples/fullstack/client dev`
- 访问：
  - `http://localhost:5173/`

### 前端演示按钮
- `GET /health`：演示 `fetchJSON.get`
- `POST /users`：演示 `axios.post` 柯里化
- `Secure axios`：`simple.secure(...).post(url)(payload)` 请求体加密
- `Secure fetch`：`simple.secure(...).fetch.post(url)(payload)` 请求体加密
- `Secure response`：对服务端加密响应自动解密（`secureResponse.expectDecrypted(epriv).fetchJSON.get(...)()`）
- `Manual encrypt`：使用 `crypto.encrypt` 手动加密对象并发送

## 常见问题
- 未构建库导致别名报错：确保先在根目录执行 `pnpm run build`。
- 端口占用：后端为 `3000`，前端为 `5173`，如被占用请更换端口或关闭占用进程。
- `pnpm approve-builds` 警告：如遇到依赖的构建脚本提示，可按需执行 `pnpm approve-builds`。

## 停止服务
- 在对应终端按 `Ctrl + C` 停止后端或前端服务。