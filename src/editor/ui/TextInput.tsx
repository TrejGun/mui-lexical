import type { JSX } from "react";
import { HTMLInputTypeAttribute } from "react";
import { css } from "@mui/material";

type Props = Readonly<{
  "data-test-id"?: string;
  label: string;
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
  type?: HTMLInputTypeAttribute;
}>;

export const TextInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  "data-test-id": dataTestId,
  type = "text",
}: Props): JSX.Element => {
  return (
    <div className="Input__wrapper">
      <label className="Input__label">{label}</label>
      <input
        type={type}
        className="Input__input"
        placeholder={placeholder}
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
        data-test-id={dataTestId}
      />
    </div>
  );
};

export const lexicalTextInputStyles = css`
  .Input__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  }

  .Input__label {
    display: flex;
    flex: 1;
    color: #666;
  }

  .Input__input {
    display: flex;
    flex: 2;
    border: 1px solid #999;
    padding: 7px 10px;
    font-size: 16px;
    border-radius: 5px;
    min-width: 0;
  }
`;
