import React, { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';

import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest, searchRequest, cleanAction } from '../../../store/ducks/companies/actions';
import { CompanyInterface } from '../../../store/ducks/companies/types';

import { Container, Menu, MenuItem, TableRow, TableCell } from '@material-ui/core';
import { SearchOutlined, MoreVert } from '@material-ui/icons';

import PaginationComponent from '../../../components/Pagination';
import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import Table from '../../../components/Table';

import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';

import { formatDate } from '../../../helpers/date';

import { ListItemStatus } from './styles';

export default function CompanyList() {
  const history = useHistory();
  const dispatch = useDispatch();

  const companyState = useSelector((state: ApplicationState) => state.companies);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(cleanAction());
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

  return (
    <>
      <Sidebar>
        {companyState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Empresas</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/company/create/')}
            inputPlaceholder = "Pesquise por nome fantasia, CNPJ, status, etc..."
            buttonTitle="Novo"
            onChangeInput={debounceSearchRequest}
          />

          <Table
            tableCells={[
              { name: 'Nome fantasia', align: 'left', },
              { name: 'CNPJ', align: 'left' },
              { name: 'Status', align: 'left' },
              { name: 'Adicionado em', align: 'left' },
              { name: '', align: 'left' },
            ]}
          >
            {companyState.list.data.map((company: CompanyInterface, index: number) => (
              <TableRow key={`patient_${index}`}>
                <TableCell align="left">
                  <Link key={index} to={`/company/${company._id}/edit`}>{company.fantasy_name}</Link>
                </TableCell>
                <TableCell>
                  {company.fiscal_number}
                </TableCell>
                <TableCell>
                  <ListItemStatus active={company.active}>{company.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                </TableCell>
                <TableCell align="left">{formatDate(company.created_at, 'DD/MM/YYYY HH:mm:ss')}</TableCell>
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
                    <MenuItem onClick={() => history.push(`/company/${company._id}/edit`)}>Editar</MenuItem>
                    <MenuItem onClick={() => history.push(`/company/${company._id}/view`)}>Visualizar</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <PaginationComponent
            page={companyState.list.page}
            rowsPerPage={companyState.list.limit}
            totalRows={companyState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: companyState.list.limit,
              total: companyState.list.total,
              search,
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+companyState.list.total / +companyState.list.limit)).toString(),
              limit: companyState.list.limit,
              total: companyState.list.total,
              search,
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+companyState.list.page + 1).toString(),
              limit: companyState.list.limit,
              total: companyState.list.total,
              search,
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+companyState.list.page - 1).toString(),
              limit: companyState.list.limit,
              total: companyState.list.total,
              search,
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
