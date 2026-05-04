import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default BlogEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // This sends the data to your state
    },
  });

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      {/* Basic Toolbar */}
      <div className="flex gap-2 mb-4 border-b pb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor?.isActive("bold") ? "font-bold text-purple-600" : ""
          }
        >
          Bold
        </button>
        {/* Add more buttons here */}
      </div>

      <EditorContent
        editor={editor}
        className="prose max-w-none focus:outline-none"
      />
    </div>
  );
};
