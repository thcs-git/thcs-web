import React, { useEffect, useState } from "react";
// import Glider from "react-glider";
// Icons
import { ReactComponent as ChartIcon } from "../../../assets/img/icon-prontuario-1.svg";
import { ReactComponent as PrescriptionIcon } from "../../../assets/img/icon-prescription.svg";
import { ReactComponent as MeasurementIcon } from "../../../assets/img/icon-measurement.svg";
import { ReactComponent as AntibioticsIcon } from "../../../assets/img/icon-antibiotics.svg";
import { ReactComponent as DiagnosisIcon } from "../../../assets/img/icon-diagnosis.svg";
import { ReactComponent as ExamIcon } from "../../../assets/img/icon-exam.svg";
import { ReactComponent as HistoryIcon } from "../../../assets/img/icon-history.svg";
import AlergicIcon from "../../Icons/allergic";
import CheckIcon from "../../Icons/Check";
import FilterListIcon from "@mui/icons-material/FilterList";
import AttestIcon from "../../Icons/Attest";
//MUI
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
import Button from "@mui/material/Button";
import { width } from "@mui/system";

interface IScroll {
  tittle?: string;
  cards: string[];
  iconName?: string;
  onClickCard?: any;
  allergic?: boolean;
  loadingCard?: boolean;
  reportType?: string;
  reportActive?: boolean;
  openFilter?: () => void;
  existContent?: boolean;
  selectCard: string;
  setSelectCard: React.Dispatch<React.SetStateAction<string>>;
}

export default function ScrollCard(props: IScroll) {
  const {
    tittle,
    cards,
    iconName,
    onClickCard,
    allergic,
    loadingCard,
    openFilter,
    reportType,
    reportActive,
    existContent,
    selectCard,
    setSelectCard,
  } = props;
  const [openBackdrop, setOpenBackdrop] = useState(true);

  useEffect(() => {
    if (loadingCard) {
      setOpenBackdrop(true);
    } else {
      setOpenBackdrop(false);
    }
  }, [loadingCard]);

  function handleSelectCard(name: string) {
    if (name === selectCard) {
      setSelectCard("");
    } else {
      setSelectCard(name);
    }
  }
  function handleClickCard(name: string): any {
    if (name !== "Alergias") {
      onClickCard(name);
      handleSelectCard(name);
    } else if (!loadingCard) {
      onClickCard(name);
      handleSelectCard(name);
    }
  }
  function handlerShowFilter(report: any, active: any) {
    if (active === true && existContent) {
      if (report === "Evolução" || report === "Check-in/out") {
        return (
          <Button onClick={openFilter} sx={{ padding: "0", minWidth: "30px" }}>
            <FilterListIcon
              sx={{ color: "var(--secondary)", height: "24px" }}
            />
          </Button>
        );
      }
    }
  }
  const cardsItens = cards.map((name: string, index: number) => {
    return (
      <Card
        key={index}
        onClick={() => handleClickCard(name)}
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
          {name === "Check-in/out" && <CheckIcon fill={"#0899BA"} />}
          {name === "Prescrições" && <PrescriptionIcon />}
          {name === "Aferições" && <MeasurementIcon />}
          {name === "Alergias" && (
            <>
              {loadingCard ? (
                <CircularProgress sx={{ color: "var(--secondary)" }} />
              ) : (
                <AlergicIcon fill={allergic ? "#FF6565" : "#0899BA"} />
              )}
            </>
          )}
          {name === "Antibióticos" && <AntibioticsIcon />}
          {name === "Evolução" && <DiagnosisIcon />}
          {name === "Exames" && <ExamIcon />}
          {name === "Atestados" && <AttestIcon fill={"#0899BA"} />}
        </IconCard>
        <FooterCard
          className="FoorterCard"
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
      <Box sx={{ padding: "0px 40px 0 40px" }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "14px",
              gap: "8px",
              fontWeight: "bold",
              color: "var(--secondary)",
            }}
          >
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Box sx={{ height: "24px" }}>
                {iconName === "ChartIcon" && (
                  <ChartIcon style={{ height: "24px" }} />
                )}
              </Box>
              <Box>{tittle && tittle}</Box>
            </Box>

            {handlerShowFilter(reportType, reportActive)}
          </Box>
          <Box className="wrapperScroll" sx={{ maxWidth: "1000px" }}>
            <Box
              id="glider-prev-1"
              className="glider-prev"
              sx={{ width: "125px" }}
            >
              <ArrowBackIosNewIcon sx={{ width: "30px", height: "auto" }} />
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
              <ArrowForwardIosIcon sx={{ width: "30px", height: "auto" }} />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
