import React, { useState, useEffect, useCallback, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRequest,
  getAddress as getAddressAction,
  createCompanyRequest,
  loadCompanyById,
} from "../../store/ducks/companies/actions";
import { CompanyInterface } from "../../store/ducks/companies/types";
import { ApplicationState } from "../../store";
import { Alert, AlertTitle } from "@mui/material";
import { useHistory, RouteComponentProps } from "react-router-dom";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  Snackbar,
  Container,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { SearchOutlined } from "@mui/icons-material";
import { searchRequest as searchPatientAction } from "../../store/ducks/patients/actions";
import {
  Create as CreateIcon,
  Search as SearchIcon,
  AccountCircle,
  Visibility,
} from "@mui/icons-material";
import {
  InputFiled as TextField,
  SearchContent,
  PatientResume,
  PatientResumeContent,
  PatientData,
  ButtonsContent,
} from "./styles";
import Sidebar from "../../components/Sidebar";

import Button from "../../styles/components/Button";
import ButtonComponent from "../../styles/components/Button";
import { FormTitle } from "../../styles/components/Form";
import {
  createCareRequest as createCareAction,
  searchCareRequest as getCares,
} from "../../store/ducks/cares/actions";
import { CareInterface } from "../../store/ducks/cares/types";
import { age, formatDate } from "../../helpers/date";
interface IPageParams {
  id?: string;
}

export default function QRcode() {
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const componentRef = useRef("target");

  const [patient, setPatient] = useState<any>({});
  const dispatch = useDispatch();
  const history = useHistory();
  const [patientSearch, setPatientSearch] = useState<string>("");
  const patientState = useSelector((state: ApplicationState) => state.patients);
  const careState = useSelector((state: ApplicationState) => state.cares);
  const [care, setCare] = useState<CareInterface>({
    health_insurance_id: "5f903db15104287582ba58af",
    health_plan_id: "5fd666cd48392d0621196551",
    health_sub_plan_id: "5fd6671f48392d0621196552",
    health_plan_card_validate: "2021-01-30T12:00:00",
    health_plan_card_number: "123456789",
    contract: "123123",
    care_type_id: "5fd66ca189a402ec48110cc1",
    user_id: "5e8cfe7de9b6b8501c8033ac",
    created_by: { _id: "5e8cfe7de9b6b8501c8033ac" },
    status: "Pre-Atendimento",
    capture: {
      status: "Em Andamento",
    },
  });
  const toggleModalConfirm = useCallback(
    (open?: boolean) => {
      open ? setOpenModalConfirm(open) : setOpenModalConfirm(!openModalConfirm);
    },
    [openModalConfirm]
  );

  const [openModalCare, setOpenModalCare] = useState<boolean>(false);
  const [erro, setErro] = useState<boolean>(false);
  const searchPatient = useCallback((value: string) => {
    setPatient({});

    if (value.length > 0) {
      dispatch(searchPatientAction(value));
    }
  }, []);
  useEffect(() => {
    if (patientState.list.total === 1) {
      setPatient(patientState.list.data[0]);
      setPatientSearch(patientState.list.data[0].fiscal_number);

      console.log(patientState.list);

      dispatch(
        getCares({
          search: patientState.list.data[0].fiscal_number,
          status: "Atendimento",
        })
      );
    }
  }, [patientState.list]);

  const qrcode = () => {
    if (careState.list.data[0]._id) {
      return careState.list.data[0]._id;
    } else {
      setErro(true);
    }
  };
  // useEffect(() => {
  //   if (careState.success && !careState.error && careState.data._id) {
  //     history.push(`/patient/capture/${careState.data._id}/overview`);
  //   }
  // }, [careState])
  return (
    <Sidebar>
      <Container>
        <FormTitle>Gerador de QrCode</FormTitle>
        <Grid container>
          <Grid item md={3} xs={12}>
            <SearchContent>
              <TextField
                id="input-search-fiscal-number"
                label="Paciente"
                variant="outlined"
                size="small"
                value={patientSearch}
                placeholder="Buscar por CPF"
                onChange={(element) => setPatientSearch(element.target.value)}
                onBlur={(element) => searchPatient(element.target.value)}
                fullWidth
                autoFocus
              />
              <Button
                // background="success"
                size="large"
              >
                <SearchIcon />
              </Button>
            </SearchContent>
          </Grid>
        </Grid>
        {patient?._id && (
          <Grid container>
            <Grid item md={12} xs={12}>
              <p>Encontramos este paciente:</p>

              <PatientResume>
                <PatientResumeContent>
                  <PatientData>
                    <div className="patientIcon">
                      <AccountCircle />
                    </div>
                    <div>
                      <p className="title">{patient?.name}</p>
                      <div className="subTitle">
                        <p>
                          {patient?.birthdate ? age(patient?.birthdate) : ""}
                        </p>
                        <p>Sexo: {patient?.gender}</p>
                        <p>Nome da Mãe: {patient?.mother_name}</p>
                      </div>
                    </div>
                  </PatientData>

                  <ButtonsContent>
                    <Button
                      // background="default"
                      onClick={() => {
                        history.push(`/patient/${patient?._id}/edit`);
                      }}
                    >
                      <CreateIcon />
                    </Button>
                  </ButtonsContent>
                </PatientResumeContent>
              </PatientResume>
            </Grid>

            {/* {careState.list.total > 0 && (
                <Grid item md={12} xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Atenção!</AlertTitle>
                    Você não pode iniciar a captação desse paciente porque ele já está sendo atendido.
                    <br /><br />
                    <div>
                      <Button
                        background="default"
                        onClick={() => toggleModalCares()}
                      >
                        Visualizar
                      </Button>
                    </div>
                  </Alert>
                </Grid>
              )} */}

            <Grid item md={12} xs={12}>
              <ButtonsContent>
                <Button
                  // background="success"
                  onClick={() => toggleModalConfirm(true)}
                  disabled={careState.list.total > 0}
                >
                  Selecionar Paciente
                </Button>
              </ButtonsContent>
            </Grid>
          </Grid>
        )}

        {!erro && careState.list.data[0] ? (
          <QRCode value={JSON.stringify(careState.list.data[0]._id)} />
        ) : (
          <div>Não foi possível achar o código do atendimento</div>
        )}
      </Container>
    </Sidebar>
  );
}
