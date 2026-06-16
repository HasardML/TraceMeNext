# CURRENT PHASE

## 当前阶段

P10 表单到 Mock 结果联动

## 阶段状态

已完成。

## 当前目标

不用真实 AI，先跑通用户提交表单到看到完整旅行计划的前端闭环。

## 前置确认

- P09 预算、行前清单和注意事项展示已完成
- `TravelForm` 已支持 `onSubmit` 与 `loading` props
- `mockTravelPlan` 已可展示完整旅行计划
- D005 明确先用 Mock 跑通体验和数据流，再接入 AI

## 允许做的事

- 创建 `TravelPlanView` 组合计划展示组件
- 创建 `LoadingState` 和 `EmptyState`
- 在首页使用 `useState` 管理 `plan` 和 `isLoading`
- 表单提交后延迟 1 到 2 秒展示 `mockTravelPlan`
- loading 期间禁用表单提交按钮
- 保持与现有 shadcn/ui 和页面布局风格一致
- 更新阶段文档记录 P10 边界

## 禁止做的事

- 调用 AI
- 创建 API
- 保存 localStorage
- 做编辑
- 做导出
- 做重新生成
- 做地图、天气、登录、数据库

## 完成标志

- 新增 `TravelPlanView` 并组合 `PlanOverview`、`DayList`、`BudgetCard`、`PackingList`、`TipsCard`
- 新增 `LoadingState`
- 新增 `EmptyState`
- 首页首次加载右侧显示空状态
- 表单提交后右侧显示 loading 状态
- 延迟 1 到 2 秒后显示完整 Mock 旅行计划
- loading 期间表单提交按钮禁用
- 页面加载时不再直接展示 `mockTravelPlan`
- 不引入真实 AI、API、编辑、导出、localStorage 或重新生成能力
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 新增 `TravelPlanView`，统一组合完整旅行计划展示
- 新增 `LoadingState`，用于表单提交后的等待状态
- 新增 `EmptyState`，用于首次加载时的空结果状态
- 首页改为表单提交后延迟展示 `mockTravelPlan`
- 表单 loading 期间提交按钮禁用
