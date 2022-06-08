import styled from "styled-components";
import { TextField, OutlinedInput, Button, Stepper, Step } from "@mui/material";
import { ReactComponent as NoData } from "../../../assets/img/no-data.svg";
import Box from "@mui/material/Box";

export const ButtonsContent = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 20px;
  margin-bottom: 20px;

  button:first-child {
    margin-right: 10px;
  }
`;

export const BoxCustom = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;
  margin: 20px 10%;
`;
export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .box-position-icon {
    position: relative;

    > svg {
      position: absolute;
      left: -5%;
      top: -2px;
    }

    > p {
      margin-bottom: 8px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;

  > div {
    margin-left: 20px;
  }

  h5 {
    color: #333333;
  }
  p {
    color: #666666;
    font-size: 12px;
  }
`;

export const FormGroupSection = styled.div`
  margin-bottom: 40px;
`;

export const FormContent = styled.div`
  background: var(--white);
  padding: 15px;
  border: 1px solid var(--gray);
  border-radius: 8px;

  height: 100%;
  padding: 0 6%;
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

  margin-bottom: 20px;
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

export const PatientNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 20px auto;
`;

export const NoDataIcon = styled(NoData)`
  width: 100px;
  height: 100px;

  margin-bottom: 15px;
`;
