/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from "react";
import { Dispatch, useCallback, useEffect, useState } from "react";
import {
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { $isHeadingNode } from "@lexical/rich-text";
import { $isParentElementRTL } from "@lexical/selection";
import { $isTableNode, $isTableSelection } from "@lexical/table";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  $isEditorIsNestedEditor,
  IS_APPLE,
  mergeRegister,
} from "@lexical/utils";
import {
  $getNodeByKey,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  NodeKey,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import CodeIcon from "@mui/icons-material/Code";

import { blockTypeToBlockName, useToolbarState } from "../../context";
import { useModal } from "../../hooks";
import { BlockFormatDropDown, DropDown, DropDownItem, RedoButton, UndoButton } from "../../ui";
import { getSelectedNode } from "../../utils/getSelectedNode";
import { sanitizeUrl } from "../../utils/url";
import { InsertImageDialog } from "../ImagesPlugin";
import { SHORTCUTS } from "../ShortcutsPlugin/shortcuts";
import { InsertTableDialog } from "../TablePlugin";
import {
  clearFormatting,
  formatBulletList,
  formatCheckList,
  formatCode,
  formatHeading,
  formatNumberedList,
  formatParagraph,
  formatQuote,
} from "./utils";
import { InsertVideoDialog } from "../VideoPlugin";
import { dropDownActiveClass } from "../../utils/dropDownActiveClass";

function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options.push([lang, friendlyName]);
  }

  return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

function Divider(): JSX.Element {
  return <div className="divider" />;
}

