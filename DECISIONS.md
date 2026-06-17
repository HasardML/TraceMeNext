# DECISIONS

本文件记录已经明确的技术与产品约束。新增决策应写入这里，并说明日期、原因和替代方案，避免后续开发反复摇摆。

| 编号 | 日期 | 决策 | 原因 | 替代方案 |
| --- | --- | --- | --- | --- |
| D001 | 2026-06-15 | 使用 Next.js App Router | 保持项目结构现代、清晰，并与当前 `app/` 目录一致。 | Pages Router |
| D002 | 2026-06-15 | 使用 shadcn/ui | 以可组合、可控的 UI 基础组件为主，避免过早自建组件体系。 | 自建 UI 组件库、其他 UI 框架 |
| D003 | 2026-06-15 | localStorage 优先 | 早期功能优先本地可用，降低后端与账户系统依赖。 | 直接接入数据库、先做用户系统 |
| D004 | 2026-06-15 | Schema 精简 | 数据模型先覆盖核心流程，避免在需求未稳定前过度设计。 | 一次性设计完整复杂 Schema |
| D005 | 2026-06-15 | Mock 先于 AI | 先用 Mock 跑通产品体验和数据流，再接入 AI 能力。 | 立即接入 AI API |
| D006 | 2026-06-15 | 将长表单改为“快速规划 + 高级选项” | AI 旅行规划器应允许用户用少量关键信息开始规划，降低首次使用门槛。影响：`budget` 改为可选，新增 `startDate`，Prompt 后续需要支持预算缺省情况。 | 保持完整长表单，但会增加用户输入负担 |
| D007 | 2026-06-17 | 使用 Vercel AI SDK + OpenAI provider，默认模型为 `gpt-4.1-mini` | AI SDK 的 `generateObject` 能直接结合 Zod Schema 做结构化输出；OpenAI provider 接入路径成熟，`gpt-4.1-mini` 在旅行计划这种中文结构化生成场景中兼顾质量、速度和成本。 | 直接调用 OpenAI REST API、Anthropic provider、Google provider、Vercel AI Gateway |
