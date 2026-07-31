import React from 'react'
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const BlogEditor = ({ content, setContent }) => {

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: content || "",

        onUpdate: ({ editor }) => {
            setContent(editor.getJSON());
        },
    })

    if (!editor) {
        return null;
    }

    return (
        <div className="border rounded-lg p-4">

            <div className="flex gap-3 mb-4">

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    Bold
                </button>


                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    Italic
                </button>


                <button
                    type="button"
                    onClick={() =>
                        editor.chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    H2
                </button>

            </div>


            <EditorContent
                editor={editor}
                className="min-h-[300px]"
            />

        </div>
    );
}

export default BlogEditor
