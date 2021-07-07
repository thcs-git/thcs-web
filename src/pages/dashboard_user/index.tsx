import { Container } from '@material-ui/core';
import React from 'react';
import Sidebar_menu from '../../components/Sidebar_menu';
import { Title } from '../../styles/components/Text';


export default function Dashboard_user(){

  return (
    <Sidebar_menu>
    <Container>
      <Title>Dashboard User</Title>
    </Container>
    </Sidebar_menu>
  )
}
