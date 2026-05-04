import { useState, useEffect } from "react";
import {
    ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  BroomIcon,
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
import Heading from "@tiptap/extension-heading";
import { ListItem, OrderedList, BulletList } from "@tiptap/extension-list";

const ToolbarButton = ({ active, label, icon: Icon, ...props }) => (
  <button
    type="button"
    aria-pressed={active}
    title={label}
    onMouseDown={(event) => event.preventDefault()}
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
  const [pressedControl, setPressedControl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading
        bulletList: false, // Disable default bulletList
        orderedList: false, // Disable default orderedList
        listItem: false, // Disable default listItem
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      Underline,
      Subscript,
      BulletList,
      OrderedList,
      ListItem,
      Superscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "<p>Start writing your blog...</p>",
    editable: true,
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

  const setControlAndRun = (controlName, command, checkActive) => {
    // show immediate pressed UI
    setPressedControl(controlName);
    // run the command (synchronous)
    command();

    // determine real active state after command and sync UI
    // run in next microtask to allow tiptap to update
    setTimeout(() => {
      const active = typeof checkActive === "function" ? checkActive() : false;
      if (!active) setPressedControl("");
    }, 0);
  };

  const isPressed = (controlName, editorActive) =>
    pressedControl === controlName || editorActive;

  const getTextAlign = (node = "paragraph") => {
    try {
      return editor?.getAttributes(node)?.textAlign ?? null;
    } catch (e) {
      return null;
    }
  };

  const checkTextAlign = (align) => {
    if (!editor) return false;
    const p = getTextAlign("paragraph");
    const h = getTextAlign("heading");
    return p === align || h === align;
  };

  // Keep pressedControl in sync with editor changes (selection, content)
  useEffect(() => {
    if (!editor) return;

    const clear = () => setPressedControl("");

    editor.on("selectionUpdate", clear);
    editor.on("update", clear);

    return () => {
      editor.off("selectionUpdate", clear);
      editor.off("update", clear);
    };
  }, [editor]);

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [editor, content]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-5 border-b border-slate-200 bg-slate-50 p-3">
        <div className="flex flex-wrap gap-3 rounded-lg border border-slate-200 bg-white p-2">
          <ToolbarButton
            icon={TextBIcon}
            label="Bold"
            active={isPressed("bold", editor?.isActive("bold"))}
            onClick={() =>
              setControlAndRun(
                "bold",
                () => editor?.chain().focus().toggleBold().run(),
                () => editor?.isActive("bold"),
              )
            }
          />
          <ToolbarButton
            icon={TextItalicIcon}
            label="Italic"
            active={isPressed("italic", editor?.isActive("italic"))}
            onClick={() =>
              setControlAndRun(
                "italic",
                () => editor?.chain().focus().toggleItalic().run(),
                () => editor?.isActive("italic"),
              )
            }
          />
          <ToolbarButton
            icon={TextUnderlineIcon}
            label="Underline"
            active={isPressed("underline", editor?.isActive("underline"))}
            onClick={() =>
              setControlAndRun(
                "underline",
                () => editor?.chain().focus().toggleUnderline().run(),
                () => editor?.isActive("underline"),
              )
            }
          />
          <ToolbarButton
            icon={TextStrikethroughIcon}
            label="Strikethrough"
            active={isPressed("strike", editor?.isActive("strike"))}
            onClick={() =>
              setControlAndRun(
                "strike",
                () => editor?.chain().focus().toggleStrike().run(),
                () => editor?.isActive("strike"),
              )
            }
          />
          <ToolbarButton
            icon={TextSubscriptIcon}
            label="Subscript"
            active={isPressed("subscript", editor?.isActive("subscript"))}
            onClick={() =>
              setControlAndRun(
                "subscript",
                () => editor?.chain().focus().toggleSubscript().run(),
                () => editor?.isActive("subscript"),
              )
            }
          />
          <ToolbarButton
            icon={TextSuperscriptIcon}
            label="Superscript"
            active={isPressed("superscript", editor?.isActive("superscript"))}
            onClick={() =>
              setControlAndRun(
                "superscript",
                () => editor?.chain().focus().toggleSuperscript().run(),
                () => editor?.isActive("superscript"),
              )
            }
          />
        </div>

        <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2">
          <ToolbarButton
            icon={TextHIcon}
            label="Paragraph"
            active={isPressed("paragraph", editor?.isActive("paragraph"))}
            onClick={() =>
              setControlAndRun(
                "paragraph",
                () => editor?.chain().focus().setNode("paragraph").run(),
                () => editor?.isActive("paragraph"),
              )
            }
          />
          <ToolbarButton
            icon={TextHOneIcon}
            label="Heading 1"
            active={isPressed(
              "heading-1",
              editor?.isActive("heading", { level: 1 }),
            )}
            onClick={() =>
              setControlAndRun(
                "heading-1",
                () =>
                  editor
                    ?.chain()
                    .focus()
                    .setNode("heading", { level: 1 })
                    .run(),
                () => editor?.isActive("heading", { level: 1 }),
              )
            }
          />
          <ToolbarButton
            icon={TextHTwoIcon}
            label="Heading 2"
            active={isPressed(
              "heading-2",
              editor?.isActive("heading", { level: 2 }),
            )}
            onClick={() =>
              setControlAndRun(
                "heading-2",
                () =>
                  editor
                    ?.chain()
                    .focus()
                    .setNode("heading", { level: 2 })
                    .run(),
                () => editor?.isActive("heading", { level: 2 }),
              )
            }
          />
          <ToolbarButton
            icon={TextHThreeIcon}
            label="Heading 3"
            active={isPressed(
              "heading-3",
              editor?.isActive("heading", { level: 3 }),
            )}
            onClick={() =>
              setControlAndRun(
                "heading-3",
                () =>
                  editor
                    ?.chain()
                    .focus()
                    .setNode("heading", { level: 3 })
                    .run(),
                () => editor?.isActive("heading", { level: 3 }),
              )
            }
          />
          <ToolbarButton
            icon={TextHFourIcon}
            label="Heading 4"
            active={isPressed(
              "heading-4",
              editor?.isActive("heading", { level: 4 }),
            )}
            onClick={() =>
              setControlAndRun(
                "heading-4",
                () =>
                  editor
                    ?.chain()
                    .focus()
                    .setNode("heading", { level: 4 })
                    .run(),
                () => editor?.isActive("heading", { level: 4 }),
              )
            }
          />
          <ToolbarButton
            icon={TextHFiveIcon}
            label="Heading 5"
            active={isPressed(
              "heading-5",
              editor?.isActive("heading", { level: 5 }),
            )}
            onClick={() =>
              setControlAndRun(
                "heading-5",
                () =>
                  editor
                    ?.chain()
                    .focus()
                    .setNode("heading", { level: 5 })
                    .run(),
                () => editor?.isActive("heading", { level: 5 }),
              )
            }
          />
        </div>

        <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2">
          <ToolbarButton
            icon={ListBulletsIcon}
            label="Bullet list"
            active={isPressed("bulletList", editor?.isActive("bulletList"))}
            onClick={() =>
              setControlAndRun(
                "bulletList",
                () => editor?.chain().focus().toggleBulletList().run(),
                () => editor?.isActive("bulletList"),
              )
            }
          />
          <ToolbarButton
            icon={ListNumbersIcon}
            label="Numbered list"
            active={isPressed("orderedList", editor?.isActive("orderedList"))}
            onClick={() =>
              setControlAndRun(
                "orderedList",
                () => editor?.chain().focus().toggleOrderedList().run(),
                () => editor?.isActive("orderedList"),
              )
            }
          />
        </div>

        <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2">
          <ToolbarButton
            icon={TextAlignLeftIcon}
            label="Align left"
            active={isPressed("align-left", checkTextAlign("left"))}
            onClick={() =>
              setControlAndRun(
                "align-left",
                () => editor?.chain().focus().setTextAlign("left").run(),
                () => checkTextAlign("left"),
              )
            }
          />
          <ToolbarButton
            icon={TextAlignCenterIcon}
            label="Align center"
            active={isPressed("align-center", checkTextAlign("center"))}
            onClick={() =>
              setControlAndRun(
                "align-center",
                () => editor?.chain().focus().setTextAlign("center").run(),
                () => checkTextAlign("center"),
              )
            }
          />
          <ToolbarButton
            icon={TextAlignRightIcon}
            label="Align right"
            active={isPressed("align-right", checkTextAlign("right"))}
            onClick={() =>
              setControlAndRun(
                "align-right",
                () => editor?.chain().focus().setTextAlign("right").run(),
                () => checkTextAlign("right"),
              )
            }
          />
          <ToolbarButton
            icon={TextAlignJustifyIcon}
            label="Justify"
            active={isPressed("align-justify", checkTextAlign("justify"))}
            onClick={() =>
              setControlAndRun(
                "align-justify",
                () => editor?.chain().focus().setTextAlign("justify").run(),
                () => checkTextAlign("justify"),
              )
            }
          />
        </div>

        <div className="ml-auto flex flex-wrap gap-4 rounded-lg border border-slate-200 bg-white p-2">
          <button
            type="button"
            className="rounded-md border border-slate-200 p-2 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canUndo}
            onClick={() => editor?.chain().focus().undo().run()}
          >
            <ArrowUUpLeftIcon size={20} />
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-200 p-2 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canRedo}
            onClick={() => editor?.chain().focus().redo().run()}
          >
            <ArrowUUpRightIcon size={20} />
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-200 p-2 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            onClick={() => editor?.commands.setContent("<p>Start writing your blog...</p>")}
          >
            <BroomIcon size={20} />
          </button>
        </div>
      </div>

      {/* The actual text area */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;