import React from "react";

interface IPropsSvg {
  houseColor: any;
  windowColor: any;
  width?: any;
  height?: any;
}

export default function House1(props: IPropsSvg) {
  const { houseColor, windowColor, width, height } = props;

  return (
    <svg
      width={width ? width : "78"}
      height={height ? height : "148"}
      viewBox="0 0 78 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.948975 147.469H77.4747L77.8498 11.6737L39.587 0.419922L0.948975 11.6737V147.469Z"
        fill={houseColor}
      />
      <path
        d="M28.7085 104.706H50.4658V82.9485L39.5872 79.1973L28.7085 82.9485V104.706Z"
        fill={windowColor}
      />
      <path
        d="M28.7085 64.9422H50.4658V43.1849L39.5872 39.4336L28.7085 43.1849V64.9422Z"
        fill={windowColor}
      />
    </svg>
  );
}
