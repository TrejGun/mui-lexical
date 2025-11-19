import React, { FC } from "react";
import { FORMAT_TEXT_COMMAND } from "lexical";

import { SHORTCUTS } from "../../plugins/ShortcutsPlugin/shortcuts";
import { IToolbarComponentProps } from "../../../common";
import { ToolbarState } from "../../context";
import { TypeItalicIcon } from "../../images/icons";

interface IItalicButtonProps extends IToolbarComponentProps {
  toolbarState: ToolbarState;
}

export const ItalicButton: FC<IItalicButtonProps> = ({ activeEditor, toolbarState, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
      }}
      className={"toolbar-item spaced " + (toolbarState.isItalic ? "active" : "")}
      title={`Italic (${SHORTCUTS.ITALIC})`}
      type="button"
      aria-label={`Format text as italics. Shortcut: ${SHORTCUTS.ITALIC}`}
    >
      <TypeItalicIcon />
    </button>
  );
};
