import { ReactElement } from "react";
import { CODE_LANGUAGE_FRIENDLY_NAME_MAP } from "@lexical/code";

import { blockTypeToBlockName } from "../context";

export type TToolbarHistoryControl = "undo" | "redo";
export type TToolbarBlockFormatControl = keyof typeof blockTypeToBlockName;
export type TToolbarCodeLanguagesControl = keyof typeof CODE_LANGUAGE_FRIENDLY_NAME_MAP;
export type TToolbarControl = TToolbarHistoryControl | "blockFormat" | "codeLanguages";

export interface IToolbarControls {
  history?: Array<TToolbarHistoryControl>;
  blockFormat?: Array<TToolbarBlockFormatControl>;
  codeLanguages?: Array<TToolbarCodeLanguagesControl>;
}

export type IControlsMap = Record<TToolbarControl, ReactElement>;
