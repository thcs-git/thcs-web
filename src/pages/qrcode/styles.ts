import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { TextField, OutlinedInput, Button, Stepper, Step } from '@material-ui/core';
import { ReactComponent as NoData } from '../../assets/img/no-data.svg';

export const ContainerQrCode = styled(Container)``;

export const SearchContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  margin-bottom: 20px;
`;
export const NoDataIcon = styled(NoData)`
  width: 100px;
  height: 100px;

  margin-bottom: 15px;
`;
export const ButtonsContent = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 20px;
  margin-bottom: 20px;

  button:first-child {
    margin-right: 10px;
  }
`;
export const InputFiled = styled(TextField)`
  padding: 0 12px 12px 0;

  input {
    background: var(--white);
  }
`;
export const PatientResume = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 30px;
  background: var(--white);
  border-radius: 8px;
  border: 1px solid #ccc;

  padding: 15px 20px 15px 10px;
  margin-bottom: 15px;
`;

export const PatientResumeContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  .title {
    font-weight: bold;
  }

  .subTitle {
    color: var(--gray-dark);
  }

  .patientIcon {
    padding: 15px;

    svg {
      fill: var(--secondary);
      width: 54px;
      height: 54px;
    }
  }
`;

export const PatientData = styled.div`
  display: flex;
  flex-direction: row;
`;
