# CURRENT PHASE

## 当前阶段

P08 每日行程卡片

## 阶段状态

已完成。

## 当前目标

基于现有 Mock 数据，在首页结果区域展示每天的详细行程，为后续预算、清单和提示展示打基础。

## 前置确认

- P07 行程总览卡片已完成并通过验收
- `TravelDay` 和 `TravelItem` 类型已覆盖每日行程展示所需字段
- `mockTravelPlan.days` 已提供可用于首页展示的 Mock 数据
- `ROADMAP.md` 保持 P08-P30 原编号继续推进

## 允许做的事

- 创建或更新每日行程相关展示组件
- 在首页结果区域展示 Mock 每日行程
- 使用 `lib/mock-data.ts` 中现有 Mock 数据
- 保持与现有 shadcn/ui 和页面布局风格一致
- 更新阶段文档记录 P08 边界

## 禁止做的事

- 调用 AI
- 创建或修改 AI API
- 做保存、导出、地图、天气、登录、数据库
- 重排 P08-P30 编号
- 做预算、清单、tips 展示
- 做编辑、折叠展开、拖拽排序
- 显示地图、坐标、路线

## 完成标志

- 首页在行程总览下方展示每日行程列表
- 每个行程项展示 time、type 标签或图标、place、description、cost
- type 覆盖 attraction、food、transport、hotel、shopping、rest
- 每日行程组件使用现有 Mock 数据
- 不引入真实 AI 或后端能力
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 新增 `DayCard` 每日行程卡片组件
- 新增 `DayList` 每日行程列表组件
- 首页在 `PlanOverview` 下方使用 `mockTravelPlan.days` 渲染每日行程
- 左侧旅行需求表单保持可用，暂不做提交联动
