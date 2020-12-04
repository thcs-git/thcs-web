import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest } from '../../../store/ducks/specialties/actions';
import SearchComponent from '../../../components/List/Search';
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

export default function SpecialtyList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const especialtyState = useSelector((state: ApplicationState) => state.specialties);

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
        {especialtyState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Especialidades</FormTitle>
          <SearchComponent
            handleButton={() => history.push('/specialty/create/')}
            buttonTitle="Novo"
            value=""
            onChangeInput={() => {}}
          />

          <List>
            {especialtyState.list.map((specialty, index) => (
              <ListLink key={index} to={`/specialty/${specialty._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={specialty.active}>{specialty.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{specialty.name}</ListItemTitle>
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
