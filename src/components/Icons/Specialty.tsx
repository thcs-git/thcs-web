import React from "react";
interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}
export default function SpecialtyIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "15.129"}
      height={height ? height : "14.48"}
      viewBox="0 0 15.129 14.48"
    >
      <path
        id="icon-specialty"
        d="M8.194.5,6.348,4.247l-4.131.6a.905.905,0,0,0-.5,1.544L4.7,9.306,4,13.42a.9.9,0,0,0,1.312.953l3.7-1.943,3.7,1.943a.905.905,0,0,0,1.312-.953l-.707-4.115L16.3,6.393a.905.905,0,0,0-.5-1.544l-4.131-.6L9.817.5A.906.906,0,0,0,8.194.5Z"
        transform="translate(-1.441 0.001)"
        fill={fill}
      />
    </svg>
  );
}