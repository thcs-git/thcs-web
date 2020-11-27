import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest } from '../../../store/ducks/companies/actions';
import { CompanyInterface } from '../../../store/ducks/companies/types';

import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import Loading from '../../../components/Loading';
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

const token = window.localStorage.getItem('token');

export default function CompanyList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const companyState = useSelector((state: ApplicationState) => state.companies);

  const [search, setSearch] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    dispatch(loadRequest());
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Sidebar>
        {companyState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Empresas</FormTitle>

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
            {companyState.list.map((company: CompanyInterface, index: number) => (
              <ListLink key={index} to={`/company/${company._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={company.active}>{company.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{company.name}</ListItemTitle>
                      <ListItemSubTitle>{company.fantasy_name}</ListItemSubTitle>
                      <ListItemSubTitle>{company.fiscal_number}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>

          <ButtonsContent>
            <Button variant="contained" background="primary" onClick={() => history.push('/company/create/')}>
              Novo
            </Button>
          </ButtonsContent>
        </Container>
      </Sidebar>
    </>
  );
}
