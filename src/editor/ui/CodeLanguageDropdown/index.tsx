import React from "react";
import { CODE_LANGUAGE_FRIENDLY_NAME_MAP, getLanguageFriendlyName } from "@lexical/code";

import { DropDown, DropDownItem } from "../DropDown";
import { dropDownActiveClass } from "../../utils/dropDownActiveClass";
import { ToolbarState } from "../../context";

function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options.push([lang, friendlyName]);
  }

  return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

interface ICodeLanguageDropdownProps {
  toolbarState: ToolbarState;
  onCodeLanguageSelect: (value: string) => void;
  disabled?: boolean;
}

export const CodeLanguageDropdown = ({ disabled, toolbarState, onCodeLanguageSelect }: ICodeLanguageDropdownProps) => {
  return (
    <DropDown
      disabled={disabled}
      buttonClassName="toolbar-item code-language"
      buttonLabel={getLanguageFriendlyName(toolbarState.codeLanguage)}
      buttonAriaLabel="Select language"
    >
      {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
        return (
          <DropDownItem
            className={`item ${dropDownActiveClass(value === toolbarState.codeLanguage)}`}
            onClick={() => onCodeLanguageSelect(value)}
            key={value}
          >
            <span className="text">{name}</span>
          </DropDownItem>
        );
      })}
    </DropDown>
  );
};
