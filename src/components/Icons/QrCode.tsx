import React from "react";
interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}
export default function IconQrCode(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      id="Icon_metro-qrcode"
      data-name="Icon metro-qrcode"
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "32"}
      height={height ? height : "32"}
      viewBox="0 0 32 32"
    >
      <g id="Icon_metro-qrcode-2" data-name="Icon metro-qrcode">
        <path
          id="Icon_metro-qrcode-3"
          data-name="Icon metro-qrcode"
          d="M12.571,3.928h-8v8h8Zm2-2v12h-12v-12Zm-8,4h4v4h-4Zm26-2h-8v8h8v-8Zm2-2v12h-12v-12h12Zm-8,4h4v4h-4Zm-14,18h-8v8h8Zm2-2v12h-12v-12Zm-8,4h4v4h-4Zm10-24h2v2h-2Zm2,2h2v2h-2Zm-2,2h2v2h-2Zm2,2h2v2h-2Zm-2,2h2v2h-2Zm2,2h2v2h-2Zm-2,2h2v2h-2Zm0,4h2v2h-2Zm2,2h2v2h-2Zm-2,2h2v2h-2Zm2,2h2v2h-2Zm-2,2h2v2h-2Zm2,2h2v2h-2Zm-2,2h2v2h-2Zm2,2h2v2h-2Zm14-14h2v2h-2Zm-28,0h2v2h-2Zm2-2h2v2h-2Zm-4,0h2v2h-2Zm8,0h2v2h-2Zm2,2h2v2h-2Zm2-2h2v2h-2Zm6,2h2v2h-2Zm2-2h2v2h-2Zm2,2h2v2h-2Zm2-2h2v2h-2Zm2,2h2v2h-2Zm2-2h2v2h-2Zm2,6h2v2h-2Zm-12,0h2v2h-2Zm2-2h2v2h-2Zm2,2h2v2h-2Zm4,0h2v2h-2Zm2-2h2v2h-2Zm2,6h2v2h-2Zm-12,0h2v2h-2Zm2-2h2v2h-2Zm4,0h2v2h-2Zm2,2h2v2h-2Zm2-2h2v2h-2Zm2,6h2v2h-2Zm-10-2h2v2h-2Zm2,2h2v2h-2Zm2-2h2v2h-2Zm2,2h2v2h-2Zm-6,2h2v2h-2Zm4,0h2v2h-2Zm4,0h2v2h-2Z"
          transform="translate(-2.571 -1.928)"
          fill={fill}
        />
      </g>
    </svg>
  );
}
