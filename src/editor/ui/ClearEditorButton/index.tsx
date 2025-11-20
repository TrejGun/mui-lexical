import React, { FC } from "react";

import { IToolbarComponentProps } from "../../../common";
import { Trash3Icon } from "../../images/icons";

interface IClearButtonProp extends Omit<IToolbarComponentProps, "activeEditor"> {
  onClick: () => void;
}

export const ClearEditorButton: FC<IClearButtonProp> = ({ onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={"toolbar-item spaced"}
      title="Clear all editor"
      type="button"
      aria-label="Clear all editor"
    >
      <Trash3Icon />
    </button>
  );
};
