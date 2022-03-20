import React, { useState, useCallback, useEffect } from "react";
// Redux e Sagas
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";
import { loadCustomerById } from "../../../../store/ducks/customers/actions";
import { loadProfessionsRequest } from "../../../../store/ducks/users/actions";
import { CareState } from "../../../../store/ducks/cares/types";
import {
  loadCheckinFilterRequest,
  loadEvolutionFilterRequest,
} from "../../../../store/ducks/cares/actions";

// Helper
import _ from "lodash";
import LOCALSTORAGE from "../../../../helpers/constants/localStorage";
import { toast } from "react-toastify";
import moment from "moment";
import dayjs from "dayjs";

// MUI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDayJs from "@mui/lab/AdapterDayjs";
import DatePicker from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

// styled
import { BoxCalendar, BoxTooltip, FormLabelRadio } from "./styles";
import { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { formatDate } from "../../../../helpers/date";
import { styled } from "@mui/material";

interface IPropsFilter {
  openFilter: boolean;
  closeFilter: () => void;
  reportType: string;
  content: IRows[];
  careState: CareState;
  contentReport: any;
}
interface IRows {
  name: string;
  value: any;
}
interface IFilter {
  _id: string;
  type: string;
  name: string;
  dataStart: any;
  dataEnd: any;
  reportType: string;
  attendance_id: string;
}

export default function FilterReport(props: IPropsFilter) {
  const {
    openFilter,
    closeFilter,
    reportType,
    content,
    careState,
    contentReport,
  } = props;

  const userState = useSelector((state: ApplicationState) => state.users);
  const customerState = useSelector(
    (state: ApplicationState) => state.customers
  );
  const dispatch = useDispatch();
  const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER);
  const company_id = localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);
  const [valueDataStart, setValueDataStart] = React.useState<Date | null>(null);
  const [valueDataEnd, setValueDataEnd] = React.useState<Date | null>(null);
  const [stateFilter, setStateFilter] = useState<IFilter>({
    _id: "",
    type: "Prestador",
    name: "",
    dataStart: null,
    dataEnd: null,
    reportType: "",
    attendance_id: "",
  });
  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 350,
    },
  });

  useEffect(() => {
    setStateFilter((state: any) => {
      return {
        ...state,
        attendance_id: careState.data._id,
        reportType: reportType,
      };
    });
  }, [reportType, careState.data._id]);
  useEffect(() => {
    if (customer_id) {
      dispatch(loadCustomerById(customer_id));
    }
    dispatch(loadProfessionsRequest());
  }, [stateFilter]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateFilter((state: any) => {
      return { ...state, type: event.target.value, name: "" };
    });
  };

  const professionsList = useCallback(() => {
    let data: any = [];
    handleTeam().map((item: any) => {
      item.companies_links.map((item: any, index: number) => {
        if (item.companie_id === company_id) {
          let alreadyExists: boolean = false;
          data.forEach((profession: any) => {
            profession.name === item.function ? (alreadyExists = true) : "";
          });
          !alreadyExists && data.push({ name: item.function, _id: item._id });
        }
      });
    });
    return data.sort((a: any, b: any) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  }, [customerState.data.usertypes, reportType]);

  function handleTeam() {
    let team: object[] = [];
    content.map(({ name, value }: IRows) => {
      if (name === "Equipe") {
        value.map((item: any) => {
          if (item.name) team.push(item);
        });
      }
    });
    return team.sort((a: any, b: any) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  }

  function handleMinDateReport() {
    if (reportType === "Check-in/out") {
      if (contentReport) {
        return dayjs(contentReport.data[contentReport.data.length - 1]._id);
      } else {
        return null;
      }
    } else if (reportType === "Evolução") {
      if (contentReport) {
        return dayjs(contentReport.data[contentReport.data.length - 1]._id);
      } else {
        return null;
      }
    }
  }
  function handleMaxDateReport() {
    if (reportType === "Check-in/out") {
      if (contentReport) {
        return dayjs(contentReport.data[0]._id);
      } else {
        return undefined;
      }
    } else if (reportType === "Evolução") {
      if (contentReport) {
        return dayjs(contentReport.data[0]._id);
      } else {
        return undefined;
      }
    }
  }
  function handleGenerateReportValidation() {
    const { attendance_id, reportType, type, name, dataEnd, dataStart } =
      stateFilter;
    if (!attendance_id || !reportType) {
      toast.error("Atualize a página antes de gerar o relatório.");
    } else if (!type) {
      toast.error("Selecione filtro para Prestador ou Função");
    } else if (!name) {
      toast.error(
        type === "Prestador" ? `Selecione o ${type}` : `Selecione a ${type}`
      );
    } else if (!dataStart) {
      toast.error("Selecione a Data de início");
    } else if (dataStart && !moment(dataStart["$d"]).isValid()) {
      toast.error("Formato de data inválido");
    } else if (dataEnd && !moment(dataEnd["$d"]).isValid()) {
      toast.error("Formato de data inválido");
    } else if (
      dataEnd &&
      dataStart &&
      dayjs(formatDate(dataStart, "YYYY-MM-DD")) >
        dayjs(formatDate(dataEnd, "YYYY-MM-DD"))
    ) {
      toast.error("Data de início maior que Data de fim.");
    } else if (rangeDataComparison(dataEnd, dataStart, contentReport)) {
      toast.error("Data fora do intervalo ");
    } else {
      handleGenerate();
    }
  }

  function rangeDataComparison(dataEnd: any, dataStart: any, content: any) {
    if (reportType === "Check-in/out") {
      if (
        dataEnd &&
        dataEnd > dayjs(formatDate(content.data[0]._id, "YYYY-MM-DD"))
      ) {
        return true;
      } else if (
        (dataStart &&
          dataStart <
            dayjs(
              formatDate(
                content.data[content.data.length - 1]._id,
                "YYYY-MM-DD"
              )
            )) ||
        (dataStart &&
          dataStart > dayjs(formatDate(content.data[0]._id, "YYYY-MM-DD")))
      ) {
        return true;
      } else {
        return false;
      }
    } else if (reportType === "Evolução") {
      if (dataEnd && dataEnd > dayjs(content.data[0]._id)) {
        return true;
      } else if (
        (dataStart &&
          dataStart <
            dayjs(
              formatDate(
                content.data[content.data.length - 1]._id,
                "YYYY-MM-DD"
              )
            )) ||
        (dataStart &&
          dataStart > dayjs(formatDate(content.data[0]._id, "YYYY-MM-DD")))
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function handleGenerate() {
    if (stateFilter.reportType === "Check-in/out") {
      dispatch(loadCheckinFilterRequest(stateFilter));
    } else if (stateFilter.reportType === "Evolução") {
      dispatch(loadEvolutionFilterRequest(stateFilter));
    }
    // closeFilter();
    // cleanFilter();
    toast.success("O relatório está sendo gerado.");
  }
  function cleanFilter() {
    setStateFilter((state: any) => {
      return {
        ...state,
        _id: "",
        dataEnd: null,
        dataStart: null,
        name: "",
        type: "Prestador",
      };
    });
  }
  function textHelperRangeDate() {
    if (reportType === "Check-in/out") {
      if (contentReport) {
        return `${formatDate(
          contentReport.data[contentReport.data.length - 1]._id,
          "DD/MM/YYYY"
        )} - ${formatDate(contentReport.data[0]._id, "DD/MM/YYYY")}`;
      }
    }
    if (reportType === "Evolução") {
      if (contentReport) {
        return `${formatDate(
          contentReport.data[contentReport.data.length - 1]._id,
          "DD/MM/YYYY"
        )} - ${formatDate(contentReport.data[0]._id, "DD/MM/YYYY")}`;
      }
    }
  }
  return (
    <Dialog
      open={openFilter}
      onClose={() => {
        closeFilter();
        cleanFilter();
      }}
      aria-labelledby="dialog-filter-report"
    >
      <DialogTitle sx={{ fontSize: "20px", fontWeight: "bold" }}>
        {reportType}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "600px",
          gap: "8px",
        }}
      >
        <FormControl>
          <FormLabelRadio id="radio-buttons-group-label">
            Filtrar por prestador ou função
          </FormLabelRadio>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-prestador-or-funcao"
            name="radio-buttons-group"
            value={stateFilter.type}
            onChange={handleRadioChange}
            sx={{
              "& .css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked": {
                color: "var(--secondary)",
              },
              marginTop: "16px",
            }}
          >
            <FormControlLabel
              defaultValue={"Prestador"}
              value="Prestador"
              control={<Radio />}
              label="Prestador"
            />
            <FormControlLabel
              value="Função"
              control={<Radio />}
              label="Função"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{
              color: "var(--black)",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Agora ditgite o nome{" "}
            {stateFilter.type === "Função"
              ? `da ${stateFilter.type}`
              : `do ${stateFilter.type}`}
          </FormLabel>
          <Autocomplete
            id="combo-box-profession"
            options={
              stateFilter.type === "Função" ? professionsList() : handleTeam()
            }
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label={stateFilter.type}
                variant="outlined"
                sx={{
                  fontSize: "12px",
                  height: "32px",
                  "& label": { fontStyle: "italic" },
                }}
              />
            )}
            value={stateFilter}
            onChange={(event, value) => {
              if (value) {
                setStateFilter((state: any) => {
                  return {
                    ...state,
                    name: value.name,
                    _id: value._id,
                  };
                });
              } else {
                setStateFilter((state: any) => {
                  return {
                    ...state,
                    name: "",
                    _id: "",
                  };
                });
              }
            }}
            sx={{
              width: 300,

              "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { border: "2px solid var(--secondary)" },
            }}
            size="small"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{
              color: "var(--black)",
              fontWeight: "bold",
              margin: "16px 0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Box> Por fim, selecione o período</Box>
            <CustomWidthTooltip
              title={`Caso não seja selecionado Data de fim, será considerado a última data registrada ${
                stateFilter.reportType === "Evolução"
                  ? "das Evoluções"
                  : "dos Check-ins/outs"
              }. Intervalo das datas registradas: ${textHelperRangeDate()}`}
            >
              <BoxTooltip>?</BoxTooltip>
            </CustomWidthTooltip>
          </FormLabel>
          <BoxCalendar>
            <LocalizationProvider dateAdapter={AdapterDayJs}>
              <DatePicker
                maxDate={handleMaxDateReport()}
                minDate={handleMinDateReport()}
                label="Data de início"
                value={stateFilter.dataStart}
                onChange={(newValue) => {
                  setStateFilter((state: any) => {
                    return {
                      ...state,
                      dataStart: dayjs(formatDate(newValue, "YYYY-MM-DD")),
                    };
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayJs}>
              <DatePicker
                maxDate={handleMaxDateReport()}
                minDate={handleMinDateReport()}
                label="Data de Fim"
                value={stateFilter.dataEnd}
                onChange={(newValue) => {
                  setStateFilter((state: any) => {
                    return {
                      ...state,
                      dataEnd: dayjs(formatDate(newValue, "YYYY-MM-DD")),
                    };
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </BoxCalendar>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            cleanFilter();
            closeFilter();
          }}
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            handleGenerateReportValidation();
          }}
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          Gerar Relatório
        </Button>
      </DialogActions>
    </Dialog>
  );
}
