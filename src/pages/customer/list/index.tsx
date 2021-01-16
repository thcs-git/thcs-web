import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import debounce from 'lodash.debounce';

import { ApplicationState } from '../../../store';
import { loadRequest, searchRequest } from '../../../store/ducks/customers/actions';
import Sidebar from '../../../components/Sidebar';

import PaginationComponent from '../../../components/Pagination';
import Loading from '../../../components/Loading';
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

export default function CustomerList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerState = useSelector((state: ApplicationState) => state.customers);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(loadRequest());
  }, [])

  const [customers, setCustomers] = useState([
    { id: 1, name: 'customer 1', fiscalNumber: '00.000.000/0000-00', active: true },
    { id: 2, name: 'customer 2', fiscalNumber: '00.000.000/0000-00', active: false },
  ]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value)
    dispatch(searchRequest(event.target.value));
  }, []);

  const debounceSearchRequest = debounce(handleChangeInput, 900)

  return (
    <>
      {customerState.loading && <Loading />}
      <Sidebar>
        <Container>
          <FormTitle>Lista de Clientes</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/customer/create/')}
            buttonTitle="Novo"
            onChangeInput={debounceSearchRequest}
          />

          <List>
            {customerState.list.data.map((customer) => (
              <ListLink key={customer._id} to={`/customer/${customer._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={customer.active}>{customer.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{customer.name}</ListItemTitle>
                      <ListItemSubTitle>{customer.email}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>
          <PaginationComponent
            page={customerState.list.page}
            rowsPerPage={customerState.list.limit}
            totalRows={customerState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: customerState.list.limit,
              total: customerState.list.total,
              search
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+customerState.list.total / +customerState.list.limit)).toString(),
              limit: customerState.list.limit,
              total: customerState.list.total,
              search
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+customerState.list.page + 1).toString(),
              limit: customerState.list.limit,
              total: customerState.list.total,
              search
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+customerState.list.page - 1).toString(),
              limit: customerState.list.limit,
              total: customerState.list.total,
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
