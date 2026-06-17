# CURRENT PHASE

## 当前阶段

P17 保存计划

## 阶段状态

已完成。

## 当前目标

生成旅行计划后，用户可以将当前计划保存到 localStorage。

## 前置确认

- P16 localStorage 封装已完成
- `lib/store.ts` 已存在
- 决策 D003 明确 localStorage 优先
- 首页已接入真实 AI 生成结果

## 允许做的事

- 修改 `app/page.tsx`
- 可新增轻量保存按钮组件
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不创建计划列表页
- 不创建详情页
- 不做编辑
- 不做导出
- 不引入 Toast
- 不修改 Schema

## 完成标志

- 首页结果区域显示“保存计划”按钮
- 点击按钮调用 `savePlan(plan)`
- 保存成功后按钮文案显示“已保存”
- 当前计划已存在于 localStorage 时按钮显示“已保存”
- 重新生成或生成新计划后恢复为可保存状态
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 首页生成结果可保存到 localStorage
- 保存状态通过当前计划 id 是否存在于本地存储中判断
