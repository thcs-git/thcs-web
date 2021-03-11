import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, TableRow, TableCell } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import debounce from 'lodash.debounce';


import { getDayOfTheWeekName } from '../../../helpers/date';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest, searchRequest } from '../../../store/ducks/areas/actions';

import SearchComponent from '../../../components/List/Search';
import Loading from '../../../components/Loading';
import PaginationComponent from '../../../components/Pagination';
import Sidebar from '../../../components/Sidebar';
import Table from '../../../components/Table';

import { FormTitle } from '../../../styles/components/Form';
import { ListItemStatus } from './styles';

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

  const debounceSearchRequest = debounce(handleChangeInput, 900)

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

          <Table
            tableCells={[
              { name: 'Área', align: 'left', },
              { name: 'Intervalo de Abastecimento', align: 'left' },
              { name: 'Dia de Abastecimento', align: 'left' },
              { name: 'Qtd. Bairros', align: 'left' },
              { name: 'Qtd. Prestadores', align: 'left' },
              { name: 'Status', align: 'left' },
            ]}
          >
            {areaState.list.data.map((area, index) => (
              <TableRow key={`area_${index}`}>
                <TableCell align="left">
                  <Link key={index} to={`/area/${area._id}/edit`}>{area.name}</Link>
                </TableCell>
                <TableCell align="left">{area.supply_days}{area.supply_days < 2 ? ' dia' : ' dias'}</TableCell>
                <TableCell align="left">{area.week_day ? getDayOfTheWeekName(area.week_day) : '-'}</TableCell>
                <TableCell align="left">{area.neighborhoods.length}</TableCell>
                <TableCell align="left">{area.users.length}</TableCell>
                <TableCell align="left">
                  <ListItemStatus active={area.active}>{area.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                </TableCell>
              </TableRow>
            ))}
          </Table>
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
