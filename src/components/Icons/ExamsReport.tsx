import React from "react";
interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}
export default function ExamsIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "50.711"}
      height={height ? height : "34.863"}
      viewBox="0 0 50.711 34.863"
    >
      <g id="icon-exam" transform="translate(-1201.26 -404.983)">
        <path
          id="Caminho_9006"
          data-name="Caminho 9006"
          d="M158.1,119.623H140.646a2.09,2.09,0,0,1-1.391-.525l-3.677-3.265a3.873,3.873,0,0,0-2.578-.979h-8.715a3.886,3.886,0,0,0-3.88,3.88v2.238h-5.253a3.88,3.88,0,0,0-3.581,5.372l8.828,20.986a3.874,3.874,0,0,0,3.581,2.388H158.1a3.886,3.886,0,0,0,3.88-3.88V123.5a3.885,3.885,0,0,0-3.88-3.88Zm-44.879,6.028a2.089,2.089,0,0,1,1.928-2.9h5.253v19.966ZM160.2,145.819a2.09,2.09,0,0,1-2.089,2.089H124.286a2.089,2.089,0,0,1-2.089-2.089V118.728a2.088,2.088,0,0,1,2.089-2.089h8.72a2.087,2.087,0,0,1,1.391.525l3.677,3.265a3.873,3.873,0,0,0,2.578.979h17.453a2.089,2.089,0,0,1,2.089,2.089Z"
          transform="translate(1089.986 290.129)"
          fill={fill}
        />
        <path
          id="Caminho_9007"
          data-name="Caminho 9007"
          d="M309.521,213.64a9.324,9.324,0,1,0,6.581,2.731A9.311,9.311,0,0,0,309.521,213.64Zm0,16.838a7.533,7.533,0,1,1,5.315-2.206,7.52,7.52,0,0,1-5.315,2.206Z"
          transform="translate(921.187 201.872)"
          fill={fill}
        />
        <path
          id="Caminho_9008"
          data-name="Caminho 9008"
          d="M354.938,263.841H352.4V261.3a.9.9,0,1,0-1.791,0v2.537H348.1a.9.9,0,1,0,0,1.79h2.537v2.537h0a.9.9,0,1,0,1.791,0v-2.531h2.537a.9.9,0,0,0,0-1.791Z"
          transform="translate(879.204 160.093)"
          fill={fill}
        />
      </g>
    </svg>
  );
}
