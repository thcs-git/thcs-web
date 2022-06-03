import React from "react";
interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}
export default function EditIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "19.372"}
      height={height ? height : "19.21"}
      viewBox="0 0 19.372 19.21"
    >
      <g
        id="icon_editar"
        data-name="icon editar"
        transform="translate(0.8 0.8)"
      >
        <path
          id="Caminho_881"
          data-name="Caminho 881"
          d="M10.875,6H4.75A1.75,1.75,0,0,0,3,7.75V20a1.75,1.75,0,0,0,1.75,1.75H17A1.75,1.75,0,0,0,18.751,20V13.875"
          transform="translate(-3 -4.14)"
          fill="none"
          stroke={fill}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.6"
        ></path>
        <path
          id="Caminho_882"
          data-name="Caminho 882"
          d="M21.2,3.363a1.86,1.86,0,0,1,2.63,2.63l-8.328,8.328L12,15.2l.877-3.507Z"
          transform="translate(-6.769 -2.818)"
          fill="none"
          stroke={fill}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.6"
        ></path>
      </g>
    </svg>
  );
}
