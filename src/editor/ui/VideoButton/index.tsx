import React, { FC } from "react";

import { IToolbarComponentProps } from "../../../common";
import { InsertVideoDialog } from "../../plugins";
import { useModal } from "../../hooks";
import { YoutubeIcon } from "../../images/icons";

interface IVideoButtonProps extends Omit<IToolbarComponentProps, "disabled"> {
  showModal: ReturnType<typeof useModal>[1];
}

export const VideoButton: FC<IVideoButtonProps> = ({ activeEditor, showModal }) => {
  return (
    <button
      onClick={() => {
        showModal("Insert Video", onClose => <InsertVideoDialog activeEditor={activeEditor} onClose={onClose} />);
      }}
      className={"toolbar-item spaced"}
      title="Video"
      type="button"
      aria-label="Image"
    >
      <YoutubeIcon />
    </button>
  );
};
