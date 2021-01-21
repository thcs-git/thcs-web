import { HTMLProps } from 'react';
import styled, { css, StyledComponent, StyledComponentProps } from 'styled-components';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { ButtonTypes } from './types';

interface IButtonProps {
  background?: string;
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
  ${(props: IButtonProps) => background[props.background || 'var(--primary)']}

  min-width: 40px;
  max-height: 40px;
  text-transform: capitalize;
`;

export default ButtonComponent;
