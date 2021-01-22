import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Radio, RadioGroup, FormControlLabel, TextField, FormControl, Card, CardContent } from '@material-ui/core';


import { setIfRegistrationCompleted } from '../../../../store/ducks/patients/actions';

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
  const history = useHistory();
  const dispatch = useDispatch();
  const patientState = useSelector((state: ApplicationState) => state.patients);

  const [captureOptionsModalOpen, setCaptureModalModalOpen] = useState(false);
  const [captureData, setCaptureData] = useState<ICaptureData>({
    type: '',
    orderNumber: '',
    estimate: '',
  });


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
            <Button variant="contained"  background="success" onClick={() => setCaptureModalModalOpen(true)}>
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
    </Container>
  );
}

export default registrationCompleted;
