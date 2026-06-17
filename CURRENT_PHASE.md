# CURRENT PHASE

## 当前阶段

P13 错误处理和重试

## 阶段状态

已完成。

## 当前目标

让 AI 生成过程具备可控的错误分类、重试和超时处理。

## 前置确认

- P12 API 路由和 AI 调用已完成
- `generateTravelPlan(input)` 已接入 Vercel AI SDK 的 `generateObject`
- `POST /api/generate-plan` 已存在并返回结构化 TravelPlan
- P13 不修改前端组件、Prompt、Schema 或流式输出

## 允许做的事

- 创建 `lib/errors.ts`
- 定义统一错误类型和 `TravelPlanError`
- 实现 `classifyError(error)`
- 为 `generateTravelPlan` 增加可控重试和 60 秒超时
- 让 API route 捕获 `TravelPlanError` 并返回 `{ error, message }`
- 更新阶段文档记录 P13 边界

## 禁止做的事

- 修改前端组件
- 修改 Prompt
- 修改 Schema
- 做前端错误展示
- 做流式输出

## 完成标志

- 已创建 `lib/errors.ts`
- 已定义以下错误类型：
  - `VALIDATION_ERROR`
  - `AI_GENERATION_ERROR`
  - `AI_PARSE_ERROR`
  - `NETWORK_ERROR`
  - `API_KEY_ERROR`
  - `RATE_LIMIT_ERROR`
  - `TIMEOUT_ERROR`
  - `UNKNOWN_ERROR`
- `TravelPlanError` 保存 `type`、`userMessage` 和可选 `originalError`
- `classifyError(error)` 可识别校验、AI 生成、AI 解析、网络、API Key、限流、超时和未知错误
- `generateTravelPlan(input, { maxRetries })` 默认最多重试 1 次
- 每次重试前等待 1 秒
- 单次 AI 生成调用设置 60 秒超时
- API route 返回统一错误格式 `{ error, message }`
- `VALIDATION_ERROR` 返回 400
- `API_KEY_ERROR` 返回 500，因为当前 Key 是服务端配置问题，不是客户端认证失败
- `RATE_LIMIT_ERROR` 返回 429
- `TIMEOUT_ERROR` 返回 504
- 其他错误返回 500
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 统一服务端错误分类
- 可控的 AI 生成重试流程
- AI 生成 60 秒超时保护
- API route 统一错误响应格式
