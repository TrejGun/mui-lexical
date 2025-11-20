import React, { FC } from "react";
import { FORMAT_ELEMENT_COMMAND } from "lexical";

import { SHORTCUTS } from "../../plugins/ShortcutsPlugin/shortcuts";
import { IToolbarComponentProps } from "../../../common";
import { TextCenterIcon } from "../../images/icons";

interface ICenterAlignButtonProps extends IToolbarComponentProps {
  isCenterAlign: boolean;
}

export const CenterAlignButton: FC<ICenterAlignButtonProps> = ({ activeEditor, isCenterAlign, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
      }}
      className={"toolbar-item spaced " + (isCenterAlign ? "active" : "")}
      title={`Center Align (${SHORTCUTS.CENTER_ALIGN})`}
      type="button"
      aria-label={`Format text as center align. Shortcut: ${SHORTCUTS.CENTER_ALIGN}`}
    >
      <TextCenterIcon />
    </button>
  );
};
