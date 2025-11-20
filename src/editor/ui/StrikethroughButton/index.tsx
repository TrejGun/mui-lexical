import React, { FC } from "react";
import { FORMAT_TEXT_COMMAND } from "lexical";

import { SHORTCUTS } from "../../plugins/ShortcutsPlugin/shortcuts";
import { IToolbarComponentProps } from "../../../common";
import { TypeStrikethroughIcon } from "../../images/icons";

interface IStrikethroughButtonProps extends IToolbarComponentProps {
  isStrikethrough: boolean;
}

export const StrikethroughButton: FC<IStrikethroughButtonProps> = ({ activeEditor, isStrikethrough, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
      }}
      className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
      title={`Italic (${SHORTCUTS.STRIKETHROUGH})`}
      type="button"
      aria-label={`Format text as italics. Shortcut: ${SHORTCUTS.STRIKETHROUGH}`}
    >
      <TypeStrikethroughIcon />
    </button>
  );
};
