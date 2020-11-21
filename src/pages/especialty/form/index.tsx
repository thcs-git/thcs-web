import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest } from '../../../store/ducks/especialties/actions';
import { ApplicationState } from '../../../store';

import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SearchOutlined } from '@material-ui/icons';

import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';

import {
  ButtonsContent,
  FormSection,
  FormContent,
  InputFiled as TextField,
  FormGroupSection
} from './styles';

interface IFormFields {
  id?: string;
  description: string;
  councilId: string,
  active: boolean;
}

interface IPageParams {
  id?: string;
}

export default function EspecialtyForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const especialtyState = useSelector((state: ApplicationState) => state.especialties).data;
  const councils = [
    { id: '1', description: 'CRM' },
    { id: '2', description: 'CRO' },
  ]

  const [state, setState] = useState<IFormFields>({
    id: props.match.params.id || '',
    description: '',
    councilId: '',
    active: true
  });

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    dispatch(loadRequest());
    setState({ ...state, ...especialtyState })
  }, [dispatch]);

  function handleSaveFormCustomer() {
    console.log(state);
  }

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    history.back();
  }

  return (
    <Sidebar>
      {console.log('especialtyState', especialtyState)}
      <Container>
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Especialidades</FormTitle>

            <FormGroupSection>
              <Grid container>
                {state?.id && (
                  <Grid item md={12} xs={12}>
                    <TextField
                      id="input-customer-id"
                      label="ID"
                      variant="outlined"
                      size="small"
                      value={state.id}
                      fullWidth
                      disabled
                    />
                  </Grid>
                )}
                <Grid item md={12} xs={12}>
                  <TextField
                    id="input-social-name"
                    label="Descrição"
                    variant="outlined"
                    size="small"
                    value={state.description}
                    onChange={(element) => setState({ ...state, description: element.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={councils}
                    getOptionLabel={(option) => option.description}
                    renderInput={(params) => <TextField {...params} label="Conselho" variant="outlined" />}
                    onChange={(event, value) => {
                      setState({ ...state, councilId: value?.id || '' });
                    }}
                    size="small"
                    fullWidth
                  />
                </Grid>
                {state?.id && (
                  <Grid item>
                    <FormControlLabel control={<Switch onChange={(event) => setState({ ...state, active: event.target.checked })} />} label="Ativo?" />
                  </Grid>
                )}
              </Grid>
            </FormGroupSection>
          </FormContent>
          <ButtonsContent>
            <Button variant="outlined" background="default" onClick={() => handleOpenModalCancel()}>
              Cancelar
              </Button>
            <Button variant="contained" background="success" onClick={() => handleSaveFormCustomer()}>
              Salvar
					</Button>
          </ButtonsContent>
        </FormSection>
      </Container>
      <Dialog
        open={openModalCancel}
        onClose={handleCloseModalCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cancelar</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja cancelar este cadastro?
					</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalCancel} color="primary">
            Não
					</Button>
          <Button onClick={handleCancelForm} color="primary" autoFocus>
            Sim
					</Button>
        </DialogActions>
      </Dialog>
    </Sidebar>
  );
}
