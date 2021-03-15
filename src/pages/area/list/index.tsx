import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Checkbox, TableRow, TableCell, Menu, MenuItem } from '@material-ui/core';
import { MoreVert, SearchOutlined } from '@material-ui/icons';
import debounce from 'lodash.debounce';


import Table from '../../../components/Table';
import { getDayOfTheWeekName } from '../../../helpers/date';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest, searchRequest } from '../../../store/ducks/areas/actions';

import SearchComponent from '../../../components/List/Search';
import Loading from '../../../components/Loading';
import PaginationComponent from '../../../components/Pagination';
import Sidebar from '../../../components/Sidebar';


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
  ItemTable
} from './styles';

export default function CouncilList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const areaState = useSelector((state: ApplicationState) => state.areas);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  useEffect(() => {
    dispatch(loadRequest());

  }, []);
  const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, [anchorEl]);
  const [search, setSearch] = useState('');
  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);


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
  const mapDays = (week_day:Number)=>{
      switch(week_day){
        case 0:
          return "Domingo";
        case 1:
          return "Segunda-Feira";
        case 2:
          return "Terça-Feira";
        case 3:
          return "Quarta-Feira";
        case 4:
          return "Quinta-Feira";
        case 5:
          return "Sexta-Feira";
        case 6:
          return "Sábado";
        case -1:
          return "Todos os dias";
        default:
          return week_day;
      }
  }
  const debounceSearchRequest = debounce(handleChangeInput, 900)

  return (
    <>
      <Sidebar>
        {areaState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Áreas</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/area/create/')}
            buttonTitle="Nova Área"
            onChangeInput={debounceSearchRequest}
          />
           <Table
            tableCells={[
              { name: 'Área', align: 'left' ,},
              { name: 'Intervalo de Abastecimento', align: 'left' },
              { name: 'Dia de Abastecimento', align: 'left' },
              { name: 'Status', align: 'left' },
            ]}
          >
            {areaState.list.data.map((area, index) => (
              <TableRow key={`area_${index}`}>
                <TableCell align="left">
                <ItemTable>
                  <ListLink key={index} to={`/area/${area._id}/edit`}>{area.name}</ListLink>
                </ItemTable>

                </TableCell>
                <TableCell align="left">{area.supply_days}{area.supply_days <2?' dia':' dias'}</TableCell> {/* Socioambiental */}
                <TableCell align="left">{mapDays(area.week_day)}</TableCell> {/* Pedido */}
                <TableCell align="left">
                  <ListItemStatus active={area.active}>{area.active ? 'Ativo' : 'Inativo'}</ListItemStatus></TableCell> {/* Última captação */}
                {/* <TableCell align="center">
                  <Button aria-controls={`patient-capture-menu${index}`} id={`btn_patient-capture-menu${index}`} aria-haspopup="true" onClick={handleOpenRowMenu}>
                    <MoreVert style={{ color: '#0899BA' }}/>
                  </Button>
                  <Menu
                    id={`patient-capture-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_patient-capture-menu${index}`}
                    onClose={handleCloseRowMenu}

                  >
                    <MenuItem><ListLink key={index} to={`/area/${area._id}/edit`}>Editar</ListLink></MenuItem>
                  </Menu>
                </TableCell> */}
              </TableRow>
            ))}
          </Table>

              {/* <List>
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
          </List> */}
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
