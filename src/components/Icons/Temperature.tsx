import * as React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
  strokeWidth?: any;
}
function SvgComponent(props: IPropsSvg) {
  const { fill, width, height, strokeWidth } = props;

  return (
    <svg
      width={width ? width : 34}
      height={height ? height : 24}
      viewBox="0 0 34 24"
    >
      <g transform="translate(-5)">
        <path
          d="M10.5,24A5.5,5.5,0,0,1,7,14.258V3.5a3.5,3.5,0,0,1,7,0V14.258A5.5,5.5,0,0,1,10.5,24Zm0-23A2.5,2.5,0,0,0,8,3.5v11a.5.5,0,0,1-.2.4,4.5,4.5,0,1,0,5.4,0,.5.5,0,0,1-.2-.4V3.5A2.5,2.5,0,0,0,10.5,1Z"
          fill={fill}
          strokeWidth={strokeWidth}
        />
        <path
          d="M10.5,21A2.5,2.5,0,1,1,13,18.5,2.5,2.5,0,0,1,10.5,21Zm0-4A1.5,1.5,0,1,0,12,18.5,1.5,1.5,0,0,0,10.5,17Z"
          fill={fill}
          strokeWidth={strokeWidth}
        />
        <path
          d="M10.5,17a.5.5,0,0,1-.5-.5V5.5a.5.5,0,0,1,1,0v11A.5.5,0,0,1,10.5,17Z"
          fill={fill}
          strokeWidth={strokeWidth}
        />
        <path
          d="M18.5,4h-2a.5.5,0,0,1,0-1h2a.5.5,0,0,1,0,1Z"
          fill={fill}
          strokeWidth={strokeWidth}
        />
        <path
          d="M18.5,8h-2a.5.5,0,0,1,0-1h2a.5.5,0,0,1,0,1Z"
          fill={fill}
          strokeWidth={strokeWidth}
        />
        <path
          d="M18.5,12h-2a.5.5,0,0,1,0-1h2a.5.5,0,0,1,0,1Z"
          fill={fill}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
