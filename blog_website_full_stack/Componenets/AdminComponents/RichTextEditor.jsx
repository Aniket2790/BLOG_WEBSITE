"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] w-full max-w-2xl px-4 py-3 rounded-b-xl border border-slate-200 bg-white focus:outline-none prose prose-sm max-w-none text-slate-800",
        "data-placeholder": placeholder || "Write content here",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "";
    if (current !== next) {
      editor.commands.setContent(next, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rich-text-editor mt-2 max-w-2xl">
      <div className="flex flex-wrap gap-1.5 max-w-2xl border border-b-0 border-slate-200 rounded-t-xl bg-slate-50 p-2">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="B"
          className="font-bold"
        />
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="I"
          className="italic"
        />
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="H2"
        />
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          label="H3"
        />
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="• List"
        />
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="1. List"
        />
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="Quote"
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

const ToolbarButton = ({ active, onClick, label, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-2.5 py-1 text-sm rounded-lg border transition-colors ${
      active
        ? "bg-indigo-600 text-white border-indigo-600"
        : "bg-white text-slate-700 border-slate-200 hover:border-indigo-200"
    } ${className}`}
  >
    {label}
  </button>
);

export default RichTextEditor;
