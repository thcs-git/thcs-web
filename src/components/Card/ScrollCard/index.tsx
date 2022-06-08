import React, { useEffect, useState } from "react";
// import Glider from "react-glider";
// Icons
import ChartIcon from "../../Icons/Chart";
import PrescriptionIcon from "../../Icons/Prescription";
import MeasurementIcon from "../../Icons/measurement";
import ExamIcon from "../../Icons/ExamsReport";
import AntibioticsIcon from "../../Icons/Antibiotic";
import EvolutionIcon from "../../Icons/Evolution";

// import { ReactComponent as DiagnosisIcon } from "../../../assets/img/icon-diagnosis.svg";
import CheckMedIcon from "../../Icons/CheckMed";
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
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";

//Styles
import "./styles";
import {
  ContainerStyle as Container,
  GliderStyle as Glider,
  Card,
  FooterCard,
  IconCard,
} from "./styles";
import theme from "../../../theme/theme";
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
          <IconButton
            onClick={openFilter}
            sx={{
              padding: "0",
              width: "2rem",
              height: "2rem",
              "& svg, path": { cursor: "pointer" },
            }}
          >
            <FilterListIcon color="secondary" sx={{ height: "24px" }} />
          </IconButton>
        );
      }
    }
  }
  const colorIconsCard = theme.palette.primary.main;
  const cardsItens = cards.map((name: string, index: number) => {
    return (
      <Card
        key={index}
        onClick={() => handleClickCard(name)}
        sx={{
          border: `${
            name === selectCard
              ? name === "Alergias" && allergic
                ? `1px solid ${theme.palette.error.main}`
                : `1px solid ${colorIconsCard}`
              : `1px solid ${theme.palette.grey[300]}`
          }`,
        }}
      >
        <IconCard>
          {name === "Check-in/out" && <CheckIcon fill={colorIconsCard} />}
          {name === "Prescrições" && (
            <PrescriptionIcon fill={colorIconsCard} height={"50px"} />
          )}
          {name === "Aferições" && <MeasurementIcon fill={colorIconsCard} />}
          {name === "Checagens" && <CheckMedIcon fill={colorIconsCard} />}
          {name === "Alergias" && (
            <>
              {loadingCard ? (
                <CircularProgress color="secondary" />
              ) : (
                <AlergicIcon
                  fill={allergic ? theme.palette.error.main : colorIconsCard}
                />
              )}
            </>
          )}
          {name === "Antibióticos" && <AntibioticsIcon fill={colorIconsCard} />}
          {name === "Evolução" && <EvolutionIcon fill={colorIconsCard} />}
          {name === "Exames" && <ExamIcon fill={colorIconsCard} />}
          {name === "Atestados" && <AttestIcon fill={colorIconsCard} />}
        </IconCard>
        <FooterCard
          className="FoorterCard"
          sx={{
            backgroundColor: `${
              name === selectCard
                ? name === "Alergias" && allergic
                  ? theme.palette.error.main
                  : colorIconsCard
                : theme.palette.grey[300]
            }`,
          }}
        >
          <Typography
            sx={{ cursor: "pointer" }}
            fontSize={"0.9rem"}
            color={`${
              name === selectCard
                ? theme.palette.common.white
                : theme.palette.grey[700]
            }`}
          >
            {name}
          </Typography>
        </FooterCard>
      </Card>
    );
  });
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "14px",
          gap: "8px",
          // fontWeight: "bold",
        }}
      >
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Box sx={{ height: "24px" }}>
            {iconName === "ChartIcon" && (
              <ChartIcon fill={theme.palette.primary.main} height="24px" />
            )}
          </Box>
          <Typography
            variant="body1"
            fontWeight={600}
            color={theme.palette.primary.main}
          >
            {tittle && tittle}
          </Typography>
        </Box>

        {handlerShowFilter(reportType, reportActive)}
      </Box>
      <Box className="wrapperScroll">
        <Box id="glider-prev-1" className="glider-prev" sx={{ width: "125px" }}>
          <ArrowBackIosNewIcon sx={{ width: "30px", height: "auto" }} />
        </Box>
        <Glider
          draggable
          hasArrows={true}
          scrollToSlide={0}
          slidesToShow={5} // cinco é um numero mágico cara
          duration={2}
          slidesToScroll={"auto"}
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
  );
}
