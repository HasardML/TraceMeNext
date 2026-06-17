# CURRENT PHASE

## 当前阶段

P18 计划列表页

## 阶段状态

已完成。

## 当前目标

创建「我的旅行计划」页面，展示所有已保存计划。

## 前置确认

- P17 保存计划已完成
- `lib/store.ts` 已提供 `getAllPlans()`
- 决策 D003 明确 localStorage 优先
- 保存后的计划已写入 localStorage

## 允许做的事

- 新增 `app/plans/page.tsx`
- 新增 `components/PlanCard.tsx`
- 修改 `components/Header.tsx`
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不创建详情页
- 不做删除
- 不做编辑
- 不做搜索筛选
- 不做导入导出

## 完成标志

- `/plans` 页面显示「我的旅行计划」标题
- 页面从 localStorage 读取并展示已保存计划
- 每个计划卡片展示标题、目的地、旅行天数、更新时间
- 卡片点击链接到 `/plans/[id]`
- 无保存计划时展示空状态并引导回首页创建
- Header 显示「我的计划」导航链接
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 已保存旅行计划列表页
- 可复用计划卡片组件
- Header 计划入口
