import React from "react";

interface IPropsSvg {
  portColor: any;
  houseColor: any;
  width?: any;
  height?: any;
}

export default function House2(props: IPropsSvg) {
  const { portColor, houseColor, width, height } = props;

  return (
    <svg
      width={width ? width : "77"}
      height={height ? height : "95"}
      viewBox="0 0 77 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M76.2504 11.5681V94.471H0.474976V11.5681L38.3627 0.689453L76.2504 11.5681Z"
        fill={houseColor}
      />
      <path
        d="M28.2345 94.8449H49.9918V48.3293L39.1132 44.9531L28.2345 48.3293V94.8449Z"
        fill={portColor}
      />
    </svg>
  );
}
