import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}

export default function DashCircleIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      id="icon_alert_negative"
      data-name="icon alert negative"
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "20"}
      height={height ? height : "20"}
      viewBox="0 0 30 30"
    >
      <line x1="0" y1="1" x2="30" y2="1" stroke="black" />
      {/* <path
        id="_Color"
        data-name=" ↳Color"
        d="M15,30A15,15,0,1,1,30,15,15.017,15.017,0,0,1,15,30ZM15,3A12,12,0,1,0,27,15,12.011,12.011,0,0,0,15,3Zm8,14H7V14H23v3Z"
        fill={fill}
      /> */}
    </svg>
  );
}
