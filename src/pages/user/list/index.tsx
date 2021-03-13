import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import debounce from 'lodash.debounce';

import { UserInterface } from '../../../store/ducks/users/types';

import Loading from '../../../components/Loading';

import { ApplicationState } from '../../../store';
import { loadRequest, searchRequest, cleanAction } from '../../../store/ducks/users/actions';

import PaginationComponent from '../../../components/Pagination';
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
    dispatch(cleanAction());
    dispatch(loadRequest());
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value)
    dispatch(searchRequest(event.target.value));
  }, []);

  const debounceSearchRequest = debounce(handleChangeInput, 900)

  return (
    <>
      {userState.loading && <Loading />}
      <Sidebar>
        <Container>
          <FormTitle>Lista de Usuários</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/user/create/')}
            buttonTitle="Novo"
            onChangeInput={debounceSearchRequest}
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
              search
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+userState.list.total / +userState.list.limit)).toString(),
              limit: userState.list.limit,
              total: userState.list.total,
              search
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+userState.list.page + 1).toString(),
              limit: userState.list.limit,
              total: userState.list.total,
              search
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+userState.list.page - 1).toString(),
              limit: userState.list.limit,
              total: userState.list.total,
              search
            }))}

            handleChangeRowsPerPage={event => dispatch(loadRequest({
              limit: event.target.value,
              page: '1',
              search
            }))}
          />
        </Container>
      </Sidebar>
    </>
  );
}
