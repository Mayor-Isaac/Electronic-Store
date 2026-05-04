import { ListBulletsIcon, ListDashesIcon, ListNumbersIcon, TextAlignCenterIcon, TextAlignJustifyIcon, TextAlignLeftIcon, TextAlignRightIcon, TextBIcon, TextHFiveIcon, TextHFourIcon, TextHIcon, TextHOneIcon, TextHThreeIcon, TextHTwoIcon, TextIndentIcon, TextItalicIcon, TextOutdentIcon, TextStrikethroughIcon, TextSubscriptIcon, TextSuperscriptIcon, TextUnderlineIcon } from "@phosphor-icons/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const BlogEditor = ({ onChange, content }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    // This updates your parent state whenever you type
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    // Adds styling to the editor area itself
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[300px]",
      },
    },
  });

  return (
    <div className="w-full border rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Toolbar*/}
      <div className="flex items-center border-b  justify-evenly">
        <div className="bg-gray-50 p-2 flex gap-2">
          <TextBIcon
            size={20}
            weight="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={` ${editor?.isActive("bold") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextItalicIcon
            size={20}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${editor?.isActive("italic") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextUnderlineIcon
            size={20}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${editor?.isActive("underline") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextStrikethroughIcon
            size={20}
            onClick={() => editor.chain().focus().toggleStrikethrough().run()}
            className={`${editor?.isActive("strikethrough") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextSubscriptIcon
            size={20}
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={`${editor?.isActive("subscript") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextSuperscriptIcon
            size={20}
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            className={`${editor?.isActive("superscript") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
              </div>
              
        <div className="bg-gray-50 p-2 flex gap-2">
          <TextHIcon
            size={20}
            weight="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={` ${editor?.isActive("bold") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextHOneIcon
            size={20}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${editor?.isActive("italic") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextHTwoIcon
            size={20}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${editor?.isActive("underline") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextHThreeIcon
            size={20}
            onClick={() => editor.chain().focus().toggleStrikethrough().run()}
            className={`${editor?.isActive("strikethrough") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextHFourIcon
            size={20}
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={`${editor?.isActive("subscript") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextHFiveIcon
            size={20}
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            className={`${editor?.isActive("superscript") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
        </div>

        <div className="bg-gray-50 p-2 flex gap-2">
          <TextIndentIcon
            size={20}
            weight="bold"
            onClick={() => editor.chain().focus().toggleAlign("right").run()}
            className={` ${editor?.isActive("align", "right") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextOutdentIcon
            size={20}
            weight="bold"
            onClick={() => editor.chain().focus().toggleAlign("justify").run()}
            className={` ${editor?.isActive("align", "justify") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <ListNumbersIcon
            size={20}
            weight="bold"
            onClick={() => editor.chain().focus().toggleAlign("center").run()}
            className={` ${editor?.isActive("align", "center") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <ListBulletsIcon
            size={20}
            weight="bold"
            onClick={() => editor.chain().focus().toggleAlign("left").run()}
            className={` ${editor?.isActive("align", "left") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <ListDashesIcon
            size={20}
            weight="bold"
            onClick={() => editor.chain().focus().toggleAlign("left").run()}
            className={` ${editor?.isActive("align", "left") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
        </div>

        <div className="bg-gray-50 p-2 flex gap-2">
          <TextAlignRightIcon
            size={20}
            weight="bold"
            onClick={() => editor.chain().focus().toggleAlign("right").run()}
            className={` ${editor?.isActive("align", "right") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextAlignJustifyIcon
            size={20}
            weight="bold"
            onClick={() => editor.chain().focus().toggleAlign("justify").run()}
            className={` ${editor?.isActive("align", "justify") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextAlignCenterIcon
            size={20}
            weight="bold"
            onClick={() => editor.chain().focus().toggleAlign("center").run()}
            className={` ${editor?.isActive("align", "center") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
          <TextAlignLeftIcon
            size={20}
            weight="bold"
            onClick={() => editor.chain().focus().toggleAlign("left").run()}
            className={` ${editor?.isActive("align", "left") ? "bg-black/70 text-white" : "bg-white border"}`}
          />
        </div>
      </div>

      {/* The actual text area */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;