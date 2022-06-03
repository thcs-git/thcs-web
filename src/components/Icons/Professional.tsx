import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}

export default function ProfessionalIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "13"}
      height={height ? height : "17.333"}
      viewBox="0 0 13 17.333"
    >
      <path
        id="icon-professional"
        d="M11.375,0H1.625A1.625,1.625,0,0,0,0,1.625V15.708a1.625,1.625,0,0,0,1.625,1.625h9.75A1.625,1.625,0,0,0,13,15.708V1.625A1.625,1.625,0,0,0,11.375,0Zm-6.5,1.083h3.25a.542.542,0,0,1,0,1.083H4.875a.542.542,0,1,1,0-1.083ZM6.5,5.417A2.167,2.167,0,1,1,4.333,7.583,2.169,2.169,0,0,1,6.5,5.417Zm3.792,8.017a.71.71,0,0,1-.758.65H3.467a.71.71,0,0,1-.758-.65v-.65a2.132,2.132,0,0,1,2.275-1.95h.169a3.487,3.487,0,0,0,2.695,0h.169a2.132,2.132,0,0,1,2.275,1.95Z"
        fill={fill}
      ></path>
    </svg>
  );
}
