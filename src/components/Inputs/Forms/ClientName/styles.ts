import styled from 'styled-components';

import {FormControl, TextField} from "@material-ui/core";


export const FormGroupSection = styled(FormControl)`
  display: block;

`;

export const InputFiled = styled(TextField)`
  padding: 0 12px 12px 0;
  &:focus {
        background: #fff;

        border: 1px solid var(--primary-hover);
      };
  input {
    background: var(--white);
  }
`;
