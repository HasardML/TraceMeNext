# CURRENT PHASE

## 当前阶段

P09 预算、清单、提示展示

## 阶段状态

已完成。

## 当前目标

基于现有 Mock 数据，在首页结果区域补齐预算、行前清单和注意事项展示，为后续表单联动阶段保留稳定展示结构。

## 前置确认

- P08 每日行程卡片已完成并通过验收
- `Budget`、`packingList` 和 `tips` 类型已覆盖本阶段展示所需字段
- `mockTravelPlan` 已提供预算、清单和提示 Mock 数据
- `ROADMAP.md` 保持 P09-P30 原编号继续推进

## 允许做的事

- 创建预算、行前清单和注意事项展示组件
- 在首页结果区域按顺序展示 `PlanOverview`、`DayList`、`BudgetCard`、`PackingList`、`TipsCard`
- 使用 `lib/mock-data.ts` 中现有 Mock 数据
- 保持与现有 shadcn/ui 和页面布局风格一致
- 更新阶段文档记录 P09 边界

## 禁止做的事

- 调用 AI
- 创建或修改 AI API
- 做保存、导出、地图、天气、登录、数据库
- 重排 P09-P30 编号
- 做清单勾选状态持久化
- 做预算编辑
- 做 tips 编辑
- 做图表
- 做表单联动

## 完成标志

- 新增 `BudgetCard` 并展示 transport、accommodation、food、tickets、shopping、other、total
- 新增 `PackingList` 并展示 `packingList: string[]`
- 新增 `TipsCard` 并展示 `tips: string[]`
- 首页右侧展示顺序为 `PlanOverview`、`DayList`、`BudgetCard`、`PackingList`、`TipsCard`
- 不引入真实 AI、后端能力、编辑能力或持久化状态
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 新增 `BudgetCard` 预算展示组件
- 新增 `PackingList` 行前清单展示组件
- 新增 `TipsCard` 注意事项展示组件
- 首页在每日行程下方展示预算、行前清单和注意事项
