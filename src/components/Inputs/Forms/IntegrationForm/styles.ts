import styled from "styled-components";

import { FormControl } from "@material-ui/core";
import TextField from "@mui/material/TextField";

export const FormGroupSection = styled(FormControl)`
  display: block;

  margin-bottom: 30px;

  .Mui-disabled {
    color: var(--black-intense);
  }
`;

export const InputFiled = styled(TextField)`
  /* padding: 0 12px 12px 0; */
  &:focus {
    background: #fff;

    border: 1px solid var(--primary-hover);
  }
  input {
    background: var(--white);
  }
`;
