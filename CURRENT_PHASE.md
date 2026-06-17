# CURRENT PHASE

## 当前阶段

P20 删除和重新生成

## 阶段状态

已完成。

## 当前目标

补齐计划管理中的删除和重新生成能力。

## 前置确认

- 已读取 `CURRENT_PHASE.md`、`ROADMAP.md`、`DECISIONS.md`
- `git status --short` 无输出，开始前工作区干净
- `TravelPlanSchema` 已包含 `inputParams: TravelInputSchema.optional()`

## 允许做的事

- 修改 `app/plans/page.tsx`
- 修改 `app/plans/[id]/page.tsx`
- 修改 `components/PlanCard.tsx`
- 如确实需要，小修 `lib/store.ts`
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不修改 Schema
- 不做编辑
- 不做导出
- 不做版本历史
- 不引入 Toast
- 不引入复杂弹窗库

## 完成标志

- 列表页每个 `PlanCard` 有删除按钮
- 删除前使用 `window.confirm` 简单确认
- 确认后调用 `deletePlan`
- 列表删除后实时更新
- 详情页有删除按钮
- 详情页删除后跳转 `/plans`
- 详情页有重新生成按钮
- 重新生成使用 `plan.inputParams` 调用 `fetchTravelPlan`
- 缺少 `inputParams` 时禁用重新生成按钮并显示原因
- 重新生成成功后覆盖当前计划
- 重新生成保留原 `id` 和 `createdAt`，并通过 `updatePlan` 更新 `updatedAt`
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 计划列表和详情页删除能力
- 基于原始输入参数的计划重新生成能力
