import React, { useState } from "react";
// redux e saga
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store";

//types
import { CareState } from "../../../store/ducks/cares/types";
//MUI
import { Box, Typography } from "@mui/material";
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
import theme from "../../../theme/theme";
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
            fill={theme.palette.primary.main}
            width={"48px"}
            height={"48px"}
          />
        </Box>

        <Box>
          <Typography
            className="name"
            fontSize={18}
            color={theme.palette.common.white}
            fontWeight={700}
          >
            {content.rows.map(
              ({ name, value }: IRows, index: number) =>
                name === "Nome" && value
            )}
          </Typography>

          <Typography fontSize={12} color={theme.palette.common.white}>
            CID {handlerCID(content.rows)}
          </Typography>
        </Box>
      </Box>
      {content.careState.data.tipo === "H" && (
        <Box sx={{ display: "flex" }}>
          <BoxIcon onClick={handleClickOpen} sx={{ paddingTop: "4px" }}>
            <QRCodeIcon fill={theme.palette.common.black} />
            <Typography
              sx={{ cursor: "pointer" }}
              fontWeight={700}
              fontSize="0.75rem"
              color={theme.palette.secondary.main}
            >
              QR CODE
            </Typography>
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
