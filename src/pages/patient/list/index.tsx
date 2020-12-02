import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';

import { FormTitle } from '../../../styles/components/Form';
import {
  List,
  ListLink,
  ListItem,
  ListItemContent,
  ListItemStatus,
  ListItemTitle,
  ListItemSubTitle,
  FormSearch,
  ButtonsContent,
} from './styles';

export default function PatientList() {
  const history = useHistory();

  const [search, setSearch] = useState('');

  const [patients, setPatients] = useState([
    { id: 1, name: 'patient 1', fiscalNumber: '00.000.000/0000-00', active: true },
    { id: 2, name: 'patient 2', fiscalNumber: '00.000.000/0000-00', active: false },
  ]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Sidebar>
        <Container>
          <FormTitle>Lista de Pacientes</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/patient/create/')}
            buttonTitle="Novo"
            value=""
            onChangeInput={() => {}}
          />

          <List>
            {patients.map((patient) => (
              <ListLink to={`/patient/${patient.id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={patient.active}>{patient.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{patient.name}</ListItemTitle>
                      <ListItemSubTitle>{patient.fiscalNumber}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>
        </Container>
      </Sidebar>
    </>
  );
}
