import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { loadRequest, loadSpecialtyById, createSpecialtyRequest, updateSpecialtyRequest } from '../../../store/ducks/specialties/actions';
import { SpecialtyInterface } from '../../../store/ducks/specialties/types';

import { loadRequest as getCouncilsAction } from '../../../store/ducks/councils/actions';

import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { FormTitle } from '../../../styles/components/Form';
import Sidebar from '../../../components/Sidebar';
import { SwitchComponent as Switch } from '../../../styles/components/Switch';
import ButtonComponent from '../../../styles/components/Button';

import Loading from '../../../components/Loading';

import {
  ButtonsContent,
  FormSection,
  FormContent,
  InputFiled as TextField,
  FormGroupSection
} from './styles';
import { modify_speciality } from '../../../store/ducks/modify/actions';

interface IPageParams {
  id?: string;
}

export default function SpecialtyForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const specialtyState = useSelector((state: ApplicationState) => state.specialties);
  const councilState = useSelector((state: ApplicationState) => state.councils);

  const { params } = props.match;

  const [state, setState] = useState<SpecialtyInterface>({
    _id: props.match.params.id || '',
    name: '',
    describe: '',
    council_id: { _id: '', name: '' },
    active: true
  });

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    dispatch(loadRequest());
    dispatch(getCouncilsAction())

    if (params.id) {
      dispatch(loadSpecialtyById(params.id))
    }

    dispatch(modify_speciality());
  }, [dispatch, params]);

  useEffect(() => {
    setState(prevState => {
      return {
        ...prevState,
        ...specialtyState.data
      }
    })
  }, [specialtyState]);

  const handleCouncil = useCallback((event: any, newValue: any) => {
    setState(prevState => ({
      ...prevState,
      council_id: newValue,
    }));

  }, [state.council_id]);

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleSaveFormCustomer() {
    if (state?._id) {
      dispatch(updateSpecialtyRequest(state));
    } else {
      dispatch(createSpecialtyRequest(state))
    }
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    history.push(`/specialty`);
  }

  const selectCouncil = useCallback(() => {
    const selected = councilState.list.data.filter(item => item._id === state.council_id._id);
    return (selected[0]) ? selected[0] : null;
  }, [state.council_id]);

  return (
    <Sidebar>
      {specialtyState.loading && <Loading />}
      {console.log('state', state)}
      <Container>
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Especialidades</FormTitle>

            <FormGroupSection>
              <Grid container>
                <Grid item md={12} xs={12}>
                  <TextField
                    id="input-social-name"
                    label="Descrição"
                    variant="outlined"
                    size="small"
                    value={state.name}
                    onChange={(element) => setState({ ...state, name: element.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Autocomplete
                    id="combo-box-council"
                    options={councilState.list.data}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Conselho" variant="outlined" />}
                    value={selectCouncil()}
                    getOptionSelected={(option, value) => option._id === state.council_id._id}
                    onChange={(event: any, newValue) => {
                      handleCouncil(event, newValue);
                    }}
                    size="small"
                    fullWidth
                  />
                </Grid>

                {state?._id && (
                  <Grid item xs={12} md={12}>
                    <FormControlLabel control={<Switch checked={state.active} onChange={(event) => {
                      setState(prevState => ({
                        ...prevState,
                        active: event.target.checked
                      }))
                    }} />} label="Ativo?" />
                  </Grid>
                )}
              </Grid>
            </FormGroupSection>
          </FormContent>
          <ButtonsContent>
            <ButtonComponent background="default" onClick={() => specialtyState.success ? history.push('/specialty') : handleOpenModalCancel()}>
              Voltar
            </ButtonComponent>
            <ButtonComponent variant="contained" background="success" onClick={() => handleSaveFormCustomer()}>
              Salvar
					  </ButtonComponent>
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
