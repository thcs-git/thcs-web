import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Radio, RadioGroup, FormControlLabel, TextField, FormControl, Card, CardContent } from '@material-ui/core';


import { setIfRegistrationCompleted } from '../../../../store/ducks/patients/actions';
import { CareInterface } from '../../../../store/ducks/cares/types';
import { createCareRequest as createCareAction } from '../../../../store/ducks/cares/actions';

import Button from '../../../../styles/components/Button';
import { ReactComponent as SuccessImage } from '../../../../assets/img/ilustracao-avaliacao-concluida.svg';
import { ReactComponent as IconProfile } from '../../../../assets/img/icon-profile.svg';

import { BoxCustom as Box, Profile, SuccessContent, ButtonsContainer, PatientWrapper } from './styles';
import { ApplicationState } from '../../../../store';

interface ICaptureData {
  type: string;
  orderNumber: string;
  estimate: string;
}

const registrationCompleted: React.FC<any> = ({ id }) => {
  // ----------------------------------------------
  const [care, setCare] = useState<CareInterface>({
    health_insurance_id: '5f903db15104287582ba58af',
    health_plan_id: '5fd666cd48392d0621196551',
    health_sub_plan_id: '5fd6671f48392d0621196552',
    health_plan_card_validate: '2021-01-30T12:00:00',
    health_plan_card_number: '123456789',
    contract: '123123',
    care_type_id: '5fd66ca189a402ec48110cc1',
    user_id: '5e8cfe7de9b6b8501c8033ac',
    created_by: { _id: '5e8cfe7de9b6b8501c8033ac' },
    status: 'Pre-Atendimento',
    capture: {
      status: 'Em Andamento',
    }
  });
  // ----------------------------------------------

  const history = useHistory();
  const dispatch = useDispatch();

  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const { patients: patientState, cares: careState } = useSelector((state: ApplicationState) => state);

  const [captureOptionsModalOpen, setCaptureModalModalOpen] = useState(false);
  const [captureData, setCaptureData] = useState<ICaptureData>({
    type: '',
    orderNumber: '',
    estimate: '',
  });

  useEffect(() => {
    if (careState.success && !careState.error && careState.data._id) {
      history.push(`/patient/capture/${careState.data._id}/overview`);
    }
  }, [careState])

  const toggleModalConfirm = useCallback((open?: boolean) => {
    open ? setOpenModalConfirm(open) : setOpenModalConfirm(!openModalConfirm);
  }, [openModalConfirm]);

  const handleSubmitPatientCapture = useCallback(() => {
    setOpenModalConfirm(false);

    const params: any = { ...care, patient_id: patientState.data._id };

    dispatch(createCareAction(params))

  }, [dispatch]);

  return (
    <Container>
      <SuccessContent>
        <SuccessImage />
        <h1>Avaliação concluída</h1>

        <p>
        Os dados do paciente foram salvos no sistema. Para iniciar a captação, clique em “iniciar captação”. Se deseja selecionar outro paciente, clique em “Lista de pacientes”. Você pode editar dados deste paciente clicando em”Editar”.
        </p>
      </SuccessContent>

      <Box style={{ background: '#fff' }}>
        <Profile>
          <IconProfile />
          <div>
            <h5>Giulia Gonçalves de Barros</h5>
            <p>30 anos, 2 meses e 3 dias</p>
            <p>052.996.364-74</p>
          </div>
        </Profile>

        <ButtonsContainer>
            <Button variant="outlined" background="success_rounded" onClick={() => {
              dispatch(setIfRegistrationCompleted(false));
              history.push(`/patient/${patientState.data._id}/edit`)
            }}>
              Editar
            </Button>
            {/* <Button variant="contained"  background="success" onClick={() => setCaptureModalModalOpen(true)}> */}
            <Button variant="contained"  background="success" onClick={() => toggleModalConfirm(true)}>
              Iniciar Captação
            </Button>
        </ButtonsContainer>
      </Box>

      <PatientWrapper>
        <Button variant="contained"  background="success_rounded" onClick={() => history.push('/patient')}>
          Listar pacientes
        </Button>
      </PatientWrapper>


        <Dialog
          open={captureOptionsModalOpen}
          onClose={() => setCaptureModalModalOpen(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Selecione o tipo de cobertura</DialogTitle>
          <DialogContent dividers>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >Para iniciar a captação, é obrigatório definir a cobertura. Em caso de convênio, preencher o número da guia.</DialogContentText>

            <div>
              <RadioGroup onChange={e => setCaptureData({ ...captureData, type: e.target.value })} style={{ marginBottom: 20 }}>
                <FormControlLabel
                  value="Particular"
                  control={<Radio color="primary" />}
                  label="Particular"
                  checked={(captureData?.type === 'Particular')}
                />
                <FormControlLabel
                  value="Convênio"
                  control={<Radio color="primary" />}
                  label="Convênio"
                  checked={(captureData?.type === 'Convênio')}
                />
              </RadioGroup>

              {captureData?.type === 'Convênio' && (
                <FormControl>
                  <TextField
                    id="input-order-number"
                    label="Número de Guia"
                    variant="outlined"
                    size="small"
                    value={captureData.orderNumber}
                    onChange={(element) => setCaptureData({ ...captureData, orderNumber: element.target.value })}
                    fullWidth
                  />
                </FormControl>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCaptureModalModalOpen(false)} color="primary">
              Voltar
            </Button>
            <Button onClick={() => setCaptureModalModalOpen(false)} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
            open={openModalConfirm}
            onClose={() => toggleModalConfirm(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Atenção</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tem certeza que deseja iniciar a captação deste paciente?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => toggleModalConfirm()} color="primary">
                Não
                </Button>
              <Button onClick={handleSubmitPatientCapture} color="primary" autoFocus>
                Sim
                </Button>
            </DialogActions>
          </Dialog>
    </Container>
  );
}

export default registrationCompleted;
