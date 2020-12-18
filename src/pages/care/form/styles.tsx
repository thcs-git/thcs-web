import styled from 'styled-components';
import { TextField, OutlinedInput, Button, Stepper, Step } from '@material-ui/core';
import { ReactComponent as NoData } from '../../../assets/img/no-data.svg';

export const ButtonsContent = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 20px;
  margin-bottom: 20px;

  button:first-child {
    margin-right: 10px;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: calc(100vh - 150px);
`;

export const FormGroupSection = styled.div`
  margin-bottom: 40px;
`;

export const FormContent = styled.div`
  background: var(--white);
  padding: 15px;

  height: 100%;
  overflow-x: hidden;
`;

export const InputFiled = styled(TextField)`
  padding: 0 12px 12px 0;

  input {
    background: var(--white);
  }
`;

export const OutlinedInputFiled = styled(OutlinedInput)`
  background: var(--white);
`;

export const PatientResume = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 30px;
`;

export const PatientResumeContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 80%;

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

export const SearchContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const StepperComponent = styled(Stepper)`
  margin-bottom: 20px;
`;

export const StepComponent = styled(Step)`
  margin-bottom: 20px;

  .MuiStepIcon-root.MuiStepIcon-active {
    color: var(--secondary);
  }

  .MuiStepIcon-root.MuiStepIcon-completed {
    color: var(--success);
  }

`;

export const NoDataIcon = styled(NoData)`
  width: 100px;
  height: 100px;
`
