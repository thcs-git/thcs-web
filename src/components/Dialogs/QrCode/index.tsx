import React, { useState } from "react";

// Helpers
import QRCode from "react-qr-code";
import { formatDate } from "../../../helpers/date";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";

// MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
//Components
import { ButtonGeneration } from "./styles";
// icons
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "../../Icons/Print";

interface IQrCodeProps {
  tittle: any;
  content: any;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DialogQrCode(props: IQrCodeProps) {
  const { tittle, content, openDialog, setOpenDialog } = props;
  const [qrCode, setQrCode] = useState(
    formatDate(undefined, "DD/MM/YYYY HH:mm:ss:SSS")
  );
  const [dateNow, setDateNow] = useState(formatDate(undefined, "DD/MM/YYYY"));
  const [hourNow, setHourNow] = useState(formatDate(undefined, "HH:mm:ss"));

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleQrCode = () => {
    setQrCode(formatDate(undefined, "DD/MM/YYYY HH:mm:ss:SSS"));
    setDateNow(formatDate(undefined, "DD/MM/YYYY"));
    setHourNow(formatDate(undefined, "HH:mm:ss"));
  };

  const buttons = [
    {
      name: "Gerar novo QR Code",
      variant: "contained",
      background: "secondary",
      show: true,
      onClick: handleQrCode,
    },
    {
      name: "",
      variant: "contained",
      background: "secondary",
      show: true,
      onClick: () => {
        console.log("cliquei");
      },
      component: <PrintIcon fill={"#FFFFFF"} />,
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
        <QRCode value={qrCode} fgColor="var(--secondary)" />
        <Box sx={{ marginTop: "8px" }}>
          Gerado em: {dateNow} às {hourNow}
        </Box>
        <ButtonGeneration buttons={buttons} canEdit={true} />
      </Box>
    </Dialog>
  );
}
