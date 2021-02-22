import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import debounce from 'lodash.debounce';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest, searchCareRequest } from '../../../store/ducks/cares/actions';

import PaginationComponent from '../../../components/Pagination';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import Loading from '../../../components/Loading';
import { FormTitle } from '../../../styles/components/Form';
import { Table, Th, Td, ComplexityStatus } from '../../../styles/components/Table';
import Button from '../../../styles/components/Button';

import { formatDate } from '../../../helpers/date';

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

export default function CouncilList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const careState = useSelector((state: ApplicationState) => state.cares);

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const [search, setSearch] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, [anchorEl]);

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value)
    dispatch(searchCareRequest({ search: event.target.value }));
  }, [search]);

  const debounceSearchRequest = debounce(handleChangeInput, 900);

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
        <Container>
          <FormTitle>Lista de Atendimentos</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/care/create/')}
            buttonTitle="Novo Atendimento"
            onChangeInput={debounceSearchRequest}
          />

          <Table>
            <thead>
              <tr>
                <Th>Paciente</Th>
                <Th>Atendimento</Th>
                <Th>CPF</Th>
                <Th>Tipo</Th>
                <Th>Complexidade</Th>
                <Th>Último Atendimento</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {careState.list.data.map((care, index) => (
                <tr key={index}>
                  <Td>
                    <Link to={`/care/${care._id}/overview`}>
                      {care.patient_id?.social_name || care.patient_id?.name}
                    </Link>
                  </Td>
                  <Td>{care?._id}</Td>
                  <Td>{care.patient_id?.fiscal_number}</Td>
                  <Td>{(typeof care?.care_type_id === 'object') ? care?.care_type_id.name : care?.care_type_id}</Td>
                  <Td>
                    <ComplexityStatus status={care?.complexity || care?.capture?.complexity}>
                      {care?.complexity || care?.capture?.complexity}
                    </ComplexityStatus>
                  </Td>
                  <Td>{formatDate(care?.created_at ?? '', 'DD/MM/YYYY HH:mm:ss')}</Td>
                  <Td center>
                    <Button aria-controls={`simple-menu${index}`} id={`btn_simple-menu${index}`} aria-haspopup="true" onClick={handleOpenRowMenu}>
                      <MoreVert />
                    </Button>
                    <Menu
                      id={`simple-menu${index}`}
                      anchorEl={anchorEl}
                      keepMounted
                      open={anchorEl?.id === `btn_simple-menu${index}`}
                      onClose={handleCloseRowMenu}
                    >
                      <MenuItem onClick={handleCloseRowMenu}>Profile1</MenuItem>
                      <MenuItem onClick={handleCloseRowMenu}>My account</MenuItem>
                      <MenuItem onClick={handleCloseRowMenu}>Logout</MenuItem>
                    </Menu>

                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationComponent
            page={careState.list.page}
            rowsPerPage={careState.list.limit}
            totalRows={careState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: careState.list.limit,
              total: careState.list.total,
              search
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+careState.list.total / +careState.list.limit)).toString(),
              limit: careState.list.limit,
              total: careState.list.total,
              search
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+careState.list.page + 1).toString(),
              limit: careState.list.limit,
              total: careState.list.total,
              search
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+careState.list.page - 1).toString(),
              limit: careState.list.limit,
              total: careState.list.total,
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
