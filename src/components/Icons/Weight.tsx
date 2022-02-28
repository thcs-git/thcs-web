import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}
function SvgComponent(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      width={width ? width : 16.034}
      height={height ? height : 16.251}
      viewBox="0 0 16.034 16.251"
    >
      <path
        d="M14.944,0H1.44A1.442,1.442,0,0,0,0,1.44v13.5a1.442,1.442,0,0,0,1.44,1.44h13.5a1.442,1.442,0,0,0,1.44-1.44V1.44A1.442,1.442,0,0,0,14.944,0Zm.48,14.944a.481.481,0,0,1-.48.48H1.44a.481.481,0,0,1-.48-.48V1.44A.481.481,0,0,1,1.44.96h13.5a.481.481,0,0,1,.48.48Zm0,0"
        fill={fill}
      />

      <path
        d="M88.263,63.845a9.228,9.228,0,0,0-11.072,0,.48.48,0,0,0-.1.672l2.534,3.371a.48.48,0,0,0,.672.1,4.044,4.044,0,0,1,4.852,0,.48.48,0,0,0,.672-.1l2.534-3.371a.48.48,0,0,0-.1-.672Zm-2.931,3.1a4.948,4.948,0,0,0-2.125-.708V64.775a.48.48,0,1,0-.96,0v1.463a4.948,4.948,0,0,0-2.125.708L78.16,64.335a8.271,8.271,0,0,1,9.134,0Zm0,0"
        transform="translate(-74.536 -60.016)"
        fill={fill}
      ></path>
    </svg>
  );
}

export default SvgComponent;
