import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}
function SvgComponent(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg viewBox="0 0 10 30" {...props}>
      <g transform="translate(1)">
        <path
          d="M26.858,6.881a3.2,3.2,0,1,1,4.824-3.529l.109,1.022a3.2,3.2,0,0,1-1.45,2.506A5.607,5.607,0,0,1,34.2,12.2V15a2,2,0,0,1-2,2h-.4v7a1.793,1.793,0,0,1-3.2,1.118A1.793,1.793,0,0,1,25.4,24V17H25a2,2,0,0,1-2-2V12.2A5.607,5.607,0,0,1,26.858,6.881ZM31,4.2a2.4,2.4,0,1,0-2.4,2.4A2.4,2.4,0,0,0,31,4.2ZM23.8,15A1.2,1.2,0,0,0,25,16.2h.4v-6h.8V24a1,1,0,0,0,2,0V14.2H29V24a1,1,0,0,0,2,0V10.2h.8v6h.4A1.2,1.2,0,0,0,33.4,15V12.2a4.8,4.8,0,1,0-9.6,0Z"
          transform="translate(-23 -1)"
          fill={fill}
        ></path>
      </g>
      <g transform="translate(-1 26.032)">
        <rect
          width={width ? width : 13}
          height={height ? height : 1}
          fill={fill}
        ></rect>
        <rect x={0.5} y={0.5} fill={fill}></rect>
      </g>
    </svg>
  );
}

export default SvgComponent;
