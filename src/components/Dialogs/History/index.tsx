import React, {useEffect, useCallback} from 'react';
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
  TableRow, TableCell
} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';

import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../../../store';
import {
  healthInsuranceRequest,
  healthPlanRequest,
  healthSubPlanRequest,
  loadHistoryRequest
} from '../../../store/ducks/cares/actions';

import Loading from '../../Loading';

import {FieldContent} from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';
import {AccountCircle as AccountCircleIcon, Visibility as VisibilityIcon} from "@material-ui/icons";
import Table from "../../Table";
import {formatDate} from "../../../helpers/date";
import {useHistory} from "react-router-dom";

interface IDialogProps {
  modalOpen: any;
  setModalOpen: any;
  historyPatient: any;
  tableCells: any;
}

export default function HistoryDialog(props: IDialogProps) {
  const {modalOpen, setModalOpen, historyPatient, tableCells} = props
  const dispatch = useDispatch();
  const history = useHistory();

  const careState = useSelector((state: ApplicationState) => state.cares);

  useEffect(() => {
    if (historyPatient) {
      dispatch(loadHistoryRequest(historyPatient, 'Atendimento'));
    }
  }, [historyPatient]);

  return (
    <>
      {careState.loading && <Loading/>}
      <Dialog
        maxWidth="lg"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"><h3>Histórico de Atendimento</h3></DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            <Grid container style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Grid item md={1} style={{padding: "0"}}>
                <AccountCircleIcon style={{color: '#0899BA', fontSize: '30pt'}}/>
              </Grid>
              <Grid item md={11} style={{padding: "0", paddingTop: "0.4rem"}}>
                <h3 style={{color: '#333333'}}>{careState.history[0]?.patient_id.name}</h3>
              </Grid>
            </Grid>
            <Table
              tableCells={tableCells}
            >
              {careState?.history?.map((care: any, index: number) => {

                return (
                  <TableRow key={`patient_${index}`}>
                    <TableCell>
                      <p>{care?.started_at ? formatDate(care?.started_at ?? "", "DD/MM/YYYY") : ""}</p>
                    </TableCell>
                    <TableCell align="center">
                      <p>{care?._id}</p>
                    </TableCell>
                    <TableCell align="center">
                      <p>-</p>
                    </TableCell>
                    <TableCell align="center">
                      <p>
                        {typeof care?.care_type_id === "object"
                          ? care?.care_type_id.name
                          : care?.care_type_id}
                      </p>
                    </TableCell>
                    <TableCell align="center">
                      <p>{care?.company_id?.name}</p>
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => history.push(`/care/${care?._id}/overview`)}>
                        <VisibilityIcon style={{color: '#0899BA'}}/>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}

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
          <Button onClick={() => setModalOpen(false)} color="primary">
            <h3 style={{color: '#0899BA', fontSize: '11pt'}}>Fechar</h3>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
