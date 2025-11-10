/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from "react";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { css } from "@mui/material";

interface ILexicalContentEditableProps {
  className?: string;
  placeholderClassName?: string;
  placeholder: string;
}

export const LexicalContentEditable = ({
  className,
  placeholder,
  placeholderClassName,
}: ILexicalContentEditableProps): JSX.Element => {
  return (
    <ContentEditable
      className={className ?? "ContentEditable__root"}
      aria-placeholder={placeholder}
      placeholder={<div className={placeholderClassName ?? "ContentEditable__placeholder"}>{placeholder}</div>}
    />
  );
};

export const lexicalContentEditableStyles = css`
  .ContentEditable__root {
    border: 0;
    font-size: 15px;
    display: block;
    position: relative;
    outline: 0;
    padding: 8px 46px 40px;
    min-height: 150px;
  }

  @media (max-width: 1025px) {
    .ContentEditable__root {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  .ContentEditable__placeholder {
    font-size: 15px;
    color: #999;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    top: 8px;
    left: 46px;
    right: 28px;
    user-select: none;
    white-space: nowrap;
    display: inline-block;
    pointer-events: none;
  }

  @media (max-width: 1025px) {
    .ContentEditable__placeholder {
      left: 8px;
      right: 8px;
    }
  }
`;
