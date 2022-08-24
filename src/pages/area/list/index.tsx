import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TableRow,
  TableCell,
  Menu,
  MenuItem,
  makeStyles,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import debounce from "lodash.debounce";
import Table from "../../../components/Table";
import { formatDate } from "../../../helpers/date";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/";
import { loadRequest, searchRequest } from "../../../store/ducks/areas/actions";
import SearchComponent from "../../../components/List/Search";
import Loading from "../../../components/Loading";
import PaginationComponent from "../../../components/Pagination";
import Sidebar from "../../../components/Sidebar";
import { FormTitle } from "../../../styles/components/Form";
import Button from "../../../styles/components/Button";
import { ListLink, ListItemStatus, ItemTable } from "./styles";

export default function AreaList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorSearch, setErrorSearch] = useState({ value: false });
  const areaState = useSelector((state: ApplicationState) => state.areas);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  useEffect(() => {
    dispatch(loadRequest());
  }, []);
  const handleOpenRowMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );
  const [search, setSearch] = useState("");

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);
  const erro = useCallback(() => {
    return errorSearch.value;
  }, []);

  // const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   if(event.target.value.length>3){
  //     setErrorSearch(prev=>({
  //       ...prev,
  //       value:false}));
  //   }else{
  //     setErrorSearch(prev=>({
  //       ...prev,
  //       value:true
  //     }));
  //   }
  //   setSearch(event.target.value);
  //   dispatch(searchRequest(event.target.value));
  // }, []);

  // const debounceSearchRequest = debounce(handleChangeInput, 900)

  const handleSearchInput = useCallback((event: any) => {
    dispatch(searchRequest(event));
  }, []);

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(event.target.value);
    if (event.target.value.length > 3) {
      setErrorSearch((prev) => ({
        ...prev,
        value: false,
      }));
    } else {
      setErrorSearch((prev) => ({
        ...prev,
        value: true,
      }));
    }

    if (event.target.value === "") {
      handleSearchInput("");
    }
  };

  const handleKeyEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchInput(search);
    }
  };

  const handleClickSearch = (e: any) => {
    handleSearchInput(search);
  };

  const mapDays = (week_day: Number) => {
    switch (week_day) {
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
  };

  return (
    <>
      {/* {areaState.loading && <Loading />} */}
      <Sidebar>
        <Container>
          {/* <BoxCustom style={{  marginTop: 0 }} mt={5} paddingLeft={15} paddingRight={15} paddingTop={8}> */}
          <FormTitle>Lista de Áreas</FormTitle>

          <SearchComponent
            handleButton={() => navigate("/area/create/")}
            buttonTitle="Nova Área"
            inputPlaceholder="Pesquise  por área, abastecimento, status e etc.."
            onChangeInput={handleChangeInput}
            value={search}
            onKeyEnter={handleKeyEnter}
            onClickSearch={handleClickSearch}
            //s    error = {erro}
          />
          <Table
            tableCells={[
              { name: "Área", align: "left" },
              { name: "Intervalo de Abastecimento", align: "left" },
              { name: "Dia de Abastecimento", align: "left" },
              { name: "Qtd. Prestadores", align: "left" },
              { name: "Status", align: "left", width: "10px" },
              { name: "Adicionado em", align: "left" },
              { name: "", align: "center", width: "9px" },
            ]}
          >
            {areaState.list.data.map((area, index) => (
              <TableRow key={`area_${index}`}>
                <TableCell align="left">
                  <ItemTable>
                    <ListLink key={index} to={`/area/${area._id}/view/edit`}>
                      {area.name}
                    </ListLink>
                  </ItemTable>
                </TableCell>
                <TableCell align="left">
                  {area.supply_days}
                  {area.supply_days < 2 ? " dia" : " dias"}
                </TableCell>{" "}
                {/* Socioambiental */}
                <TableCell align="left">
                  <>{mapDays(area.week_day)}</>
                </TableCell>{" "}
                {/* Pedido */}
                <TableCell align="left">
                  {area.profession_users.length}
                </TableCell>
                <TableCell align="left">
                  <ListItemStatus active={area.active}>
                    {area.active ? "Ativo" : "Inativo"}
                  </ListItemStatus>
                </TableCell>{" "}
                {/*  */}
                <TableCell>
                  {formatDate(area.created_at, "DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell align="center">
                  <Button
                    aria-controls={`area-menu${index}`}
                    id={`btn_area-menu${index}`}
                    aria-haspopup="true"
                    onClick={handleOpenRowMenu}
                  >
                    <MoreVert style={{ color: "#0899BA" }} />
                  </Button>
                  <Menu
                    id={`area-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_area-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    <MenuItem
                      onClick={() => navigate(`/area/${area._id}/edit/edit`)}
                    >
                      Editar
                    </MenuItem>
                    <MenuItem
                      onClick={() => navigate(`/area/${area._id}/view/edit`)}
                    >
                      Visualizar
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <PaginationComponent
            page={areaState.list.page}
            rowsPerPage={areaState.list.limit}
            totalRows={areaState.list.total}
            handleFirstPage={() =>
              dispatch(
                loadRequest({
                  page: "1",
                  limit: areaState.list.limit,
                  total: areaState.list.total,
                  search,
                })
              )
            }
            handleLastPage={() =>
              dispatch(
                loadRequest({
                  page: Math.ceil(
                    +areaState.list.total / +areaState.list.limit
                  ).toString(),
                  limit: areaState.list.limit,
                  total: areaState.list.total,
                  search,
                })
              )
            }
            handleNextPage={() =>
              dispatch(
                loadRequest({
                  page: (+areaState.list.page + 1).toString(),
                  limit: areaState.list.limit,
                  total: areaState.list.total,
                  search,
                })
              )
            }
            handlePreviosPage={() =>
              dispatch(
                loadRequest({
                  page: (+areaState.list.page - 1).toString(),
                  limit: areaState.list.limit,
                  total: areaState.list.total,
                  search,
                })
              )
            }
            handleChangeRowsPerPage={(event) =>
              dispatch(
                loadRequest({
                  limit: event.target.value,
                  page: "1",
                  search,
                })
              )
            }
          />
          {/* </BoxCustom> */}
        </Container>
      </Sidebar>
    </>
  );
}
