import React from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import clsx from "clsx";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2 mb-4 border-b pb-2">
      <button
        className={clsx(
          "px-3 py-1 rounded border",
          editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-white"
        )}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </button>
      <button
        className={clsx(
          "px-3 py-1 rounded border",
          editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white"
        )}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        Italic
      </button>
      <button
        className={clsx(
          "px-3 py-1 rounded border",
          editor.isActive("underline") ? "bg-blue-500 text-white" : "bg-white"
        )}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        Underline
      </button>
      <button
        className="px-3 py-1 rounded border bg-white"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        Bullet List
      </button>
      <button
        className="px-3 py-1 rounded border bg-white"
        onClick={() => {
          const url = prompt("Enter a URL");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
      >
        Link
      </button>
      <button
        className="px-3 py-1 rounded border bg-white"
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        Remove Link
      </button>
    </div>
  );
};

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "",
  });

  return (
    <div className="p-4 max-w-3xl mx-auto bg-gray-50 border rounded shadow">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="border p-4 rounded min-h-[150px] bg-white"
      />
    </div>
  );
};

export default RichTextEditor;
