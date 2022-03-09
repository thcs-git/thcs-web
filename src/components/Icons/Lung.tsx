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
      width={width ? width : 22.715}
      height={height ? height : 19.723}
      viewBox="0 0 22.715 19.723"
    >
      <g transform="translate(2.207 5.901)">
        <path
          d="M247.274,471.1h-1.18a2.656,2.656,0,0,1-2.646-2.882l.206-3.232c.119.072.243.127.364.189a5.245,5.245,0,0,0,1.01.419,1.847,1.847,0,0,0,1.3,1.843.331.331,0,0,0,.149-.644,1.11,1.11,0,0,1-.769-1.047,5.792,5.792,0,0,0,.836.076.33.33,0,1,0,0-.661h-.009a5.726,5.726,0,0,1-3.987-1.924,1.356,1.356,0,0,0-1.965,0,5.483,5.483,0,0,1-4,1.925.33.33,0,0,0,0,.661,5.379,5.379,0,0,0,.812-.07,1.107,1.107,0,0,1-.768,1.04.331.331,0,0,0,.149.644,1.844,1.844,0,0,0,1.3-1.836,5.725,5.725,0,0,0,.8-.3s.562-.291.638-.337c.243,3.8.2,3.2.209,3.266a2.654,2.654,0,0,1-2.647,2.875h-1.05a.331.331,0,1,0,0,.661h1.05a3.319,3.319,0,0,0,3.306-3.587l-.234-3.665a8.048,8.048,0,0,0,.91-.816.685.685,0,0,1,.5-.215c.479,0,.437.288,1.455,1.071l-.231,3.626a3.317,3.317,0,0,0,3.306,3.587h1.18a.33.33,0,1,0,0-.661Zm0,0"
          transform="translate(-232.436 -458.039)"
          fill={fill}
          strokeWidth="0.25px"
        />
        <path
          d="M535.379,12.3c-.69-5.154-1.342-10.022-4.541-12.142a2.581,2.581,0,0,0-1.431-.429c-1.318,0-3.355,1-3.469,2.382l-.073.881a1.691,1.691,0,0,1-.422-1.031V-5.47a.33.33,0,0,0-.33-.33.33.33,0,0,0-.33.33V1.961a1.954,1.954,0,0,0,.29,1.026,9.472,9.472,0,0,0,.8,1.095A5.437,5.437,0,0,0,527.346,5.3c.023.013.045.033.068.046a.641.641,0,0,0,.112.051,3.79,3.79,0,0,0,1.587.407.3.3,0,0,0,.126-.052c.035-.016.078-.016.105-.043a.33.33,0,0,0-.227-.566,2.852,2.852,0,0,1-.47-.064,1.923,1.923,0,0,0,.761-1.113.33.33,0,1,0-.638-.173,1.235,1.235,0,0,1-1.049.961,4.779,4.779,0,0,1-1.256-1l.131-1.582c.08-.963,1.783-1.776,2.81-1.776a1.922,1.922,0,0,1,1.066.319c2.949,1.954,3.581,6.678,4.251,11.678l.011.081a.524.524,0,0,1-.519.593h-2.93a.33.33,0,1,0,0,.661h2.93a1.185,1.185,0,0,0,1.174-1.341Zm0,0"
          transform="translate(-514.993 -0.001)"
          fill={fill}
          strokeWidth="0.25px"
        />
        <path
          d="M2.823.708A1.921,1.921,0,0,1,3.888.389C4.916.389,6.619,1.2,6.7,2.165L6.826,3.7c-.115.128-.232.232-.349.343a2.6,2.6,0,0,1-.68.542c-.087.056-.172.127-.26.175a1.249,1.249,0,0,1-1.082-.966.33.33,0,1,0-.638.173,1.924,1.924,0,0,0,.762,1.114,2.894,2.894,0,0,1-.448.063.331.331,0,0,0-.227.566c.021.02.054.018.08.033A.3.3,0,0,0,4.14,5.8,4.555,4.555,0,0,0,5.818,5.36a6.67,6.67,0,0,0,2.36-2.374,1.954,1.954,0,0,0,.289-1.025V-5.471a.33.33,0,0,0-.33-.33.33.33,0,0,0-.33.33V1.961a1.429,1.429,0,0,1-.383.939l-.065-.79C7.243.728,5.206-.272,3.888-.272A2.58,2.58,0,0,0,2.457.157C-.939,2.408-1.5,7.974-2.095,12.381A1.185,1.185,0,0,0-.921,13.722H1.7a.33.33,0,0,0,0-.661H-.921a.517.517,0,0,1-.394-.179.565.565,0,0,1-.114-.5c.67-5,1.3-9.724,4.251-11.678Zm0,0"
          fill={fill}
          strokeWidth="0.25px"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
