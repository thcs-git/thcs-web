
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
};


const ButtonComponent = styled(Button)`
  ${(props: IButtonProps)  => background[props.background || 'var(--primary)']}
`;

export default ButtonComponent;
