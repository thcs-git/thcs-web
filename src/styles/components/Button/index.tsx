import { HTMLProps } from 'react';
import styled, { css } from 'styled-components';
import Button from '@material-ui/core/Button';
import { ButtonTypes } from './types';

const background = {
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
  ${(props) => background['default']}
`;

export default ButtonComponent;
