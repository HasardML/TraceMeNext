# CURRENT PHASE

## 当前阶段

P19 计划详情页

## 阶段状态

已完成。

## 当前目标

创建计划详情页，展示某个已保存旅行计划的完整内容。

## 前置确认

- P18 计划列表页已完成
- `lib/store.ts` 已提供 `getPlan(id)`
- 决策 D003 明确 localStorage 优先
- 列表页卡片已链接到 `/plans/[id]`

## 允许做的事

- 新增 `app/plans/[id]/page.tsx`
- 修改 `app/page.tsx`
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不做编辑
- 不做删除
- 不做重新生成
- 不做导入导出
- 不改 Schema

## 完成标志

- `/plans/[id]` 页面从 URL 获取 `id`
- 页面使用 `getPlan(id)` 从 localStorage 读取计划
- 页面复用 `TravelPlanView` 展示完整计划内容
- 计划不存在时显示友好提示和返回列表按钮
- 页面顶部显示「返回我的计划」链接
- 首页保存成功后提供「查看详情」入口
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 已保存旅行计划详情页
- 保存成功后的详情入口
