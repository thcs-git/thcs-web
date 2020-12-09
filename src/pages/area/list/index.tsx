import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { getDayOfTheWeekName } from '../../../helpers/date';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest } from '../../../store/ducks/areas/actions';

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

  return (
    <>
      <Sidebar>
        {areaState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Áreas</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/area/create/')}
            buttonTitle="Novo"
            value=""
            onChangeInput={() => { }}
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
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+areaState.list.total / +areaState.list.limit)).toString(),
              limit: areaState.list.limit,
              total: areaState.list.total,
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+areaState.list.page + 1).toString(),
              limit: areaState.list.limit,
              total: areaState.list.total,
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+areaState.list.page - 1).toString(),
              limit: areaState.list.limit,
              total: areaState.list.total,
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
