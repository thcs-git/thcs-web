import React from "react";

interface IPropsSvg {
  houseColor: any;
  houseColor2: any;
  houseColor3: any;
  houseColor4: any;
  windowColor: any;
  windowColor2: any;
  portColor: any;
  portColor2: any;
  width?: any;
  height?: any;
}

export default function HouseGroup(props: IPropsSvg) {
  const {
    houseColor,
    houseColor2,
    houseColor3,
    houseColor4,
    windowColor,
    windowColor2,
    portColor,
    portColor2,
    width,
    height,
  } = props;

  return (
    <svg
      width={width ? width : "305"}
      height={height ? height : "148"}
      viewBox="0 0 305 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.375 147.469H76.9007L77.2758 11.6737L39.013 0.419922L0.375 11.6737V147.469Z"
        fill={houseColor} // houseColor
      />
      <path
        d="M152.676 147.469H229.202L229.577 11.6737L191.314 0.419922L152.676 11.6737V147.469Z"
        fill={houseColor3} // houseColor3
      />
      <path
        d="M152.676 64.5681V147.471H76.901V64.5681L114.789 53.6895L152.676 64.5681Z"
        fill={houseColor2} // houseColor2
      />
      <path
        d="M304.977 64.5681V147.471H229.201V64.5681L267.089 53.6895L304.977 64.5681Z"
        fill={houseColor4} // houseColor4
      />
      <path
        d="M104.66 147.845H126.418V101.329L115.539 97.9531L104.66 101.329V147.845Z"
        fill={portColor} //portColor
      />
      <path
        d="M256.961 147.845H278.718V101.329L267.84 97.9531L256.961 101.329V147.845Z"
        fill={portColor2} //portColor2
      />
      <path
        d="M28.1345 104.706H49.8918V82.9485L39.0132 79.1973L28.1345 82.9485V104.706Z"
        fill={windowColor} // windowsColor
      />
      <path
        d="M180.435 104.706H202.193V82.9485L191.314 79.1973L180.435 82.9485V104.706Z"
        fill={windowColor2} // windowColor2
      />
      <path
        d="M28.1345 64.9422H49.8918V43.1849L39.0132 39.4336L28.1345 43.1849V64.9422Z"
        fill={windowColor} //windowColor
      />
      <path
        d="M180.435 64.9422H202.193V43.1849L191.314 39.4336L180.435 43.1849V64.9422Z"
        fill={windowColor2} // windowColor2
      />
    </svg>
  );
}
