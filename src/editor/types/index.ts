import { ReactElement } from "react";

import { blockTypeToBlockName } from "../context";

export type TToolbarHistoryControl = "undo" | "redo";
export type TToolbarBlockFormatControl = keyof typeof blockTypeToBlockName;
export type TToolbarControl = TToolbarHistoryControl | "blockFormat";

export interface IToolbarControls {
  history?: Array<TToolbarHistoryControl>;
  blockFormat?: Array<TToolbarBlockFormatControl>;
}

export type IControlsMap = Record<TToolbarControl, ReactElement>;
