# CURRENT PHASE

## 当前阶段

P27 JSON 导入

## 阶段状态

已完成。

## 当前目标

允许用户上传 JSON 文件，导入旅行计划。

## 前置确认

- 已读取 `CURRENT_PHASE.md`、`ROADMAP.md`、`DECISIONS.md`
- `git status --short` 无输出，开始前工作区干净
- 本阶段不涉及 Schema 变更

## Schema 变更

无。

## 允许做的事

- 创建 `components/ImportButton.tsx`
- 修改 `app/plans/page.tsx`
- 修改 `lib/store.ts`，用于复用迁移/校验并感知保存失败
- 修改 `CURRENT_PHASE.md`

## 禁止做的事

- 不做 URL 导入
- 不做批量导入
- 不做 PDF
- 不改 Schema

## 完成标志

- 创建 `components/ImportButton.tsx`
- 使用 `input type=file`
- 只接受 `.json`
- 读取文件文本并执行 `JSON.parse`
- 使用 store 中的 `normalizeTravelPlan`/`TravelPlanSchema` 路径校验并迁移
- 保存到 `localStorage`
- 成功后跳转详情页
- 失败时显示友好错误
- `/plans` 页面顶部增加导入按钮
- 覆盖非 JSON 文件、JSON 解析失败、Schema 校验失败、localStorage 保存失败
- `npm run lint` 通过
- `npm run build` 通过

## 本阶段交付

- JSON 导入按钮
- 计划列表页 JSON 导入入口
- 导入保存结果可感知的 store 复用入口
