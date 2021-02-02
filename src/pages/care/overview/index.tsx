import React from 'react';
import { Container } from '@material-ui/core';

import { FormTitle } from '../../../styles/components/Form';
import Sidebar from '../../../components/Sidebar';

export default function PatientOverview() {
  return (
    <>
      <Sidebar>

        <Container>
          <FormTitle>Sobre o Paciente</FormTitle>
        </Container>
      </Sidebar>
    </>
  );
}
