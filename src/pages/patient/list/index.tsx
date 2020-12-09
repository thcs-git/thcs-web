import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest } from '../../../store/ducks/patients/actions';

import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import PaginationComponent from '../../../components/Pagination';

import { FormTitle } from '../../../styles/components/Form';
import {
  List,
  ListLink,
  ListItem,
  ListItemContent,
  ListItemStatus,
  ListItemTitle,
  ListItemSubTitle,
} from './styles';
import Loading from '../../../components/Loading';

export default function PatientList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const patientState = useSelector((state: ApplicationState) => state.patients);
  const [search, setSearch] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Sidebar>
        {patientState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Pacientes</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/patient/create/')}
            buttonTitle="Novo"
            value=""
            onChangeInput={() => { }}
          />

          <List>
            {patientState.list.data.map((patient, index) => (
              <ListLink key={index} to={`/patient/${patient._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={patient.active}>{patient.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{patient.name}</ListItemTitle>
                      <ListItemSubTitle>{patient.fiscal_number}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>
          <PaginationComponent
            page={patientState.list.page}
            rowsPerPage={patientState.list.limit}
            totalRows={patientState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: patientState.list.limit,
              total: patientState.list.total,
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+patientState.list.total / +patientState.list.limit)).toString(),
              limit: patientState.list.limit,
              total: patientState.list.total,
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+patientState.list.page + 1).toString(),
              limit: patientState.list.limit,
              total: patientState.list.total,
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+patientState.list.page - 1).toString(),
              limit: patientState.list.limit,
              total: patientState.list.total,
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
