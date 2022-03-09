import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}

export default function PrintIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "28"}
      height={height ? height : "26"}
      viewBox="0 0 28 26"
    >
      <path
        id="Icon_imprimir"
        data-name="Icon imprimir"
        d="M27.064,11H7.686a4.335,4.335,0,0,0-4.311,4.333v9.389H8.753V30.5H26V24.722h5.378V15.333A4.335,4.335,0,0,0,27.064,11ZM23.837,28.333H10.913V19.667H23.837ZM26,4.5H8.753V9.917H26V4.5Z"
        transform="translate(-3.375 -4.5)"
        fill={fill}
      />
    </svg>
  );
}
