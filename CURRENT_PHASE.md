# CURRENT PHASE

## 当前阶段

P23 增删行程项和天数

## 阶段状态

已完成。

## 当前目标

允许用户添加和删除行程项，以及添加和删除整天。

## 前置确认

- 已读取 `CURRENT_PHASE.md`、`ROADMAP.md`、`DECISIONS.md`
- `git status --short` 无输出，开始前工作区干净
- P23 只新增和删除行程项、整天，并保持本地计划数据同步

## 允许做的事

- 修改 `components/plan/DayCard.tsx`
- 修改 `components/plan/DayList.tsx`
- 修改 `app/plans/[id]/page.tsx`
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不做拖拽排序
- 不编辑预算
- 不做导出
- 不改 Schema
- 不做 AI 对话修改

## 完成标志

- 每个 DayCard 底部提供「添加行程」按钮
- 新增行程项默认 `time` 为 `09:00`
- 新增行程项默认 `place` 为空字符串
- 新增行程项默认 `type` 为 `attraction`
- 新增行程项默认 `description` 为空字符串
- 新增行程项后立即进入编辑模式
- 每个行程项提供删除按钮
- 删除行程项前使用简单确认
- DayList 底部提供「添加一天」按钮
- 新增一天的 `day` 为当前最大天数 + 1
- 新增一天的 `theme` 为「新的行程」
- 新增一天的 `items` 为空数组
- 每天提供删除此天按钮
- 至少保留 1 天，不能删除到 0 天
- 删除天后重新编号为 Day 1..N
- `totalDays` 随 `days.length` 自动更新
- 所有操作通过 `updatePlan` 保存到 localStorage
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- 行程项新增和删除能力
- 整天新增和删除能力
- 删除天后的连续编号
- `days` 与 `totalDays` 的本地持久化同步
