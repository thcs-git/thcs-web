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
import { loadRequestReportFilter } from "../../../../store/ducks/telemedicine/actions";
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

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// styled
import { BoxCalendar, BoxTooltip, FormLabelRadio } from "./styles";
import { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { formatDate } from "../../../../helpers/date";
import { styled } from "@mui/material";
import theme from "../../../../theme/theme";
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
  const dispatch = useDispatch();
  const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER);
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
  }, [stateFilter.type, stateFilter.attendance_id, customer_id]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateFilter((state: any) => {
      return { ...state, type: event.target.value, name: "" };
    });
  };
  function handleDateFormat(data: string) {
    let dataFormated = data.split("-");
    return dataFormated[2] + "-" + dataFormated[1] + "-" + dataFormated[0];
  }
  function handleMinDateReport() {
    if (reportType === "Check-in/out") {
      return contentReport
        ? dayjs(contentReport.data[contentReport.data.length - 1]._id)
        : undefined;
    } else if (reportType === "Evolução") {
      return contentReport
        ? dayjs(contentReport.data[contentReport.data.length - 1]._id)
        : undefined;
    } else if (reportType === "Telemedicina") {
      return contentReport
        ? dayjs(
            handleDateFormat(
              contentReport.data[contentReport.data.length - 1]._id.date
            )
          )
        : undefined;
    }
  }
  function handleMaxDateReport() {
    if (reportType === "Check-in/out") {
      return contentReport ? dayjs(contentReport.data[0]._id) : undefined;
    } else if (reportType === "Evolução") {
      return contentReport ? dayjs(contentReport.data[0]._id) : undefined;
    } else if (reportType === "Telemedicina") {
      return contentReport
        ? dayjs(handleDateFormat(contentReport.data[0]._id.date))
        : undefined;
    }
  }

  function handleGenerateReportValidation() {
    const { attendance_id, reportType, type, name, dataEnd, dataStart } =
      stateFilter;
    if (!attendance_id || !reportType) {
      toast.error("Atualize a página antes de gerar o relatório.");
    } else if (!type) {
      toast.error("Selecione filtro para Prestador ou Função");
    } else if (!name && type !== "NaoAtendido") {
      toast.warn(
        type === "Prestador" ? `Selecione o ${type}` : `Selecione a ${type}`
      );
    } else if (!dataStart) {
      toast.info("Selecione a Data de início");
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
      // closeFilter();
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
    } else if (reportType === "Telemedicina") {
      if (dataEnd && dataEnd > dayjs(content.data[0]._id.date)) {
        return true;
      } else if (
        (dataStart &&
          dataStart <
            dayjs(
              formatDate(
                content.data[content.data.length - 1]._id.date,
                "YYYY-MM-DD"
              )
            )) ||
        (dataStart &&
          dataStart > dayjs(formatDate(content.data[0]._id.date, "YYYY-MM-DD")))
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
      dispatch(
        loadCheckinFilterRequest(
          stateFilter.dataEnd
            ? stateFilter
            : {
                ...stateFilter,
                dataEnd: dayjs(
                  formatDate(contentReport.data[0]._id, "YYYY-MM-DD")
                ),
              }
        )
      );
    } else if (stateFilter.reportType === "Evolução") {
      dispatch(
        loadEvolutionFilterRequest(
          stateFilter.dataEnd
            ? stateFilter
            : {
                ...stateFilter,
                dataEnd: dayjs(
                  formatDate(contentReport.data[0]._id, "YYYY-MM-DD")
                ),
              }
        )
      );
    } else if (stateFilter.reportType === "Telemedicina") {
      dispatch(
        loadRequestReportFilter(
          stateFilter.dataEnd
            ? stateFilter
            : {
                ...stateFilter,
                dataEnd: dayjs(
                  formatDate(
                    handleDateFormat(contentReport.data[0]._id.date),
                    "YYYY-MM-DD"
                  )
                ),
              }
        )
      );
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
    if (reportType === "Telemedicina") {
      if (contentReport) {
        return `${formatDate(
          handleDateFormat(
            contentReport.data[contentReport.data.length - 1]._id.date
          ),
          "DD/MM/YYYY"
        )} - ${formatDate(
          handleDateFormat(contentReport.data[0]._id.date),
          "DD/MM/YYYY"
        )}`;
      }
    }
  }

  const capitalizeText = (words: string) => {
    return words
      .toLowerCase()
      .split(" ")
      .map((text: string) => {
        return (text = text.charAt(0).toUpperCase() + text.substring(1));
      })
      .join(" ");
  };

  function handleFunction(list: any, company: string) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].companie_id === company) {
        return list[i].function;
      }
    }
  }

  function handleAutocompleteData(type: string) {
    let List: any[] = [];

    if (reportType === "Check-in/out") {
      careState.checkin.data.map((day: any) => {
        if (day) {
          day.list.map((checks: any) => {
            if (checks.list) {
              checks.list.map((user: any) => {
                const itemList: any = {
                  name:
                    type === "Função"
                      ? handleFunction(
                          user[0].user_id[0].companies_links,
                          careState.data.company_id
                        )
                      : capitalizeText(user[0].user_id[0].name),
                  _id: type === "Função" ? "" : user[0].user_id[0]._id,
                };
                List.push(itemList);
              });
            }
          });
        }
      });
    } else if (reportType === "Evolução") {
      contentReport?.data?.forEach((day: any) => {
        day.list.forEach((evolution: any) => {
          evolution.created_by.forEach((user: any) => {
            // console.log(user);
            const itemList: any = {
              name:
                type === "Função"
                  ? handleFunction(
                      user.companies_links,
                      careState.data.company_id
                    )
                  : capitalizeText(user.name),
              _id: type === "Função" ? "" : user._id,
            };
            List.push(itemList);
          });
        });
      });
    } else if (reportType === "Telemedicina") {
      contentReport?.data?.map((day: any) =>
        day.list.map((telemedicine: any) => {
          if (telemedicine?.result) {
            const itemList: any = {
              name:
                type === "Função"
                  ? capitalizeText(
                      handleFunction(
                        telemedicine?.result?.companies_links,
                        careState?.data?.company_id
                      )
                    )
                  : capitalizeText(telemedicine?.result?.name),
              _id: type === "Função" ? "" : telemedicine?.result?._id,
            };
            List.push(itemList);
          }
        })
      );
    }

    if (type === "Função") {
      return _.uniqBy(List, "name").sort((a: any, b: any) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    } else {
      return _.uniqBy(List, "_id").sort((a: any, b: any) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
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
      sx={{ "& svg, path": { cursor: "pointer" } }}
    >
      <DialogTitle>{reportType}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <FormControl>
          <FormLabel
            id="radio-buttons-group-label"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 500,
              "&.Mui-focused": { color: theme.palette.secondary.main },
            }}
          >
            {reportType === "Telemedicina"
              ? "Filter por função, prestador ou por não atendidos"
              : "Filtrar por prestador ou função"}
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-prestador-or-funcao"
            name="radio-buttons-group"
            value={stateFilter.type}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              sx={{ cursor: "pointer" }}
              defaultValue={"Prestador"}
              value="Prestador"
              control={<Radio color="secondary" />}
              label="Prestador"
            />
            <FormControlLabel
              sx={{ cursor: "pointer" }}
              value="Função"
              control={<Radio color="secondary" />}
              label="Função"
            />
            {reportType === "Telemedicina" && (
              <FormControlLabel
                sx={{ cursor: "pointer" }}
                value="NaoAtendido"
                control={<Radio color="secondary" />}
                label="Não atendido"
              />
            )}
          </RadioGroup>
        </FormControl>
        {stateFilter.type !== "NaoAtendido" && (
          <FormControl
            sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Autocomplete
              id="combo-box-profession-or-professional"
              options={handleAutocompleteData(stateFilter.type)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    stateFilter.type === "NaoAtendido"
                      ? "Inativado"
                      : `Selecione ${
                          stateFilter.type === "Função"
                            ? `a ${stateFilter.type.toLocaleLowerCase()}`
                            : stateFilter.type === "Prestador"
                            ? `o ${stateFilter.type.toLocaleLowerCase()}`
                            : ""
                        }`
                  }
                />
              )}
              disabled={stateFilter.type === "NaoAtendido"}
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
              size="small"
              fullWidth
            />
          </FormControl>
        )}

        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{
              margin: "16px 0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: theme.palette.text.primary,
              fontWeight: 500,
            }}
          >
            Selecione o período
            <CustomWidthTooltip
              sx={{ cursor: "help", "& svg, path": { cursor: "help" } }}
              title={`Intervalo das datas registradas: ${textHelperRangeDate()}. Caso não seja selecionado Data de fim, será considerado a última data registrada ${
                stateFilter.reportType === "Evolução"
                  ? "das Evoluções"
                  : stateFilter.reportType === "Check-in/out"
                  ? "dos Check-ins/outs"
                  : "das consultas de telemedicina"
              }.`}
            >
              <InfoOutlinedIcon
                sx={{
                  cursor: "help",
                  "& svg, path": { cursor: "help" },
                  "&.MuiSvgIcon-root": { cursor: "help" },
                }}
                color="secondary"
                fontSize="small"
              ></InfoOutlinedIcon>
            </CustomWidthTooltip>
          </FormLabel>
          <BoxCalendar>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={handleMaxDateReport()}
                minDate={handleMinDateReport()}
                label="Data de início"
                value={stateFilter.dataStart}
                onChange={(newValue) => {
                  if (newValue) {
                    setStateFilter((state: any) => {
                      return {
                        ...state,
                        dataStart: dayjs(formatDate(newValue, "YYYY-MM-DD")),
                      };
                    });
                  } else {
                    setStateFilter((state: any) => {
                      return {
                        ...state,
                        dataStart: null,
                      };
                    });
                  }
                }}
                renderInput={(params) => (
                  <TextField color="secondary" {...params} />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={handleMaxDateReport()}
                minDate={handleMinDateReport()}
                label="Data de Fim"
                value={stateFilter.dataEnd}
                onChange={(newValue) => {
                  if (newValue) {
                    setStateFilter((state: any) => {
                      return {
                        ...state,
                        dataEnd: dayjs(formatDate(newValue, "YYYY-MM-DD")),
                      };
                    });
                  } else {
                    setStateFilter((state: any) => {
                      return {
                        ...state,
                        dataEnd: null,
                      };
                    });
                  }
                }}
                renderInput={(params) => (
                  <TextField color="secondary" {...params} />
                )}
              />
            </LocalizationProvider>
          </BoxCalendar>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleGenerateReportValidation();
          }}
          variant="contained"
        >
          Gerar Relatório
        </Button>
        <Button
          autoFocus
          onClick={() => {
            cleanFilter();
            closeFilter();
          }}
          variant="outlined"
          color="secondary"
        >
          fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
