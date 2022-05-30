import React from "react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../../theme/theme";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
  circleColor?: any;
}
export default function PatientIcon(props: IPropsSvg) {
  const { fill, width, height, circleColor } = props;
  return (
    <ThemeProvider theme={theme}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ? width : "28"}
        height={height ? height : "28"}
        viewBox="0 0 28 28"
      >
        <defs></defs>
        <g transform="translate(-356 -925)">
          <g transform="translate(356 925)">
            <circle
              fill={circleColor ? circleColor : theme.palette.common.white}
              cx="14"
              cy="14"
              r="14"
            />
          </g>
          <path
            fill={fill}
            d="M8.566.37a3.924,3.924,0,0,0-5.308,2.1H5.765l2.8-2.1Zm2.012,2.1A3.944,3.944,0,0,0,9.45.941L7.411,2.471h3.166ZM6.917,7.906A3.953,3.953,0,0,0,10.87,3.953a3.949,3.949,0,0,0-.05-.494H3.014a3.892,3.892,0,0,0-.05.494A3.953,3.953,0,0,0,6.917,7.906ZM2.471,9.255v6.556H6.431L3.391,8.97a4.1,4.1,0,0,0-.921.285ZM0,14.329a1.482,1.482,0,0,0,1.482,1.482V9.89A4.123,4.123,0,0,0,0,13.044Zm7.906-1.482H6.2l1.318,2.965h.393a1.482,1.482,0,0,0,0-2.965ZM9.684,8.894H9.168a5.374,5.374,0,0,1-4.5,0H4.439l1.318,2.965H7.906a2.473,2.473,0,0,1,2.471,2.471,2.447,2.447,0,0,1-.507,1.482h2.483a1.482,1.482,0,0,0,1.482-1.482V13.044A4.15,4.15,0,0,0,9.684,8.894Z"
            transform="translate(363 931)"
          />
        </g>
      </svg>
    </ThemeProvider>
  );
}
