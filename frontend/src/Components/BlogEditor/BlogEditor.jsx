import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./BlogEditor.css";

const BlogEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
    ],

    content: content || "",

    editorProps: {
      attributes: {
        class:
          "min-h-[500px] outline-none text-white text-lg leading-8 p-4",
      },
    },

    onUpdate: ({ editor }) => {
      setContent(editor.getJSON());
    },
  });

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-xl bg-slate-900 border border-slate-700">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-700 pb-4">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 bg-slate-700 rounded"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 bg-slate-700 rounded"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="px-3 py-1 bg-slate-700 rounded"
        >
          H1
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-3 py-1 bg-slate-700 rounded"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="px-3 py-1 bg-slate-700 rounded"
        >
          • List
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className="px-3 py-1 bg-slate-700 rounded"
        >
          1. List
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className="px-3 py-1 bg-slate-700 rounded"
        >
          Quote
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleCodeBlock().run()
          }
          className="px-3 py-1 bg-slate-700 rounded"
        >
          Code
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;