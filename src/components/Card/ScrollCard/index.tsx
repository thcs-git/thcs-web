import React, { useEffect, useState } from "react";
// import Glider from "react-glider";
//Img
import { ReactComponent as ChartIcon } from "../../../assets/img/icon-prontuario-1.svg";
import { ReactComponent as PrescriptionIcon } from "../../../assets/img/icon-prescription.svg";
import { ReactComponent as MeasurementIcon } from "../../../assets/img/icon-measurement.svg";
// import { ReactComponent as AlergicIcon } from "../../../assets/img/icon-alergic.svg";
import { ReactComponent as AntibioticsIcon } from "../../../assets/img/icon-antibiotics.svg";
import { ReactComponent as DiagnosisIcon } from "../../../assets/img/icon-diagnosis.svg";
import { ReactComponent as ExamIcon } from "../../../assets/img/icon-exam.svg";
import { ReactComponent as HistoryIcon } from "../../../assets/img/icon-history.svg";
import AlergicIcon from "../../Icons/allergic";

//MUI
import Box from "@material-ui/core/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
//Styles
import "./styles";

import {
  ContainerStyle as Container,
  GliderStyle as Glider,
  Card,
  FooterCard,
  IconCard,
} from "./styles";
import {} from "./styles";

interface IScroll {
  tittle?: string;
  cards: string[];
  iconName?: string;
  onClickCard?: any;
  allergic?: boolean;
}

export default function ScrollCard(props: IScroll) {
  const { tittle, cards, iconName, onClickCard, allergic } = props;
  const [selectCard, setSelectCard] = useState("");

  function handleSelectCard(name: string) {
    if (name === selectCard) {
      setSelectCard("");
    } else {
      setSelectCard(name);
    }
  }

  const cardsItens = cards.map((name: string, index: number) => {
    return (
      <Card
        key={index}
        onClick={() => {
          onClickCard(name);
          handleSelectCard(name);
        }}
        sx={{
          border: `${
            name === selectCard
              ? name === "Alergias" && allergic
                ? "1px solid var(--danger)"
                : "1px solid var(--secondary)"
              : "1px solid #ebebeb"
          }`,
        }}
      >
        <IconCard>
          {name === "Prescrições" && <PrescriptionIcon />}
          {name === "Aferições" && <MeasurementIcon />}
          {name === "Alergias" && (
            <AlergicIcon fill={allergic ? "#FF6565" : "#0899BA"} />
          )}
          {name === "Antibióticos" && <AntibioticsIcon />}
          {name === "Evolução" && <DiagnosisIcon />}
          {name === "Exames" && <ExamIcon />}
          {name === "Atestados" && <HistoryIcon />}
        </IconCard>
        <FooterCard
          sx={{
            backgroundColor: `${
              name === selectCard
                ? name === "Alergias" && allergic
                  ? "var(--danger)"
                  : "var(--secondary)"
                : "var(--gray-light);"
            }`,
            color: `${name === selectCard ? "var(--white)" : ""}`,
          }}
        >
          {name}
        </FooterCard>
      </Card>
    );
  });

  return (
    <>
      <Box style={{ padding: "0px 40px 0 40px" }}>
        <Container>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "14px",
              gap: "8px",
              fontWeight: "bold",
              color: "var(--secondary)",
            }}
          >
            <Box style={{ height: "24px" }}>
              {iconName === "ChartIcon" && (
                <ChartIcon style={{ height: "24px" }} />
              )}
            </Box>
            <Box>{tittle && tittle}</Box>
          </Box>
          <Box className="wrapperScroll" style={{ maxWidth: "1000px" }}>
            <Box
              id="glider-prev-1"
              className="glider-prev"
              style={{ width: "125px" }}
            >
              <ArrowBackIosNewIcon style={{ width: "30px", height: "auto" }} />
            </Box>
            <Glider
              draggable
              hasArrows={true}
              scrollToSlide={1}
              slidesToShow={5}
              duration={2}
              slidesToScroll={1}
              arrows={{
                next: ".glider-next",
                prev: ".glider-prev",
              }}
            >
              {cardsItens}
            </Glider>
            <Box id="glider-next-1" className="glider-next">
              <ArrowForwardIosIcon style={{ width: "30px", height: "auto" }} />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
