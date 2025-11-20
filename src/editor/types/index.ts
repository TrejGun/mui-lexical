import { ReactElement } from "react";
import { CODE_LANGUAGE_FRIENDLY_NAME_MAP } from "@lexical/code";

import { blockTypeToBlockName } from "../context";

export type TToolbarHistoryControl = "undo" | "redo";
export type TToolbarTextFormattingControl =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "code"
  | "link"
  | "leftAlign"
  | "centerAlign"
  | "rightAlign";
export type TToolbarBlockFormatControl = keyof typeof blockTypeToBlockName;
export type TToolbarCodeLanguagesControl = keyof typeof CODE_LANGUAGE_FRIENDLY_NAME_MAP;
export type TToolbarControl =
  | TToolbarHistoryControl
  | TToolbarTextFormattingControl
  | "blockFormat"
  | "codeLanguages"
  | "clear";

export interface IToolbarControls {
  history?: Array<TToolbarHistoryControl>;
  textFormat?: Array<TToolbarTextFormattingControl>;
  blockFormat?: Array<TToolbarBlockFormatControl>;
  codeLanguages?: Array<TToolbarCodeLanguagesControl>;
  clear?: ["clear"];
}

export type IControlsMap = Record<TToolbarControl, ReactElement>;
