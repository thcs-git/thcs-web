import React, {useState, useEffect, useRef, useCallback, ChangeEvent} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../components/Loading';
import {
  Container,
  Button,
  Menu,
  MenuItem,
  TableRow,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tooltip
} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';
import {UserInterface, UserListItems} from '../../../store/ducks/users/types';
import {ApplicationState} from '../../../store';
import PaginationComponent from '../../../components/Pagination';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import Table from '../../../components/Table';
import {FormTitle} from '../../../styles/components/Form';
import {loadGetUserDisengaged, searchRequest, cleanAction} from '../../../store/ducks/users/actions';
import debounce from 'lodash.debounce';
import {formatDate} from '../../../helpers/date';
import {searchUserDisengaged} from '../../../store/ducks/users/sagas';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import {TransitionProps} from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import MoreHorizTwoToneIcon from '@material-ui/icons/MoreHorizTwoTone';


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
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [userIndex, setUserIndex] = useState(0);

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

  const toggleHistoryModal = (index: number) => {
    handleCloseRowMenu();
    setUserIndex(index);
    setHistoryModalOpen(!historyModalOpen);
  };

  const handleCpf = (cpf: string) => {
    cpf = cpf.replace('.', '')
    cpf = cpf.replace('.', '')
    cpf = cpf.replace('-', '')
    return `${cpf[0]}${cpf[1]}${cpf[2]}.${cpf[3]}${cpf[4]}${cpf[5]}.${cpf[6]}${cpf[7]}${cpf[8]}-${cpf[9]}${cpf[10]}`
  };

  const [openPopup, setOpenPopup] = useState(false)


  return (
    <>
      <Sidebar>
        {userState.loading && <Loading/>}
        <Container>
          <FormTitle>
            Lista de Profissionais Desvinculados
          </FormTitle>
          <SearchComponent
            handleButton={() => history.push('/company/create/')}
            inputPlaceholder="Pesquise por nome, estado,função ou especialidade"
            buttonTitle=""
            onChangeInput={debounceSearchRequest}
          />
          <Table
            tableCells={[
              {name: 'Profissional', align: 'left',},
              //{ name: 'Email', align: 'left' },
              {name: 'CPF', align: 'left'},
              {name: 'Estado', align: 'left'},
              {name: 'Função', align: 'left'},
              {name: 'Especialidade', align: 'left'},
              //{name: '', align: 'left'},
              // { name: 'Adicionado em', align: 'left' },
              {name: '', align: 'left'},
            ]}
          >
            {userState?.list.data.map((user: UserListItems, index: number) => (
              <TableRow key={`user_${index}`}>
                <TableCell>
                  <Link to={`/user/${user._id}/link/edit`}>{user?.name}</Link>
                </TableCell>
                {/*<TableCell>
                {user.email}
                </TableCell>*/}
                <TableCell>
                  {handleCpf(user.fiscal_number)}
                </TableCell>
                <TableCell>
                  {user.address?.state || '-'}
                </TableCell>
                <TableCell>
                  {user.profession_id?.name || '-'}
                </TableCell>
                <TableCell align="left">
                <div style={{display: 'flex'}}>
                    <p style={{ marginTop:'0.3rem'}}>{user.main_specialty_id?.name}</p>
                  {user.specialties.length > 0 ? (<Tooltip style={{ fontSize: '10pt', marginTop: '0.8rem' }} title={user.specialties.map((specialty, index) => (
                      `${specialty.name}${index < (user.specialties.length - 1) ? ',' : ''}`
                    ))}><MoreHorizTwoToneIcon /></Tooltip>
                    ) : (null)}
                  </div>
                </TableCell>
                {/*<TableCell>*/}
                {/*  {formatDate(user.created_at, 'DD/MM/YYYY HH:mm:ss')}*/}
                {/*</TableCell>*/}
                <TableCell align="center">
                  <Button aria-controls={`user-menu${index}`} id={`btn_user-menu${index}`} aria-haspopup="true"
                          onClick={handleOpenRowMenu}>
                    <MoreVert style={{color: '#0899BA'}}/>
                  </Button>
                  <Menu
                    id={`user-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_user-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    <MenuItem onClick={() => history.push(`/user/${user._id}/linking/edit`)}>Vincular a
                      Empresa</MenuItem>
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
        {/*Especialidades*/}
        <Dialog

          maxWidth="lg"
          open={historyModalOpen}
          onClose={() => setHistoryModalOpen(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title"><h3>Especialidades</h3></DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              <p style={{fontFamily: "Open Sans Bold"}}><h3>Principal</h3></p>
              <br/>
              <p style={{
                color: '#333333',
                fontSize: "10pt",
                fontFamily: "Open Sans Regular"
              }}>{userState.list.data[userIndex]?.main_specialty_id?.name}</p>
              <br/>
              <p style={{fontFamily: "Open Sans Bold"}}><h3>Secundária</h3></p>
              <br/>
              <p style={{
                color: '#333333',
                fontSize: "10pt",
                fontFamily: "Open Sans Regular"
              }}>{userState.list.data[userIndex]?.specialties.map((specialty, index) => (
                `${specialty?.name}${index < (userState.list.data[userIndex].specialties.length - 1) ? ',' : ''}`))}</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHistoryModalOpen(false)} color="primary">
              <h3 style={{color: '#0899BA', fontSize: '11pt'}}>Fechar</h3>
            </Button>
          </DialogActions>
        </Dialog>

      </Sidebar>
    </>
  )

}
