import React, { useEffect, useCallback, useState } from "react";
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
  Button,
} from "@mui/material";
import { Autocomplete } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";

import Loading from "../../../Loading";
import { FieldContent } from "../../../../styles/components/Form";
// import MuiPickersUtilsProvider, { DateTimePicker } from "@material-ui/pickers";
import { formatDate } from "../../../../helpers/date";
import moment from "moment";
import { IMedicalReleaseData } from "../../../../store/ducks/cares/types";
import {
  cidAllRequest,
  createCareRequest,
  releaseReasonRequest,
  releaseReferralRequest,
  transferCareRequest,
  updateCareRequest,
} from "../../../../store/ducks/cares/actions";
import { bloodTypes, releaseReferral } from "../../../../helpers/patient";

import LOCALSTORAGE from "../../../../helpers/constants/localStorage";
import { loadCompanyByCustomer } from "../../../../store/ducks/companies/actions";
import { CompanyInterface } from "../../../../store/ducks/companies/types";
import _ from "lodash";

interface IDialogProps {
  modalOpen: any;
  setModalOpen: any;
}

export default function MedicalReleaseDialog(props: IDialogProps) {
  const { modalOpen, setModalOpen } = props;
  const dispatch = useDispatch();

  const careState = useSelector((state: ApplicationState) => state.cares);
  const companyState = useSelector(
    (state: ApplicationState) => state.companies
  );
  const [captureData, setCaptureData] = useState<IMedicalReleaseData | any>({
    release_at: formatDate(new Date(), "YYYY-MM-DDTHH:mm"),
    release_responsible: {
      _id: localStorage.getItem(LOCALSTORAGE.USER_ID),
      name: localStorage.getItem(LOCALSTORAGE.USERNAME),
    },
  });
  const [companyData, setCompanyData] = useState<CompanyInterface | any>({});
  const [releaseType, setReleaseType] = useState<string>("");
  const [transferModalOpen, setTransferModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (modalOpen) {
      if (careState.cid.length <= 0) {
        dispatch(cidAllRequest());
      }
      if (careState.release_reason.length <= 0) {
        dispatch(releaseReasonRequest());
      }
      if (careState.release_referral.length <= 0) {
        dispatch(releaseReferralRequest());
      }
      if (companyState.list.data.length <= 0) {
        const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER);
        dispatch(loadCompanyByCustomer(customer_id ? customer_id : ""));
      }
    }
  }, [modalOpen]);

  const selectCid = useCallback(() => {
    const selected = careState.cid.filter(
      (item) => item._id === captureData.release_cid?._id
    );
    return selected[0] ? selected[0] : null;
  }, [captureData.release_cid]);

  function handleSelectCid(value: any) {
    setCaptureData((prevState: any) => ({
      ...prevState,
      release_cid: {
        _id: value._id,
        name: value.name,
      },
    }));
  }

  function handleTransfer() {
    careState.data.medical_release = {
      release_at: captureData.release_at,
      release_reason: captureData.release_reason?._id,
      release_cid: captureData.release_cid?._id,
      release_referral: captureData.release_referral,
      release_observation: captureData.release_observation,
      release_responsible: captureData.release_responsible?._id,
    };
    careState.data.medical_release_status = true;
    careState.data.transferred_from = companyData._id;
    dispatch(transferCareRequest(careState.data));
  }

  const selectReleaseReason = useCallback(() => {
    const selected = careState.release_reason.filter(
      (item) => item._id === captureData.release_reason?._id
    );
    return selected[0] ? selected[0] : null;
  }, [captureData.release_reason]);

  function handleSelectReleaseReason(value: any) {
    setReleaseType(value.type);
    setCaptureData((prevState: any) => ({
      ...prevState,
      release_reason: {
        _id: value._id,
        name: value.name,
        type: value.type,
      },
    }));
  }

  const selectReleaseReferral = useCallback(() => {
    const selected = careState.release_referral.filter(
      (item) => item._id === captureData.release_referral?._id
    );
    return selected[0] ? selected[0] : null;
  }, [captureData.release_referral]);

  function handleSelectReleaseReferral(value: any) {
    setCaptureData((prevState: any) => ({
      ...prevState,
      release_referral: {
        _id: value._id,
        name: value.name,
        cid: value.cid || false,
      },
    }));
  }

  const selectCompany = useCallback(() => {
    const selected = companyState.list.data.filter(
      (item) => item._id === companyData._id
    );
    return selected[0] ? selected[0] : null;
  }, [companyData]);

  function handleSelectCompany(value: any) {
    setCompanyData((prevState: any) => ({
      ...prevState,
      _id: value._id,
      name: value.name,
      active: value.active,
    }));
  }

  function handleSaveCare() {
    careState.data.medical_release = {
      release_at: captureData.release_at,
      release_reason: captureData.release_reason?._id,
      release_cid: captureData.release_cid?._id,
      release_referral: captureData.release_referral,
      release_observation: captureData.release_observation,
      release_responsible: captureData.release_responsible?._id,
    };
    careState.data.medical_release_status = true;
    dispatch(updateCareRequest(careState.data));
  }

  return (
    <>
      {/* {careState.loading && <Loading/>} */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
          Preencha os dados da alta médica
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            texto de apoio.
          </DialogContentText>

          <div>
            <Grid container>
              <Grid item md={6}>
                <FieldContent style={{ paddingRight: 15 }}>
                  <TextField
                    id="datetime-local"
                    label="Data da Alta"
                    type="datetime-local"
                    defaultValue={captureData.release_at}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      max: formatDate(new Date(), "YYYY-MM-DDTHH:mm"),
                    }}
                    onChange={(e) => {
                      if (moment(e.target.value).isAfter(moment(), "minute")) {
                        e.target.value = formatDate(
                          new Date(),
                          "YYYY-MM-DDTHH:mm"
                        );
                      }
                      setCaptureData({
                        ...captureData,
                        release_at: e.target.value,
                      });
                    }}
                    fullWidth
                  />
                </FieldContent>
              </Grid>

              <Grid item md={12}>
                <FieldContent style={{ paddingRight: 15 }}>
                  <Autocomplete
                    id="input-cid"
                    options={careState.release_reason}
                    getOptionLabel={(option:any) => option.name}
                    value={selectReleaseReason()}
                    // getOptionSelected={(option, value) => option._id === captureData.health_insurance_id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Motivo da alta"
                        variant="outlined"
                      />
                    )}
                    onChange={(event, value:any) => {
                      if (value) {
                        handleSelectReleaseReason({
                          _id: value._id,
                          name: value.name,
                          type: value.type,
                        });
                      } else {
                        handleSelectReleaseReason({
                          _id: "",
                          name: "",
                          type: "",
                        });
                      }
                    }}
                    size="small"
                    noOptionsText="Nenhum motivo de alta foi encontrado"
                    fullWidth
                  />
                </FieldContent>
              </Grid>

              {releaseType === "TRANSFERÊNCIA INTERNA" && (
                <Grid item md={12}>
                  <FieldContent style={{ paddingRight: 15 }}>
                    <Autocomplete
                      id="input-company-transfer"
                      options={companyState.list.data}
                      getOptionLabel={(option:any) => option.name}
                      value={selectCompany()}
                      // getOptionSelected={(option, value) => option._id === captureData.health_insurance_id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Empresa Para ser Transferida"
                          variant="outlined"
                        />
                      )}
                      onChange={(event, value:any) => {
                        if (value) {
                          handleSelectCompany({
                            _id: value._id || "",
                            name: value.name,
                            active: value.active,
                          });
                        } else {
                          handleSelectCompany({
                            _id: "",
                            name: "",
                            active: "",
                          });
                        }
                      }}
                      size="small"
                      noOptionsText="Nenhum resultado encontrado"
                      fullWidth
                    />
                  </FieldContent>
                </Grid>
              )}

              {releaseType === "ÓBITO" && (
                <Grid item md={12}>
                  <FieldContent style={{ paddingRight: 15 }}>
                    <Autocomplete
                      id="input-release-referral"
                      options={careState.release_referral}
                      getOptionLabel={(option:any) => option.name}
                      value={selectReleaseReferral()}
                      // getOptionSelected={(option, value) => option._id === captureData.health_insurance_id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tipo de Encaminhamento"
                          variant="outlined"
                        />
                      )}
                      onChange={(event, value:any) => {
                        if (value) {
                          handleSelectReleaseReferral({
                            _id: value._id || "",
                            name: value.name,
                            cid: value.cid,
                          });
                        } else {
                          handleSelectReleaseReferral({
                            _id: "",
                            name: "",
                            cid: "",
                          });
                        }
                      }}
                      size="small"
                      noOptionsText="Nenhum resultado encontrado"
                      fullWidth
                    />
                  </FieldContent>
                </Grid>
              )}

              {(releaseType != "ÓBITO" ||
                captureData?.release_referral?.cid) && (
                <Grid item md={12}>
                  <FieldContent style={{ paddingRight: 15 }}>
                    <Autocomplete
                      id="input-release-reason"
                      options={careState.cid}
                      getOptionLabel={(option:any) => option.name}
                      value={selectCid()}
                      // getOptionSelected={(option, value) => option._id === captureData.health_insurance_id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Diagnóstico de alta"
                          variant="outlined"
                        />
                      )}
                      onChange={(event, value:any) => {
                        if (value) {
                          handleSelectCid({
                            _id: value._id || "",
                            name: value.name,
                          });
                        } else {
                          handleSelectCid({
                            _id: "",
                            name: "",
                          });
                        }
                      }}
                      size="small"
                      noOptionsText="Nenhum CID foi encontrado"
                      fullWidth
                    />
                  </FieldContent>
                </Grid>
              )}

              <Grid item md={12}>
                <FieldContent>
                  <TextField
                    id="input-description"
                    variant="outlined"
                    size="small"
                    rows={6}
                    // rowsMax={6}
                    label="Observação da Alta"
                    placeholder="Digite aqui alguma observação para a alta"
                    value={captureData.release_observation}
                    onChange={(e) => {
                      setCaptureData((prevState: any) => ({
                        ...prevState,
                        release_observation: e.target.value,
                      }));
                    }}
                    fullWidth
                    multiline
                  />
                </FieldContent>
              </Grid>

              <Grid item md={12}>
                <FieldContent style={{ paddingRight: 15 }}>
                  <TextField
                    id="input-responsible"
                    label="Responsável pela alta"
                    variant="outlined"
                    size="small"
                    value={captureData.release_responsible.name}
                    disabled={true}
                    fullWidth
                  />
                </FieldContent>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Fechar
          </Button>
          <Button
            onClick={() => {
              if (releaseType === "TRANSFERÊNCIA INTERNA") {
                setTransferModalOpen(true);
              } else {
                handleSaveCare();
                setModalOpen(false);
              }
            }}
            color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        scroll="paper"
        open={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Confirmação</DialogTitle>
        <DialogContent>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <p>{`Deseja transferir o paciente ${
              careState?.data?.patient_id?.name
            } para a empresa ${selectCompany()?.fantasy_name}`}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransferModalOpen(false)} color="primary">
            Não
          </Button>
          <Button
            onClick={() => {
              // handleSaveCare()
              handleTransfer();
              setTransferModalOpen(false);
              setModalOpen(false);
            }}
            color="primary"
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
