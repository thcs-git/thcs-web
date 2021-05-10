import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Radio, RadioGroup, FormControlLabel, TextField, FormControl } from '@material-ui/core';


import { setIfRegistrationCompleted } from '../../../../store/ducks/patients/actions';
import { CareInterface, ICaptureData } from '../../../../store/ducks/cares/types';
import { createCareRequest as createCareAction } from '../../../../store/ducks/cares/actions';

import Button from '../../../../styles/components/Button';
import { ReactComponent as SuccessImage } from '../../../../assets/img/ilustracao-avaliacao-concluida.svg';
import { ReactComponent as IconProfile } from '../../../../assets/img/icon-profile.svg';

import { BoxCustom as Box, Profile, SuccessContent, ButtonsContainer, PatientWrapper } from './styles';
import { ApplicationState } from '../../../../store';

import CaptureDataDialog from '../../../../components/Dialogs/CaptureData';

import { age } from '../../../../helpers/date';
import LOCALSTORAGE from '../../../../helpers/constants/localStorage';

const registrationCompleted: React.FC<any> = (props) => {
  // ----------------------------------------------
  const [care, setCare] = useState<CareInterface>({
    health_insurance_id: '5f903db15104287582ba58af',
    health_plan_id: '5fd666cd48392d0621196551',
    health_sub_plan_id: '5fd6671f48392d0621196552',
    health_plan_card_validate: '2021-01-30T12:00:00',
    health_plan_card_number: '123456789',
    contract: '123123',
    care_type_id: '5fd66ca189a402ec48110cc1',
    user_id: localStorage.getItem(LOCALSTORAGE.USER_ID) || ``,
    company_id: localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED),
    created_by: { _id: localStorage.getItem(LOCALSTORAGE.USER_ID) || `` },
    status: 'Pre-Atendimento',
    capture: {
      status: 'Em Andamento',
    }
  });
  // ----------------------------------------------

  const history = useHistory();
  const dispatch = useDispatch();

  const { params } = props.match;

  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const { patients: patientState, cares: careState } = useSelector((state: ApplicationState) => state);

  const [captureOptionsModalOpen, setCaptureModalModalOpen] = useState(false);
  const [captureData, setCaptureData] = useState<ICaptureData | any>({
  });

  const handleSubmitCaptureData = () => {
    const careParams = {
      patient_id: patientState.data._id || params.id,
      status: 'Pre-Atendimento',
      capture: {
        ...captureData,
        status: 'Em Andamento',
      },
      care_type_id: '5fd66ca189a402ec48110cc1',
    };

    dispatch(createCareAction(careParams));
  };


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

    const careParams: any = {
      ...care,
      patient_id: patientState.data._id,
    };

    dispatch(createCareAction(careParams))

  }, [dispatch]);

  return (
    <Container>
      <SuccessContent>
        <SuccessImage />
        <h1>Avaliação concluída</h1>

        <p>
          Os dados do paciente foram salvos no sistema. Para iniciar a captação, clique em "iniciar captação". Se deseja selecionar outro paciente, clique em "Lista de pacientes". Você pode editar dados deste paciente clicando em "Editar".
        </p>
      </SuccessContent>

      <Box style={{ background: '#fff' }}>
        <Profile>
          <IconProfile />
          <div>
            <h5>{patientState.data.name}</h5>
            <p>{age(patientState.data.birthdate)}</p>
            <p>{patientState.data.fiscal_number}</p>
          </div>
        </Profile>

        <ButtonsContainer>
          <Button variant="outlined" background="success_rounded" onClick={() => {
            dispatch(setIfRegistrationCompleted(false));
            history.push(`/patient/${params.id}/edit/edit`);
          }}>
            Editar
            </Button>
          <Button variant="contained" background="success" onClick={() => setCaptureModalModalOpen(true)}>
            {/* <Button variant="contained" background="success" onClick={() => toggleModalConfirm(true)}> */}
            Iniciar Captação
            </Button>
        </ButtonsContainer>
      </Box>

      <PatientWrapper>
        <Button variant="contained" background="success_rounded" onClick={() => history.push('/patient')}>
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
          <Button onClick={() => toggleModalConfirm()} color="primary">Não</Button>
          <Button onClick={() => {
            toggleModalConfirm(false);
            setCaptureModalModalOpen(true);
          }}
            color="primary" autoFocus>Sim</Button>
        </DialogActions>
      </Dialog>

      <CaptureDataDialog
        dialogState={captureOptionsModalOpen}
        toogleModalState={() => setCaptureModalModalOpen(false)}
        captureData={captureData}
        setCaptureData={setCaptureData}
        saveCallback={handleSubmitCaptureData}
      />
    </Container>
  );
}

export default registrationCompleted;
