import React, { useState, useEffect, useCallback, useRef } from "react";
// router
import { Link } from "react-router-dom";

// redux saga
import { useDispatch, useSelector } from "react-redux";
import {
  createQrCodeRequest,
  updateQrCodeRequest,
} from "../../../store/ducks/qrCode/actions";
import { ApplicationState } from "../../../store";

// Helpers
import QRCode from "react-qr-code";
import { formatDate } from "../../../helpers/date";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import {
  checkViewPermission,
  checkEditPermission,
  checkCreatePermission,
} from "../../../utils/permissions";
import crypto from "crypto";

// MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

// styles e styledComponents
import { ButtonGeneration, ButtonToPrint } from "./styles";
import theme from "../../../theme/theme";
// icons
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "../../Icons/Print";
import { qrCode, QrCodeState } from "../../../store/ducks/qrCode/types";
import { CareState } from "../../../store/ducks/cares/types";
import { CachedTwoTone } from "@mui/icons-material";
import { ReactComponent as MarcaSollarAzul } from "../../../assets/img/marca-sollar-azul.svg";

// components
import Loading from "../../../components/Loading";
import NoPermission from "../../Erros/NoPermission";
import { toast } from "react-toastify";
interface IQrCodeProps {
  tittle: any;
  content: IContent;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IContent {
  tittle: string;
  rows: IRows[];
  qrCodeState: QrCodeState;
  careState: CareState;
}
interface IRows {
  name: string;
  value: any;
}

const capitalizeText = (words: string) => {
  if (words) {
    return words
      .toLowerCase()
      .split(" ")
      .map((text: string) => {
        return (text = text.charAt(0).toUpperCase() + text.substring(1));
      })
      .join(" ");
  } else return "";
};

export default function DialogQrCode(props: IQrCodeProps) {
  const {
    tittle,
    content: { qrCodeState, careState },
    openDialog,
    setOpenDialog,
  } = props;
  const rightsOfLayoutState = useSelector(
    (state: ApplicationState) => state.layout.data.rights
  );
  const logoState = useSelector((state: ApplicationState) => state.logo);
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
  const dispatch = useDispatch();
  const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID);
  const company_id = localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);
  const company_Name = localStorage.getItem(LOCALSTORAGE.COMPANY_NAME);
  const logoCompany = Buffer.from(logoState.data.logo.data).toString("base64");

  const buttonCreateQrcode = [
    {
      name: "Gerar QR Code",
      variant: "contained",
      background: "secondary",
      show: true,
      onClick: () => {
        checkCreatePermission("qrcode", JSON.stringify(rightsOfLayoutState))
          ? dispatch(createQrCodeRequest(handlerQrCode()))
          : toast.error("Você não tem permissão de gerar QR Code");
      },
    },
  ];
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `QR Code do Paciente ${
      careState.data.patient_id?.name ? careState.data.patient_id?.name : ""
    }`,
  });

  const handleClose = () => {
    setOpenDialog(false);
  };
  function handlerQrCode() {
    const newQrCode = {
      created_by: user_id,
      active: true,
      attendance_id: !integration ? careState.data._id : undefined,
      external_attendance_id: integration ? careState.data._id : undefined,
      company_id: company_id,
      external_patient_id: careState?.data?.patient_id?._id,
    };

    qrCodeState.data = newQrCode;
    return newQrCode;
  }
  function QrCodeToPrint() {
    return qrCodeState.data && qrCodeState.data.qr_code ? (
      <>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <QRCode
            value={qrCodeState.data.qr_code}
            fgColor={theme.palette.common.black}
            size={450}
          />
          <Typography
            fontSize={26}
            fontWeight={600}
            textTransform="capitalize"
            padding={1}
            align="center"
          >{`Paciente ${capitalizeText(
            careState?.data?.patient_id?.name
          )}`}</Typography>
          <Typography
            sx={{ fontSize: "22px" }}
          >{`Atendimento nº ${careState.data._id}`}</Typography>
          <Typography sx={{ fontSize: "22px" }}>{company_Name}</Typography>
          <Typography
            sx={{ marginTop: "8px", fontSize: "22px", textAlign: "center" }}
          >
            {`QR Code Gerado em: ${formatDate(
              qrCodeState.data.created_at,
              "DD/MM/YYYY"
            )} às ${formatDate(qrCodeState.data.created_at, "HH:mm:ss")}`}
          </Typography>
          {logoCompany ? (
            <img
              src={`data:image/png;base64,${logoCompany}`}
              style={{ width: "150px" }}
            ></img>
          ) : (
            ""
          )}
        </Grid>
      </>
    ) : (
      <Grid container>
        <Typography>Não existe QR Code para este atendimento</Typography>
      </Grid>
    );
  }
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      // sx={{ position: "relative" }}
    >
      <DialogActions
        sx={{
          textAlign: "right",
          margin: 1,
          width: "24px",
          position: "absolute",
          right: 0,
        }}
      >
        <IconButton sx={{ width: "24px", height: "24px" }}>
          <CloseIcon
            onClick={handleClose}
            sx={{
              fontWeight: "bold",
              color: theme.palette.grey[400],
              border: `2px solid ${theme.palette.grey[400]}`,
              borderRadius: "30px",
              transition: "150ms",
              cursor: "pointer",
              "& svg, path": { cursor: "pointer" },
              "&:hover": {
                color: theme.palette.grey[700],
                border: `2px solid ${theme.palette.grey[700]}`,
              },
            }}
          />
        </IconButton>
      </DialogActions>
      <DialogTitle align="center">QR CODE do atendimento</DialogTitle>
      {checkViewPermission("qrcode", JSON.stringify(rightsOfLayoutState)) ? (
        <DialogContent>
          <Box
            sx={{
              width: "400px",
              // height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {qrCodeState.data && qrCodeState.data.qr_code ? (
              <>
                <QRCode
                  value={qrCodeState.data.qr_code}
                  fgColor={theme.palette.common.black}
                />
                <Typography sx={{ marginTop: "8px" }}>
                  {`Gerado em: ${formatDate(
                    qrCodeState.data.created_at,
                    "DD/MM/YYYY"
                  )} às ${formatDate(qrCodeState.data.created_at, "HH:mm:ss")}`}
                </Typography>
                <Box
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <ButtonGeneration
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      checkEditPermission(
                        "qrcode",
                        JSON.stringify(rightsOfLayoutState)
                      )
                        ? dispatch(createQrCodeRequest(handlerQrCode()))
                        : toast.error("Você não tem permissão de gerar QR Code")
                    }
                  >
                    Gerar novo QR Code
                  </ButtonGeneration>
                  <ButtonToPrint onClick={handlePrint} variant="contained">
                    <PrintIcon fill={theme.palette.common.white} />
                  </ButtonToPrint>
                </Box>

                <div style={{ display: "none" }}>
                  <div ref={componentRef}>
                    <QrCodeToPrint />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Typography mb={2}>Não existe nenhum QR Code ativo</Typography>
                <ButtonGeneration
                  variant="contained"
                  color="primary"
                  onClick={() => dispatch(createQrCodeRequest(handlerQrCode()))}
                >
                  Gerar novo QR Code
                </ButtonGeneration>
              </>
            )}
          </Box>
        </DialogContent>
      ) : (
        <NoPermission />
      )}
    </Dialog>
  );
}
