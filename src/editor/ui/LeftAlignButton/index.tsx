import React, { FC } from "react";
import { FORMAT_ELEMENT_COMMAND } from "lexical";

import { SHORTCUTS } from "../../plugins/ShortcutsPlugin/shortcuts";
import { IToolbarComponentProps } from "../../../common";
import { TextLeftIcon } from "../../images/icons";

interface ILeftAlignButtonProps extends IToolbarComponentProps {
  isLeftAlign: boolean;
}

export const LeftAlignButton: FC<ILeftAlignButtonProps> = ({ activeEditor, isLeftAlign, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
      }}
      className={"toolbar-item spaced " + (isLeftAlign ? "active" : "")}
      title={`Left Align (${SHORTCUTS.LEFT_ALIGN})`}
      type="button"
      aria-label={`Format text as left align. Shortcut: ${SHORTCUTS.LEFT_ALIGN}`}
    >
      <TextLeftIcon />
    </button>
  );
};
