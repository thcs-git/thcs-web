import { HTMLProps } from 'react';
import styled, { css, StyledComponent, StyledComponentProps } from 'styled-components';
import TextField from '@material-ui/core/TextField';

const DatePicker = styled(TextField).attrs({
  type: 'date',
  variant: "outlined",
  size: "small"
})`
  background: var(--white);
`;

export default DatePicker;
