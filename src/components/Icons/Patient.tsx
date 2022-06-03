import React from "react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../../theme/theme";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
  circleColor?: any;
  noCircle?: boolean;
}
export default function PatientIcon(props: IPropsSvg) {
  const { fill, width, height, circleColor, noCircle } = props;
  return (
    <ThemeProvider theme={theme}>
      {noCircle ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width ? width : "13.474"}
          height={height ? height : "15.398"}
          viewBox="0 0 13.474 15.398"
        >
          <g id="icon-pacient-details" transform="translate(-367 -499.856)">
            <path
              id="Icon_awesome-user-injured"
              data-name="Icon awesome-user-injured"
              d="M8.342.36A3.821,3.821,0,0,0,3.173,2.406H5.614L8.342.36ZM10.3,2.406A3.841,3.841,0,0,0,9.2.917L7.218,2.406H10.3ZM6.737,7.7a3.85,3.85,0,0,0,3.85-3.85,3.846,3.846,0,0,0-.048-.481h-7.6a3.79,3.79,0,0,0-.048.481A3.85,3.85,0,0,0,6.737,7.7ZM2.406,9.014V15.4H6.263L3.3,8.736a4,4,0,0,0-.9.277ZM0,13.955A1.444,1.444,0,0,0,1.444,15.4V9.631A4.015,4.015,0,0,0,0,12.7Zm7.7-1.444H6.034L7.317,15.4H7.7a1.444,1.444,0,0,0,0-2.887Zm1.732-3.85h-.5a5.234,5.234,0,0,1-4.384,0H4.323l1.283,2.887H7.7a2.409,2.409,0,0,1,2.406,2.406A2.383,2.383,0,0,1,9.612,15.4H12.03a1.444,1.444,0,0,0,1.444-1.444V12.7A4.042,4.042,0,0,0,9.432,8.662Z"
              transform="translate(367 499.856)"
              fill={fill}
            ></path>
          </g>
        </svg>
      ) : (
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
      )}
    </ThemeProvider>
  );
}
