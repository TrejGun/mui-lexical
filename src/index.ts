import {
  codeActionMenuPluginStyles,
  floatLinkEditorPluginStyles,
  floatTextFormatToolbarPluginStyles,
  tableCellResizerPluginStyles,
} from "./editor/plugins";
import { playgroundEditorThemeStyles } from "./editor/themes";
import { editorStyles } from "./editor/editorStyles";
import { componentsStyles } from "./editor/ui";
import { imageNodeStyles, videoNodeStyles, inlineImageNodeStyles } from "./editor/nodes";

export * from "./editor";
export * from "./display";
export const muiLexicalStyles = [
  ...componentsStyles,
  editorStyles,
  imageNodeStyles,
  inlineImageNodeStyles,
  codeActionMenuPluginStyles,
  floatLinkEditorPluginStyles,
  floatTextFormatToolbarPluginStyles,
  tableCellResizerPluginStyles,
  playgroundEditorThemeStyles,
  videoNodeStyles,
];
