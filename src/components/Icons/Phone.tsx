import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}

export default function PainIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "14.556"}
      height={height ? height : "14.556"}
      viewBox="0 0 14.556 14.556"
    >
      <path
        id="icon-phone-details"
        d="M14.14,10.286,10.956,8.921a.682.682,0,0,0-.8.2L8.75,10.84A10.538,10.538,0,0,1,3.713,5.8l1.723-1.41a.681.681,0,0,0,.2-.8L4.267.413a.687.687,0,0,0-.782-.4L.529.7A.682.682,0,0,0,0,1.365,13.19,13.19,0,0,0,13.191,14.556a.682.682,0,0,0,.665-.529l.682-2.957a.691.691,0,0,0-.4-.785Z"
        transform="translate(0 0)"
        fill={fill}
      ></path>
    </svg>
  );
}
