import React from "react";
interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}
export default function AttachmentIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      width={width ? width : "24"}
      height={height ? height : "42"}
      viewBox="0 0 24 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9564 41.8327C8.79666 41.8327 6.09701 40.7476 3.85742 38.5775C1.61784 36.4073 0.498047 33.7424 0.498047 30.5827V8.18685C0.498047 5.96463 1.28798 4.07227 2.86784 2.50977C4.4477 0.947266 6.34874 0.166016 8.57096 0.166016C10.8279 0.166016 12.7376 0.947266 14.3001 2.50977C15.8626 4.07227 16.6439 5.98199 16.6439 8.23893V28.7598C16.6439 30.0792 16.1925 31.199 15.2897 32.1191C14.3869 33.0393 13.2758 33.4994 11.9564 33.4994C10.6369 33.4994 9.52582 33.0046 8.62305 32.015C7.72027 31.0254 7.26888 29.8535 7.26888 28.4994V8.08268H9.35221V28.6556C9.35221 29.4195 9.60395 30.0705 10.1074 30.6087C10.6109 31.1469 11.2272 31.416 11.9564 31.416C12.6855 31.416 13.3019 31.1556 13.8053 30.6348C14.3088 30.1139 14.5605 29.4889 14.5605 28.7598V8.18685C14.5605 6.52018 13.9789 5.11393 12.8158 3.9681C11.6526 2.82227 10.2376 2.24935 8.57096 2.24935C6.9043 2.24935 5.48937 2.82227 4.32617 3.9681C3.16298 5.11393 2.58138 6.52018 2.58138 8.18685V30.6869C2.58138 33.2216 3.50152 35.3657 5.3418 37.1191C7.18207 38.8726 9.38694 39.7494 11.9564 39.7494C14.5605 39.7494 16.7741 38.8639 18.597 37.0931C20.4199 35.3223 21.3314 33.1521 21.3314 30.5827V8.08268H23.4147V30.5306C23.4147 33.6903 22.2949 36.3639 20.0553 38.5514C17.8158 40.7389 15.1161 41.8327 11.9564 41.8327Z"
        fill={fill}
      />
    </svg>
  );
}
