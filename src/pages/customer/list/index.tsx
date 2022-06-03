import React, { useState, useEffect, useCallback, ChangeEvent } from "react";

// router
import { useHistory, Link } from "react-router-dom";

// Redux e Saga
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  loadRequest,
  searchRequest,
  cleanAction,
} from "../../../store/ducks/customers/actions";
import { CustomerInterface } from "../../../store/ducks/customers/types";

// Mui
import { Container, TableCell, TableRow, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

//Style
import { ListLink, ListItemStatus, ItemTable } from "./styles";
import theme from "../../../theme/theme";

//Utils
import { formatDate } from "../../../helpers/date";

//Components
import Table from "../../../components/Table";
import Sidebar from "../../../components/Sidebar";
import PaginationComponent from "../../../components/Pagination";
import SearchComponent from "../../../components/List/Search";

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
    <Sidebar>
      {/* {customerState.loading && <Loading />} */}
      <Container>
        <Typography
          marginBottom={"2.5rem"}
          variant="h5"
          color={theme.palette.primary.main}
          fontWeight={600}
        >
          Lista de Clientes
        </Typography>

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
            { name: "CNPJ", align: "center" },
            { name: "Status", align: "center" },
            { name: "Adicionado em", align: "center" },
            // { name: "", align: "center" },
          ]}
        >
          {customerState.list.data.map((customer, index) => (
            <TableRow
              key={`patient_${index}`}
              hover
              sx={{
                transition: "all 150ms ease-in-out",
                // "&.MuiTableRow-root.MuiTableRow-hover:hover": {
                //   backgroundColor: theme.palette.secondaryLighter3.main,
                // },
              }}
            >
              <TableCell
                align="left"
                sx={{ cursor: "pointer", padding: "20px" }}
              >
                <Link
                  key={customer._id}
                  to={`/customer/${customer._id}/view/edit`}
                  style={{ cursor: "pointer" }}
                >
                  <Typography variant="body1" sx={{ cursor: "pointer" }}>
                    {customer.name}
                  </Typography>
                </Link>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">
                  {customer.fiscal_number}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color={
                    customer.active
                      ? theme.palette.success.main
                      : theme.palette.error.main
                  }
                  fontWeight={600}
                >
                  {customer.active ? "Ativo" : "Inativo"}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">
                  {formatDate(customer.created_at, "DD/MM/YYYY HH:mm")}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </Table>
        {console.log(customerState.list.page, "customerState.list.page")}
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
          handleChangeRowsPerPage={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) =>
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
  );
}
