import { Container } from '@material-ui/core';
import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Title } from '../../styles/components/Text';

export default function Dashboard_user(){

  return (
    <Sidebar>
    <Container>
      <Title>Dashboard User</Title>
    </Container>
    </Sidebar>
  )
}
