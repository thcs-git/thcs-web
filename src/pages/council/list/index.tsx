import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import Sidebar from '../../../components/Sidebar';

import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';
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

export default function CouncilList() {
  const history = useHistory();

  const [search, setSearch] = useState('');

  const [especialties, setEspecialties] = useState([
    { id: 1, description: 'council 1', initials: 'CRM', active: true },
    { id: 2, description: 'council 2', initials: 'CRO', active: false },
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
          <FormTitle>Lista de Conselhos</FormTitle>

          <FormSearch noValidate autoComplete="off">
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel htmlFor="search-input">Digite para pesquisar</InputLabel>
              <OutlinedInput
                id="search-input"
                value={search}
                onChange={(element) => setSearch(element.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="search" edge="end">
                      <SearchOutlined />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={155}
              />
            </FormControl>
          </FormSearch>

          <List>
            {especialties.map((especialty, index) => (
              <ListLink key={index} to={`/council/${especialty.id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={especialty.active}>{especialty.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{especialty.description}</ListItemTitle>
                      <ListItemSubTitle>{especialty.initials}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>

          <ButtonsContent>
            <Button variant="contained" background="primary" onClick={() => history.push('/council/create/')}>
              Novo
            </Button>
          </ButtonsContent>
        </Container>
      </Sidebar>
    </>
  );
}
