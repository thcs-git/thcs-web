import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Button,
  Menu,
  Grid,
  MenuItem,
  TableRow,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import debounce from "lodash.debounce";

import { UserInterface } from "../../../store/ducks/users/types";

import Loading from "../../../components/Loading";

import { ApplicationState } from "../../../store";
import {
  loadRequest,
  searchRequest,
  cleanAction,
} from "../../../store/ducks/users/actions";

import PaginationComponent from "../../../components/Pagination";
import Sidebar from "../../../components/Sidebar";
import SearchComponent from "../../../components/List/Search";
import Table from "../../../components/Table";

import AddIcon from "@mui/icons-material/Add";

import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";

import { FormTitle } from "../../../styles/components/Form";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  List,
  ListLink,
  ListItemContent,
  ListItemStatus,
  ListItemTitle,
} from "./styles";
import { formatDate } from "../../../helpers/date";

import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  MarkerProps,
} from "@react-google-maps/api";

import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import _ from "lodash";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import { checkViewPermission } from "../../../utils/permissions";
import NoPermission from "../../../components/Erros/NoPermission";
import theme from "../../../theme/theme";
import TabTittle from "../../../components/Text/TabTittle";
const token = window.localStorage.getItem("token");
const currentCompany =
  localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED) || "";

export default function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state: ApplicationState) => state.users);
  const rightsOfLayoutState = useSelector(
    (state: ApplicationState) => state.layout.data.rights
  );
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState<UserInterface[]>([]);

  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [userIndex, setUserIndex] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
  //     dispatch(searchRequest({ search: event.target.value }));
  //   },
  //   []
  // );

  const handleActive = useCallback((user: any) => {
    return _.filter(user.companies_links, {
      companie_id: { _id: currentCompany },
    })[0]?.active;
  }, []);

  const handleLinkedAt = useCallback((user: any) => {
    return _.filter(user.companies_links, {
      companie_id: { _id: currentCompany },
    })[0]?.linked_at;
  }, []);

  // const debounceSearchRequest = debounce(handleChangeInput, 900);

  const toggleHistoryModal = (index: number) => {
    handleCloseRowMenu();
    setUserIndex(index);
    setHistoryModalOpen(!historyModalOpen);
  };

  const handleCpf = (cpf: string) => {
    if (cpf) {
      cpf = cpf.replace(".", "");
      cpf = cpf.replace(".", "");
      cpf = cpf.replace("-", "");
      return `${cpf[0]}${cpf[1]}${cpf[2]}.${cpf[3]}${cpf[4]}${cpf[5]}.${cpf[6]}${cpf[7]}${cpf[8]}-${cpf[9]}${cpf[10]}`;
    }
  };

  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

  function handleEmpty(value: any) {
    return value ? value : "-";
  }
  const handleSearchInput = useCallback((event: any) => {
    dispatch(searchRequest({ search: event }));
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

  return (
    <>
      <Sidebar>
        {checkViewPermission("user", JSON.stringify(rightsOfLayoutState)) ? (
          <Container>
            {/* {userState.loading && <Loading />} */}
            <TabTittle tittle="Meus Profissionais" />

            {integration ? (
              <>
                <SearchComponent
                  handleButton={() => navigate("/user/edit/create/")}
                  buttonTitle=""
                  inputPlaceholder="Pesquise por prestador, especialidades, status, etc..."
                  onChangeInput={handleChangeInput}
                  value={search}
                  onKeyEnter={handleKeyEnter}
                  onClickSearch={handleClickSearch}
                />
                <Table
                  tableCells={[
                    { name: "Profissional", align: "left" },
                    { name: "Usuário", align: "left" },
                    { name: "CPF", align: "left" },
                    { name: "Função", align: "left" },
                    { name: "Especialidades", align: "left" },
                  ]}
                  userState={userState}
                  handleEmpty={handleEmpty}
                  handleCpf={handleCpf}
                  integration={integration}
                  users={users}
                >
                  {"pages/user/list filho c/ integration"}
                </Table>
              </>
            ) : (
              <>
                <SearchComponent
                  handleButton={() => navigate("/user/edit/create/")}
                  buttonTitle=""
                  inputPlaceholder="Pesquise por prestador, especialidades, status, etc..."
                  onChangeInput={handleChangeInput}
                  value={search}
                  onKeyEnter={handleKeyEnter}
                  onClickSearch={handleClickSearch}
                />
                <Table
                  tableCells={[
                    { name: "Profissional", align: "left", width: "150px" },
                    { name: "CPF", align: "left" },
                    { name: "Função", align: "left" },
                    { name: "Especialidades", align: "left", width: "250px" },
                    // { name: '', align: 'left' },
                    { name: "Adicionado em", align: "left", width: "150px" },
                    { name: "Status", align: "left" },
                    { name: "", align: "left" },
                  ]}
                  userState={userState}
                  handleEmpty={handleEmpty}
                  handleCpf={handleCpf}
                  integration={integration}
                  users={users}
                  handleLinkedAt={handleLinkedAt}
                  handleActive={handleActive}
                >
                  {"pages/user/list filho s/ integration"}
                </Table>
              </>
            )}
            <PaginationComponent
              page={userState.list.page}
              rowsPerPage={userState.list.limit}
              totalRows={userState.list.total}
              handleFirstPage={() =>
                dispatch(
                  loadRequest({
                    page: "1",
                    limit: userState.list.limit,
                    total: userState.list.total,
                    search,
                  })
                )
              }
              handleLastPage={() =>
                dispatch(
                  loadRequest({
                    page: Math.ceil(
                      +userState.list.total / +userState.list.limit
                    ).toString(),
                    limit: userState.list.limit,
                    total: userState.list.total,
                    search,
                  })
                )
              }
              handleNextPage={() =>
                dispatch(
                  loadRequest({
                    page: (+userState.list.page + 1).toString(),
                    limit: userState.list.limit,
                    total: userState.list.total,
                    search,
                  })
                )
              }
              handlePreviosPage={() =>
                dispatch(
                  loadRequest({
                    page: (+userState.list.page - 1).toString(),
                    limit: userState.list.limit,
                    total: userState.list.total,
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

        {/* Especialidades
        <Dialog

          maxWidth="lg"
          open={historyModalOpen}
          onClose={() => setHistoryModalOpen(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title"><h3>Especialidades</h3></DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              <p style={{ fontFamily: "Open Sans Bold" }}><h3>Principal</h3></p>
              <br />
              <p style={{ color: '#333333', fontSize: "10pt", fontFamily: "Open Sans Regular" }}>{userState.list.data[userIndex]?.main_specialty_id.name}</p>
              <br />
              <p style={{ fontFamily: "Open Sans Bold" }}><h3>Secundária</h3></p>
              <br />
              <p style={{ color: '#333333', fontSize: "10pt", fontFamily: "Open Sans Regular" }}>{userState.list.data[userIndex]?.specialties.map((specialty, index) => (
                `${specialty.name}${index < (userState.list.data[userIndex].specialties.length - 1) ? ',' : ''}`))}</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHistoryModalOpen(false)} color="primary">
              <h3 style={{ color: '#0899BA', fontSize: '11pt' }}>Fechar</h3>
            </Button>
          </DialogActions>
        </Dialog> */}
      </Sidebar>
    </>
  );
}
