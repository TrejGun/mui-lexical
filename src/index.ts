import {
  codeActionMenuPluginStyles,
  floatLinkEditorPluginStyles,
  floatTextFormatToolbarPluginStyles,
  tableCellResizerPluginStyles,
} from "./editor/plugins";
import { playgroundEditorThemeStyles } from "./editor/themes";
import { editorStyles } from "./editor/editorStyles";
import { componentsStyles } from "./editor/ui";

export const muiLexicalStyles = [
  ...componentsStyles,
  editorStyles,
  codeActionMenuPluginStyles,
  floatLinkEditorPluginStyles,
  floatTextFormatToolbarPluginStyles,
  tableCellResizerPluginStyles,
  playgroundEditorThemeStyles,
];
