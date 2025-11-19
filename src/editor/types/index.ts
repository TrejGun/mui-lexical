import { ReactElement } from "react";

export type TToolbarHistoryControl = "undo" | "redo";
export type TToolbarControl = TToolbarHistoryControl;

export interface IToolbarControls {
  history?: Array<TToolbarHistoryControl>;
}

export type IControlsMap = Record<TToolbarControl, ReactElement>;
