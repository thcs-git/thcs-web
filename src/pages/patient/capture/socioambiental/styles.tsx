import styled from 'styled-components';
import { TextField, OutlinedInput, Button, Stepper, Step } from '@material-ui/core';

export const ButtonsContent = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 20px;
  margin-bottom: 20px;

  button:not(:last-child) {
    margin-right: 10px;
  }
`;

export const FormContent = styled.div`
  height: 100%;
  overflow-x: hidden;

  margin-bottom: 50px;
`;
