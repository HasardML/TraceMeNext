"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type EditableTextProps = {
  value: string;
  onSave: (newValue: string) => void;
  as?: "input" | "textarea";
  className?: string;
  placeholder?: string;
};

export function EditableText({
  value,
  onSave,
  as = "input",
  className,
  placeholder,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const fieldRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const didCloseRef = useRef(false);
  const skipBlurSaveRef = useRef(false);

  useEffect(() => {
    if (!isEditing) {
      setDraft(value);
    }
  }, [isEditing, value]);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      fieldRef.current?.focus();
      fieldRef.current?.select();
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [isEditing]);

  function startEditing() {
    didCloseRef.current = false;
    skipBlurSaveRef.current = false;
    setDraft(value);
    setIsEditing(true);
  }

  function save() {
    if (didCloseRef.current) {
      return;
    }

    didCloseRef.current = true;
    setIsEditing(false);

    if (draft !== value) {
      onSave(draft);
    }
  }

  function cancel() {
    didCloseRef.current = true;
    skipBlurSaveRef.current = true;
    setDraft(value);
    setIsEditing(false);
  }

  function handleBlur() {
    if (skipBlurSaveRef.current) {
      skipBlurSaveRef.current = false;
      return;
    }

    save();
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancel();
      return;
    }

    if (as === "input" && event.key === "Enter") {
      event.preventDefault();
      save();
      return;
    }

    if (as === "textarea" && event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      save();
    }
  }

  if (isEditing) {
    if (as === "textarea") {
      return (
        <Textarea
          ref={fieldRef as RefObject<HTMLTextAreaElement>}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={className}
        />
      );
    }

    return (
      <Input
        ref={fieldRef as RefObject<HTMLInputElement>}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
      />
    );
  }

  return (
    <div className="group flex items-start gap-2">
      <button
        type="button"
        onClick={startEditing}
        className={cn(
          "min-w-0 flex-1 rounded-sm text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
          className,
          !value && "text-muted-foreground",
        )}
      >
        {value || placeholder}
      </button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={startEditing}
        aria-label="编辑"
        title="编辑"
        className="mt-0.5 opacity-70 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        <Pencil aria-hidden="true" />
      </Button>
    </div>
  );
}
