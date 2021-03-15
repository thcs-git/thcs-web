import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Container, Menu, MenuItem, TableRow, TableCell } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import debounce from 'lodash.debounce';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest, searchRequest, setIfRegistrationCompleted } from '../../../store/ducks/patients/actions';

import { formatDate } from '../../../helpers/date';

import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import PaginationComponent from '../../../components/Pagination';
import Table from '../../../components/Table';

import { FormTitle } from '../../../styles/components/Form';

export default function PatientList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const patientState = useSelector((state: ApplicationState) => state.patients);
  const [search, setSearch] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

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

  const handleClickButton = useCallback(() => {
    dispatch(setIfRegistrationCompleted(false))
    history.push('/patient/create/')
  }, [])

  return (
    <>
      <Sidebar>
        {patientState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Pacientes</FormTitle>

          <SearchComponent
            handleButton={handleClickButton}
            buttonTitle="Novo"
            onChangeInput={debounceSearchRequest}
          />

          <Table
            tableCells={[
              { name: 'Paciente', align: 'left', },
              { name: 'CPF', align: 'left' },
              { name: 'Mãe', align: 'left' },
              { name: 'Data de cadastro', align: 'left' },
              { name: '', align: 'left' },
            ]}
          >
            {patientState.list.data.map((patient, index) => (
              <TableRow key={`patient_${index}`}>
                <TableCell align="left">
                  <Link key={index} to={`/patient/${patient._id}/edit`}>{patient.social_name || patient.name}</Link>
                </TableCell>
                <TableCell align="left">{patient.fiscal_number}</TableCell>
                <TableCell align="left">{patient.mother_name}</TableCell>
                <TableCell align="left">{formatDate(patient.created_at, 'DD/MM/YYYY HH:mm:ss')}</TableCell>
                <TableCell align="center">
                  <Button aria-controls={`patient-menu${index}`} id={`btn_patient-menu${index}`} aria-haspopup="true" onClick={handleOpenRowMenu}>
                    <MoreVert style={{ color: '#0899BA' }} />
                  </Button>
                  <Menu
                    id={`patient-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_patient-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    <MenuItem onClick={() => history.push(`/patient/capture/create?patient_id=${patient._id}`)}>Iniciar captação</MenuItem>
                    <MenuItem onClick={() => history.push(`/patient/${patient._id}/edit`)}>Visualizar cadastro</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </Table>

          <PaginationComponent
            page={patientState.list.page}
            rowsPerPage={patientState.list.limit}
            totalRows={patientState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: patientState.list.limit,
              total: patientState.list.total,
              search
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+patientState.list.total / +patientState.list.limit)).toString(),
              limit: patientState.list.limit,
              total: patientState.list.total,
              search
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+patientState.list.page + 1).toString(),
              limit: patientState.list.limit,
              total: patientState.list.total,
              search
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+patientState.list.page - 1).toString(),
              limit: patientState.list.limit,
              total: patientState.list.total,
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
