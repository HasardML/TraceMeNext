# CURRENT PHASE

## 当前阶段

P26 JSON 导出

## 阶段状态

已完成。

## 当前目标

将旅行计划导出为 JSON 文件，用于备份和迁移。

## 前置确认

- 已读取 `CURRENT_PHASE.md`、`ROADMAP.md`、`DECISIONS.md`
- `git status --short` 无输出，开始前工作区干净
- 本阶段不涉及 Schema 变更

## Schema 变更

无。

## 允许做的事

- 修改 `lib/export.ts`
- 修改 `app/plans/[id]/page.tsx`
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不做 JSON 导入
- 不做批量导出
- 不做 PDF
- 不改 Schema

## 完成标志

- 修改 `lib/export.ts`
- 实现 `exportToJSON(plan: TravelPlan): string`
- 导出前使用 `TravelPlanSchema.parse(plan)` 校验旅行计划
- 使用 `JSON.stringify(parsedPlan, null, 2)` 生成 2 空格缩进 JSON
- 详情页增加「导出 JSON」按钮
- 下载文件名包含目的地和天数
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- JSON 导出纯函数
- 计划详情页 JSON 导出入口
