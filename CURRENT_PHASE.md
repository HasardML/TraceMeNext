# CURRENT PHASE

## 当前阶段

P14 前端替换为真实 AI

## 阶段状态

已完成。

## 当前目标

把首页的 Mock 生成替换为真实 API 调用，完成 AI 生成闭环。

## 前置确认

- P12 API 路由和 AI 调用已完成
- P13 错误处理和重试已完成
- `POST /api/generate-plan` 已存在并返回结构化 TravelPlan
- API route 失败时返回 `{ error, message }`
- P14 不修改 API route、Prompt、展示组件、保存逻辑或流式输出
- 验收后按 P3 反馈修正 `EmptyState` 中过时的 Mock 文案

## 允许做的事

- 创建 `lib/api.ts`
- 实现 `fetchTravelPlan(input)`
- 修改首页表单提交逻辑调用真实 API
- 保留 loading 状态
- 增加首页错误状态和错误展示
- 保留 `lib/mock-data.ts`

## 禁止做的事

- 修改 API route
- 修改 Prompt
- 修改展示组件
- 做保存
- 做流式输出
- 做重新生成细节优化
- 删除 `lib/mock-data.ts`

## 完成标志

- 已创建 `lib/api.ts`
- `fetchTravelPlan(input)` 使用 `POST /api/generate-plan`
- 请求包含 `Content-Type: application/json`
- 非 2xx 响应会读取错误 `message` 并抛出异常
- 成功响应会返回 `TravelPlan`
- 首页提交表单时调用 `fetchTravelPlan`
- 首页已移除 `setTimeout` Mock 生成逻辑
- 首页不再直接使用 `mockTravelPlan` 生成结果
- 首页保留 loading 状态
- 首页增加 error 状态
- API 失败时首页展示错误
- `lib/mock-data.ts` 保留
- `EmptyState` 不再提示 Mock 旅行计划
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 前端真实调用 AI 生成 API
- 首页从 Mock 闭环进入真实 AI 生成闭环
- API 错误信息可在首页反馈给用户
- 空状态文案与真实 AI 生成阶段保持一致
