# CURRENT PHASE

## 当前阶段

P22 编辑每日行程项

## 阶段状态

已完成。

## 当前目标

允许用户编辑每天主题和已有行程项内容。

## 前置确认

- 已读取 `CURRENT_PHASE.md`、`ROADMAP.md`、`DECISIONS.md`
- `git status --short` 无输出，开始前工作区干净
- P22 只编辑每日主题和已有行程项内容，不新增行程项、不删除行程项、不新增或删除天数、不编辑预算、不做拖拽排序、不改 Schema

## 允许做的事

- 修改 `components/plan/DayCard.tsx`
- 修改 `components/plan/DayList.tsx`
- 修改 `app/plans/[id]/page.tsx`
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不新增行程项
- 不删除行程项
- 不新增或删除天数
- 不编辑预算
- 不做拖拽排序
- 不改 Schema

## 完成标志

- 每天 `theme` 使用 `EditableText` 可编辑
- 每个已有行程项提供编辑按钮
- 点击编辑按钮后该行程项进入编辑模式
- 编辑模式可编辑 `time`、`place`、`type`、`description`、`cost`
- `type` 使用 select 编辑
- 编辑模式提供保存和取消
- 保存后更新页面状态并写入 localStorage
- 取消后丢弃草稿并恢复原值
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 每日主题编辑能力
- 已有行程项编辑能力
- 行程项编辑草稿、保存和取消流程
