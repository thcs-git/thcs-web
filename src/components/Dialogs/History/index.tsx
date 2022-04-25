import React, { useEffect, useCallback } from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  healthInsuranceRequest,
  healthPlanRequest,
  healthSubPlanRequest,
  loadHistoryRequest,
} from "../../../store/ducks/cares/actions";

import Loading from "../../Loading";

import { FieldContent } from "../../../styles/components/Form";
import Button from "@mui/material/Button";
import {
  AccountCircle as AccountCircleIcon,
  FiberManualRecord,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";
import Table from "../../Table";
import { formatDate } from "../../../helpers/date";
import { useHistory } from "react-router-dom";
import { ListItemCaptureStatus } from "../../../pages/avaliation/list/styles";
import {
  HighComplexityLabel,
  LowerComplexityLabel,
  MediumComplexityLabel,
} from "../../../styles/components/Text";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

interface IDialogProps {
  modalOpen: any;
  setModalOpen: any;
  historyPatient: any;
  historyPatientName?: any;
  historyType?: any;
  tableCells?: any;
}

export default function HistoryDialog(props: IDialogProps) {
  const {
    modalOpen,
    setModalOpen,
    historyPatient,
    historyPatientName,
    tableCells,
    historyType,
  } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
  const careState = useSelector((state: ApplicationState) => state.cares);
  const handleType = useCallback(
    (care: any) => {
      let complexitiesArray: any = [];
      let complexity: string = "";
      care?.documents_id?.map((field: any) => {
        complexitiesArray.push(field.complexity);
      });
      if (
        complexitiesArray.findIndex(
          (item: string) => item === "Alta Complexidade"
        ) > -1
      ) {
        complexity = "Internação";
      } else if (
        complexitiesArray.findIndex(
          (item: string) => item === "Média Complexidade"
        ) > -1
      ) {
        complexity = "Internação";
      } else if (
        complexitiesArray.findIndex(
          (item: string) => item === "Baixa Complexidade"
        ) > -1
      ) {
        complexity = "Internação";
      } else if (
        complexitiesArray.findIndex(
          (item: string) => item === "Sem Complexidade"
        ) > -1
      ) {
        complexity = "Atenção";
      } else {
        complexity = "-";
      }

      return complexity;
    },
    [careState]
  );

  const handleCoplexities = useCallback(
    (care: any) => {
      let complexitiesArray: any = [];
      let complexity: string = "";
      care?.documents_id?.map((field: any) => {
        // complexitiesArray.push(field.complexity);
        complexitiesArray.push(care?.capture.complexity);
      });
      if (
        complexitiesArray.findIndex(
          (item: string) => item === "Alta Complexidade"
        ) > -1
      ) {
        complexity = "Alta";
      } else if (
        complexitiesArray.findIndex(
          (item: string) => item === "Média Complexidade"
        ) > -1
      ) {
        complexity = "Média";
      } else if (
        complexitiesArray.findIndex(
          (item: string) => item === "Baixa Complexidade"
        ) > -1
      ) {
        complexity = "Baixa";
      } else {
        complexity = "-";
      }

      switch (complexity.toLocaleLowerCase()) {
        case "sem complexidade":
          return "-";

        case "baixa":
          return <LowerComplexityLabel>{complexity}</LowerComplexityLabel>;

        case "média":
          return <MediumComplexityLabel>{complexity}</MediumComplexityLabel>;

        case "alta":
          return <HighComplexityLabel>{complexity}</HighComplexityLabel>;

        default:
          return "-";
      }
    },
    [careState]
  );

  useEffect(() => {
    if (historyPatient) {
      historyType === "care"
        ? dispatch(loadHistoryRequest(historyPatient, "Atendimento"))
        : dispatch(loadHistoryRequest(historyPatient, ""));
    }
  }, [historyPatient]);

  return (
    <>
      {careState.loading && <Loading />}
      <Dialog
        maxWidth="lg"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {historyType === "care" ? (
          <DialogTitle id="scroll-dialog-title">
            <h3>Histórico de Atendimento</h3>
          </DialogTitle>
        ) : (
          <DialogTitle id="scroll-dialog-title">
            <h3>Histórico de Captações</h3>
          </DialogTitle>
        )}
        <DialogContent>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Grid item md={1} style={{ padding: "0" }}>
                <AccountCircleIcon
                  style={{ color: "#0899BA", fontSize: "30pt" }}
                />
              </Grid>
              <Grid item md={11} style={{ padding: "0", paddingTop: "0.4rem" }}>
                <h3 style={{ color: "#333333" }}>{historyPatientName}</h3>
              </Grid>
            </Grid>
            <Table
              tableCells={tableCells}
              careState={careState}
              historyModalOpen={modalOpen}
              integration={integration}
              typeTable={"historyCare"}
              // attendanceHistory={careState?.history}
            >
              {/*{careState?.history?.map((care: any, index: number) => {*/}

              {/*  return (*/}
              {/*    <>*/}
              {/*      {historyType === 'care' ? (*/}
              {/*        <>*/}
              {/*          <TableRow key={`patient_${index}`}>*/}
              {/*            <TableCell>*/}
              {/*              <p>{care?.started_at ? formatDate(care?.started_at ?? "", "DD/MM/YYYY") : ""}</p>*/}
              {/*            </TableCell>*/}
              {/*            <TableCell align="center">*/}
              {/*              <p>{care?._id}</p>*/}
              {/*            </TableCell>*/}
              {/*            <TableCell align="center">*/}
              {/*              <p>-</p>*/}
              {/*            </TableCell>*/}
              {/*            <TableCell align="center">*/}
              {/*              <p>*/}
              {/*                {typeof care?.care_type_id === "object"*/}
              {/*                  ? care?.care_type_id.name*/}
              {/*                  : care?.care_type_id}*/}
              {/*              </p>*/}
              {/*            </TableCell>*/}
              {/*            <TableCell align="center">*/}
              {/*              <p>{care?.company_id?.name}</p>*/}
              {/*            </TableCell>*/}
              {/*            <TableCell align="center">*/}
              {/*              <Button onClick={() => history.push(`/care/${care?._id}/overview`)}>*/}
              {/*                <VisibilityIcon style={{color: '#0899BA'}}/>*/}
              {/*              </Button>*/}
              {/*            </TableCell>*/}
              {/*          </TableRow>*/}
              {/*        </>*/}
              {/*      ) : (*/}
              {/*        <>*/}
              {/*          <TableRow key={`patient_${index}`}>*/}
              {/*            <TableCell align="center">*/}
              {/*              <p>{care?.capture?.finished_at ? formatDate(care?.finished_at, 'DD/MM/YYYY') : '-'}</p>*/}
              {/*            </TableCell>*/}
              {/*            <TableCell align="center">*/}
              {/*              <p>{handleType(care)}</p>*/}
              {/*            </TableCell>*/}
              {/*            <TableCell align="center">*/}
              {/*              <p>{handleCoplexities(care)}</p>*/}
              {/*            </TableCell>*/}
              {/*            <TableCell align="center">*/}
              {/*              <ListItemCaptureStatus status={care?.capture?.status || ''}>*/}
              {/*                <FiberManualRecord/> {care?.capture?.status}*/}
              {/*              </ListItemCaptureStatus>*/}
              {/*            </TableCell>*/}
              {/*            <TableCell align="center">*/}
              {/*              <p>{care?.company_id?.name}</p>*/}
              {/*            </TableCell>*/}
              {/*            <TableCell align="center">*/}
              {/*              <Button onClick={() => history.push(`/patient/capture/${care?._id}/overview`)}>*/}
              {/*                <VisibilityIcon style={{color: '#0899BA'}}/>*/}
              {/*              </Button>*/}
              {/*            </TableCell>*/}
              {/*          </TableRow>*/}
              {/*        </>*/}
              {/*      )}*/}
              {/*    </>*/}
              {/*  )*/}
              {/*})}*/}

              {/*{patientArray?.map((patient: any, index: number) => {*/}
              {/*  console.log(patient)*/}
              {/*  return (*/}
              {/*    <TableRow key={`patient_${index}`}>*/}
              {/*      <TableCell>*/}
              {/*        <p>{patient?.started_at ? formatDate(patient?.started_at ?? "", "DD/MM/YYYY") : ""}</p>*/}
              {/*      </TableCell>*/}
              {/*      <TableCell align="center">*/}
              {/*        <p>{patient?._id}</p>*/}
              {/*      </TableCell>*/}
              {/*      <TableCell align="center">*/}
              {/*        <p>-</p>*/}
              {/*      </TableCell>*/}
              {/*      <TableCell align="center">*/}
              {/*        {typeof patient?.care_type_id === "object"*/}
              {/*          ? patient?.care_type_id.name*/}
              {/*          : patient?.care_type_id}*/}
              {/*      </TableCell>*/}
              {/*      <TableCell align="center">*/}
              {/*        <Button onClick={() => history.push(`/care/${patient?._id}/overview`)}>*/}
              {/*          <VisibilityIcon style={{color: '#0899BA'}}/>*/}
              {/*        </Button>*/}
              {/*      </TableCell>*/}
              {/*    </TableRow>*/}
              {/*  )*/}
              {/*})}*/}
            </Table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalOpen(false)}
            color="primary"
            sx={{ cursor: "pointer", "& span": { cursor: "pointer" } }}
          >
            <h3
              style={{ color: "#0899BA", fontSize: "11pt", cursor: "pointer" }}
            >
              Fechar
            </h3>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
