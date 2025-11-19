import { LexicalEditor } from "lexical";
import React, { JSX, useMemo } from "react";

import { blockTypeToBlockName } from "../../context";
import { DropDown, DropDownItem } from "../DropDown";
import {
  formatBulletList,
  formatCheckList,
  formatCode,
  formatHeading,
  formatNumberedList,
  formatParagraph,
  formatQuote,
} from "../../plugins/ToolbarPlugin/utils";
import { SHORTCUTS } from "../../plugins/ShortcutsPlugin/shortcuts";
import { dropDownActiveClass } from "../../utils/dropDownActiveClass";
import {
  ChatSquareQuoteIcon,
  CodeIcon,
  ListOlIcon,
  ListUlIcon,
  SquareCheckIcon,
  TextParagraphIcon,
  TypeH1Icon,
  TypeH2Icon,
  TypeH3Icon,
  TypeH4Icon,
  TypeH5Icon,
  TypeH6Icon,
} from "../../images/icons";

type BlockType = keyof typeof blockTypeToBlockName;

const blockFormatOptions: Array<{
  blockType: BlockType;
  title: string;
  icon: () => JSX.Element;
  shortcut: keyof typeof SHORTCUTS;
}> = [
  { blockType: "paragraph", title: "Normal", icon: TextParagraphIcon, shortcut: "NORMAL" },
  { blockType: "h1", title: "Heading 1", icon: TypeH1Icon, shortcut: "HEADING1" },
  { blockType: "h2", title: "Heading 2", icon: TypeH2Icon, shortcut: "HEADING2" },
  { blockType: "h3", title: "Heading 3", icon: TypeH3Icon, shortcut: "HEADING3" },
  { blockType: "h4", title: "Heading 4", icon: TypeH4Icon, shortcut: "HEADING4" },
  { blockType: "h5", title: "Heading 5", icon: TypeH5Icon, shortcut: "HEADING5" },
  { blockType: "h6", title: "Heading 6", icon: TypeH6Icon, shortcut: "HEADING6" },
  { blockType: "bullet", title: "Bullet List", icon: ListUlIcon, shortcut: "BULLET_LIST" },
  { blockType: "number", title: "Numbered List", icon: ListOlIcon, shortcut: "NUMBERED_LIST" },
  { blockType: "check", title: "Check List", icon: SquareCheckIcon, shortcut: "CHECK_LIST" },
  { blockType: "quote", title: "Quote", icon: ChatSquareQuoteIcon, shortcut: "QUOTE" },
  { blockType: "code", title: "Code Block", icon: CodeIcon, shortcut: "CODE_BLOCK" },
];

export const BlockFormatDropDown = ({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: BlockType;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element => {
  const onClItemClick = useMemo(() => {
    const clickActions: Record<BlockType, () => void> = {
      paragraph: () => formatParagraph(editor),
      h1: () => formatHeading(editor, blockType, "h1"),
      h2: () => formatHeading(editor, blockType, "h2"),
      h3: () => formatHeading(editor, blockType, "h3"),
      h4: () => formatHeading(editor, blockType, "h4"),
      h5: () => formatHeading(editor, blockType, "h5"),
      h6: () => formatHeading(editor, blockType, "h6"),
      bullet: () => formatBulletList(editor, blockType),
      number: () => formatNumberedList(editor, blockType),
      check: () => formatCheckList(editor, blockType),
      quote: () => formatQuote(editor, blockType),
      code: () => formatCode(editor, blockType),
    };
    return clickActions;
  }, [editor]);

  return (
    <DropDown
      disabled={disabled}
      buttonClassName="toolbar-item block-controls"
      buttonIconClassName={"icon block-type " + blockType}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style"
    >
      {blockFormatOptions.map(o => {
        const Icon = o.icon;
        return (
          <DropDownItem
            key={o.blockType}
            className={"item wide " + dropDownActiveClass(blockType === o.blockType)}
            onClick={onClItemClick[o.blockType]}
          >
            <div className="icon-text-container">
              <Icon />
              <span className="text">{o.title}</span>
            </div>
            <span className="shortcut">{SHORTCUTS[o.shortcut]}</span>
          </DropDownItem>
        );
      })}
    </DropDown>
  );
};
