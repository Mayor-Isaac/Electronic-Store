import {
  ListBulletsIcon,
  ListNumbersIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextHFiveIcon,
  TextHFourIcon,
  TextHIcon,
  TextHOneIcon,
  TextHThreeIcon,
  TextHTwoIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextSubscriptIcon,
  TextSuperscriptIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";

const ToolbarButton = ({ active, label, icon: Icon, ...props }) => (
  <button
    type="button"
    aria-pressed={active}
    title={label}
    className={`inline-flex h-10 w-10 items-center justify-center rounded-md border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
      active
        ? "border-slate-900 bg-slate-900 text-white shadow-sm"
        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
    }`}
    {...props}
  >
    <Icon size={20} weight="bold" />
    <span className="sr-only">{label}</span>
  </button>
);

const BlogEditor = ({ onChange, content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5] },
      }),
      Underline,
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[320px] px-5 py-4 focus:outline-none",
      },
    },
  });

  const canUndo = editor?.can().chain().focus().undo().run() ?? false;
  const canRedo = editor?.can().chain().focus().redo().run() ?? false;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 p-3">
        <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2">
          <ToolbarButton
            icon={TextBIcon}
            label="Bold"
            active={editor?.isActive("bold")}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          />
          <ToolbarButton
            icon={TextItalicIcon}
            label="Italic"
            active={editor?.isActive("italic")}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          />
          <ToolbarButton
            icon={TextUnderlineIcon}
            label="Underline"
            active={editor?.isActive("underline")}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          />
          <ToolbarButton
            icon={TextStrikethroughIcon}
            label="Strikethrough"
            active={editor?.isActive("strike")}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          />
          <ToolbarButton
            icon={TextSubscriptIcon}
            label="Subscript"
            active={editor?.isActive("subscript")}
            onClick={() => editor?.chain().focus().toggleSubscript().run()}
          />
          <ToolbarButton
            icon={TextSuperscriptIcon}
            label="Superscript"
            active={editor?.isActive("superscript")}
            onClick={() => editor?.chain().focus().toggleSuperscript().run()}
          />
        </div>

        <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2">
          <ToolbarButton
            icon={TextHIcon}
            label="Paragraph"
            active={editor?.isActive("paragraph")}
            onClick={() => editor?.chain().focus().setParagraph().run()}
          />
          <ToolbarButton
            icon={TextHOneIcon}
            label="Heading 1"
            active={editor?.isActive("heading", { level: 1 })}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          />
          <ToolbarButton
            icon={TextHTwoIcon}
            label="Heading 2"
            active={editor?.isActive("heading", { level: 2 })}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          />
          <ToolbarButton
            icon={TextHThreeIcon}
            label="Heading 3"
            active={editor?.isActive("heading", { level: 3 })}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          />
          <ToolbarButton
            icon={TextHFourIcon}
            label="Heading 4"
            active={editor?.isActive("heading", { level: 4 })}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
          />
          <ToolbarButton
            icon={TextHFiveIcon}
            label="Heading 5"
            active={editor?.isActive("heading", { level: 5 })}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}
          />
        </div>

        <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2">
          <ToolbarButton
            icon={ListBulletsIcon}
            label="Bullet list"
            active={editor?.isActive("bulletList")}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          />
          <ToolbarButton
            icon={ListNumbersIcon}
            label="Numbered list"
            active={editor?.isActive("orderedList")}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          />
        </div>

        <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2">
          <ToolbarButton
            icon={TextAlignLeftIcon}
            label="Align left"
            active={editor?.isActive({ textAlign: "left" })}
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          />
          <ToolbarButton
            icon={TextAlignCenterIcon}
            label="Align center"
            active={editor?.isActive({ textAlign: "center" })}
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          />
          <ToolbarButton
            icon={TextAlignRightIcon}
            label="Align right"
            active={editor?.isActive({ textAlign: "right" })}
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          />
          <ToolbarButton
            icon={TextAlignJustifyIcon}
            label="Justify"
            active={editor?.isActive({ textAlign: "justify" })}
            onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
          />
        </div>

        <div className="ml-auto flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2">
          <button
            type="button"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canUndo}
            onClick={() => editor?.chain().focus().undo().run()}
          >
            Undo
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canRedo}
            onClick={() => editor?.chain().focus().redo().run()}
          >
            Redo
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}
          >
            Clear
          </button>
        </div>
      </div>

      {/* The actual text area */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;