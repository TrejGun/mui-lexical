import React, { FC } from "react";
import { UNDO_COMMAND } from "lexical";
import { IS_APPLE } from "@lexical/utils";
import UndoIcon from "@mui/icons-material/Undo";

import { IToolbarComponentProps } from "../../../common";

export const UndoButton: FC<IToolbarComponentProps> = ({ activeEditor, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
      }}
      title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
      type="button"
      className="toolbar-item spaced"
      aria-label="Undo"
    >
      <UndoIcon />
    </button>
  );
};
