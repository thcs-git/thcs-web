import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { UserInterface } from '../../../store/ducks/users/types';

import Loading from '../../../components/Loading';

import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/users/actions';

import PaginationComponent from '../../../components/Pagination';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
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

export default function UserList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state: ApplicationState) => state.users);

  const [search, setSearch] = useState('');

  const [users, setUsers] = useState<UserInterface[]>([]);

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
      {userState.loading && <Loading />}
      <Sidebar>
        <Container>
          <FormTitle>Lista de Usuários</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/user/create/')}
            buttonTitle="Novo"
            value=""
            onChangeInput={() => {}}
          />

          <List>
            {userState.list.data.map((user, index) => (
              <ListLink key={index} to={`/user/${user._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={user.active}>{user.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{user.name}</ListItemTitle>
                      {/* <ListItemSubTitle>{user.user_type_id.description} • {user.especialties[0].description}</ListItemSubTitle> */}
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>
          <PaginationComponent
            page={userState.list.page}
            rowsPerPage={userState.list.limit}
            totalRows={userState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: userState.list.limit,
              total: userState.list.total,
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+userState.list.total / +userState.list.limit)).toString(),
              limit: userState.list.limit,
              total: userState.list.total,
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+userState.list.page + 1).toString(),
              limit: userState.list.limit,
              total: userState.list.total,
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+userState.list.page - 1).toString(),
              limit: userState.list.limit,
              total: userState.list.total,
            }))}

            handleChangeRowsPerPage={event => dispatch(loadRequest({
              limit: event.target.value,
              page: '1'
            }))}
          />
        </Container>
      </Sidebar>
    </>
  );
}
