import React, { FC } from "react";

import { IToolbarComponentProps } from "../../../common";
import { clearFormatting } from "../../plugins/ToolbarPlugin/utils";
import { TrashIcon } from "../../images/icons";

export const ClearButton: FC<IToolbarComponentProps> = ({ activeEditor, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => clearFormatting(activeEditor)}
      className={"toolbar-item spaced"}
      title="Clear text formatting"
      type="button"
      aria-label="Clear all text formatting"
    >
      <TrashIcon />
    </button>
  );
};
