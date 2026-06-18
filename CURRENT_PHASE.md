# CURRENT PHASE

## 当前阶段

P24 预算编辑和清单交互

## 阶段状态

已完成。

## 当前目标

让预算、行前清单、注意事项具备基础编辑能力。

## 前置确认

- 已读取 `CURRENT_PHASE.md`、`ROADMAP.md`、`DECISIONS.md`
- `git status --short` 无输出，开始前工作区干净
- 本阶段涉及 Schema 变更，已执行 Schema 变更影响清单

## Schema 变更

- 新增 `PackingItemSchema`: `{ text: string, checked: boolean }`
- `TravelPlanSchema.packingList` 从 `string[]` 改为 `PackingItemSchema[]`
- `AiOutputSchema.packingList` 同步改为 `PackingItemSchema[]`
- `TravelPlanSchema` 保留旧 `string[]` 读取兼容，并归一化为未勾选清单项

## Schema 变更影响清单

- `types/travel.ts`: 已处理，新增 schema/type 并更新 `TravelPlanSchema`、`AiOutputSchema`
- `lib/store.ts`: 已处理，读取 localStorage 旧数据时归一化并回写迁移结果，导出 JSON 导入可复用的归一化入口
- `lib/mock-data.ts`: 已处理，mock `packingList` 改为对象数组
- `lib/prompts.ts`: 已处理，Prompt schema 版本和示例结构升级到 `AiOutputSchema v2`
- `lib/ai.ts`: 已处理，通过更新后的 `AiOutputSchema` 和 `TravelPlanSchema` 校验新结构
- 展示组件: 已处理，预算、清单、tips 组件均支持新交互和新数据结构
- `app/plans/[id]/page.tsx`: 已处理，集中持久化预算、清单和 tips 更新
- `DECISIONS.md`: 已处理，记录本次 `packingList` Schema 变更

## 允许做的事

- 修改 `types/travel.ts`
- 修改 `lib/mock-data.ts`
- 修改 `lib/prompts.ts`
- 修改 `lib/ai.ts`
- 修改 `lib/store.ts`
- 修改 `components/plan/BudgetCard.tsx`
- 修改 `components/plan/PackingList.tsx`
- 修改 `components/plan/TipsCard.tsx`
- 修改 `app/plans/[id]/page.tsx`
- 修改 `DECISIONS.md`
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不做预算图表
- 不做 PDF
- 不做分享
- 不做 AI 对话修改
- 不做拖拽

## 完成标志

- `transport`、`accommodation`、`food`、`tickets`、`shopping`、`other` 可编辑
- 修改任一预算项后自动重新计算 `budget.total`
- `totalBudget` 同步为 `budget.total`
- 预算修改保存到 localStorage
- `packingList` 使用 `{ text, checked }` 结构
- localStorage 旧 `string[]` 清单数据自动迁移为 `{ text, checked: false }`
- JSON 导入可通过同一归一化入口兼容旧 `string[]` 清单数据
- 行前清单可勾选、取消勾选、添加、删除，并持久化状态
- 注意事项可添加、编辑、删除
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 预算基础编辑能力
- 行前清单勾选状态与增删能力
- 注意事项增删改能力
- `packingList` Schema v2 与旧数据兼容迁移
