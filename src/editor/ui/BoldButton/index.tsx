import React, { FC } from "react";
import { FORMAT_TEXT_COMMAND } from "lexical";

import { SHORTCUTS } from "../../plugins/ShortcutsPlugin/shortcuts";
import { IToolbarComponentProps } from "../../../common";
import { TypeBoldIcon } from "../../images/icons";

interface IBoldButtonProps extends IToolbarComponentProps {
  isBold: boolean;
}

export const BoldButton: FC<IBoldButtonProps> = ({ activeEditor, isBold, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
      }}
      className={"toolbar-item spaced " + (isBold ? "active" : "")}
      title={`Bold (${SHORTCUTS.BOLD})`}
      type="button"
      aria-label={`Format text as bold. Shortcut: ${SHORTCUTS.BOLD}`}
    >
      <TypeBoldIcon />
    </button>
  );
};
