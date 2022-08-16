import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
} from "react";
// router
import { useNavigate, Link } from "react-router-dom";

//redux e sagas
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/";
import {
  loadRequest,
  searchRequest,
  cleanAction,
} from "../../../store/ducks/companies/actions";
import { CompanyInterface } from "../../../store/ducks/companies/types";
// MUI
import {
  Container,
  Menu,
  MenuItem,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { SearchOutlined, MoreVert } from "@mui/icons-material";
// styles
import { FormTitle } from "../../../styles/components/Form";
import { ListItemStatus } from "./styles";
import theme from "../../../theme/theme";
// Components
import PaginationComponent from "../../../components/Pagination";
import Loading from "../../../components/Loading";
import Sidebar from "../../../components/Sidebar";
import SearchComponent from "../../../components/List/Search";
import Table from "../../../components/Table";
import Button from "../../../styles/components/Button";
import NoPermission from "../../../components/Erros/NoPermission";
import TabTittle from "../../../components/Text/TabTittle";
// utils
import debounce from "lodash.debounce";
import { formatDate } from "../../../helpers/date";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import { toast } from "react-toastify";
import {
  checkViewPermission,
  checkEditPermission,
} from "../../../utils/permissions";

export default function CompanyList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const companyState = useSelector(
    (state: ApplicationState) => state.companies
  );
  const rightsOfLayoutState = useSelector(
    (state: ApplicationState) => state.layout.data.rights
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(cleanAction());
    dispatch(loadRequest());
  }, []);

  const handleOpenRowMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  // const handleChangeInput = useCallback(
  //   (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     setSearch(event.target.value);
  //     dispatch(searchRequest(event.target.value));
  //   },
  //   []
  // );

  // const debounceSearchRequest = debounce(handleChangeInput, 900);

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

  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

  return (
    <>
      <Sidebar>
        {checkViewPermission("company", JSON.stringify(rightsOfLayoutState)) ? (
          <Container>
            {/* {companyState.loading && <Loading />} */}
            <TabTittle tittle="Lista de Empresas" />

            {integration ? (
              <>
                <SearchComponent
                  handleButton={() => navigate("/company/create/")}
                  inputPlaceholder="Pesquise por nome fantasia, CNPJ, status, etc..."
                  buttonTitle=""
                  onChangeInput={handleChangeInput}
                  value={search}
                  onKeyEnter={handleKeyEnter}
                  onClickSearch={handleClickSearch}
                />
                <Table
                  tableCells={[
                    { name: "Empresa", align: "left" },
                    { name: "CNPJ", align: "left" },
                    { name: "Tipo", align: "center" },
                  ]}
                >
                  {!companyState.list.data &&
                    toast.error("Falha ao encontrar lista de empresas")}
                  {companyState.list.data &&
                    companyState.list.data.map(
                      (company: any, index: number) =>
                        company && (
                          <TableRow key={`patient_${index}`} hover>
                            {company.tipo === "MATRIZ" ? (
                              <TableCell
                                align="left"
                                style={{ color: "var(--primary)" }}
                                sx={{
                                  cursor: "pointer",
                                  "& a": { cursor: "pointer" },
                                }}
                              >
                                <Link
                                  key={index}
                                  to={`/company/${company._id}/view`}
                                >
                                  {company.fantasy_name}
                                </Link>
                              </TableCell>
                            ) : (
                              <TableCell
                                align="left"
                                sx={{
                                  cursor: "pointer",
                                  "& a": { cursor: "pointer" },
                                }}
                              >
                                <Link
                                  key={index}
                                  to={`/company/${company._id}/view`}
                                >
                                  {company.fantasy_name}
                                </Link>
                              </TableCell>
                            )}
                            <TableCell>{company.fiscal_number}</TableCell>
                            <TableCell>{company.tipo}</TableCell>
                          </TableRow>
                        )
                    )}
                </Table>
              </>
            ) : (
              <>
                <SearchComponent
                  handleButton={() => navigate("/company/create/")}
                  inputPlaceholder="Pesquise por nome fantasia, CNPJ, status, etc..."
                  buttonTitle="Novo"
                  onChangeInput={handleChangeInput}
                  value={search}
                  onKeyEnter={handleKeyEnter}
                  onClickSearch={handleClickSearch}
                />
                <Table
                  tableCells={[
                    { name: "Empresa", align: "left" },
                    { name: "CNPJ", align: "left" },
                    { name: "Status", align: "left" },
                    { name: "Adicionado em", align: "left" },
                    { name: "", align: "left" },
                  ]}
                >
                  {!companyState.list.data &&
                    toast.error("Falha ao encontrar lista de empresas")}
                  {companyState.list.data &&
                    companyState.list.data.map(
                      (company: CompanyInterface, index: number) => (
                        <TableRow key={`patient_${index}`}>
                          <TableCell
                            align="left"
                            sx={{
                              cursor: "pointer",
                              "& a": { cursor: "pointer" },
                            }}
                          >
                            <Link
                              key={index}
                              to={`/company/${company._id}/view`}
                            >
                              {company.fantasy_name}
                            </Link>
                          </TableCell>
                          <TableCell>{company.fiscal_number}</TableCell>
                          <TableCell>
                            <ListItemStatus active={company.active}>
                              {company.active ? "Ativo" : "Inativo"}
                            </ListItemStatus>
                          </TableCell>
                          <TableCell align="left">
                            {formatDate(
                              company.created_at,
                              "DD/MM/YYYY HH:mm:ss"
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              aria-controls={`patient-menu${index}`}
                              id={`btn_patient-menu${index}`}
                              aria-haspopup="true"
                              onClick={handleOpenRowMenu}
                            >
                              <MoreVert style={{ color: "#0899BA" }} />
                            </Button>
                            <Menu
                              id={`patient-menu${index}`}
                              anchorEl={anchorEl}
                              keepMounted
                              open={anchorEl?.id === `btn_patient-menu${index}`}
                              onClose={handleCloseRowMenu}
                            >
                              <MenuItem
                                onClick={() =>
                                  navigate(`/company/${company._id}/edit`)
                                }
                              >
                                Editar
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  navigate(`/company/${company._id}/view`)
                                }
                              >
                                Visualizar
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                </Table>
              </>
            )}
            <PaginationComponent
              page={companyState.list.page}
              rowsPerPage={companyState.list.limit}
              totalRows={companyState.list.total}
              handleFirstPage={() =>
                dispatch(
                  loadRequest({
                    page: "1",
                    limit: companyState.list.limit,
                    total: companyState.list.total,
                    search,
                  })
                )
              }
              handleLastPage={() =>
                dispatch(
                  loadRequest({
                    page: Math.ceil(
                      +companyState.list.total / +companyState.list.limit
                    ).toString(),
                    limit: companyState.list.limit,
                    total: companyState.list.total,
                    search,
                  })
                )
              }
              handleNextPage={() =>
                dispatch(
                  loadRequest({
                    page: (+companyState.list.page + 1).toString(),
                    limit: companyState.list.limit,
                    total: companyState.list.total,
                    search,
                  })
                )
              }
              handlePreviosPage={() =>
                dispatch(
                  loadRequest({
                    page: (+companyState.list.page - 1).toString(),
                    limit: companyState.list.limit,
                    total: companyState.list.total,
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
        ) : (
          <NoPermission />
        )}
      </Sidebar>
    </>
  );
}
