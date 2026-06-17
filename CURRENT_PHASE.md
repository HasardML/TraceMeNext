# CURRENT PHASE

## 当前阶段

P21 编辑标题和概述

## 阶段状态

已完成。

## 当前目标

允许用户在详情页编辑计划标题和概述。

## 前置确认

- 已读取 `CURRENT_PHASE.md`、`ROADMAP.md`、`DECISIONS.md`
- `git status --short` 无输出，开始前工作区干净
- P21 只编辑计划标题和概述，不涉及 Schema、每日行程、预算或行程项结构

## 允许做的事

- 修改 `components/EditableText.tsx`
- 修改 `components/plan/PlanOverview.tsx`
- 修改 `app/plans/[id]/page.tsx`
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不编辑每日行程
- 不编辑预算
- 不增删行程项
- 不做拖拽
- 不改 Schema

## 完成标志

- 新增 `EditableText` 组件
- 展示模式显示文字和编辑按钮
- 点击进入编辑模式并自动聚焦
- `input` 按 Enter 保存
- `textarea` 按 Ctrl+Enter 保存，普通 Enter 保留换行
- blur 保存
- Esc 取消
- 详情页标题可编辑并保存
- 详情页概述可编辑并保存
- 保存后调用 `updatePlan` 并用返回计划更新页面状态
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 可复用的内联文本编辑组件
- 详情页计划标题和概述编辑能力
