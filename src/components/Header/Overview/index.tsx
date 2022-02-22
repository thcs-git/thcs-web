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

interface IRows {
  name: string;
  value: any;
}

interface IContent {
  tittle: string;
  rows: IRows[];
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

              {allergic && (
                <TagAllergic
                  style={{ marginLeft: "4px", fontWeight: "normal" }}
                >
                  <AllergicIcon />
                  Alérgico(a)
                </TagAllergic>
              )}
            </Box>
            <Box>
              <Box>
                {content.rows.map(
                  ({ name, value }: IRows, index: number) =>
                    name === "CID" && `CID ${integration ? value : value.name}`
                )}
              </Box>
            </Box>
          </CardText>
        </Box>
      </Box>

      <Box style={{ display: "flex", gap: "8px" }}>
        <BoxIcon onClick={handleClickOpen}>
          <QRCodeIcon style={{ height: "32px", width: "32px" }} />
          <Box>QR Code</Box>
        </BoxIcon>
        {/* <BoxIcon>
          <LocationIcon
            style={{ height: "32px", width: "32px", fill: "#ffffff" }}
          />
          <Box>Check-in/out</Box>
        </BoxIcon> */}
      </Box>
      <DialogInfo
        tittle={{ card: "Qr Code", info: ["Qr code"] }}
        content={content}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Container>
  );
}
