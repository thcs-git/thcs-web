import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { MoreVert, SearchOutlined } from "@material-ui/icons";
import debounce from "lodash.debounce";
import Table from "../../../components/Table";
import { ApplicationState } from "../../../store";
import {
  loadRequest,
  searchRequest,
  cleanAction,
} from "../../../store/ducks/customers/actions";
import Sidebar from "../../../components/Sidebar";

import PaginationComponent from "../../../components/Pagination";
import Loading from "../../../components/Loading";
import SearchComponent from "../../../components/List/Search";
import { FormTitle } from "../../../styles/components/Form";
import Button from "../../../styles/components/Button";
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
  ItemTable,
} from "./styles";

import { formatDate } from "../../../helpers/date";
import { BoxCustom } from "../form/styles";
import { CustomerInterface } from "../../../store/ducks/customers/types";

export default function CustomerList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerState = useSelector(
    (state: ApplicationState) => state.customers
  );

  const [customers, setCustomers] = useState<CustomerInterface[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(cleanAction());
    dispatch(loadRequest());
  }, []);

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const handleOpenRowMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );

  // const handleChangeInput = useCallback(
  //   (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     setSearch(event.target.value);
  //     dispatch(searchRequest(event.target.value));
  //   },
  //   []

  const handleSearchInput = useCallback((event: any) => {
    dispatch(searchRequest(event));
  }, []);

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(event.target.value);

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

  // const debounceSearchRequest = debounce(handleChangeInput, 900);
  return (
    <>
      {/* {customerState.loading && <Loading />} */}
      <Sidebar>
        <Container>
          <FormTitle>Lista de Clientes</FormTitle>

          <SearchComponent
            handleButton={() => history.push("/customer/create/")}
            buttonTitle=""
            inputPlaceholder="Pesquise por nome fantasia, CNPJ, status, etc..."
            onChangeInput={handleChangeInput}
            value={search}
            onKeyEnter={handleKeyEnter}
            onClickSearch={handleClickSearch}
          />
          <Table
            tableCells={[
              { name: "Nome Fantasia", align: "left" },
              { name: "CNPJ", align: "left" },
              { name: "Status", align: "left" },
              { name: "Adicionado em", align: "left" },
              // { name: "", align: "center" },
            ]}
          >
            {customerState.list.data.map((customer, index) => (
              <TableRow key={`patient_${index}`}>
                <TableCell align="left">
                  <ItemTable>
                    <ListLink
                      key={customer._id}
                      to={`/customer/${customer._id}/view/edit`}
                    >
                      {customer.name}
                    </ListLink>
                  </ItemTable>
                </TableCell>
                <TableCell align="left">{customer.fiscal_number}</TableCell>
                <TableCell align="left">
                  <ListItemStatus active={customer.active}>
                    {customer.active ? "Ativo" : "Inativo"}
                  </ListItemStatus>
                </TableCell>
                <TableCell align="left">
                  {formatDate(customer.created_at, "DD/MM/YYYY HH:mm")}
                </TableCell>
                {/* <TableCell align='center' style={{width:'10px'}}>
                  <Button   aria-controls={`patient-menu${index}`} id={`btn_patient-menu${index}`} aria-haspopup="true" onClick={handleOpenRowMenu}>
                    <MoreVert  style={{ color: '#0899ba' }}/>
                  </Button>
                  <Menu
                    id={`patient-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_patient-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    <MenuItem onClick={() => history.push(`/customer/${customer._id}/edit/edit`)}>Editar</MenuItem>
                    <MenuItem onClick={() => history.push(`/customer/${customer._id}/view/edit`)}>Visualizar</MenuItem>
                  </Menu>
                  </TableCell> */}
              </TableRow>
            ))}
          </Table>

          <PaginationComponent
            page={customerState.list.page}
            rowsPerPage={customerState.list.limit}
            totalRows={customerState.list.total}
            handleFirstPage={() =>
              dispatch(
                loadRequest({
                  page: "1",
                  limit: customerState.list.limit,
                  total: customerState.list.total,
                  search,
                })
              )
            }
            handleLastPage={() =>
              dispatch(
                loadRequest({
                  page: Math.ceil(
                    +customerState.list.total / +customerState.list.limit
                  ).toString(),
                  limit: customerState.list.limit,
                  total: customerState.list.total,
                  search,
                })
              )
            }
            handleNextPage={() =>
              dispatch(
                loadRequest({
                  page: (+customerState.list.page + 1).toString(),
                  limit: customerState.list.limit,
                  total: customerState.list.total,
                  search,
                })
              )
            }
            handlePreviosPage={() =>
              dispatch(
                loadRequest({
                  page: (+customerState.list.page - 1).toString(),
                  limit: customerState.list.limit,
                  total: customerState.list.total,
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
        </Container>
      </Sidebar>
    </>
  );
}
