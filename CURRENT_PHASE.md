# CURRENT PHASE

## 当前阶段

P25 Markdown 导出

## 阶段状态

已完成。

## 当前目标

将旅行计划导出为 Markdown 文件。

## 前置确认

- 已读取 `CURRENT_PHASE.md`、`ROADMAP.md`、`DECISIONS.md`
- `git status --short` 无输出，开始前工作区干净
- 本阶段不涉及 Schema 变更

## Schema 变更

无。

## 允许做的事

- 修改 `lib/export.ts`
- 修改 `lib/download.ts`
- 修改 `app/plans/[id]/page.tsx`
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不做 JSON 导出
- 不做 PDF
- 不做分享链接
- 不改 Schema

## 完成标志

- 新增 `lib/export.ts`
- 实现 `exportToMarkdown(plan: TravelPlan): string`
- Markdown 包含标题、概述、目的地、天数、预算、每日行程表格、预算明细、行前清单、注意事项和 AI 内容免责声明
- `packingList` 勾选状态导出为 `[x]`，未勾选状态导出为 `[ ]`
- 新增 `lib/download.ts`
- 实现 `downloadFile(content, filename, mimeType)`
- 详情页增加「导出 Markdown」按钮
- 下载文件名包含目的地和天数
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- Markdown 导出纯函数
- 浏览器文件下载工具
- 计划详情页 Markdown 导出入口
