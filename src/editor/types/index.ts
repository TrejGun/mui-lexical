import { ReactElement } from "react";
import { CODE_LANGUAGE_FRIENDLY_NAME_MAP } from "@lexical/code";

import { blockTypeToBlockName } from "../context";

export type TToolbarHistoryControl = "undo" | "redo";
export type TToolbarTextFormatControl =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "code"
  | "link"
  | "leftAlign"
  | "centerAlign"
  | "rightAlign";
export type TToolbarViewFormatControl = "horizontal" | "image" | "video" | "table";
export type TToolbarClearControl = "formatting" | "editor";
export type TToolbarBlockFormatControl = keyof typeof blockTypeToBlockName;
export type TToolbarCodeLanguagesControl = keyof typeof CODE_LANGUAGE_FRIENDLY_NAME_MAP;
export type TToolbarControl =
  | TToolbarHistoryControl
  | TToolbarTextFormatControl
  | TToolbarViewFormatControl
  | TToolbarClearControl
  | "blockFormat"
  | "codeLanguages";

export interface IToolbarControls {
  history?: Array<TToolbarHistoryControl>;
  textFormat?: Array<TToolbarTextFormatControl>;
  blockFormat?: Array<TToolbarBlockFormatControl>;
  viewFormat?: Array<TToolbarViewFormatControl>;
  codeLanguages?: Array<TToolbarCodeLanguagesControl>;
  clear?: Array<TToolbarClearControl>;
}

export type IControlsMap = Record<TToolbarControl, ReactElement>;
