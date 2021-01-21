import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import {
  FormControl
} from '@material-ui/core';

import { TextField, OutlinedInput, Button } from '@material-ui/core';

export const ButtonsContent = styled.div`
  display: flex;
  justify-content: flex-end;

  padding-bottom: 70px;

  button {
    width: 95px;
  }

  & > button:first-child {
    margin-right: 10px;
  }
`;

export const BoxCustom = styled(Box)`
  height: calc(100vh - 117px);
  margin-bottom: 40px;
`;


export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;


`;

export const FormGroupSection = styled.div`
  margin-bottom: 40px;
`;

export const FormContent = styled.div``;

export const InputFiled = styled(TextField)`
  padding: 0 12px 12px 0;

  input {
    background: var(--white);
  }
`;

export const OutlinedInputFiled = styled(OutlinedInput)`
  background: var(--white);
`;

export const ButtonDefeault = styled(Button)`
  background: var(--white);
  border: 1px solid var(--primary);
  color: var(--primary);

  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    background: var(--gray-light);
  }
`;

export const ButtonPrimary = styled(Button)`
  background: var(--primary);
  border: 1px solid var(--primary);
  color: var(--white);

  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    background: var(--secondary);
  }
`;

export const FormControlCustom = styled(FormControl)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

`;

export const TabCustom = styled(Tabs)`
  background: #F2F2F2 !important;
  box-shadow: 1px 1px 3px #00000029;

  button.Mui-selected {
    color: var(--secondary) !important;
  }

  span.PrivateTabIndicator-colorPrimary-10 {
    background-color: var(--secondary) !important;
  }
`;
