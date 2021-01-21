import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { Add as AddIcon, CheckCircle } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CheckIcon from '@material-ui/icons/Check';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest } from '../../../store/ducks/cares/actions';

import { searchCareRequest as getCares } from '../../../store/ducks/cares/actions';

import PaginationComponent from '../../../components/Pagination';
import Sidebar from '../../../components/Sidebar';
import Table from '../../../components/Table';
import SearchComponent from '../../../components/List/Search';
import Loading from '../../../components/Loading';
import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';

import { formatDate } from '../../../helpers/date';

export default function AvaliationList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const careState = useSelector((state: ApplicationState) => state.cares);

  useEffect(() => {
    dispatch(getCares({ status: 'Pre-Atendimento' }))
  }, []);

  const [search, setSearch] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckDocument = (documentId: string, documents: Array<any>) => {
    const found = documents.find(doc => (
      doc.document_group_id === documentId &&
      !doc.canceled &&
      doc.finished
    ));

    return (found) ? <CheckIcon style={{ color: '#4FC66A' }} /> : <CheckIcon style={{ color: '#EBEBEB' }} />;
  };

  return (
    <>
      <Sidebar>
        {careState.loading && <Loading />}
        {console.log(careState)}
        <Container>
          <FormTitle>Lista de Avaliações</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/patient/capture/create')}
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
              { name: 'Última captação', align: 'center' },
              { name: 'Status da captação', align: 'center' }
            ]}
            hasFilter
            fieldsFilter={[
              'Nome',
              'Manutenção',
              'Pedido'
            ]}
          >
            {careState.list.data.map((care, index) => (
              <TableRow key={`care_${index}`}>
                <TableCell component="th" scope="row">
                  <Link to={`/patient/capture/${care._id}/overview`}>
                    {care?.patient_id?.name}
                  </Link>
                </TableCell> {/* Paciente */}
                <TableCell align="right">-</TableCell> {/* Pedido */}
                <TableCell align="center">{handleCheckDocument('5ffd79012f5d2b1d8ff6bea3', care?.documents_id || [])}</TableCell> {/* Socioambiental */}
                <TableCell align="center">{handleCheckDocument('5ff65469b4d4ac07d186e99f', care?.documents_id || [])}</TableCell> {/* NEAD */}
                <TableCell align="center">{handleCheckDocument('5ffd7acd2f5d2b1d8ff6bea4', care?.documents_id || [])}</TableCell> {/* ABEMID */}
                <TableCell align="center">{care?.created_at ? formatDate(care.created_at, 'DD/MM/YYYY HH:mm:ss') : '-'}</TableCell> {/* Última captação */}
                <TableCell align="center">{care?.status}</TableCell>
                <TableCell align="center">
                  <MoreVertIcon style={{ color: '#0899BA' }} />
                </TableCell>
              </TableRow>
            ))}
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
