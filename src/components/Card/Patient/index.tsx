import React, { ComponentProps } from 'react';
import { AccountCircle } from '@material-ui/icons';

import { PatientInterface } from '../../../store/ducks/patients/types'

import { age } from '../../../helpers/date';

import { PatientResume, PatientResumeContent, PatientData, } from './styles';

interface IProps {
  patient: PatientInterface
}

export default function PatientCard(props: any) {

  const { patient , capture } = props;


  return (
    <PatientResume>
      <PatientResumeContent>
        <PatientData>
          <div className="patientIcon">
            <AccountCircle />
          </div>
          <div>
            <p className="title">{patient?.name}</p>
            <div className="subTitle">
              <p>Pedido: {capture?.order_number}</p>
              <p>{patient?.birthdate} {patient?.birthdate ? age(patient?.birthdate) : ''}, {patient?.gender}</p>
              <p>CPF: {patient?.fiscal_number}</p>
              <p>Nome da Mãe: {patient?.mother_name}</p>
            </div>
          </div>
        </PatientData>

      </PatientResumeContent>
    </PatientResume>
  );
}
