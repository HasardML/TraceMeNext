# CURRENT PHASE

## 当前阶段

P03 类型定义和 Zod Schema

## 当前目标

定义核心数据结构，作为 AI 输出、前端展示、本地存储和导入导出的统一依据。

## 允许做的事

- 创建 `types/travel.ts`
- 创建 `types/index.ts`
- 使用 Zod 定义并导出核心 Schema
- 使用 `z.infer` 推导并导出 TypeScript 类型
- 在 `TravelPlanSchema` 中加入 `inputParams?: TravelInputSchema`
- 更新 `CURRENT_PHASE.md` 记录当前阶段边界

## 禁止做的事

- 创建 mock 数据
- 创建组件
- 创建 API
- 修改 `app/` 页面
- 安装依赖
- 添加坐标、天气、地图、酒店详情、大使馆等阶段外字段
- 将 `packingList` 提前改成对象数组
- 扩大当前阶段范围

## 完成标志

- `types/travel.ts` 已定义并导出 `TravelItemSchema`
- `types/travel.ts` 已定义并导出 `TravelDaySchema`
- `types/travel.ts` 已定义并导出 `BudgetSchema`
- `types/travel.ts` 已定义并导出 `TravelInputSchema`
- `types/travel.ts` 已定义并导出 `TravelPlanSchema`
- 所有 TypeScript 类型均由 `z.infer` 推导
- `types/index.ts` 已统一导出类型模块
- `npm run lint` 通过
- `npm run build` 通过
