import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
  displayColor?: any;
}
export default function ChartIcon(props: IPropsSvg) {
  const { fill, width, height, displayColor } = props;

  return (
    <svg
      width={width ? width : "31"}
      height={height ? height : "31"}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 31C24.0604 31 31 24.0604 31 15.5C31 6.93959 24.0604 0 15.5 0C6.93959 0 0 6.93959 0 15.5C0 24.0604 6.93959 31 15.5 31Z"
        fill={fill}
      />
      <path
        d="M16.908 12.024V7.717H10.574C10.4741 7.71673 10.3752 7.73621 10.2828 7.77431C10.1905 7.81241 10.1066 7.86838 10.036 7.93901C9.96537 8.00963 9.9094 8.09352 9.8713 8.18585C9.8332 8.27817 9.81372 8.37712 9.81399 8.477V15.824H8.03999C7.97297 15.8243 7.90877 15.851 7.86138 15.8984C7.81399 15.9458 7.78725 16.01 7.78699 16.077V16.584C7.78725 16.651 7.81399 16.7152 7.86138 16.7626C7.90877 16.81 7.97297 16.8367 8.03999 16.837H12.502C12.5491 16.8372 12.5952 16.8502 12.6354 16.8747C12.6756 16.8992 12.7083 16.9342 12.73 16.976L13.36 18.236L15.16 14.636C15.181 14.5939 15.2133 14.5584 15.2533 14.5336C15.2933 14.5089 15.3394 14.4957 15.3865 14.4957C15.4336 14.4957 15.4797 14.5089 15.5197 14.5336C15.5597 14.5584 15.592 14.5939 15.613 14.636L16.713 16.836H18.936C19.0044 16.833 19.0727 16.8438 19.1368 16.8679C19.2009 16.892 19.2595 16.9288 19.309 16.9761C19.3584 17.0235 19.3978 17.0803 19.4247 17.1433C19.4516 17.2063 19.4655 17.274 19.4655 17.3425C19.4655 17.411 19.4516 17.4787 19.4247 17.5417C19.3978 17.6047 19.3584 17.6615 19.309 17.7089C19.2595 17.7562 19.2009 17.793 19.1368 17.8171C19.0727 17.8412 19.0044 17.852 18.936 17.849H16.087L15.387 16.449L13.587 20.049C13.566 20.0911 13.5337 20.1266 13.4937 20.1514C13.4537 20.1761 13.4076 20.1893 13.3605 20.1893C13.3134 20.1893 13.2673 20.1761 13.2273 20.1514C13.1873 20.1266 13.155 20.0911 13.134 20.049L12.034 17.849H9.81399V23.169C9.81372 23.2689 9.8332 23.3678 9.8713 23.4601C9.9094 23.5525 9.96537 23.6364 10.036 23.707C10.1066 23.7776 10.1905 23.8336 10.2828 23.8717C10.3752 23.9098 10.4741 23.9293 10.574 23.929H21.214C21.3139 23.9293 21.4128 23.9098 21.5051 23.8717C21.5975 23.8336 21.6814 23.7776 21.752 23.707C21.8226 23.6364 21.8786 23.5525 21.9167 23.4601C21.9548 23.3678 21.9743 23.2689 21.974 23.169V12.784H17.668C17.4666 12.7835 17.2736 12.7032 17.1312 12.5608C16.9888 12.4184 16.9085 12.2254 16.908 12.024V12.024ZM21.753 11.042L18.653 7.942C18.5825 7.87076 18.4985 7.81419 18.406 7.77557C18.3135 7.73696 18.2142 7.71705 18.114 7.717H17.921V11.771H21.975V11.577C21.9747 11.3763 21.8949 11.1839 21.753 11.042V11.042Z"
        fill="white"
      />
    </svg>
  );
}
