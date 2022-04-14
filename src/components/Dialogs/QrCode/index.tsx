import React, { useState, useEffect, useCallback, useRef } from "react";

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
} from "../../../utils/permissions";
import crypto from "crypto";

// MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// styles e styledComponents
import { ButtonGeneration, ButtonToPrint } from "./styles";
// icons
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "../../Icons/Print";
import { qrCode, QrCodeState } from "../../../store/ducks/qrCode/types";
import { CareState } from "../../../store/ducks/cares/types";
import { CachedTwoTone } from "@material-ui/icons";
import { ReactComponent as MarcaSollarAzul } from "../../../assets/img/marca-sollar-azul.svg";

// components
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
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
        checkEditPermission("qrcode", JSON.stringify(rightsOfLayoutState))
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
          {/* <MarcaSollarAzul style={{ width: 300, height: 300 }} /> */}

          <QRCode
            value={qrCodeState.data.qr_code}
            fgColor="var(--black)"
            size={450}
          />
          <Box
            sx={{
              fontSize: "26px",
              textAlign: "center",
              fontWeight: "bold",
              margin: "8px 0",
            }}
          >{`Paciente ${careState?.data?.patient_id?.name}`}</Box>
          <Box
            sx={{ fontSize: "22px" }}
          >{`Atendimento nº ${careState.data._id}`}</Box>
          <Box sx={{ fontSize: "22px" }}>{company_Name}</Box>
          <Box sx={{ marginTop: "8px", fontSize: "22px", textAlign: "center" }}>
            <>
              QR Code Gerado em:{" "}
              {formatDate(qrCodeState.data.created_at, "DD/MM/YYYY")} às{" "}
              {formatDate(qrCodeState.data.created_at, "HH:mm:ss")}
            </>
          </Box>
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
        <Box>Não existe QR Code para este atendimento</Box>
      </Grid>
    );
  }
  return (
    <>
      {qrCodeState.loading && <Loading />}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogActions style={{ textAlign: "right" }}>
          <CloseIcon
            onClick={handleClose}
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "var(--gray)",
              border: " 2px solid var(--gray)",
              borderRadius: "30px",
              transition: "200ms",
              "&:hover": {
                color: "var(--gray-dark)",
                border: " 2px solid var(--gray-dark)",
              },
              "& svg, path": { cursor: "pointer" },
            }}
          />
        </DialogActions>

        <Box
          sx={{
            width: "400px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {qrCodeState.data && qrCodeState.data.qr_code ? (
            <>
              <QRCode value={qrCodeState.data.qr_code} fgColor="var(--black)" />
              <Box sx={{ marginTop: "8px" }}>
                <>
                  Gerado em:{" "}
                  {formatDate(qrCodeState.data.created_at, "DD/MM/YYYY")} às{" "}
                  {formatDate(qrCodeState.data.created_at, "HH:mm:ss")}
                </>
              </Box>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <ButtonGeneration
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
                <ButtonToPrint onClick={handlePrint}>
                  <PrintIcon fill={"var(--white"} />
                </ButtonToPrint>
                {/* <ButtonPrint >
                  
                </ButtonPrint> */}
              </Box>

              <div style={{ display: "none" }}>
                <div ref={componentRef}>
                  <QrCodeToPrint />
                </div>
              </div>
            </>
          ) : (
            <>
              <Box>Não existe nenhum QR Code ativo</Box>
              <ButtonGeneration
                onClick={() => dispatch(createQrCodeRequest(handlerQrCode()))}
              >
                Gerar novo QR Code
              </ButtonGeneration>
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
}
