import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}

export default function SvgComponent(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "12.6"}
      height={height ? height : "18"}
      viewBox="0 0 12.6 18"
    >
      <g id="icon-location" transform="translate(-462.857 -491.747)">
        <path
          id="Icon_material-location-on"
          data-name="Icon material-location-on"
          d="M13.8,3A6.3,6.3,0,0,0,7.5,9.3c0,4.725,6.3,11.7,6.3,11.7s6.3-6.975,6.3-11.7A6.3,6.3,0,0,0,13.8,3Zm0,8.55A2.25,2.25,0,1,1,16.05,9.3,2.251,2.251,0,0,1,13.8,11.55Z"
          transform="translate(455.357 488.747)"
          fill={fill}
        ></path>
      </g>
    </svg>
  );
}
