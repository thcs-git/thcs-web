import React, { useState, useEffect, useCallback } from "react";

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

import crypto from "crypto";

// MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
// styles e styledComponents
import { ButtonGeneration } from "./styles";
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
  const buttons = [
    {
      name: "Gerar novo QR Code",
      variant: "contained",
      background: "secondary",
      show: true,
      onClick: () => {
        updateAndCreateQrCode();
        // dispatch(loadQrCodeRequest(handlerCareStateForQrCode()));
      },
    },
    {
      name: "",
      variant: "contained",
      background: "secondary",
      show: true,
      onClick: () => {
        window.print();
      },
      component: <PrintIcon fill={"#FFFFFF"} />,
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

  const handleClose = () => {
    setOpenDialog(false);
  };

  function handlerQrCode() {
    const newQrCode = {
      created_by: user_id,
      active: true,
      attendance_id: !integration ? careState.data._id : undefined,
      external_attendance_id: integration ? careState.data._id : undefined,
      qr_code: crypto
        .createHash("md5")
        .update(
          JSON.stringify({
            dataNow: new Date().toISOString(),
            attendance_id: careState.data._id,
          })
        )
        .digest("hex"),
    };

    qrCodeState.data = newQrCode;
    return newQrCode;
  }

  function updateAndCreateQrCode() {
    qrCodeState.data.active = false;
    dispatch(updateQrCodeRequest(qrCodeState.data));
    dispatch(createQrCodeRequest(handlerQrCode()));
  }

  console.log(qrCodeState, "QRCODE@@@");
  return (
    <>
      {qrCodeState.loading && <Loading />}
      <Dialog open={openDialog} onClose={handleClose}>
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
              <QRCode
                value={qrCodeState.data.qr_code}
                fgColor="var(--secondary)"
              />
              <Box sx={{ marginTop: "8px" }}>
                <>
                  Gerado em:{" "}
                  {formatDate(qrCodeState.data.created_at, "DD/MM/YYYY")} às{" "}
                  {formatDate(qrCodeState.data.created_at, "HH:mm:ss")}
                </>
              </Box>
              <ButtonGeneration buttons={buttons} canEdit={true} />
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
