# TraceMe Next

迹遇 Next 是一个基于 Next.js App Router 的 AI 旅行规划器。当前阶段已完成 Mock 闭环、Prompt 编写，以及服务端 AI 生成 API。

## 开发环境

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

本地访问：

```text
http://localhost:3000
```

## 环境变量

复制 `.env.example` 为 `.env.local`，并填入服务端使用的 OpenAI API Key：

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

`OPENAI_MODEL` 可选；不配置时服务端默认使用 `gpt-4.1-mini`。

## API 测试

生成旅行计划：

```bash
curl -X POST http://localhost:3000/api/generate-plan \
  -H "Content-Type: application/json" \
  -d '{"destination":"成都","days":3,"travelers":2,"currency":"CNY","preferences":["美食","博物馆"],"pace":"moderate"}'
```

成功时返回结构化 `TravelPlan` JSON。非法输入返回 `400`，缺少 `OPENAI_API_KEY` 时返回友好的服务端配置错误。

## 常用命令

```bash
npm run lint
npm run build
```

## 阶段文档

- `ROADMAP.md`：阶段进度
- `CURRENT_PHASE.md`：当前阶段边界和完成标志
- `DECISIONS.md`：技术与产品决策
