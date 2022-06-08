import React, { useEffect, useCallback } from "react";
//router
import { useHistory } from "react-router-dom";

//redux e saga
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  healthInsuranceRequest,
  healthPlanRequest,
  healthSubPlanRequest,
  loadHistoryRequest,
} from "../../../store/ducks/cares/actions";
//mui
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
  Autocomplete,
  Button,
  Typography,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  FiberManualRecord,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
//styles
import { FieldContent } from "../../../styles/components/Form";
import { ListItemCaptureStatus } from "../../../pages/avaliation/list/styles";
import {
  HighComplexityLabel,
  LowerComplexityLabel,
  MediumComplexityLabel,
} from "../../../styles/components/Text";
import theme from "../../../theme/theme";
//utils
import { formatDate } from "../../../helpers/date";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
//components
import Loading from "../../Loading";
import Table from "../../Table";

interface IDialogProps {
  modalOpen: any;
  setModalOpen: any;
  historyPatient: any;
  historyPatientName?: any;
  historyType?: any;
  tableCells?: any;
}

const capitalizeText = (words: string) => {
  if (words) {
    return words
      .toLowerCase()
      .split(" ")
      .map((text: string) => {
        return (text = text.charAt(0).toUpperCase() + text.substring(1));
      })
      .join(" ");
  } else return "";
};

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
      {/* {careState.loading && <Loading/>} */}
      <Dialog
        maxWidth="lg"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {historyType === "care" ? (
          <DialogTitle id="scroll-dialog-title">
            Histórico de Atendimento
          </DialogTitle>
        ) : (
          <DialogTitle id="scroll-dialog-title">
            Histórico de Captações
          </DialogTitle>
        )}
        <DialogContent>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Grid container sx={{ marginBottom: 2 }}>
              <Grid
                item
                md={12}
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AccountCircleIcon
                  color="primary"
                  fontSize="large"
                  // style={{ fontSize: "30pt" }}
                />
                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  fontWeight="600"
                >
                  {historyPatientName}
                </Typography>
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
            variant="contained"
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
