import React, { useEffect } from "react";
//MUI
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridValueFormatterParams,
  GridToolbar,
  ptBR,
} from "@mui/x-data-grid";
import theme from "../../../theme/theme";
// ICONS
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { loadRequest as loadRequestCustomerLogs } from "../../../store/ducks/customerLogs/actions";
import { ApplicationState } from "../../../store";
// HELPER
import dayjs from "dayjs";

export default function ClientLogs({ state, customerState }: any) {
  const customerLogsState = useSelector(
    (state: ApplicationState) => state.customerLogs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRequestCustomerLogs());
  }, []);

  const handleStatusIcon = (status: string) => {
    switch (status) {
      case "Atualizado":
        return <PublishedWithChangesIcon color={"success"} />;
      case "Enviado":
        return <CheckCircleOutlineOutlinedIcon color={"success"} />;
      case "Falha":
        return <WarningAmberIcon color={"error"} />;
      case "Aguardando":
        return <HourglassBottomIcon color={"warning"} />;
      default:
        return "";
    }
  };

  const columns: GridColDef[] = [
    { field: "type", headerName: "Tipo", width: 120 },
    { field: "code", headerName: "Códigos", width: 100 },
    {
      field: "dateTime",
      headerName: "Data/Hora",
      type: "dateTime",
      width: 140,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return "";
        }
        return dayjs(params.value).format("DD/MM/YY [-] HH:mm");
      },
    },
    { field: "send_by", headerName: "Enviado por", width: 200 },
    { field: "created_by", headerName: "Criado por", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell(params) {
        return (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize={"0.875rem"}>{params.value}</Typography>
            {handleStatusIcon(params.value)}
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 270px)" }}>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              background: theme.palette.secondaryLighter2.main,
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
              svg: { color: theme.palette.secondaryLighter3.main },
            },
            "& .MuiDataGrid-toolbarContainer": {
              background: theme.palette.primaryLight.main,
              color: "white",
              "& .MuiButtonBase-root": {
                color: "white",
              },
            },
          }}
          rows={customerLogsState.data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            sorting: { sortModel: [{ field: "hour", sort: "desc" }] },
          }}
        />
      </Box>
    </Box>
  );
}
