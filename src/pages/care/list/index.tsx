import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Container,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Tooltip,
  TableRow,
  TableCell,
  TextField,
  Grid,
} from "@material-ui/core";
import {
  MoreVert,
  AccountCircle as AccountCircleIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";
import debounce from "lodash.debounce";
import _ from "lodash";

import { CareInterface, CareState } from "../../../store/ducks/cares/types";

import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/";
import {
  loadRequest,
  searchCareRequest as getCares,
  loadRequestPopUp,
} from "../../../store/ducks/cares/actions";

import PaginationComponent from "../../../components/Pagination";
import Sidebar from "../../../components/Sidebar";
import SearchComponent from "../../../components/List/Search";
import Loading from "../../../components/Loading";
import Table from "../../../components/Table";

import { FormTitle } from "../../../styles/components/Form";
import { ComplexityStatus } from "../../../styles/components/Table";

import { formatDate } from "../../../helpers/date";
import { uniqBy } from "cypress/types/lodash";
import { createInterface } from "readline";
import { any } from "cypress/types/bluebird";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import HistoryDialog from "../../../components/Dialogs/History";

export default function CouncilList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const careState = useSelector((state: ApplicationState) => state.cares);
  const [tabIndex, setTabIndex] = useState(0);

  let valueStatus: string;

  useEffect(() => {
    if (tabIndex === 0) {
      dispatch(getCares({ status: "Atendimento" }));
      valueStatus = "Atendimento";
    } else if (tabIndex === 1) {
      dispatch(getCares({ status: "Alta" }));
      valueStatus = "Alta";
    } else {
      dispatch(getCares({ status: "Todos" }));
      valueStatus = "Todos";
    }

    // if (!(sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION))) {
    //   dispatch(loadRequestPopUp({
    //     page: '1',
    //     limit: '1000',
    //     total: 1000,
    //     search
    //   }));
    // }
  }, [tabIndex]);

  useEffect(() => {
    let array = _.uniqBy(careState.list.data, "patient_id.name");
    setCareFilter(array);
  }, [careState.list.data]);

  const [search, setSearch] = useState("");

  const [historyPatient, setHistoryPatient] = useState("");
  const [historyPatientName, setHistoryPatientName] = useState("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [careIndex, setCareIndex] = useState(0);

  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const [patientArray, setpatientArray] = useState<any>();

  const [careFilter, setCareFilter] = useState<any>([]);

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
  //     dispatch(getCares({ search: event.target.value, status: valueStatus }));
  //   },
  //   [search]
  // );

  // const debounceSearchRequest = debounce(handleChangeInput, 900);
  const handleSearchInput = useCallback((event: any) => {
    dispatch(getCares({ search: event, status: valueStatus }));
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

  const handleComplexity = (complexity: any) => {
    if (complexity === "Sem Complexidade" || complexity === "") {
      return "-";
    }
    return complexity;
  };

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const isDone = useCallback(
    (care: any) => {
      let patientId = _.filter(careState.list2.data, {
        patient_id: { _id: care?.patient_id._id },
      });
      //console.log("teste", patientId);
      setpatientArray(patientId);
      //console.log(patientArray);
    },
    [careState]
  );

  const toggleHistoryModal = (index: number, care: any) => {
    handleCloseRowMenu();
    setCareIndex(index);
    isDone(care);
    setHistoryModalOpen(!historyModalOpen);
    setHistoryPatient(care.patient_id._id);
    setHistoryPatientName(care.patient_id.name);
  };

  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

  function handleEmpty(value: any) {
    return value ? value : "-";
  }

  const tableCells = [
    { name: "Data do Atendimento", align: "left" },
    { name: "Atendimento", align: "left" },
    { name: "Data da Alta", align: "left" },
    { name: "Tipo", align: "center" },
    { name: "Empresa", align: "center" },
    { name: "Visualizar", align: "center" },
  ];

  return (
    <>
      <Sidebar>
        {careState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Atendimentos</FormTitle>

          {integration ? (
            <>
              <SearchComponent
                handleButton={() => history.push("/care/create/")}
                buttonTitle=""
                inputPlaceholder="Pesquise por nome, nº de atendimento, CPF, etc..."
                switches={true}
                setTabIndex={setTabIndex}
                onChangeInput={handleChangeInput}
                value={search}
                onKeyEnter={handleKeyEnter}
                onClickSearch={handleClickSearch}
              />
              <Table
                tableCells={[
                  { name: "Atendimento", align: "left" },
                  { name: "Paciente", align: "left" },
                  { name: "Tipo", align: "center" },
                  { name: "CPF", align: "center" },
                  { name: "Data de Atendimento", align: "center" },
                ]}
                careState={careState}
                careFilter={careFilter}
                toggleHistoryModal={toggleHistoryModal}
              >
                {/* {careState.list.data.map(
                  (care: CareInterface, index: number) => (
                    <TableRow key={`care_${index}`}>
                      <TableCell>
                        <Link to={`/care/${care._id}/overview`}>
                          {handleEmpty(care._id)}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/care/${care._id}/overview`}>
                          {care.patient_id?.social_status
                            ? handleEmpty(care.patient_id.social_name)
                            : handleEmpty(care.patient_id.name)}
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        {handleEmpty(care?.tipo)}
                      </TableCell>
                      <TableCell align="center">
                        {handleEmpty(care.patient_id?.fiscal_number)}
                      </TableCell>
                      <TableCell align="center">
                        {care?.created_at
                          ? formatDate(
                              care?.created_at ?? "",
                              "DD/MM/YYYY HH:mm:ss"
                            )
                          : "-"}
                      </TableCell>
                    </TableRow>
                  )
                )} */}
              </Table>
            </>
          ) : (
            <>
              <SearchComponent
                handleButton={() => history.push("/care/create/")}
                buttonTitle=""
                inputPlaceholder="Pesquise por nome, nº de atendimento, CPF, etc..."
                switches={true}
                setTabIndex={setTabIndex}
                onChangeInput={handleChangeInput}
                value={search}
                onKeyEnter={handleKeyEnter}
                onClickSearch={handleClickSearch}
              />

              <Table
                tableCells={[
                  { name: "Atendimento", align: "left" },
                  { name: "Paciente", align: "left" },
                  { name: "Tipo", align: "left" },
                  { name: "CPF", align: "left" },
                  { name: "Último Atendimento", align: "left" },
                  { name: "Complexidade", align: "left" },
                  { name: " ", align: "left" },
                ]}
                careState={careState}
                careFilter={careFilter}
                handleComplexity={handleComplexity}
                toggleHistoryModal={toggleHistoryModal}
              >
                {/* {careFilter.map((care: CareInterface, index: number) => (
                  <TableRow key={`care_${index}`}>
                    <TableCell>{care?._id}</TableCell>
                    <TableCell>
                      <Link to={`/care/${care._id}/overview`}>
                        {care.patient_id?.social_name || care.patient_id?.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {typeof care?.care_type_id === "object"
                        ? care?.care_type_id.name
                        : care?.care_type_id}
                    </TableCell>
                    <TableCell>{care.patient_id?.fiscal_number}</TableCell>

                    <TableCell align="center">
                      {care?.started_at
                        ? formatDate(
                            care?.started_at ?? "",
                            "DD/MM/YYYY HH:mm:ss"
                          )
                        : "-"}
                    </TableCell>
                    <TableCell align="left">
                      <ComplexityStatus
                        status={care?.complexity || care?.capture?.complexity}
                      >
                        <p>
                          {handleComplexity(
                            care?.complexity || care?.capture?.complexity
                          )}
                        </p>
                      </ComplexityStatus>
                    </TableCell>
                    <TableCell>
                      <Button
                        aria-controls={`simple-menu${index}`}
                        id={`btn_simple-menu${index}`}
                        aria-haspopup="true"
                        onClick={handleOpenRowMenu}
                      >
                        <MoreVert style={{ color: "#0899BA" }} />
                      </Button>
                      <Menu
                        id={`simple-menu${index}`}
                        anchorEl={anchorEl}
                        keepMounted
                        open={anchorEl?.id === `btn_simple-menu${index}`}
                        onClose={handleCloseRowMenu}
                      >
                        <MenuItem
                          onClick={() => toggleHistoryModal(index, care)}
                        >
                          Histórico
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))} */}
              </Table>
            </>
          )}
          <PaginationComponent
            page={careState.list.page}
            rowsPerPage={careState.list.limit}
            totalRows={careState.list.total}
            handleFirstPage={() =>
              dispatch(
                loadRequest({
                  page: "1",
                  limit: careState.list.limit,
                  total: careState.list.total,
                  status: valueStatus,
                  search,
                })
              )
            }
            handleLastPage={() =>
              dispatch(
                loadRequest({
                  page: Math.ceil(
                    +careState.list.total / +careState.list.limit
                  ).toString(),
                  limit: careState.list.limit,
                  total: careState.list.total,
                  status: valueStatus,
                  search,
                })
              )
            }
            handleNextPage={() =>
              dispatch(
                loadRequest({
                  page: (+careState.list.page + 1).toString(),
                  limit: careState.list.limit,
                  total: careState.list.total,
                  status: valueStatus,
                  search,
                })
              )
            }
            handlePreviosPage={() =>
              dispatch(
                loadRequest({
                  page: (+careState.list.page - 1).toString(),
                  limit: careState.list.limit,
                  total: careState.list.total,
                  status: valueStatus,
                  search,
                })
              )
            }
            handleChangeRowsPerPage={(event) =>
              dispatch(
                loadRequest({
                  limit: event.target.value,
                  page: "1",
                  status: valueStatus,
                  search,
                })
              )
            }
          />
        </Container>
        {/* data(verificar)-atendimento-data alta(verifica)-tipo-empresa */}
        {/* {Histórico} */}

        <HistoryDialog
          modalOpen={historyModalOpen}
          setModalOpen={setHistoryModalOpen}
          historyPatient={historyPatient}
          historyPatientName={historyPatientName}
          tableCells={tableCells}
          historyType={"care"}
        />

        {/*<Dialog*/}

        {/*  maxWidth="lg"*/}
        {/*  open={historyModalOpen}*/}
        {/*  onClose={() => setHistoryModalOpen(false)}*/}
        {/*  aria-labelledby="scroll-dialog-title"*/}
        {/*  aria-describedby="scroll-dialog-description"*/}
        {/*>*/}
        {/*  <DialogTitle id="scroll-dialog-title"><h3>Histórico de Atendimento</h3></DialogTitle>*/}
        {/*  <DialogContent>*/}
        {/*    <DialogContentText*/}
        {/*      id="scroll-dialog-description"*/}
        {/*      tabIndex={-1}*/}
        {/*    >*/}
        {/*      <Grid container style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>*/}
        {/*        <Grid item md={1} style={{padding: "0"}}>*/}
        {/*          <AccountCircleIcon style={{color: '#0899BA', fontSize: '30pt'}}/>*/}
        {/*        </Grid>*/}
        {/*        <Grid item md={11} style={{padding: "0", paddingTop: "0.4rem"}}>*/}
        {/*          <h3 style={{color: '#333333'}}>{careState.list.data[careIndex]?.patient_id.name}</h3>*/}
        {/*        </Grid>*/}
        {/*      </Grid>*/}
        {/*      <Table*/}
        {/*        tableCells={[*/}
        {/*          {name: 'Data do Atendimento', align: 'left'},*/}
        {/*          {name: 'Atendimento', align: 'left'},*/}
        {/*          {name: 'Data da Alta', align: 'left'},*/}
        {/*          {name: 'Tipo', align: 'center'},*/}
        {/*          {name: 'Visualizar', align: 'center'}*/}
        {/*        ]}*/}
        {/*      >*/}
        {/*        {patientArray?.map((patient: any, index: number) => {*/}
        {/*          console.log(patient)*/}
        {/*          return (*/}
        {/*            <TableRow key={`patient_${index}`}>*/}
        {/*              <TableCell>*/}
        {/*                <p>{patient?.started_at ? formatDate(patient?.started_at ?? "", "DD/MM/YYYY") : ""}</p>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell align="center">*/}
        {/*                <p>{patient?._id}</p>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell align="center">*/}
        {/*                <p>-</p>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell align="center">*/}
        {/*                {typeof patient?.care_type_id === "object"*/}
        {/*                  ? patient?.care_type_id.name*/}
        {/*                  : patient?.care_type_id}*/}
        {/*              </TableCell>*/}
        {/*              <TableCell align="center">*/}
        {/*                <Button onClick={() => history.push(`/care/${patient?._id}/overview`)}>*/}
        {/*                  <VisibilityIcon style={{color: '#0899BA'}}/>*/}
        {/*                </Button>*/}
        {/*              </TableCell>*/}
        {/*            </TableRow>*/}
        {/*          )*/}
        {/*        })}*/}
        {/*      </Table>*/}
        {/*    </DialogContentText>*/}
        {/*  </DialogContent>*/}
        {/*  <DialogActions>*/}
        {/*    <Button onClick={() => setHistoryModalOpen(false)} color="primary">*/}
        {/*      <h3 style={{color: '#0899BA', fontSize: '11pt'}}>Fechar</h3>*/}
        {/*    </Button>*/}
        {/*  </DialogActions>*/}
        {/*</Dialog>*/}
      </Sidebar>
    </>
  );
}
