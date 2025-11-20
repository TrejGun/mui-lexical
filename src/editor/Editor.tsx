import { useEffect, useState } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import { CAN_USE_DOM } from "@lexical/utils";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { EditorState } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { SharedHistoryContext, useSharedHistoryContext, ToolbarContext } from "./context";
import {
  CodeActionMenuPlugin,
  CodeHighlightPlugin,
  ComponentPickerMenuPlugin as ComponentPickerPlugin,
  FloatingLinkEditorPlugin,
  FloatingTextFormatToolbarPlugin,
  ImagesPlugin,
  LinkPlugin,
  MarkdownPlugin as MarkdownShortcutPlugin,
  ShortcutsPlugin,
  TableActionMenuPlugin as TableCellActionMenuPlugin,
  TableCellResizerPlugin as TableCellResizer,
  TableHoverActionsPlugin,
  ToolbarPlugin,
  VideoPlugin,
} from "./plugins";
import { LexicalContentEditable as ContentEditable } from "./ui/ContentEditable";
import { PlaygroundNodes } from "./nodes";
import { playgroundEditorTheme } from "./themes/playgroundEditorTheme";
import { IToolbarControls } from "./types";

type TEditorContentProps = Omit<IEditorProps, "initialEditorState" | "readOnly">;

const EditorContent = (props: TEditorContentProps) => {
  const {
    autoFocus,
    placeholder = "Enter some rich text...",
    hideToolbar = false,
    toolbarPlacement = "top",
    controls,
    onStateChange,
    onTextChange,
    onBlur,
    onFocus,
  } = props;
  const { historyState } = useSharedHistoryContext();
  const isEditable = useLexicalEditable();
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      if (onStateChange) {
        onStateChange(editorState);
      }

      if (onTextChange) {
        const textContent = editorState.read(() => {
          const root = editorState._nodeMap.get("root");
          return root ? root.getTextContent() : "";
        });
        onTextChange(textContent);
      }
    });
  };

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport = CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <SharedHistoryContext>
      <ToolbarContext>
        <div className="editor-container">
          {!hideToolbar && toolbarPlacement === "top" && (
            <ToolbarPlugin
              editor={editor}
              activeEditor={activeEditor}
              controls={controls}
              setActiveEditor={setActiveEditor}
              setIsLinkEditMode={setIsLinkEditMode}
            />
          )}
          <ShortcutsPlugin editor={activeEditor} setIsLinkEditMode={setIsLinkEditMode} />
          <AutoFocusPlugin />
          <ClearEditorPlugin />
          <ComponentPickerPlugin />
          <HistoryPlugin externalHistoryState={historyState} />
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" ref={onRef}>
                  <ContentEditable placeholder={placeholder} autoFocus={autoFocus} onBlur={onBlur} onFocus={onFocus} />
                </div>
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MarkdownShortcutPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <TablePlugin hasCellMerge={false} hasCellBackgroundColor={false} hasHorizontalScroll={true} />
          <TableCellResizer />
          <ImagesPlugin />
          <VideoPlugin />
          <LinkPlugin />
          <ClickableLinkPlugin disabled={isEditable} />
          <HorizontalRulePlugin />
          <TabIndentationPlugin maxIndent={7} />
          <OnChangePlugin onChange={handleChange} />
          {floatingAnchorElem && (
            <>
              <FloatingLinkEditorPlugin
                anchorElem={floatingAnchorElem}
                isLinkEditMode={isLinkEditMode}
                setIsLinkEditMode={setIsLinkEditMode}
              />
              <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
            </>
          )}
          {floatingAnchorElem && !isSmallWidthViewport && (
            <>
              <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
              <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
              <FloatingTextFormatToolbarPlugin
                anchorElem={floatingAnchorElem}
                setIsLinkEditMode={setIsLinkEditMode}
                controls={controls?.textFormat}
              />
            </>
          )}

          {!hideToolbar && toolbarPlacement === "bottom" && (
            <ToolbarPlugin
              editor={editor}
              activeEditor={activeEditor}
              controls={controls}
              setActiveEditor={setActiveEditor}
              setIsLinkEditMode={setIsLinkEditMode}
            />
          )}
        </div>
      </ToolbarContext>
    </SharedHistoryContext>
  );
};

export interface IEditorProps {
  initialEditorState?: string;
  placeholder?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  hideToolbar?: boolean;
  controls?: IToolbarControls;
  toolbarPlacement?: "top" | "bottom";
  onStateChange?: (state: EditorState) => void;
  onTextChange?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const Editor = (props: IEditorProps) => {
  const { initialEditorState, readOnly, ...restProps } = props;
  return (
    <LexicalComposer
      initialConfig={{
        editorState: initialEditorState || null,
        editable: !readOnly,
        namespace: "Playground",
        nodes: [...PlaygroundNodes],
        onError: (error: Error) => {
          throw error;
        },
        theme: playgroundEditorTheme,
      }}
    >
      <EditorContent {...restProps} />
    </LexicalComposer>
  );
};
