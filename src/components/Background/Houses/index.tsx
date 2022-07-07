import React, { memo } from "react";
// MUI
import { keyframes, Box, useMediaQuery } from "@mui/material";
//STYLES
import theme from "../../../theme/theme";
//ICONS
import HouseGroup from "../../Icons/HouseGroup";
import CloudIcon from "../../Icons/Cloud";

const colorPrimary = theme.palette.primary.main;
const colorSecondary = theme.palette.secondary.main;
const colorWhite = theme.palette.common.white;
const colorTerciary = theme.palette.terciary.main;

interface IBackgroundHouses {
  amountOfHouses?: Number;
  amountOfClouds?: number;
}

const BackgroundHouses = ({
  amountOfHouses,
  amountOfClouds,
}: IBackgroundHouses) => {
  const smQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.sm}px)`);
  const mdQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.md}px)`);

  const quantityHouses = amountOfHouses || 4;
  const quantityClouds = amountOfClouds || smQuery ? 3 : mdQuery ? 6 : 10;
  const clouds = [];
  const houses = [];

  const keyframeCloud = keyframes`
    0% {
      transform: translateX(0vw);
    }
    100%{
      transform: translateX(calc(100vw + 89px));
    }
   
    `;

  for (let i = 0; i < quantityHouses; i++) {
    houses.push(
      <HouseGroup
        key={`house-${i}`}
        width={"275px"}
        height={"148px"}
        houseColor={colorSecondary}
        houseColor2={colorTerciary}
        houseColor3={colorWhite}
        houseColor4={colorSecondary}
        portColor={colorSecondary}
        portColor2={colorPrimary}
        windowColor={colorTerciary}
        windowColor2={colorSecondary}
      />
    );
  }

  for (let i = 0; i < quantityClouds; i++) {
    clouds.push(
      <Box
        key={`cloud-${i}`}
        sx={{
          animation: `${keyframeCloud} ${
            35 + Math.floor(Math.random() * 35)
          }s linear infinite`,
          animationDelay: `${i * 6 + Math.floor(Math.random() * 5)}s`,
          position: "absolute",
          bottom: `${100 + Math.floor(Math.random() * 70)}px`,
          left: "-89px",
        }}
      >
        <CloudIcon fill={"white"} />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {clouds}

      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          width: "min-content",
          overflow: "hidden",
          height: "140px",
          position: "absolute",
          bottom: 0,
        }}
      >
        {houses}
      </Box>
    </Box>
  );
};
export default memo(BackgroundHouses);
