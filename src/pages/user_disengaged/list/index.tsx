import React, { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading';
import { Container, Button, Menu, MenuItem, TableRow, TableCell, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { UserInterface, UserListItems } from '../../../store/ducks/users/types';
import { ApplicationState } from '../../../store';
import PaginationComponent from '../../../components/Pagination';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import Table from '../../../components/Table';
import { FormTitle } from '../../../styles/components/Form';
import { loadGetUserDisengaged, searchRequest, cleanAction } from '../../../store/ducks/users/actions';
import debounce from 'lodash.debounce';
import { formatDate } from '../../../helpers/date';
import { searchUserDisengaged } from '../../../store/ducks/users/sagas';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';


export default function UserDisengaged() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const userState = useSelector((state: ApplicationState) => state.users);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value)
    dispatch(searchRequest(event.target.value));
  }, []);
  const debounceSearchRequest = debounce(handleChangeInput, 900);

  useEffect(() => {
    dispatch(cleanAction());
    dispatch(loadGetUserDisengaged());
  }, [])

  const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, [anchorEl]);

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const [open, setOpen] = useState(false);

  
  return (
    <>
      <Sidebar>
        {userState.loading && <Loading />}
        <Container>
          <FormTitle>
            Lista de Profissionais Disvinculados
          </FormTitle>
          <SearchComponent
            handleButton={() => history.push('/company/create/')}
            inputPlaceholder="Pesquise por nome, estado,função ou especialidade"
            buttonTitle=""
            onChangeInput={debounceSearchRequest}
          />
          <Table
            tableCells={[
              { name: 'Profissional', align: 'left', },
              //{ name: 'Email', align: 'left' },
              { name: 'Estado', align: 'left' },
              { name: 'Função', align: 'left' },
              { name: 'Especialidade', align: 'left' },
              { name: '', align: 'left' },
              { name: 'Adicionado em', align: 'left' },
              { name: '', align: 'left' },
            ]}
          >
            {userState.list.data.map((user: UserListItems, index: number) => (
              <TableRow key={`user_${index}`}>
                <TableCell>
                  <Link to={`/user/${user._id}/link/edit`}>{user.name}</Link>
                </TableCell>
                {/* <TableCell>
                  {user.email}
                </TableCell> */}
                <TableCell>
                  {user.address?.state || 'BR'}
                </TableCell>
                <TableCell>
                  {user.profession_id.name}
                </TableCell>
                <TableCell>
                  {/* {user.specialties.map((specialty, index) => (
                    `${specialty.name}${index < (user.specialties.length - 1) ? ',' : ''}`
                  ))} */}
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
                    <MenuItem onClick={() => history.push(`/user/${user._id}/edit/edit`)}>Vincular a Empresa</MenuItem>
                    <MenuItem onClick={() => history.push(`/user/${user._id}/link/edit`)}>Visualizar</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <PaginationComponent
            page={userState.list.page}
            rowsPerPage={userState.list.limit}
            totalRows={userState.list.total}

            handleFirstPage={() => dispatch(loadGetUserDisengaged({
              page: '1',
              limit: userState.list.limit,
              total: userState.list.total,
              search
            }))}

            handleLastPage={() => dispatch(loadGetUserDisengaged({
              page: (Math.ceil(+userState.list.total / +userState.list.limit)).toString(),
              limit: userState.list.limit,
              total: userState.list.total,
              search
            }))}

            handleNextPage={() => dispatch(loadGetUserDisengaged({
              page: (+userState.list.page + 1).toString(),
              limit: userState.list.limit,
              total: userState.list.total,
              search
            }))}

            handlePreviosPage={() => dispatch(loadGetUserDisengaged({
              page: (+userState.list.page - 1).toString(),
              limit: userState.list.limit,
              total: userState.list.total,
              search
            }))}

            handleChangeRowsPerPage={event => dispatch(loadGetUserDisengaged({
              limit: event.target.value,
              page: '1',
              search
            }))}
          />

        </Container>

      </Sidebar>
    </>
  )

}
