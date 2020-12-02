import styled from 'styled-components';
import { Paper } from '@material-ui/core';

import { ReactComponent as UserCheckIcon } from '../../assets/img/cadastro-paciente.svg';
import { ReactComponent as MeasurementIcon } from '../../assets/img/afericao-paciente.svg';
import { ReactComponent as PatientPlusIcon } from '../../assets/img/captacao-paciente.svg';

export const InfoSection = styled.div`
  margin-bottom: 40px;
`;

export const ActionCard = styled(Paper)`
  cursor: pointer;

  margin: 10px 20px;
  padding: 20px;

  border-radius: 9px;
  border: 1px solid #ccc;

  height: 150px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: 0.2s ease-in-out;

  &:hover {
    background: var(--gray-light);
    transition: 0.2s ease-in-out;
  }

  p {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: var(--gray-dark);
  }

  &:active {
    transform: scale(0.8);
    transition: 0.2s ease-in-out;
  }

`;

export const UserCheckIconImage = styled(UserCheckIcon)`
  margin-bottom: 8px
`;

export const MeasurementIconImage = styled(MeasurementIcon)`
  margin-bottom: 8px
`;

export const PatientPlusIconImage = styled(PatientPlusIcon)`
  margin-bottom: 8px
`;

