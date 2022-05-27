import React, { useState } from "react";
// redux e saga
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store";

//types
import { CareState } from "../../../store/ducks/cares/types";
//MUI
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//IMG or SVG
import IconProfile from "../../../assets/img/icon-profile.svg";
import { ReactComponent as AllergicIcon } from "../../../assets/img/icon-alergia.svg";
import { ReactComponent as LocationIcon } from "../../../assets/img/icon-location-green.svg";
import QRCodeIcon from "../../Icons/QrCode";
import PatientIcon from "../../Icons/Patient";

//style Components
import {
  ContainerStyle as Container,
  TagAllergic,
  CardText,
  BoxIcon,
} from "./styles";
import DialogInfo from "../../Dialogs/Card/Info";
import DialogQrCode from "../../Dialogs/QrCode";
import { QrCodeState } from "../../../store/ducks/qrCode/types";
import { checkViewPermission } from "../../../utils/permissions";
import NoPermission from "../../Erros/NoPermission";
import { toast } from "react-toastify";

interface IRows {
  name: string;
  value: any;
}

interface IContent {
  tittle: string;
  rows: IRows[];
  qrCodeState: QrCodeState;
  careState: CareState;
}

interface IProps {
  content: IContent;
  allergic?: boolean;
  integration?: any;
}

export default function HeaderOverview(props: IProps) {
  const { content, allergic, integration } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const rightsOfLayoutState = useSelector(
    (state: ApplicationState) => state.layout.data.rights
  );
  const handleClickOpen = () => {
    checkViewPermission("qrcode", JSON.stringify(rightsOfLayoutState))
      ? setOpenDialog(true)
      : toast.error("Você não tem permissão para visualizar o QR Code");
  };

  function handlerCID(rows: IRows[]) {
    const cid = rows.filter(({ name, value }: IRows) => {
      if (name === "CID" && value) return value;
    });
    return cid.length > 0 ? cid[0].value : "Não informado";
  }
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <Box>
          <PatientIcon
            fill={"var(--secondary)"}
            width={"48px"}
            height={"48px"}
          />
        </Box>

        <Box>
          <CardText>
            <Box className="name">
              {content.rows.map(
                ({ name, value }: IRows, index: number) =>
                  name === "Nome" && value
              )}
            </Box>
            <Box>
              <Box>CID {handlerCID(content.rows)}</Box>
            </Box>
          </CardText>
        </Box>
      </Box>
      {content.careState.data.tipo === "H" && (
        <Box style={{ display: "flex", gap: "8px" }}>
          <BoxIcon onClick={handleClickOpen}>
            <QRCodeIcon fill={"var(--gray-dark)"} />
            <Box sx={{ color: "var(--secondary)" }}>QR Code</Box>
          </BoxIcon>
        </Box>
      )}

      <DialogQrCode
        tittle={{ card: "Qr Code", info: ["Qr code"] }}
        content={content}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Container>
  );
}
