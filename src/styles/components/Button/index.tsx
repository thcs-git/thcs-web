import { HTMLProps } from 'react';
import styled, { css, StyledComponent, StyledComponentProps } from 'styled-components';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { ButtonTypes } from './types';

interface IButtonProps {
  background?: string;
}

const background: any = {
  default: css`
    background: #7289da;
    &:hover {
      background: #5f73bc;
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
};

const ButtonComponent = styled(Button)`
  ${(props: IButtonProps)  => background[props.background || 'var(--primary)']}

  padding: 10px 0;
  text-transform: capitalize;
`;

export default ButtonComponent;
