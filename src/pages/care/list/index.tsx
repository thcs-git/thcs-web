import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { getDayOfTheWeekName } from '../../../helpers/date';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest } from '../../../store/ducks/cares/actions';

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
  const careState = useSelector((state: ApplicationState) => state.areas);

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
        {careState.loading && <Loading />}
        {console.log(careState)}
        <Container>
          <FormTitle>Lista de Atendimentos</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/care/create/')}
            buttonTitle="Novo Atendimento"
            value=""
            onChangeInput={() => { }}
          />

          <List>
            {careState.list.data.map((area, index) => (
              <ListLink key={index} to={`/care/${area._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={area.active}>{area.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>NOME DO PACIENTE</ListItemTitle>
                      <ListItemSubTitle>: {area.supply_days} dia(s), {getDayOfTheWeekName(area.week_day)}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>
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
