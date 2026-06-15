# CURRENT PHASE

## 当前阶段

P06 旅行需求表单

## 阶段状态

已完成，已通过最终验收。

## 当前目标

创建用户输入旅行需求的表单，但暂时不生成结果。

## 前置确认

- `ROADMAP.md` 已记录 P06 为下一阶段
- `DECISIONS.md` 已确认使用 Next.js App Router 和 shadcn/ui
- P06 不调用 AI、不引入 mock 数据、不展示旅行计划

## 允许做的事

- 创建 `components/TravelForm.tsx`
- 更新 `app/page.tsx` 将表单放入首页左侧
- 按需添加 shadcn/ui 基础组件
- 如果安装 shadcn/ui 组件导致变化，可更新 `package.json` 和 lock 文件
- 更新 `CURRENT_PHASE.md` 记录当前阶段边界

## 禁止做的事

- 调用 AI
- 引入 mock 数据
- 展示旅行计划
- 创建结果展示组件
- 做保存功能
- 做地点自动补全

## 完成标志

- `components/TravelForm.tsx` 已创建
- 表单字段严格对应 `TravelInputSchema`
- 必填字段包含 `destination`、`days`、`budget`、`currency`
- 可选字段包含 `departureCity`、`travelers`、`travelType`、`preferences`、`pace`、`specialRequests`
- 提交时使用 `TravelInputSchema` 校验
- 校验失败时显示字段级错误
- `preferences` 支持多选
- 提交成功时只 `console.log` 表单数据
- 首页左侧显示 `TravelForm`
- 右侧结果区域保留占位
- `npm run lint` 通过
- `npm run build` 通过
