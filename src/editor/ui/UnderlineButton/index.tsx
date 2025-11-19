import React, { FC } from "react";
import { FORMAT_TEXT_COMMAND } from "lexical";

import { SHORTCUTS } from "../../plugins/ShortcutsPlugin/shortcuts";
import { IToolbarComponentProps } from "../../../common";
import { ToolbarState } from "../../context";
import { TypeUnderlineIcon } from "../../images/icons";

interface IUnderlineButtonProps extends IToolbarComponentProps {
  toolbarState: ToolbarState;
}

export const UnderlineButton: FC<IUnderlineButtonProps> = ({ activeEditor, toolbarState, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
      }}
      className={"toolbar-item spaced " + (toolbarState.isUnderline ? "active" : "")}
      title={`Italic (${SHORTCUTS.UNDERLINE})`}
      type="button"
      aria-label={`Format text as italics. Shortcut: ${SHORTCUTS.UNDERLINE}`}
    >
      <TypeUnderlineIcon />
    </button>
  );
};
