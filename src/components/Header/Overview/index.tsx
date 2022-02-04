import React from "react";

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
}

export default function HeaderOverview(props: IProps) {
  const { content } = props;

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

              <TagAllergic style={{ marginLeft: "4px", fontWeight: "normal" }}>
                <AllergicIcon />
                Alérgico(a)
              </TagAllergic>
            </Box>

            <Box>
              <Box>
                {content.rows.map(
                  ({ name, value }: IRows, index: number) =>
                    name === "CID" && `DIagnóstico: CID ${value.name}`
                )}
              </Box>
            </Box>
          </CardText>
        </Box>
      </Box>

      <Box style={{ display: "flex", gap: "8px" }}>
        <BoxIcon>
          <QRCodeIcon style={{ height: "32px", width: "32px" }} />
          <Box>QR Code</Box>
        </BoxIcon>
        <BoxIcon>
          <LocationIcon
            style={{ height: "32px", width: "32px", fill: "#ffffff" }}
          />
          <Box>Check-in/out</Box>
        </BoxIcon>
      </Box>
    </Container>
  );
}
