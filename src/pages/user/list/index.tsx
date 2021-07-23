import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Container, Button, Menu, MenuItem, TableRow, TableCell } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import debounce from 'lodash.debounce';

import { UserInterface } from '../../../store/ducks/users/types';

import Loading from '../../../components/Loading';

import { ApplicationState } from '../../../store';
import { loadRequest, searchRequest, cleanAction } from '../../../store/ducks/users/actions';

import PaginationComponent from '../../../components/Pagination';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import Table from '../../../components/Table';

import AddIcon from '@material-ui/icons/Add';

import { FormTitle } from '../../../styles/components/Form';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  List,
  ListLink,
  ListItemContent,
  ListItemStatus,
  ListItemTitle,
} from './styles';
import { formatDate } from '../../../helpers/date';

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

  const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, [anchorEl]);

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

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
          <FormTitle>Meus Profissionais</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/user/edit/create/')}
            buttonTitle=""
            inputPlaceholder = "Pesquise por prestador, especialidades, status, etc..."
            onChangeInput={debounceSearchRequest}
          />
          <Table
            tableCells={[
              { name: 'Prestador', align: 'left', },
              { name: 'Função', align: 'left' },
              { name: 'Especialidades', align: 'left' },
              { name: '', align: 'left' },
              { name: 'Adicionado em', align: 'left' },
              { name: 'Status', align: 'left' },
              { name: '', align: 'left' },
            ]}
          >
            {userState.list.data.map((user, index) => (
              <TableRow key={`user_${index}`}>
                <TableCell align="left">
                  <Link key={index} to={`/user/${user._id}/view/edit`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  {user.profession_id.name}
                </TableCell>
                <TableCell>
                  {user.main_specialty_id.name}
                </TableCell>
                <TableCell align="center">
                  {user.specialties.length > 0 ? (
                    <ListItem>
                      <Button aria-controls={`user-speciality${index}`} id={`btn_user-speciality${index}`} aria-haspopup="true" onClick={handleOpenRowMenu}>
                        <AddIcon style={{ color: '#0899BA', cursor: "pointer" }} />
                      </Button>
                      <Menu
                        id={`user-speciality${index}`}
                        anchorEl={anchorEl}
                        keepMounted
                        open={anchorEl?.id === `btn_user-speciality${index}`}
                        onClose={handleCloseRowMenu}
                      >
                        <MenuItem style={{ cursor: "default", fontSize: "13pt", fontFamily: "Open Sans Bold" }}><h4>Principal</h4></MenuItem>
                        <MenuItem style={{ cursor: "default", fontSize: "10pt", fontFamily: "Open Sans Regular"}}>{user.main_specialty_id.name}</MenuItem>
                        <MenuItem style={{ cursor: "default", fontSize: "13pt", fontFamily: "Open Sans Bold"}}><h4>Secundária</h4></MenuItem>
                        <MenuItem style={{ cursor: "default", fontSize: "10pt", fontFamily: "Open Sans Regular"}}>{user.specialties.map((specialty, index) => (
                          `${specialty.name}${index < (user.specialties.length - 1) ? ',' : ''}`
                        ))}</MenuItem>
                      </Menu>
                    </ListItem>
                  ) : (null)
                  }
                </TableCell>
                <TableCell>
                  {formatDate(user.created_at, 'DD/MM/YYYY HH:mm:ss')}
                </TableCell>
                <TableCell>
                  <ListItemStatus active={user.active}>{user.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                </TableCell>
                <TableCell align="center">
                  <Button aria-controls={`user-menu${index}`} id={`btn_user-menu${index}`} aria-haspopup="true" onClick={handleOpenRowMenu}>
                    <MoreVert style={{ color: '#0899BA' }} />
                  </Button>
                  <Menu
                    id={`user-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_user-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    {/*<MenuItem onClick={() => history.push(`/user/${user._id}/edit/edit`)}>Editar</MenuItem>*/}
                    <MenuItem onClick={() => history.push(`/user/${user._id}/view/edit`)}>Visualizar</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </Table>
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