export const ToolbarPlugin = ({
  editor,
  activeEditor,
  setActiveEditor,
  setIsLinkEditMode,
}: {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<LexicalEditor>;
  setIsLinkEditMode: Dispatch<boolean>;
}): JSX.Element => {
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
  const [modal, showModal] = useModal();
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const { toolbarState, updateToolbarState } = useToolbarState();

  const $updateToolbar = useCallback(() => {
    activeEditor.read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
          const rootElement = activeEditor.getRootElement();
          updateToolbarState(
            "isImageCaption",
            !!rootElement?.parentElement?.classList.contains("image-caption-container"),
          );
        } else {
          updateToolbarState("isImageCaption", false);
        }

        const anchorNode = selection.anchor.getNode();
        let element =
          anchorNode.getKey() === "root"
            ? anchorNode
            : $findMatchingParent(anchorNode, e => {
                const parent = e.getParent();
                return parent !== null && $isRootOrShadowRoot(parent);
              });

        if (element === null) {
          element = anchorNode.getTopLevelElementOrThrow();
        }

        const elementKey = element.getKey();
        const elementDOM = activeEditor.getElementByKey(elementKey);

        updateToolbarState("isRTL", $isParentElementRTL(selection));

        // Update links
        const node = getSelectedNode(selection);
        const parent = node.getParent();
        const isLink = $isLinkNode(parent) || $isLinkNode(node);
        updateToolbarState("isLink", isLink);

        const tableNode = $findMatchingParent(node, $isTableNode);
        if ($isTableNode(tableNode)) {
          updateToolbarState("rootType", "table");
        } else {
          updateToolbarState("rootType", "root");
        }

        if (elementDOM !== null) {
          setSelectedElementKey(elementKey);
          if ($isListNode(element)) {
            const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
            const type = parentList ? parentList.getListType() : element.getListType();

            updateToolbarState("blockType", type);
          } else {
            const type = $isHeadingNode(element) ? element.getTag() : element.getType();
            if (type in blockTypeToBlockName) {
              updateToolbarState("blockType", type as keyof typeof blockTypeToBlockName);
            }
            if ($isCodeNode(element)) {
              const language = element.getLanguage()!;
              updateToolbarState("codeLanguage", language ? CODE_LANGUAGE_MAP[language] || language : "");
              return;
            }
          }
        }
        let matchingParent;
        if ($isLinkNode(parent)) {
          // If node is a link, we need to fetch the parent paragraph node to set format
          matchingParent = $findMatchingParent(
            node,
            parentNode => $isElementNode(parentNode) && !parentNode.isInline(),
          );
        }

        // If matchingParent is a valid node, pass it's format type
        updateToolbarState(
          "elementFormat",
          $isElementNode(matchingParent)
            ? matchingParent.getFormatType()
            : $isElementNode(node)
              ? node.getFormatType()
              : parent?.getFormatType() || "left",
        );
      }
      if ($isRangeSelection(selection) || $isTableSelection(selection)) {
        // Update text format
        updateToolbarState("isBold", selection.hasFormat("bold"));
        updateToolbarState("isItalic", selection.hasFormat("italic"));
        updateToolbarState("isUnderline", selection.hasFormat("underline"));
        updateToolbarState("isStrikethrough", selection.hasFormat("strikethrough"));
        updateToolbarState("isHighlight", selection.hasFormat("highlight"));
        updateToolbarState("isCode", selection.hasFormat("code"));
      }
    });
  }, [activeEditor, editor, updateToolbarState]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, $updateToolbar, setActiveEditor]);

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      $updateToolbar();
    });
  }, [activeEditor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener(editable => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        payload => {
          updateToolbarState("canUndo", payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        payload => {
          updateToolbarState("canRedo", payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [$updateToolbar, activeEditor, editor, updateToolbarState]);

  const insertLink = useCallback(() => {
    if (!toolbarState.isLink) {
      setIsLinkEditMode(true);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      setIsLinkEditMode(false);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [activeEditor, setIsLinkEditMode, toolbarState.isLink]);

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey],
  );

  const canViewerSeeInsertDropdown = !toolbarState.isImageCaption;
  const canViewerSeeInsertCodeButton = !toolbarState.isImageCaption;

  return (
    <div className="toolbar">
      <UndoButton disabled={!toolbarState.canUndo || !isEditable} activeEditor={activeEditor} />
      <RedoButton disabled={!toolbarState.canRedo || !isEditable} activeEditor={activeEditor} />

      <Divider />
      {toolbarState.blockType in blockTypeToBlockName && activeEditor === editor && (
        <BlockFormatDropDown disabled={!isEditable} blockType={toolbarState.blockType} editor={activeEditor} />
      )}
      <Divider />
      {toolbarState.blockType === "code" ? (
        <DropDown
          disabled={!isEditable}
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
      ) : (
        <>
          <button
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            }}
            className={"toolbar-item spaced " + (toolbarState.isBold ? "active" : "")}
            title={`Bold (${SHORTCUTS.BOLD})`}
            type="button"
            aria-label={`Format text as bold. Shortcut: ${SHORTCUTS.BOLD}`}
          >
            <i className="format bold" />
          </button>
          <button
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            }}
            className={"toolbar-item spaced " + (toolbarState.isItalic ? "active" : "")}
            title={`Italic (${SHORTCUTS.ITALIC})`}
            type="button"
            aria-label={`Format text as italics. Shortcut: ${SHORTCUTS.ITALIC}`}
          >
            <i className="format italic" />
          </button>
          <button
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            }}
            className={"toolbar-item spaced " + (toolbarState.isUnderline ? "active" : "")}
            title={`Underline (${SHORTCUTS.UNDERLINE})`}
            type="button"
            aria-label={`Format text to underlined. Shortcut: ${SHORTCUTS.UNDERLINE}`}
          >
            <i className="format underline" />
          </button>
          <button
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
            }}
            className={"toolbar-item spaced " + (toolbarState.isStrikethrough ? "active" : "")}
            title={`Strikethrough (${SHORTCUTS.STRIKETHROUGH})`}
            type="button"
            aria-label={`Format text to strikethrough. Shortcut: ${SHORTCUTS.STRIKETHROUGH}`}
          >
            <i className="format strikethrough" />
          </button>
          <button
            disabled={!isEditable}
            onClick={() => clearFormatting(activeEditor)}
            className={"toolbar-item spaced"}
            title="Clear text formatting"
            type="button"
            aria-label="Clear all text formatting"
          >
            <i className="format clear" />
          </button>
          {canViewerSeeInsertCodeButton && (
            <button
              disabled={!isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
              }}
              className={"toolbar-item spaced " + (toolbarState.isCode ? "active" : "")}
              title={`Insert code block (${SHORTCUTS.INSERT_CODE_BLOCK})`}
              type="button"
              aria-label="Insert code block"
            >
              <CodeIcon />
            </button>
          )}
          <button
            disabled={!isEditable}
            onClick={insertLink}
            className={"toolbar-item spaced " + (toolbarState.isLink ? "active" : "")}
            aria-label="Insert link"
            title={`Insert link (${SHORTCUTS.INSERT_LINK})`}
            type="button"
          >
            <i className="format link" />
          </button>
          {canViewerSeeInsertDropdown && (
            <>
              <Divider />
              <button
                onClick={() => {
                  activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
                }}
                className={"toolbar-item spaced"}
                title="Horizontal Rule"
                type="button"
                aria-label="Horizontal Rule"
              >
                <i className="format horizontal-rule" />
              </button>
              <button
                onClick={() => {
                  showModal("Insert Image", onClose => (
                    <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
                  ));
                }}
                className={"toolbar-item spaced"}
                title="Image"
                type="button"
                aria-label="Image"
              >
                <i className="format image" />
              </button>
              <button
                onClick={() => {
                  showModal("Insert Video", onClose => (
                    <InsertVideoDialog activeEditor={activeEditor} onClose={onClose} />
                  ));
                }}
                className={"toolbar-item spaced"}
                title="Video"
                type="button"
                aria-label="Image"
              >
                <i className="format video" />
              </button>
              <button
                onClick={() => {
                  showModal("Insert Table", onClose => (
                    <InsertTableDialog activeEditor={activeEditor} onClose={onClose} />
                  ));
                }}
                className={"toolbar-item spaced"}
                title="Table"
                type="button"
                aria-label="Table"
              >
                <i className="format table" />
              </button>
            </>
          )}
        </>
      )}

      {modal}
    </div>
  );
};
