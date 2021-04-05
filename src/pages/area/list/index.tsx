import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Checkbox, TableRow, TableCell, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { MoreVert, SearchOutlined } from '@material-ui/icons';
import debounce from 'lodash.debounce';


import Table from '../../../components/Table';
import { formatDate, getDayOfTheWeekName } from '../../../helpers/date';
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
import classes from '*.module.css';
import { BoxCustom } from '../../customer/form/styles';


export default function AreaList() {
  const useStyles = makeStyles((theme) => ({
    tablecelldot:{
      width:'9px',
      padding:'5px',
    },
    buttondots:{
      minWidth:'9px',
      width:'9px',
      padding:'1px'
    }

    }));
    const classe = useStyles();
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
    {areaState.loading && <Loading />}
          <Sidebar>

        <Container>
        <BoxCustom style={{  marginTop: 0 }} mt={5} paddingLeft={15} paddingRight={15} paddingTop={8}>
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
              { name: 'Qtd. Prestadores', align: 'left' },
              { name: 'Status', align: 'left',width:'10px'},
              { name: 'Adicionado em', align: 'left' },
              { name: '', align: 'center', width:'9px'},
            ]}
          >
            {areaState.list.data.map((area, index) => (
              <TableRow key={`area_${index}`}>
                <TableCell align="left">
                <ItemTable>
                  <ListLink key={index} to={`/area/${area._id}/edit/edit`}>{area.name}</ListLink>
                </ItemTable>
                </TableCell>
                <TableCell align="left">{area.supply_days}{area.supply_days <2?' dia':' dias'}</TableCell> {/* Socioambiental */}
                <TableCell align="left">{mapDays(area.week_day)}</TableCell> {/* Pedido */}
                <TableCell align="left">{area.profession_users.length}</TableCell>
                <TableCell align="left">
                  <ListItemStatus active={area.active}>{area.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                </TableCell> {/*  */}
                    <TableCell>
                  {formatDate(area.created_at, 'DD/MM/YYYY HH:mm:ss')}
                </TableCell>
                <TableCell align="center">
                  <Button  aria-controls={`area-menu${index}`} id={`btn_area-menu${index}`} aria-haspopup="true" onClick={handleOpenRowMenu}>
                    <MoreVert  style={{ color: '#0899BA' }}/>
                  </Button>
                  <Menu
                    id={`area-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_area-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    <MenuItem onClick={() => history.push(`/area/${area._id}/edit/edit`)}>Editar</MenuItem>
                    <MenuItem onClick={() => history.push(`/area/${area._id}/edit/edit`)}>Visualizar</MenuItem>
                  </Menu>
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
          </BoxCustom>
        </Container>
      </Sidebar>
    </>
  );
}
