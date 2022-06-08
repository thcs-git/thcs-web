import { HTMLProps } from "react";
import styled, {
  css,
  StyledComponent,
  StyledComponentProps,
} from "styled-components";
import TextField from "@mui/material/TextField";

const DatePicker = styled(TextField).attrs({
  type: "date",
  variant: "outlined",
  size: "small",
})`
  background: var(--white);
  padding: 0 12px 12px 0;
`;

export default DatePicker;
