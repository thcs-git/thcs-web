import { HTMLProps } from "react";
import styled, {
  css,
  StyledComponent,
  StyledComponentProps,
} from "styled-components";
import Button, { ButtonProps } from "@mui/material/Button";
import { ButtonTypes } from "./types";

interface IButtonProps extends ButtonProps {
  background?: string;
  center?: boolean;
}

const background: any = {
  default: css`
    background: var(--white);
    border: 1px solid var(--primary);
    color: var(--primary);

    text-transform: capitalize;
    font-weight: 600;
    font-size: 14px;

    &:hover {
      background: var(--gray-light);
    }
  `,
  danger: css`
    background: #e04848;
    color: var(--white);
    &:hover {
      background: #a43d3d;
    }
  `,
  gray: css`
    background: #b9bbbe;
    color: #666;
    &:hover {
      background: #999;
    }
  `,
  success: css`
    background: var(--success);
    border-color: var(--success);
    color: var(--white);
    &:hover {
      background: var(--success-hover);
    }
  `,
  success_rounded: css`
    background: var(--white);
    color: var(--success);
    border: 1px solid var(--success);
  `,
  primary: css`
    background: var(--primary);
    color: var(--white);
    &:hover {
      background: var(--primary-hover);
    }
  `,
  disable: css`
    background: var(--disable) !important;
    color: #adadad67 !important;
    &:hover {
      background: var(--disable) !important;
    }
  `,
};

const size: any = {
  sm: css`
    padding: 3px;
  `,
  md: css`
    padding: 5px;
  `,
  lg: css`
    padding: 10px;
  `,
};

const ButtonComponent = styled(Button)`
  ${(props: IButtonProps) => background[props.background || "var(--primary)"]}
  ${(props: IButtonProps) => (props.center ? "text-align: center;" : null)}
  ${(props: IButtonProps) =>
    props.variant === "outlined"
      ? `background: transparent !important; color: var(--black); color: ${
          `var(--${props.background});` || "var(--primary);"
        }`
      : null}

  cursor:pointer;
  min-width: 95px;
  max-height: 36px;
  text-transform: capitalize;

  & svg {
    /* margin-right: 10px; */

    &.primary {
      color: var(--primary);
    }
  }
  & span {
    cursor: pointer;
  }
`;

export default ButtonComponent;
