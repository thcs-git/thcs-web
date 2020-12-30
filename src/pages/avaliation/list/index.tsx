import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { Add as AddIcon, CheckCircle } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CheckIcon from '@material-ui/icons/Check';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest } from '../../../store/ducks/cares/actions';

import PaginationComponent from '../../../components/Pagination';
import Sidebar from '../../../components/Sidebar';
import Table from '../../../components/Table';
import SearchComponent from '../../../components/List/Search';
import Loading from '../../../components/Loading';
import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';

import { getDayOfTheWeekName } from '../../../helpers/date';

import {
  List,
  ListLink,
  ListItem,
  ListItemContent,
  ListItemStatus,
  ListItemTitle,
  ListItemSubTitle,
  CheckListContent
} from './styles';

export default function AvaliationList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const careState = useSelector((state: ApplicationState) => state.areas);

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const [search, setSearch] = useState('');

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
        {careState.loading && <Loading />}
        {console.log(careState)}
        <Container>
          <FormTitle>Lista de Avaliações</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/care/create/')}
            buttonTitle="Nova avaliação"
            inputPlaceholder="Busque nome do paciente, ID ou tipo de score"
            onChangeInput={() => { }}
          />

          <Table
            tableCells={[
              { name: 'Paciente', align: 'left' },
              { name: 'Pedido', align: 'right' },
              { name: 'Socioambiental', align: 'center' },
              { name: 'NEAD', align: 'center' },
              { name: 'ABEMID', align: 'center' },
              { name: 'Manutenção', align: 'center' },
              { name: 'Última captação', align: 'center' }
          ]}
          hasFilter
          fieldsFilter={[
            'Nome',
            'Manutenção',
            'Pedido'
          ]}
          >
          {/* {careState.list.data.map((row) => ( */}
            <TableRow key={'1'}>
              <TableCell component="th" scope="row">John Doe</TableCell> {/* Paciente */}
              <TableCell align="right">012345</TableCell> {/* Pedido */}
              <TableCell align="center"><CheckIcon style={{ color:'#4FC66A' }} /></TableCell> {/* Socioambiental */}
              <TableCell align="center"><CheckIcon style={{ color:'#4FC66A' }} /></TableCell> {/* NEAD */}
              <TableCell align="center"><CheckIcon style={{ color:'#4FC66A' }} /></TableCell> {/* ABEMID */}
              <TableCell align="center"><CheckIcon style={{ color:'#4FC66A' }} /></TableCell> {/* Manutenção */}
              <TableCell align="center">25/10/2020</TableCell> {/* Última captação */}
              <TableCell align="center">
                <MoreVertIcon style={{ color: '#0899BA' }} />
              </TableCell>
            </TableRow>
          {/* ))} */}
          </Table>
          <PaginationComponent
            page={careState.list.page}
            rowsPerPage={careState.list.limit}
            totalRows={careState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: careState.list.limit,
              total: careState.list.total,
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+careState.list.total / +careState.list.limit)).toString(),
              limit: careState.list.limit,
              total: careState.list.total,
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+careState.list.page + 1).toString(),
              limit: careState.list.limit,
              total: careState.list.total,
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+careState.list.page - 1).toString(),
              limit: careState.list.limit,
              total: careState.list.total,
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
