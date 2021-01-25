import styled from 'styled-components';
import { TextField, OutlinedInput, Button, Stepper, Step } from '@material-ui/core';
import { ReactComponent as NoData } from '../../../../assets/img/no-data.svg';
import { ReactComponent as SuccessImage } from '../../../../assets/img/ilustracao-avaliaca-concluida.svg';


export const PatientResume = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 30px;
  background: #f2f2f2;

  padding: 15px 20px 15px 10px;
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
  width: 50%;

  margin-right: 30px;
`;

export const SuccessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > svg {
    margin-bottom: 30px;
  }

  & > h1 {
    margin-bottom: 15px;
  }
`;

export const BackButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 50px;

  button:first-child {
    margin-right: 10px;
  }
`;
