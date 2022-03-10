import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}

export default function CheckIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "36.664"}
      height={height ? height : "43.3"}
      viewBox="0 0 36.664 44.3"
    >
      <g id="icon-check" transform="translate(-1138.85 -138.35)">
        <g
          id="Grupo_10845"
          data-name="Grupo 10845"
          transform="translate(-5.3 -1)"
        >
          <g
            id="Icon_feather-map-pin"
            data-name="Icon feather-map-pin"
            transform="translate(1145.3 140.5)"
          >
            <path
              id="Caminho_9017"
              data-name="Caminho 9017"
              d="M38.864,18.682c0,13.364-17.182,24.818-17.182,24.818S4.5,32.045,4.5,18.682a17.182,17.182,0,1,1,34.364,0Z"
              transform="translate(-4.5 -1.5)"
              fill="none"
              stroke={fill}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.3"
            />
            <path
              id="Caminho_9018"
              data-name="Caminho 9018"
              d="M22.5,15A4.5,4.5,0,1,1,18,10.5,4.5,4.5,0,0,1,22.5,15Z"
              transform="translate(-0.818 1.875)"
              fill="none"
              stroke={fill}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.3"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
