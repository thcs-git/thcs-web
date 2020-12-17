import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import debounce from 'lodash.debounce';


import { getDayOfTheWeekName } from '../../../helpers/date';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest, searchRequest } from '../../../store/ducks/areas/actions';

import PaginationComponent from '../../../components/Pagination';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import Loading from '../../../components/Loading';

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
  const areaState = useSelector((state: ApplicationState) => state.areas);

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

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value)
    dispatch(searchRequest(event.target.value));
  }, []);

  const debounceSearchRequest = debounce(handleChangeInput, 600)

  return (
    <>
      <Sidebar>
        {areaState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Áreas</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/area/create/')}
            buttonTitle="Novo"
            onChangeInput={debounceSearchRequest}
          />

          <List>
            {areaState.list.data.map((area, index) => (
              <ListLink key={index} to={`/area/${area._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={area.active}>{area.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{area.name}</ListItemTitle>
                      <ListItemSubTitle>Intervalo do abastecimento: {area.supply_days} dia(s), {getDayOfTheWeekName(area.week_day)}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>
          <PaginationComponent
            page={areaState.list.page}
            rowsPerPage={areaState.list.limit}
            totalRows={areaState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: areaState.list.limit,
              total: areaState.list.total,
              search,
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+areaState.list.total / +areaState.list.limit)).toString(),
              limit: areaState.list.limit,
              total: areaState.list.total,
              search,
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+areaState.list.page + 1).toString(),
              limit: areaState.list.limit,
              total: areaState.list.total,
              search,
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+areaState.list.page - 1).toString(),
              limit: areaState.list.limit,
              total: areaState.list.total,
              search,
            }))}

            handleChangeRowsPerPage={event => dispatch(loadRequest({
              limit: event.target.value,
              page: '1',
              search,
            }))}
          />
        </Container>
      </Sidebar>
    </>
  );
}
