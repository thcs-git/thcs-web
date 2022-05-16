import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}
export default function THCStype2(props: IPropsSvg) {
  const { fill, width, height } = props;
  // #273471
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "32"}
      height={height ? height : "32"}
      viewBox="0 0 32 32"
    >
      <path
        id="icon_user"
        data-name="icon user"
        d="M16,.563a16,16,0,1,0,16,16A16,16,0,0,0,16,.563Zm0,6.194a5.677,5.677,0,1,1-5.677,5.677A5.678,5.678,0,0,1,16,6.756ZM16,28.95a12.363,12.363,0,0,1-9.452-4.4A7.193,7.193,0,0,1,12.9,20.692a1.579,1.579,0,0,1,.458.071A8.542,8.542,0,0,0,16,21.208a8.51,8.51,0,0,0,2.639-.445,1.579,1.579,0,0,1,.458-.071,7.193,7.193,0,0,1,6.355,3.858A12.363,12.363,0,0,1,16,28.95Z"
        transform="translate(0 -0.563)"
        fill={fill}
      />
    </svg>
  );
}
