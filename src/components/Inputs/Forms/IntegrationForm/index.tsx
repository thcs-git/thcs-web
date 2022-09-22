import React, {
  useState,
  ReactNode,
  useCallback,
  useEffect,
  DetailedHTMLProps,
  FormHTMLAttributes,
} from "react";
// MUI
import {
  Checkbox,
  FormControlLabel,
  Autocomplete,
  TextField,
  Box,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

// icon and svg
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

// Style
import { FormGroupSection } from "./styles";
// utils
import { formatDate } from "../../../../helpers/date";
import { checkViewPermission } from "../../../../utils/permissions";

// Redux saga
import {
  cleanAction,
  loadRequestByClient,
} from "../../../../store/ducks/users/actions";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";
// validations
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IComponent {
  index: number;
  state: any;
  setState: Function;
  canEdit: boolean;
  objectSubmitRef: React.RefObject<HTMLFormElement> | undefined;
}

function a11yProps(name: string, index: number) {
  return {
    id: `${name}-${index}`,
  };
}

const schema = yup
  .object({
    provider: yup
      .object()
      .shape({
        name: yup
          .string()
          .required("Selecione um prestador")
          .typeError("O campo deve conter o nome do prestador"),
      })
      .typeError("Você deve escolher um prestador"),
    measurement: yup
      .object()
      .shape({
        name: yup
          .string()
          .required("Selecione um objeto de aferição")
          .typeError("Você deve escolher um objeto para aferição"),
      })
      .typeError("Você deve escolher um objeto para aferição"),
    evolution: yup
      .object()
      .shape({
        name: yup
          .string()
          .required("Selecione um objeto de evolução")
          .typeError("Você deve escolher um objeto para evolução"),
      })
      .typeError("Você deve escolher um objeto para evolução"),
    exams: yup
      .object()
      .shape({
        name: yup
          .string()
          .required("Selecione um objeto de exame")
          .typeError("Você deve escolher um objeto para exame"),
      })
      .typeError("Você deve escolher um objeto para exame"),
    attest: yup
      .object()
      .shape({
        name: yup
          .string()
          .required("Selecione um objeto de atestado")
          .typeError("Você deve escolher um objeto para atestado"),
      })
      .typeError("Você deve escolher um objeto para atestado"),
    checkinOut: yup
      .object()
      .shape({
        name: yup
          .string()
          .required("Selecione um objeto de checkin-in/out")
          .typeError("Você deve escolher um objeto para checkin-in/out"),
      })
      .typeError("Você deve escolher um objeto para checkin-in/out"),
    telemedicine: yup
      .object()
      .shape({
        name: yup
          .string()
          .required("Selecione um objeto de telemedicina")
          .typeError("Você deve escolher um objeto para telemedicina"),
      })
      .typeError("Você deve escolher um objeto para telemedicina"),
    checks: yup
      .object()
      .shape({
        name: yup
          .string()
          .required("Selecione um objeto de checagem")
          .typeError("Você deve escolher um objeto para checagem"),
      })
      .typeError("Você deve escolher um objeto para checagem"),
    attachments: yup
      .object()
      .shape({
        name: yup
          .string()
          .required("Selecione um objeto de anexo")
          .typeError("Você deve escolher um objeto para anexo"),
      })
      .typeError("Você deve escolher um objeto para anexo"),
  })
  .required();

const IntegrationForm = (props: IComponent) => {
  const { index, state, setState, canEdit, objectSubmitRef } = props;
  const [test, setTest] = useState("");
  const [integrationChecked, setIntegrationChecked] = useState(false);
  const rightsOfLayoutState = useSelector(
    (state: ApplicationState) => state.layout.data.rights
  );
  const userState = useSelector((state: ApplicationState) => state.users);
  const disptach = useDispatch();

  useEffect(() => {
    if (state.integration) {
      setIntegrationChecked(true);
    }
  }, [state]);

  useEffect(() => {
    disptach(loadRequestByClient({ limit: "10000000" }));
  }, []);

  // FORM VALIDATION
  type FormData = {
    provider: any;
    measurement: any;
    evolution: any;
    exams: any;
    attest: any;
    checkinOut: any;
    telemedicine: any;
    checks: any;
    attachments: any;
  };
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
    resetField,
    trigger,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      provider: "",
      measurement: "",
      evolution: "",
      exams: "",
      attest: "",
      checkinOut: "",
      telemedicine: "",
      checks: "",
      attachments: "",
    },
  });
  function onSubmit(data: any) {
    console.log("SUBMITTTTTTTTTTT", data);
  }

  return (
    <FormGroupSection>
      {checkViewPermission(
        "integration",
        JSON.stringify(rightsOfLayoutState)
      ) ? (
        <Grid container spacing={0}>
          {integrationChecked ? (
            <>
              <Grid item xs={12} sx={{ marginLeft: "16px", marginTop: "16px" }}>
                <Typography>
                  {`Data da integração: ${formatDate(
                    state.created_at,
                    "DD/MM/YYYY HH:mm"
                  )}`}
                </Typography>
                <Typography>
                  Origem do atendimento: 194 - INTEGRACAO Setor: 763 -
                  INTEGRAÇÃO
                </Typography>
              </Grid>

              <Grid
                item
                md={10}
                xs={12}
                sx={{ marginLeft: "16px", marginTop: "16px" }}
              >
                <TextField
                  label="Url de Integração"
                  variant="outlined"
                  size="small"
                  value={state.integration}
                  disabled={!canEdit}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CheckCircleOutlineOutlinedIcon color="success" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(element) => {
                    setState({ ...state, integration: element.target.value });
                  }}
                  {...a11yProps("input-url", index)}
                />
              </Grid>
              <Grid
                item
                sx={{ marginLeft: "16px", marginTop: "16px", width: "100%" }}
              >
                <form onSubmit={handleSubmit(onSubmit)} ref={objectSubmitRef}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                      <Typography
                        variant="h6"
                        fontWeight="400"
                        color="primary.main"
                      >
                        Selecione o prestador
                      </Typography>
                      <Controller
                        control={control}
                        name="provider"
                        render={({
                          field: { onChange, value },
                          fieldState,
                        }) => (
                          <Autocomplete
                            sx={{ marginTop: "1rem" }}
                            onChange={(event, item) => {
                              onChange(item);
                            }}
                            value={value ? value : null}
                            defaultValue={null}
                            size="small"
                            id="provider"
                            options={userState.list.data}
                            getOptionLabel={(option) => {
                              return option.name;
                            }}
                            noOptionsText="Não existe opções"
                            loadingText={"Carregando..."}
                            isOptionEqualToValue={(option, value) => {
                              return option.name === value.name;
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Prestador"
                                error={!!fieldState.error?.message}
                                helperText={fieldState.error?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      // sx={{ marginLeft: "16px", marginTop: "16px" }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            fontWeight="400"
                            color="primary.main"
                          >
                            Objetos
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Controller
                            control={control}
                            name="measurement"
                            render={({
                              field: { onChange, value },
                              fieldState,
                            }) => (
                              <Autocomplete
                                onChange={(event, item) => {
                                  onChange(item);
                                }}
                                onInputChange={(
                                  event,
                                  newInputValue,
                                  reason
                                ) => {
                                  // console.log(reason);
                                }}
                                value={value ? value : null}
                                defaultValue={null}
                                size="small"
                                id="measurement"
                                options={[
                                  { name: "Aferição1" },
                                  { name: "Aferição2" },
                                  { name: "Aferição3" },
                                  { name: "Aferição4" },
                                  { name: "Aferição5" },
                                ]}
                                getOptionLabel={(option) => {
                                  return option.name;
                                }}
                                noOptionsText="Não existe opções"
                                loadingText={"Carregando..."}
                                isOptionEqualToValue={(option, value) => {
                                  return option.name === value.name;
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Aferição"
                                    error={!!fieldState.error?.message}
                                    helperText={fieldState.error?.message}
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Controller
                            control={control}
                            name="evolution"
                            render={({
                              field: { onChange, value },
                              fieldState,
                            }) => (
                              <Autocomplete
                                onChange={(event, item) => {
                                  onChange(item);
                                }}
                                onInputChange={(
                                  event,
                                  newInputValue,
                                  reason
                                ) => {
                                  // console.log(reason);
                                }}
                                value={value ? value : null}
                                defaultValue={null}
                                size="small"
                                id="evolution"
                                options={[
                                  { name: "evolução1" },
                                  { name: "evolução2" },
                                  { name: "evolução3" },
                                  { name: "evolução4" },
                                  { name: "evolução5" },
                                ]}
                                getOptionLabel={(option) => {
                                  return option.name;
                                }}
                                noOptionsText="Não existe opções"
                                loadingText={"Carregando..."}
                                isOptionEqualToValue={(option, value) => {
                                  return option.name === value.name;
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Evolução"
                                    error={!!fieldState.error?.message}
                                    helperText={fieldState.error?.message}
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Controller
                            control={control}
                            name="exams"
                            render={({
                              field: { onChange, value },
                              fieldState,
                            }) => (
                              <Autocomplete
                                onChange={(event, item) => {
                                  onChange(item);
                                }}
                                onInputChange={(
                                  event,
                                  newInputValue,
                                  reason
                                ) => {
                                  // console.log(reason);
                                }}
                                value={value ? value : null}
                                defaultValue={null}
                                size="small"
                                id="exams"
                                options={[
                                  { name: "exames1" },
                                  { name: "exames2" },
                                  { name: "exames3" },
                                  { name: "exames4" },
                                  { name: "exames5" },
                                ]}
                                getOptionLabel={(option) => {
                                  return option.name;
                                }}
                                noOptionsText="Não existe opções"
                                loadingText={"Carregando..."}
                                isOptionEqualToValue={(option, value) => {
                                  return option.name === value.name;
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Exame"
                                    error={!!fieldState.error?.message}
                                    helperText={fieldState.error?.message}
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Controller
                            control={control}
                            name="attest"
                            render={({
                              field: { onChange, value },
                              fieldState,
                            }) => (
                              <Autocomplete
                                onChange={(event, item) => {
                                  onChange(item);
                                }}
                                onInputChange={(
                                  event,
                                  newInputValue,
                                  reason
                                ) => {
                                  // console.log(reason);
                                }}
                                value={value ? value : null}
                                defaultValue={null}
                                size="small"
                                id="attest"
                                options={[
                                  { name: "Atestado1" },
                                  { name: "Atestado2" },
                                  { name: "Atestado3" },
                                  { name: "Atestado4" },
                                  { name: "Atestado5" },
                                ]}
                                getOptionLabel={(option) => {
                                  return option.name;
                                }}
                                noOptionsText="Não existe opções"
                                loadingText={"Carregando..."}
                                isOptionEqualToValue={(option, value) => {
                                  return option.name === value.name;
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Atestado"
                                    error={!!fieldState.error?.message}
                                    helperText={fieldState.error?.message}
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Controller
                            control={control}
                            name="checkinOut"
                            render={({
                              field: { onChange, value },
                              fieldState,
                            }) => (
                              <Autocomplete
                                onChange={(event, item) => {
                                  onChange(item);
                                }}
                                onInputChange={(
                                  event,
                                  newInputValue,
                                  reason
                                ) => {
                                  // console.log(reason);
                                }}
                                value={value ? value : null}
                                defaultValue={null}
                                size="small"
                                id="checkinOut"
                                options={[
                                  { name: "checkinOut1" },
                                  { name: "checkinOut2" },
                                  { name: "checkinOut3" },
                                  { name: "checkinOut4" },
                                  { name: "checkinOut5" },
                                ]}
                                getOptionLabel={(option) => {
                                  return option.name;
                                }}
                                noOptionsText="Não existe opções"
                                loadingText={"Carregando..."}
                                isOptionEqualToValue={(option, value) => {
                                  return option.name === value.name;
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Checkin-in/out"
                                    error={!!fieldState.error?.message}
                                    helperText={fieldState.error?.message}
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Controller
                            control={control}
                            name="telemedicine"
                            render={({
                              field: { onChange, value },
                              fieldState,
                            }) => (
                              <Autocomplete
                                onChange={(event, item) => {
                                  onChange(item);
                                }}
                                onInputChange={(
                                  event,
                                  newInputValue,
                                  reason
                                ) => {
                                  // console.log(reason);
                                }}
                                value={value ? value : null}
                                defaultValue={null}
                                size="small"
                                id="telemedicine"
                                options={[
                                  { name: "telemedicia1" },
                                  { name: "telemedicia2" },
                                  { name: "telemedicia3" },
                                  { name: "telemedicia4" },
                                  { name: "telemedicia5" },
                                ]}
                                getOptionLabel={(option) => {
                                  return option.name;
                                }}
                                noOptionsText="Não existe opções"
                                loadingText={"Carregando..."}
                                isOptionEqualToValue={(option, value) => {
                                  return option.name === value.name;
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Telemedicina"
                                    error={!!fieldState.error?.message}
                                    helperText={fieldState.error?.message}
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Controller
                            control={control}
                            name="checks"
                            render={({
                              field: { onChange, value },
                              fieldState,
                            }) => (
                              <Autocomplete
                                onChange={(event, item) => {
                                  onChange(item);
                                }}
                                onInputChange={(
                                  event,
                                  newInputValue,
                                  reason
                                ) => {
                                  // console.log(reason);
                                }}
                                value={value ? value : null}
                                defaultValue={null}
                                size="small"
                                id="checks"
                                options={[
                                  { name: "checagem1" },
                                  { name: "checagem2" },
                                  { name: "checagem3" },
                                  { name: "checagem4" },
                                  { name: "checagem5" },
                                ]}
                                getOptionLabel={(option) => {
                                  return option.name;
                                }}
                                noOptionsText="Não existe opções"
                                loadingText={"Carregando..."}
                                isOptionEqualToValue={(option, value) => {
                                  return option.name === value.name;
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Checagem"
                                    error={!!fieldState.error?.message}
                                    helperText={fieldState.error?.message}
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Controller
                            control={control}
                            name="attachments"
                            render={({
                              field: { onChange, value },
                              fieldState,
                            }) => (
                              <Autocomplete
                                onChange={(event, item) => {
                                  onChange(item);
                                }}
                                onInputChange={(
                                  event,
                                  newInputValue,
                                  reason
                                ) => {
                                  // console.log(reason);
                                }}
                                value={value ? value : null}
                                defaultValue={null}
                                size="small"
                                id="attachments"
                                options={[
                                  { name: "Anexo1" },
                                  { name: "Anexo2" },
                                  { name: "Anexo3" },
                                  { name: "Anexo4" },
                                  { name: "Anexo5" },
                                ]}
                                getOptionLabel={(option) => {
                                  return option.name;
                                }}
                                noOptionsText="Não existe opções"
                                loadingText={"Carregando..."}
                                isOptionEqualToValue={(option, value) => {
                                  return option.name === value.name;
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Anexo"
                                    error={!!fieldState.error?.message}
                                    helperText={fieldState.error?.message}
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
      ) : (
        <Box sx={{ padding: "24px" }}>
          Vocês não tem permissão para acessar integração.
        </Box>
      )}
    </FormGroupSection>
  );
};

export default React.memo(IntegrationForm);
