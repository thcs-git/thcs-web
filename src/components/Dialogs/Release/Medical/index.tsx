import React, {useEffect, useCallback, useState} from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Radio, RadioGroup, FormControlLabel, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';

import Loading from '../../../Loading';
import {FieldContent} from "../../../../styles/components/Form";
import MuiPickersUtilsProvider, {DateTimePicker} from "@material-ui/pickers";


interface IDialogProps {
  modalOpen: any;
  setModalOpen: any;
}

export default function MedicalReleaseDialog(props: IDialogProps) {
  const {modalOpen, setModalOpen} = props
  const dispatch = useDispatch();

  const careState = useSelector((state: ApplicationState) => state.cares);

  useEffect(() => {
    // dispatch(healthInsuranceRequest());
  }, []);

  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <>
      {careState.loading && <Loading />}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="scroll-dialog-title">Preencha os dados da alta médica</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >texto de apoio.</DialogContentText>

          <div>
            <Grid container>
              {/*<Grid item md={5}>*/}
              {/*  <FieldContent style={{ paddingRight: 15 }}>*/}
              {/*    <Autocomplete*/}
              {/*      disabled={cantEdit}*/}
              {/*      id="combo-box-health-insurance"*/}
              {/*      options={careState.healthInsurance}*/}
              {/*      getOptionLabel={(option) => option.name}*/}
              {/*      value={selectHealhInsurance()}*/}
              {/*      getOptionSelected={(option, value) => option._id === captureData.health_insurance_id}*/}
              {/*      renderInput={(params) => <TextField {...params} label="Convênio" variant="outlined" />}*/}
              {/*      onChange={(event, value) => {*/}
              {/*        if (value) {*/}
              {/*          setCaptureData({ ...captureData, health_insurance_id: value._id })*/}
              {/*        }*/}
              {/*        dispatch(healthPlanRequest(value && value._id));*/}
              {/*      }}*/}
              {/*      size="small"*/}
              {/*      noOptionsText="Nenhum convênio encontrado"*/}
              {/*      fullWidth*/}
              {/*    />*/}
              {/*  </FieldContent>*/}
              {/*</Grid>*/}

              <Grid item md={5}>
                <FieldContent style={{ paddingRight: 15 }}>
                  <TextField
                    id="input-hospital-sector"
                    label="Setor"
                    variant="outlined"
                    size="small"
                    value={''}
                    // onChange={(element) => setCaptureData({ ...captureData, sector: element.target.value })}
                    disabled={false}
                    fullWidth
                  />
                </FieldContent>
              </Grid>

              {/*<Grid item md={5}>*/}
              {/*</Grid>*/}

            </Grid>
          </div>
        </DialogContent>
        {/*<DialogActions>*/}
        {/*  {*/}
        {/*    (cantEdit != true)?(*/}
        {/*      <>*/}
        {/*        <Button onClick={() => toogleModalState(false)} color="primary">Fechar</Button>*/}
        {/*        <Button onClick={() => {*/}
        {/*          toogleModalState(false);*/}
        {/*          saveCallback();*/}
        {/*        }} color="primary">*/}
        {/*          Salvar*/}
        {/*        </Button>*/}
        {/*      </>*/}
        {/*    ):(*/}
        {/*      <Button onClick={() => toogleModalState(false)} color="primary">Fechar</Button>*/}
        {/*    )*/}
        {/*  }*/}
        {/*</DialogActions>*/}
      </Dialog>
    </>
  );
}
