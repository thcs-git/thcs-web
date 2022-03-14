import React, { useState } from "react";

//types
import { CareState } from "../../../store/ducks/cares/types";
//MUI
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//IMG or SVG
import IconProfile from "../../../assets/img/icon-profile.svg";
import { ReactComponent as AllergicIcon } from "../../../assets/img/icon-alergia.svg";
import { ReactComponent as QRCodeIcon } from "../../../assets/img/qr-code-green.svg";
import { ReactComponent as LocationIcon } from "../../../assets/img/icon-location-green.svg";

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

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  function handlerCID(rows: IRows[]) {
    const cid = rows.filter(({ name, value }: IRows) => {
      if (name === "CID" && value) return value;
    });
    console.log(cid);
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
          <AccountCircleIcon
            style={{ width: "56px", height: "56px", marginLeft: "16px" }}
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

      <Box style={{ display: "flex", gap: "8px" }}>
        <BoxIcon onClick={handleClickOpen}>
          <QRCodeIcon style={{ height: "32px", width: "32px" }} />
          <Box>QR Code</Box>
        </BoxIcon>
      </Box>
      <DialogQrCode
        tittle={{ card: "Qr Code", info: ["Qr code"] }}
        content={content}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Container>
  );
}
