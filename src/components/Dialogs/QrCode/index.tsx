import React, { useState, useEffect, useCallback, useRef } from "react";

// redux saga
import { useDispatch, useSelector } from "react-redux";
import {
  createQrCodeRequest,
  updateQrCodeRequest,
} from "../../../store/ducks/qrCode/actions";

// Helpers
import QRCode from "react-qr-code";
import { formatDate } from "../../../helpers/date";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import ReactToPrint from "react-to-print";

import crypto from "crypto";

// MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
// styles e styledComponents
import { ButtonGeneration, ButtonPrint } from "./styles";
// icons
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "../../Icons/Print";
import { qrCode, QrCodeState } from "../../../store/ducks/qrCode/types";
import { CareState } from "../../../store/ducks/cares/types";
import { CachedTwoTone } from "@material-ui/icons";
// components
import Loading from "../../../components/Loading";

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

  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
  const dispatch = useDispatch();
  const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID);
  const company_id = localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);

  const buttonNew = [
    {
      name: "Gerar novo QR Code",
      variant: "contained",
      background: "secondary",
      show: true,
      onClick: () => {
        dispatch(createQrCodeRequest(handlerQrCode()));
      },
    },
  ];

  const buttonCreateQrcode = [
    {
      name: "Gerar QR Code",
      variant: "contained",
      background: "secondary",
      show: true,
      onClick: () => {
        dispatch(createQrCodeRequest(handlerQrCode()));
      },
    },
  ];
  const componentRef = useRef(null);

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

  return (
    <>
      {qrCodeState.loading && <Loading />}
      <Dialog open={openDialog} onClose={handleClose} ref={componentRef}>
        <DialogActions style={{ textAlign: "right" }}>
          <CloseIcon
            onClick={handleClose}
            sx={{
              fontWeight: "bold",
              color: "var(--gray)",
              border: " 2px solid var(--gray)",
              borderRadius: "30px",
              transition: "200ms",
              "&:hover": {
                color: "var(--gray-dark)",
                border: " 2px solid var(--gray-dark)",
              },
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
                <ButtonGeneration buttons={buttonNew} canEdit={true} />
                <ReactToPrint
                  documentTitle={`QR Code do Paciente ${
                    careState.data.patient_id?.name
                      ? careState.data.patient_id?.name
                      : ""
                  }`}
                  trigger={() => (
                    <ButtonPrint>
                      <PrintIcon fill={"var(--white"} />
                    </ButtonPrint>
                    // <ButtonGeneration buttons={buttonPrint} canEdit={false} />
                  )}
                  content={() => componentRef.current}
                />
              </Box>
            </>
          ) : (
            <>
              <Box>Não existe nenhum QR Code ativo</Box>
              <ButtonGeneration buttons={buttonCreateQrcode} canEdit={true} />
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
}
