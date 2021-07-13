import React, { useEffect, useCallback } from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Radio, RadioGroup, FormControlLabel, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { healthInsuranceRequest, healthPlanRequest, healthSubPlanRequest } from '../../../store/ducks/cares/actions';

import Loading from '../../Loading';

import { FieldContent } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';

interface IDialogProps {
  dialogState: boolean;
  toogleModalState: Function;
  captureData: any;
  setCaptureData: Function;
  saveCallback: Function;
}

export default function CaptureDataDialog(props: IDialogProps) {
  const dispatch = useDispatch();

  const careState = useSelector((state: ApplicationState) => state.cares);

  const { dialogState, toogleModalState, captureData, setCaptureData, saveCallback } = props;

  useEffect(() => {
    dispatch(healthInsuranceRequest());
  }, []);

  const selectHealhInsurance = useCallback(() => {
    const selected = careState.healthInsurance.filter(item => item._id === captureData.health_insurance_id);
    return (selected[0]) ? selected[0] : null;
  }, [captureData.health_insurance_id]);

  const selectHealhPlan = useCallback(() => {
    const selected = careState.healthPlan.filter(item => item._id === captureData.health_plan_id);
    return (selected[0]) ? selected[0] : null;
  }, [captureData.health_plan_id]);

  const selectHealhSubPlan = useCallback(() => {
    const selected = careState.healthSubPlan.filter(item => item._id === captureData.health_sub_plan_id);
    return (selected[0]) ? selected[0] : null;
  }, [captureData.health_sub_plan_id]);

  return (
    <>
      {careState.loading && <Loading />}
      <Dialog
        open={dialogState}
        onClose={() => toogleModalState(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="scroll-dialog-title">Preencha os dados da captação</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >Para iniciar a captação, é obrigatório preencher as informações abaixo.</DialogContentText>

          <div>
            <p>O paciente encontra-se internado?</p>
            <RadioGroup onChange={e => setCaptureData({ ...captureData, inpatient: e.target.value === 'Sim' })} style={{ marginBottom: 20 }}>
              <FormControlLabel
                value="Não"
                control={<Radio color="primary" />}
                label="Não"
                // checked={!captureData.inpatient}
              />
              <FormControlLabel
                value="Sim"
                control={<Radio color="primary" />}
                label="Sim"
                // checked={captureData.inpatient}
              />
            </RadioGroup>

            <Grid container>

              <Grid item md={5}>
                <FieldContent style={{ paddingRight: 15 }}>
                  <Autocomplete
                    id="combo-box-health-insurance"
                    options={careState.healthInsurance}
                    getOptionLabel={(option) => option.name}
                    value={selectHealhInsurance()}
                    getOptionSelected={(option, value) => option._id === captureData.health_insurance_id}
                    renderInput={(params) => <TextField {...params} label="Convênio" variant="outlined" />}
                    onChange={(event, value) => {
                      if (value) {
                        setCaptureData({ ...captureData, health_insurance_id: value._id })
                      }
                      dispatch(healthPlanRequest(value && value._id));
                    }}
                    size="small"
                    noOptionsText="Nenhum convênio encontrado"
                    fullWidth
                  />
                </FieldContent>
              </Grid>

              <Grid item md={6}></Grid>

              <Grid item md={4}>
                <FieldContent style={{ paddingRight: 15 }}>
                  <TextField
                    id="input-order-number"
                    label="Número de Guia"
                    variant="outlined"
                    size="small"
                    value={captureData.order_number}
                    onChange={(element) => setCaptureData({ ...captureData, order_number: element.target.value })}
                    fullWidth
                  />
                </FieldContent>
              </Grid>

              <Grid item md={4}>
                <FieldContent style={{ paddingRight: 15 }}>
                  <Autocomplete
                    id="combo-box-health-plan"
                    options={careState.healthPlan}
                    getOptionLabel={(option) => option.name}
                    value={selectHealhPlan()}
                    getOptionSelected={(option, value) => option._id === captureData.health_plan_id}
                    renderInput={(params) => <TextField {...params} label="Plano" variant="outlined" />}
                    size="small"
                    onChange={(event, value) => {
                      if (value) {
                        setCaptureData({ ...captureData, health_plan_id: value._id })
                      }
                      dispatch(healthSubPlanRequest(value && value._id));
                    }}
                    noOptionsText="Nenhum plano encontrado"
                    fullWidth
                  />
                </FieldContent>
              </Grid>

              <Grid item md={4}>
                <FieldContent>
                  <Autocomplete
                    id="combo-box-health-sub-plan"
                    options={careState.healthSubPlan}
                    getOptionLabel={(option) => option.name}
                    value={selectHealhSubPlan()}
                    getOptionSelected={(option, value) => option._id === captureData.health_sub_plan_id}
                    renderInput={(params) => <TextField {...params} label="Sub-Plano" variant="outlined" />}
                    size="small"
                    onChange={(event, value) => {
                      if (value) {
                        setCaptureData({ ...captureData, health_sub_plan_id: value._id })
                      }
                    }}
                    noOptionsText="Nenhum sub-plano encontrado"
                    fullWidth
                  />
                </FieldContent>
              </Grid>

              <Grid item md={8}>
                <FieldContent style={{ paddingRight: 15 }}>
                  <TextField
                    id="input-hospital"
                    label="Hospital"
                    variant="outlined"
                    size="small"
                    value={captureData.hospital}
                    onChange={(element) => setCaptureData({ ...captureData, hospital: element.target.value })}
                    fullWidth
                  />
                </FieldContent>
              </Grid>

              <Grid item md={4}>
                <FieldContent>
                  <TextField
                    id="input-hospital-unity"
                    label="Unidade"
                    variant="outlined"
                    size="small"
                    value={captureData.unity}
                    onChange={(element) => setCaptureData({ ...captureData, unity: element.target.value })}
                    fullWidth
                  />
                </FieldContent>
              </Grid>

              <Grid item md={6}>
                <FieldContent style={{ paddingRight: 15 }}>
                  <TextField
                    id="input-assistance-doctor"
                    label="Médico Assistente"
                    variant="outlined"
                    size="small"
                    value={captureData.assistant_doctor}
                    onChange={(element) => setCaptureData({ ...captureData, assistant_doctor: element.target.value })}
                    fullWidth
                  />
                </FieldContent>
              </Grid>

              <Grid item md={3}>
                <FieldContent style={{ paddingRight: 15 }}>
                  <TextField
                    id="input-hospital-sector"
                    label="Setor"
                    variant="outlined"
                    size="small"
                    value={captureData.sector}
                    onChange={(element) => setCaptureData({ ...captureData, sector: element.target.value })}
                    fullWidth
                  />
                </FieldContent>
              </Grid>

              <Grid item md={3}>
                <FieldContent>
                  <TextField
                    id="input-hospital-room"
                    label="Leito"
                    variant="outlined"
                    size="small"
                    value={captureData.bed}
                    onChange={(element) => setCaptureData({ ...captureData, bed: element.target.value })}
                    fullWidth
                  />
                </FieldContent>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toogleModalState(false)} color="primary">Fechar</Button>
          <Button onClick={() => {
            toogleModalState(false);
            saveCallback();
          }} color="primary">
            Salvar
        </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
