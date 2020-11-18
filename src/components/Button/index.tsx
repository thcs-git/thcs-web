
// import { HTMLProps } from 'react';
import styled, { StyledComponent } from 'styled-components';
import Button, { ButtonProps } from '@material-ui/core/Button';

// interface ButtonInterface extends ButtonProps {
//   size?: string
//   color?: string
// };

const ButtonComponent = styled(Button)`
  /* line-height: 1.5;
  margin-bottom: 8px;
  max-width: 19rem;
  display: block; */
  color: ${(props) => props.color || 'rgb(118, 118, 118)'};
  width: ${(props) => props.size || '18px'};
`;

export default ButtonComponent;
