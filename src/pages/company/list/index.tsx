import React, { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest, searchRequest } from '../../../store/ducks/companies/actions';
import { CompanyInterface } from '../../../store/ducks/companies/types';

import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import PaginationComponent from '../../../components/Pagination';
import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';
import {
  List,
  ListLink,
  ListItem,
  ListItemContent,
  ListItemStatus,
  ListItemTitle,
  ListItemSubTitle,
  FormSearch,
  ButtonsContent,
} from './styles';

const token = window.localStorage.getItem('token');

export default function CompanyList() {
  const history = useHistory();
  const dispatch = useDispatch();

  const companyState = useSelector((state: ApplicationState) => state.companies);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    dispatch(loadRequest());
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(searchRequest(event.target.value));
  }, []);

  const debounceSearchRequest = debounce(handleChangeInput, 600)

  return (
    <>
      <Sidebar>
        {companyState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Empresas</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/company/create/')}
            buttonTitle="Novo"
            onChangeInput={debounceSearchRequest}
          />

          <List>
            {companyState.list.data.map((company: CompanyInterface, index: number) => (
              <ListLink key={index} to={`/company/${company._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={company.active}>{company.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{company.name}</ListItemTitle>
                      <ListItemSubTitle>{company.fantasy_name}</ListItemSubTitle>
                      <ListItemSubTitle>{company.fiscal_number}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>
          <PaginationComponent
            page={companyState.list.page}
            rowsPerPage={companyState.list.limit}
            totalRows={companyState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: companyState.list.limit,
              total: companyState.list.total,
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+companyState.list.total / +companyState.list.limit)).toString(),
              limit: companyState.list.limit,
              total: companyState.list.total,
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+companyState.list.page + 1).toString(),
              limit: companyState.list.limit,
              total: companyState.list.total,
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+companyState.list.page - 1).toString(),
              limit: companyState.list.limit,
              total: companyState.list.total,
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
