import React, { FC } from "react";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";

import { IToolbarComponentProps } from "../../../common";
import { HorizontalRuleIcon } from "../../images/icons";

export const HorizontalRuleButton: FC<IToolbarComponentProps> = ({ activeEditor }) => {
  return (
    <button
      onClick={() => {
        activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
      }}
      className={"toolbar-item spaced"}
      title="Horizontal Rule"
      type="button"
      aria-label="Horizontal Rule"
    >
      <HorizontalRuleIcon />
    </button>
  );
};
