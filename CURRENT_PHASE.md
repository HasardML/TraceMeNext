# CURRENT PHASE

## 当前阶段

P04 Mock 数据

## 当前目标

创建一份完整的模拟旅行输入和旅行计划，用于后续 UI 开发展示和数据流联调。

## 前置确认

- `types/travel.ts` 已存在 P03 Schema 和由 `z.infer` 推导的类型
- `TravelPlanSchema` 已包含 `inputParams?: TravelInputSchema`

## 允许做的事

- 创建 `lib/mock-data.ts`
- 导出 `mockTravelInput: TravelInput`
- 导出 `mockTravelPlan: TravelPlan`
- 提供 `validateMockData()`，使用 Schema.parse 校验 mock 数据
- 更新 `CURRENT_PHASE.md` 记录当前阶段边界

## 禁止做的事

- 修改 Schema
- 创建组件
- 修改页面
- 创建 API
- 安装依赖
- 扩大当前阶段范围

## 完成标志

- `lib/mock-data.ts` 已创建
- `mockTravelInput` 已覆盖东京、上海出发、5 天、8000 CNY、2 人、情侣、偏好和节奏字段
- `mockTravelPlan` 已提供 5 天东京旅行计划
- 每天包含 3 到 5 个行程项，且时间安排避开凌晨景点
- 行程项 `type` 使用 Schema 枚举
- `budget.total` 等于预算分类和行程项 cost 之和
- `packingList` 至少 8 项
- `tips` 至少 5 项
- `mockTravelPlan.inputParams` 指向 `mockTravelInput`
- `validateMockData()` 可通过 Schema.parse 校验 mock 数据
- `npm run lint` 通过
- `npm run build` 通过
