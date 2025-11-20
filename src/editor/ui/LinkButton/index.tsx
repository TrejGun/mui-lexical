import React, { FC } from "react";

import { SHORTCUTS } from "../../plugins/ShortcutsPlugin/shortcuts";
import { IToolbarComponentProps } from "../../../common";
import { LinkIcon } from "../../images/icons";

interface ILinkButtonProps extends Omit<IToolbarComponentProps, "activeEditor"> {
  isLink: boolean;
  insertLink: () => void;
}

export const LinkButton: FC<ILinkButtonProps> = ({ insertLink, isLink, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={insertLink}
      className={"toolbar-item spaced " + (isLink ? "active" : "")}
      aria-label="Insert link"
      title={`Insert link (${SHORTCUTS.INSERT_LINK})`}
      type="button"
    >
      <LinkIcon />
    </button>
  );
};
