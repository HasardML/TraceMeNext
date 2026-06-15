# CURRENT PHASE

## 当前阶段

P05 全局布局和首页骨架

## 阶段状态

已完成，已通过最终验收。

## 当前目标

搭建应用基本页面结构，为表单和结果展示提供容器。

## 前置确认

- `ROADMAP.md` 已记录 P05 为下一阶段
- `DECISIONS.md` 已确认使用 Next.js App Router 和 shadcn/ui
- P04 Mock 数据已完成，P05 不引入或展示 mock 数据

## 允许做的事

- 创建 `components/Header.tsx`
- 更新 `app/layout.tsx` 引入全局 Header
- 更新 `app/page.tsx` 创建首页左右布局占位
- 必要时更新 `app/globals.css` 保持基础样式简洁
- 更新 `CURRENT_PHASE.md` 记录当前阶段边界

## 禁止做的事

- 创建表单组件
- 创建结果展示组件
- 引入 mock 数据
- 创建 `/plans` 页面
- 安装新依赖
- 做暗黑模式

## 完成标志

- `components/Header.tsx` 已创建，左侧显示「AI 旅行规划器」并可点击回首页
- `app/layout.tsx` 已引入 Header，并保持 `zh-CN` 和 metadata
- `app/page.tsx` 已提供桌面端左 1/3、右 2/3 的两栏占位布局
- 左侧占位区在桌面端 sticky
- 移动端首页布局上下排列
- 样式使用 Tailwind 和 shadcn 默认风格，保持简洁
- `npm run lint` 通过
- `npm run build` 通过
