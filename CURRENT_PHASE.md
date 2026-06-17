# CURRENT PHASE

## 当前阶段

P12 API 路由和 AI 调用

## 阶段状态

已完成。

## 当前目标

创建服务端 API，接入 AI 模型，返回结构化 TravelPlan。

## 前置确认

- P11 Prompt 编写已完成
- `TravelPlanSchema` 和 `TravelInputSchema` 已存在
- D005 明确先用 Mock 跑通体验和数据流，再接入 AI
- D007 明确使用 Vercel AI SDK + OpenAI provider，默认模型为 `gpt-4.1-mini`

## 允许做的事

- 安装 `ai` 和 `@ai-sdk/openai`
- 创建 `.env.example`
- 确认 `.env.local` 被 `.gitignore` 忽略
- 在 `types/travel.ts` 导出 `AiOutputSchema` 和 `AiOutput`
- 创建 `lib/ai.ts`
- 创建 `app/api/generate-plan/route.ts`
- 更新 `DECISIONS.md` 记录模型选择
- 更新阶段文档记录 P12 边界

## 禁止做的事

- 修改前端组件
- 修改 `app/page.tsx`
- 做流式输出
- 做前端联调
- 保存 localStorage
- 做地图、天气、登录、数据库或保存功能

## 完成标志

- 已安装 `ai` 和 `@ai-sdk/openai`
- `.env.example` 提供清晰示例变量且不包含真实 Key
- `.env.local` 被 `.gitignore` 忽略，`.env.example` 可提交
- `AiOutputSchema` 从 `TravelPlanSchema` 派生并排除服务端元数据字段
- `generateTravelPlan(input)` 使用 `generateObject`、Prompt 构建函数和 `AiOutputSchema`
- AI 输出补齐 `id`、`createdAt`、`updatedAt`、`inputParams` 后通过 `TravelPlanSchema.parse`
- `POST /api/generate-plan` 校验输入、调用 AI 并返回 TravelPlan JSON
- 输入错误返回 400
- API Key 缺失返回友好错误
- 不做流式输出、前端联调、保存功能或组件修改
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 服务端 AI 生成函数
- 结构化 TravelPlan API route
- 环境变量示例和模型选择决策记录
