# CURRENT PHASE

## 当前阶段

P15 Loading、超时、免责声明

## 阶段状态

已完成。

## 当前目标

优化 AI 生成过程体验，增加等待提示、前端超时、重新生成和免责声明。

## 前置确认

- P14 前端真实 AI 调用已完成
- `fetchTravelPlan(input)` 已调用 `POST /api/generate-plan`
- 首页已有 loading 和 error 状态
- P15 不修改 API route、Prompt、Schema、保存逻辑或流式输出

## 允许做的事

- 修改 `components/LoadingState.tsx`
- 修改 `lib/api.ts`
- 修改 `app/page.tsx`
- 新增或修改 `components/Disclaimer.tsx`
- 修改 `components/plan/TravelPlanView.tsx`

## 禁止做的事

- 修改 API route
- 修改 Prompt
- 修改 Schema
- 做保存
- 做编辑
- 做流式输出

## 完成标志

- Loading 显示已等待秒数
- Loading 在 15 秒后提示生成时间较长
- Loading 在 45 秒后提示可稍后重试
- Loading 组件卸载时清理计时器
- `fetchTravelPlan` 支持可选 `AbortSignal`
- 首页生成请求有 60 秒前端超时
- 超时后取消请求并展示错误
- 首页记录最近一次成功提交的 `TravelInput`
- 有结果时显示「重新生成」按钮
- 点击「重新生成」使用最近一次成功提交的 `TravelInput`
- `TravelPlanView` 底部显示免责声明
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- AI 生成等待过程有阶段性提示
- 前端可在长时间无响应时主动取消请求
- 用户可基于最近一次提交重新生成旅行计划
- 结果页包含 AI 内容免责声明
