import React, { useState, useEffect, useCallback } from "react";

// redux saga
import { useDispatch, useSelector } from "react-redux";
import {
  loadCareById,
  updateCareRequest,
} from "../../../store/ducks/cares/actions";

// Helpers
import QRCode from "react-qr-code";
import { formatDate } from "../../../helpers/date";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";

// MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
// styles e styledComponents
import { ButtonGeneration } from "./styles";
// icons
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "../../Icons/Print";
import { CareState } from "../../../store/ducks/cares/types";

interface IQrCodeProps {
  tittle: any;
  content: IContent;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IContent {
  tittle: string;
  rows: IRows[];
  careState: CareState;
}
interface IRows {
  name: string;
  value: any;
}

export default function DialogQrCode(props: IQrCodeProps) {
  const {
    tittle,
    content: { careState },
    openDialog,
    setOpenDialog,
  } = props;

  const [qrCode, setQrCode] = useState(careState.data.qrCode || "");
  const [dateNow, setDateNow] = useState("");
  const [hourNow, setHourNow] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenDialog(false);
  };

  function handlerCareStateForQrCode() {
    careState.data.qrCode = new Date().toISOString();
    return careState.data;
  }

  const buttons = [
    {
      name: "Gerar novo QR Code",
      variant: "contained",
      background: "secondary",
      show: true,
      onClick: () => {
        dispatch(updateCareRequest(handlerCareStateForQrCode()));
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
        dispatch(updateCareRequest(handlerCareStateForQrCode()));
      },
    },
  ];

  return (
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
        {careState.data.qrCode && (
          <QRCode value={careState.data.qrCode} fgColor="var(--secondary)" />
        )}

        <Box sx={{ marginTop: "8px" }}>
          {careState.data.qrCode ? (
            <>
              Gerado em: {formatDate(careState.data.qrCode, "DD/MM/YYYY")} às{" "}
              {formatDate(careState.data.qrCode, "HH:mm:ss")}
            </>
          ) : (
            ""
          )}
        </Box>
        {careState.data.qrCode ? (
          <ButtonGeneration buttons={buttons} canEdit={true} />
        ) : (
          <ButtonGeneration buttons={buttonCreateQrcode} canEdit={true} />
        )}
      </Box>
    </Dialog>
  );
}
