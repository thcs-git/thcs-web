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

export default function CompanyList() {
  const history = useHistory();

  const [search, setSearch] = useState('');

  const [companies, setCompanies] = useState([
    { id: 1, name: 'company 1', customer: 'customer 1', fiscalNumber: '00.000.000/0000-00', active: true },
    { id: 2, name: 'company 2', customer: 'customer 1', fiscalNumber: '00.000.000/0000-00', active: false },
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
            {companies.map((company, index) => (
              <ListLink key={index} to={`/company/${company.id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={company.active}>{company.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                      <div>
                        <ListItemTitle>{company.name}</ListItemTitle>
                        <ListItemSubTitle>{company.customer}</ListItemSubTitle>
                        <ListItemSubTitle>{company.fiscalNumber}</ListItemSubTitle>
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
