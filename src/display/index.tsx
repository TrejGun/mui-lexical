import React, { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";

import { playgroundEditorTheme } from "../editor/themes/playgroundEditorTheme";
import { PlaygroundNodes } from "../editor/nodes";
import { StyledEditorWrapper } from "./styled";

export interface IDisplayProps {
  data?: string;
  onError?: (error: Error) => void;
  disableClickableLinks?: boolean;
}

function LoadContentPlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (content) {
      try {
        const editorState = editor.parseEditorState(content);
        editor.setEditorState(editorState);
      } catch (error) {
        console.error("Failed to parse editor state:", error);
      }
    }
  }, [content, editor]);

  return null;
}

export const Display = (props: IDisplayProps) => {
  const { data = "", onError, disableClickableLinks = false } = props;

  const initialConfig = {
    namespace: "Display",
    theme: playgroundEditorTheme,
    nodes: [...PlaygroundNodes],
    editable: false,
    onError: (error: Error) => {
      console.error(error);
      if (onError) {
        onError(error);
      }
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <StyledEditorWrapper>
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </StyledEditorWrapper>
      <LoadContentPlugin content={data} />
      <ClickableLinkPlugin disabled={disableClickableLinks} />
    </LexicalComposer>
  );
};
