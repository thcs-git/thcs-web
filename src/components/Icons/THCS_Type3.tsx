import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}
export default function THCStype3(props: IPropsSvg) {
  const { fill, width, height } = props;
  // #273471
  return (
    <svg
      width={width ? `${width}` : "500"}
      height={height ? `${width}` : "500"}
      viewBox="0 0 500 500"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_98_4375)">
        <path
          d="M312.541 187.5V0.00244141H187.5V187.503H-0.00268555V312.503H31.2489L249.999 250.003L468.749 312.503H499.998V187.503H312.541"
          fill={fill}
        />
        <path
          d="M250.032 343.758L187.492 361.6V500H312.51V361.6L250.019 343.758"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_98_4375">
          <rect width={"500"} height={"500"} fill={"#FFF"} />
        </clipPath>
      </defs>
    </svg>
  );
}
