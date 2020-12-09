import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest } from '../../../store/ducks/councils/actions';

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

export default function CouncilList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const councilState = useSelector((state: ApplicationState) => state.councils);

  const [search, setSearch] = useState('');

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

  return (
    <>
      <Sidebar>
        {councilState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Conselhos</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/concil/create/')}
            buttonTitle="Novo"
            value=""
            onChangeInput={() => {}}
          />


          <List>
            {councilState.list.data.map((council, index) => (
              <ListLink key={index} to={`/council/${council._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={council?.active || false}>{council.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{council.name}</ListItemTitle>
                      <ListItemSubTitle>{council.initials} • {council.federative_unit}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>
          <PaginationComponent
            page={councilState.list.page}
            rowsPerPage={councilState.list.limit}
            totalRows={councilState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: councilState.list.limit,
              total: councilState.list.total,
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+councilState.list.total / +councilState.list.limit)).toString(),
              limit: councilState.list.limit,
              total: councilState.list.total,
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+councilState.list.page + 1).toString(),
              limit: councilState.list.limit,
              total: councilState.list.total,
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+councilState.list.page - 1).toString(),
              limit: councilState.list.limit,
              total: councilState.list.total,
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
