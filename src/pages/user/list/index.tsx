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

export default function UserList() {
  const history = useHistory();

  const [search, setSearch] = useState('');

  const [users, setUsers] = useState([
    { id: 1, name: 'user 1', user_type_id: { id: 1, description: 'Medico' }, especialties: [{ id: 1, description: 'Cardiologista' }], active: true },
    { id: 2, name: 'user 2', user_type_id: { id: 1, description: 'Medico' }, especialties: [{ id: 1, description: 'Cardiologista' }], active: false },
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
          <FormTitle>Lista de Usuários</FormTitle>

          <FormSearch noValidate autoComplete="off">
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel htmlFor="search-input">Digite para pesquisar</InputLabel>
              <OutlinedInput
                id="search-input"
                value={search}
                onChange={(element) => setSearch(element.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" edge="end">
                      <SearchOutlined />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={155}
              />
            </FormControl>
          </FormSearch>

          <List>
            {users.map((user, index) => (
              <ListLink key={index} to={`/user/${user.id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={user.active}>{user.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{user.name}</ListItemTitle>
                      <ListItemSubTitle>{user.user_type_id.description} • {user.especialties[0].description}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>

          <ButtonsContent>
            <Button variant="contained" background="primary" onClick={() => history.push('/user/create/')}>
              Novo
            </Button>
          </ButtonsContent>
        </Container>
      </Sidebar>
    </>
  );
}
