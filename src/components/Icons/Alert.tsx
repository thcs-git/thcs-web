import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}

export default function AlertIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "28.387"}
      height={height ? height : "24.8"}
      viewBox="0 0 28.387 24.8"
    >
      <g
        id="Icon_alert_atention_red"
        data-name="Icon alert atention red"
        transform="translate(1.034 1)"
      >
        <path
          id="Caminho_992"
          data-name="Caminho 992"
          d="M13.333,5.558,2.666,23.367a2.519,2.519,0,0,0,2.154,3.778H26.155a2.519,2.519,0,0,0,2.154-3.778L17.641,5.558a2.519,2.519,0,0,0-4.307,0Z"
          transform="translate(-2.328 -4.346)"
          fill="none"
          stroke={fill}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <path
          id="Caminho_993"
          data-name="Caminho 993"
          d="M18,13.5v7.6"
          transform="translate(-4.842 -6.922)"
          fill="none"
          stroke={fill}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <path
          id="Caminho_994"
          data-name="Caminho 994"
          d="M18,25.5h0"
          transform="translate(-4.842 -7.738)"
          fill="none"
          stroke={fill}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </g>
    </svg>
  );
}
