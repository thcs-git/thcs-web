import styled from 'styled-components';
import { TextField, OutlinedInput, Button, Stepper, Step } from '@material-ui/core';
import { ReactComponent as NoData } from '../../../../assets/img/no-data.svg';


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
`;

