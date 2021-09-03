import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { CouncilInterface } from '../../../store/ducks/councils/types';
import { loadRequest, loadCouncilById, createCouncilRequest, updateCouncilRequest } from '../../../store/ducks/councils/actions';

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
} from '@material-ui/core';

import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';

import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';
import { SwitchComponent as Switch } from '../../../styles/components/Switch';
import ButtonComponent from '../../../styles/components/Button';

import {
  ButtonsContent,
  FormSection,
  FormContent,
  InputFiled as TextField,
  FormGroupSection
} from './styles';
import { modify_council } from '../../../store/ducks/modify/actions';

interface IFormFields extends CouncilInterface { }

interface IPageParams {
  id?: string;
}

const EspecialtyForm = (props: RouteComponentProps<IPageParams>) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const councilState = useSelector((state: ApplicationState) => state.councils);

  const { params } = props.match;
  const [state, setState] = useState<IFormFields>({
    _id: params.id || '',
    company_id: { _id: '5fbc1eed871112075d3f9f7e' },
    name: '',
    describe: 'TESTE',
    initials: '',
    federative_unit: '',
    active: true
  });

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    dispatch(loadRequest());

    if (params.id) {
      dispatch(loadCouncilById(params.id))
    }

    dispatch(modify_council());
  }, [dispatch, params]);

  useEffect(() => {
    setState(prevState => {
      return {
        ...prevState,
        ...councilState.data
      }
    })
  }, [councilState]);

  function handleSaveFormCouncil() {
    if (state?._id) {
      dispatch(updateCouncilRequest(state));
    } else {
      dispatch(createCouncilRequest(state))
    }
  }

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    history.push(`/council`);
  }

  return (
    <Sidebar>
      {councilState.loading && <Loading />}
      <Container>
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Conselhos</FormTitle>

            <FormGroupSection>
              <Grid container>
              <Grid item md={6} xs={6}>
                  <TextField
                    id="input-initials"
                    label="Sigla"
                    variant="outlined"
                    size="small"
                    value={state.initials}
                    onChange={(element) => setState({ ...state, initials: element.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    id="input-description"
                    label="Descrição"
                    variant="outlined"
                    size="small"
                    value={state.name}
                    onChange={(element) => setState({ ...state, name: element.target.value })}
                    fullWidth
                  />
                </Grid>


                <Grid item md={6} xs={6} />

                {/* <Grid item md={1} xs={6}>
                  <TextField
                    id="input-federative-unit"
                    label="UF"
                    variant="outlined"
                    size="small"
                    value={state.federative_unit}
                    onChange={(element) => setState({ ...state, federative_unit: element.target.value })}
                    fullWidth
                  />
                </Grid> */}
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
            <ButtonComponent background="default" onClick={() => councilState.success ? history.push('/council') : handleOpenModalCancel()}>
              Voltar
            </ButtonComponent>
            <ButtonComponent variant="contained" background="success" onClick={() => handleSaveFormCouncil()}>
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

export default EspecialtyForm;
