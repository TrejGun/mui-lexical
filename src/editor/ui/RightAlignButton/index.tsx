import React, { FC } from "react";
import { FORMAT_ELEMENT_COMMAND } from "lexical";

import { SHORTCUTS } from "../../plugins/ShortcutsPlugin/shortcuts";
import { IToolbarComponentProps } from "../../../common";
import { ToolbarState } from "../../context";
import { TextRightIcon } from "../../images/icons";

interface IRightAlignButtonProps extends IToolbarComponentProps {
  toolbarState: ToolbarState;
}

export const RightAlignButton: FC<IRightAlignButtonProps> = ({ activeEditor, toolbarState, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
      }}
      className={"toolbar-item spaced " + (toolbarState.isRightAlign ? "active" : "")}
      title={`Right Align (${SHORTCUTS.RIGHT_ALIGN})`}
      type="button"
      aria-label={`Format text as right align. Shortcut: ${SHORTCUTS.RIGHT_ALIGN}`}
    >
      <TextRightIcon />
    </button>
  );
};
