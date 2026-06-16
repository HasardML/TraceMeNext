# CURRENT PHASE

## 当前阶段

P11 Prompt 编写

## 阶段状态

已完成。

## 当前目标

编写 AI 生成旅行计划所需的 Prompt，但暂不调用 AI。

## 前置确认

- P10 表单到 Mock 结果联动已完成
- `TravelPlanSchema` 和 `TravelInputSchema` 已存在
- D005 明确先用 Mock 跑通体验和数据流，再接入 AI
- D006 明确 Prompt 需要支持预算缺省和快速规划输入

## 允许做的事

- 创建 `lib/prompts.ts`
- 实现 `buildSystemPrompt()`
- 实现 `buildUserPrompt(input: TravelInput)`
- 在 Prompt 中约束 AI 输出 JSON 与当前计划 Schema 对齐
- 正确处理可选输入字段，避免输出 `undefined`
- 更新阶段文档记录 P11 边界

## 禁止做的事

- 调用 AI
- 创建 API
- 安装 AI SDK
- 修改 Schema
- 修改组件
- 联调前端
- 保存 localStorage
- 做地图、天气、登录、数据库

## 完成标志

- 新增 `lib/prompts.ts`
- `buildSystemPrompt()` 明确角色、任务、合法 JSON 输出和字段约束
- `buildSystemPrompt()` 排除元数据字段和当前 Schema 外字段
- `buildSystemPrompt()` 约束中文内容、每日行程数量、预算合计、清单和提示数量
- `buildUserPrompt(input)` 根据输入生成用户需求 Prompt
- `buildUserPrompt(input)` 不输出 `undefined`
- 不引入真实 AI、API、Schema 修改、组件修改或前端联调
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 新增 Prompt 构建函数
- 明确 AI 输出 JSON 的字段、内容和数量约束
- 保持 AI 接入前的纯 Prompt 准备状态
