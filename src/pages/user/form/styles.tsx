import styled from "styled-components";
import { TextField, OutlinedInput, Button, FormControl } from "@mui/material";

export const ButtonsContent = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-bottom: 20px;

  & > button:not(:last-child) {
    margin-right: 10px;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: calc(100vh - 96px);
`;
export const DivideTitle = styled.h3`
  color: var(--primary);
  margin-bottom: 20px;
`;

export const FormGroupSection = styled(FormControl)`
  margin-bottom: 20px;
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

export const ChipList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 20px;
`;
