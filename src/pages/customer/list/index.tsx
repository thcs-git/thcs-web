import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/customers/actions';
import Sidebar from '../../../components/Sidebar';

import Loading from '../../../components/Loading';
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

export default function CustomerList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerState = useSelector((state: ApplicationState) => state.customers);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(loadRequest());
  }, [])

  const [customers, setCustomers] = useState([
    { id: 1, name: 'customer 1', fiscalNumber: '00.000.000/0000-00', active: true },
    { id: 2, name: 'customer 2', fiscalNumber: '00.000.000/0000-00', active: false },
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
      {customerState.loading && <Loading />}
      <Sidebar>
        <Container>
          <FormTitle>Lista de Clientes</FormTitle>

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
            {customerState.list.map((customer, index) => (
              <ListLink key={customer._id} to={`/customer/${customer._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={customer.active}>{customer.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{customer.name}</ListItemTitle>
                      <ListItemSubTitle>{customer.email}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>

          <ButtonsContent>
            <Button variant="contained" background="primary" onClick={() => history.push('/customer/create/')}>
              Novo
            </Button>
          </ButtonsContent>
        </Container>
      </Sidebar>
    </>
  );
}
