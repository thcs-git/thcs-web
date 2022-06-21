import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}

export default function CloudIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      width={width ? width : "89"}
      height={height ? height : "34"}
      viewBox="0 0 89 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M88.4421 25.0545C88.4421 20.4967 84.7472 16.8018 80.1893 16.8018H33.6736V33.3073H80.1893C84.7472 33.3073 88.4421 29.6124 88.4421 25.0545V25.0545Z"
        fill={fill}
      />
      <path
        d="M0.138977 25.0545C0.138977 20.4967 3.83387 16.8018 8.39175 16.8018H54.9074V33.3073H8.39176C3.83387 33.3073 0.138977 29.6124 0.138977 25.0545V25.0545Z"
        fill={fill}
      />
      <path
        d="M69.6854 17.6366C69.6854 8.05961 61.9217 0.295898 52.3446 0.295898H33.6733V26.5547H60.7673C65.6926 26.5547 69.6854 22.562 69.6854 17.6366V17.6366Z"
        fill={fill}
      />
      <path
        d="M18.8956 17.6366C18.8956 8.05961 26.6593 0.295898 36.2364 0.295898H54.9077V26.5547H27.8137C22.8884 26.5547 18.8956 22.562 18.8956 17.6366V17.6366Z"
        fill={fill}
      />
    </svg>
  );
}
