import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}

export default function CompanyIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "32"}
      height={height ? height : "32"}
      viewBox="0 0 32 32"
    >
      <path
        id="icon-company"
        d="M5512,4091a16,16,0,1,1,11.313-4.687A15.895,15.895,0,0,1,5512,4091Zm-7.337-8.6a.4.4,0,0,0-.405.4v.674h15.1v-.674a.4.4,0,0,0-.4-.4h-.674v-15.369a.81.81,0,0,0-.809-.809h-11.324a.81.81,0,0,0-.809.809V4082.4Zm8.223,0h-2.157v-2.832a.4.4,0,0,1,.4-.4h1.349a.4.4,0,0,1,.4.4v2.831Zm1.753-5.393h-1.348a.4.4,0,0,1-.405-.4v-1.349a.405.405,0,0,1,.405-.405h1.348a.4.4,0,0,1,.4.405v1.349A.4.4,0,0,1,5514.639,4077.01Zm-4.314,0h-1.349a.4.4,0,0,1-.4-.4v-1.349a.4.4,0,0,1,.4-.405h1.349a.4.4,0,0,1,.4.405v1.349A.4.4,0,0,1,5510.324,4077.01Zm4.314-3.235h-1.348a.406.406,0,0,1-.405-.405v-1.347a.406.406,0,0,1,.405-.405h1.348a.405.405,0,0,1,.4.405v1.347A.405.405,0,0,1,5514.639,4073.775Zm-4.314,0h-1.349a.405.405,0,0,1-.4-.405v-1.347a.405.405,0,0,1,.4-.405h1.349a.405.405,0,0,1,.4.405v1.347A.405.405,0,0,1,5510.324,4073.775Zm4.314-3.235h-1.348a.405.405,0,0,1-.405-.405v-1.347a.405.405,0,0,1,.405-.405h1.348a.4.4,0,0,1,.4.405v1.347A.4.4,0,0,1,5514.639,4070.54Zm-4.314,0h-1.349a.4.4,0,0,1-.4-.405v-1.347a.4.4,0,0,1,.4-.405h1.349a.4.4,0,0,1,.4.405v1.347A.4.4,0,0,1,5510.324,4070.54Z"
        transform="translate(-5496 -4059)"
        fill={fill}
      />
    </svg>
  );
}
