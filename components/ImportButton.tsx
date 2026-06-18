"use client";

import { type ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { importPlan } from "@/lib/store";

const INVALID_FILE_ERROR = "请选择 .json 格式的旅行计划文件。";
const READ_ERROR = "无法读取文件内容，请重新选择文件后再试。";
const PARSE_ERROR = "文件内容不是有效的 JSON，请检查后重新导入。";
const SCHEMA_ERROR =
  "JSON 文件不是有效的旅行计划，可能缺少必要字段或字段格式不正确。";
const STORAGE_ERROR =
  "导入内容已通过校验，但保存到浏览器本地失败。请检查存储空间或浏览器权限后重试。";

export function ImportButton() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  function handleSelectFile() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];

    input.value = "";

    if (!file) {
      return;
    }

    setError(null);

    if (!file.name.toLowerCase().endsWith(".json")) {
      setError(INVALID_FILE_ERROR);
      return;
    }

    setIsImporting(true);

    try {
      let fileText: string;

      try {
        fileText = await file.text();
      } catch {
        setError(READ_ERROR);
        return;
      }

      let importedData: unknown;

      try {
        importedData = JSON.parse(fileText);
      } catch {
        setError(PARSE_ERROR);
        return;
      }

      try {
        const importedPlan = importPlan(importedData);

        if (!importedPlan) {
          setError(STORAGE_ERROR);
          return;
        }

        router.push(`/plans/${encodeURIComponent(importedPlan.id)}`);
      } catch {
        setError(SCHEMA_ERROR);
      }
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="sr-only"
        aria-label="导入 JSON 旅行计划"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="outline"
        onClick={handleSelectFile}
        disabled={isImporting}
      >
        <Upload aria-hidden="true" />
        {isImporting ? "导入中" : "导入 JSON"}
      </Button>
      {error ? (
        <p
          role="alert"
          className="max-w-80 text-sm leading-6 text-red-600 sm:text-right"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
