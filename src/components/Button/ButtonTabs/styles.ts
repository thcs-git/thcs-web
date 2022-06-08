import styled, { css } from "styled-components";
import Button, { ButtonProps } from "@mui/material/Button";

export const ButtonsContent = styled.div`
  display: flex;
  justify-content: flex-end;

  margin: 20px 0;

  button:nth-child(2) {
    margin-left: 10px;
  }
`;

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
  secondary: css`
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

export const ButtonComponent = styled(Button)`
  ${(props: IButtonProps) => background[props.background || "var(--primary)"]}
  ${(props: IButtonProps) => (props.center ? "text-align: center;" : null)}
  /* ${(props: IButtonProps) =>
    props.variant === "outlined"
      ? `background: transparent !important; color: ${
          `var(--${props.background});` || "var(--primary) ;"
        }`
      : null} */

  min-width: 95px;
  max-height: 36px;
  text-transform: capitalize;
  cursor: pointer;
  span {
    cursor: pointer;
  }
  & svg {
    /* margin-right: 10px; */

    &.primary {
      color: var(--primary);
    }
  }
`;
