import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { keyframes, Box } from "@mui/material";
import theme from "../../../theme/theme";
import Fade from "@mui/material/Fade";
const colorPrimary = theme.palette.primary.main;
const colorSecondary = theme.palette.secondary.main;
const colorWhite = theme.palette.common.white;
const colorTerciary = theme.palette.terciary.main;

const arrayColor: string[] = [
  colorPrimary,
  colorSecondary,
  colorWhite,
  colorTerciary,
];

const changeColor = keyframes`
  0%{
  opacity: 0;
  background:${arrayColor[Math.floor(Math.random() * 4)]} ;
  

  }
  25%{
  opacity: 1;

  }
  50%{
    background: ${arrayColor[Math.floor(Math.random() * 4)]};
    opacity: 1;

  }
  100%{
    opacity: 0;
    /* background: ${arrayColor[Math.floor(Math.random() * 4)]} */
  }
`;

const arrayLayout = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", ""],
  ["", ""],
  ["", ""],
  [""],
  [""],
  [""],
  [""],
];

// setInterval(() => {
//   console.log("entroo");
// }, 1000);

function colorRandom(arrayLayout: string[][]) {
  const array = arrayLayout;

  for (let i = 0; i < array.length; i++) {
    for (let u = 0; u < array[i].length; u++) {
      let box1 = document.getElementById(`${i}-${u}-v1`);
      let box2 = document.getElementById(`${i}-${u}-v2`);
      if (box1) {
        box1.style.backgroundColor = arrayColor[Math.floor(Math.random() * 4)];
      }
      if (box2) {
        box2.style.backgroundColor = arrayColor[Math.floor(Math.random() * 4)];
      }
    }
  }
}
const interval = setInterval(() => {
  colorRandom(arrayLayout);
  // console.log("roletou");
  // clearInterval(interval);
}, 7000);

const BackgroundAnimated = (): any => {
  const layout = [];

  for (let i = 0; i < arrayLayout.length; i++) {
    const row = [];
    for (let u = 0; u < arrayLayout[i].length; u++) {
      row.push(
        <Box key={`${i}-${u}`} sx={{ display: "flex", gap: "0.2px" }}>
          <Box
            key={`${i}-${u}-v1`}
            id={`${i}-${u}-v1`}
            sx={{
              width: "35px",
              height: "43px",
              background: arrayColor[Math.floor(Math.random() * 4)],
              transform: "skewY(-16deg)",
              transition: "all 2s",
            }}
          />
          <Box
            key={`${i}-${u}-v2`}
            id={`${i}-${u}-v2`}
            sx={{
              width: "35px",
              height: "43px",
              background: arrayColor[Math.floor(Math.random() * 4)],
              transform: "skewY(16deg)",
              transition: "all 2s",
            }}
          />
        </Box>
      );
    }
    layout.push(
      <Box
        key={`layout-${i}`}
        sx={{
          display: "flex",
          gap: "0.2px",
        }}
      >
        {row}
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2px" }}>
      {layout}
    </Box>
  );
};
// export default BackgroundAnimated;
export default memo(BackgroundAnimated);
