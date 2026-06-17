# CURRENT PHASE

## 当前阶段

P16 localStorage 封装

## 阶段状态

已完成。

## 当前目标

封装旅行计划本地存储逻辑，为后续保存计划和计划管理页面提供基础能力。

## 前置确认

- P15 Loading、超时、免责声明已完成
- `TravelPlanSchema` 已定义
- 决策 D003 明确 localStorage 优先
- P16 暂不接入 UI

## 允许做的事

- 新增或修改 `lib/store.ts`
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不修改页面
- 不修改组件
- 不添加保存按钮
- 不安装依赖
- 不修改 Schema

## 完成标志

- 定义本地存储 key：`travel-plans`
- 实现 `savePlan(plan: TravelPlan): void`
- `savePlan` 保存前使用 `TravelPlanSchema.parse`
- `savePlan` 在 id 已存在时更新计划
- 更新已有计划时刷新 `updatedAt`
- 实现 `getPlan(id: string): TravelPlan | null`
- 实现 `getAllPlans(): TravelPlan[]`
- `getAllPlans` 按 `updatedAt` 倒序返回
- 实现 `deletePlan(id: string): void`
- 实现 `updatePlan(id: string, updates: Partial<TravelPlan>): TravelPlan | null`
- 所有读取都有 `try/catch` 兜底
- SSR 或 localStorage 不可用时安全降级
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 本地存储访问集中封装在 `lib/store.ts`
- 页面和组件暂不接入保存能力
- 后续 P17 可直接调用存储函数实现保存计划
