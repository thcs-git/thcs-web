import React from "react";

interface IPropsSvg {
  fill: any;
  width?: any;
  height?: any;
}

export default function TelemedicineIcon(props: IPropsSvg) {
  const { fill, width, height } = props;

  return (
    <svg
      width={width ? width : "52"}
      height={height ? height : "52"}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.7861 44.3834V47.2097C30.0906 47.3747 30.3951 47.3014 30.6886 47.3124C32.4606 47.3637 33.8987 48.6064 34.1628 50.3184C34.3389 51.4511 33.8877 51.9973 32.732 51.9973C28.2379 52.0046 23.7401 52.0046 19.2459 51.9973C18.1197 51.9973 17.6757 51.4584 17.8335 50.355C18.0756 48.6467 19.5174 47.3783 21.2784 47.3124C21.5719 47.3014 21.8801 47.3747 22.1589 47.239C22.2799 46.7478 22.2873 44.9406 22.1736 44.365C21.9278 44.1927 21.6379 44.266 21.3664 44.266C15.6286 44.2624 9.88712 44.2624 4.14929 44.266C2.73684 44.266 1.56286 43.7858 0.7264 42.6054C0.150416 41.7953 0 40.8751 0 39.9147C0 35.0025 0 30.0902 0 25.1743C0 21.8054 0 18.4365 0 15.0676C0 14.2978 0.0880485 13.5353 0.465924 12.8534C1.19232 11.5374 2.30761 10.8152 3.83378 10.8116C7.72626 10.8042 11.6187 10.8116 15.5149 10.8079C15.7534 10.8079 15.9955 10.8409 16.2339 10.7602C16.4284 10.5623 16.3587 10.3093 16.3587 10.0784C16.366 8.29312 16.3587 6.50785 16.3624 4.72259C16.3697 2.65139 17.6317 0.902779 19.5871 0.257591C20.1411 0.0816301 20.7208 0.000981542 21.3077 0.000981542C24.4371 0.000981542 27.5702 -0.010016 30.6996 0.000981542C32.9742 0.0119791 34.6691 1.17405 35.3808 3.19393C35.5606 3.70715 35.6413 4.2387 35.6413 4.78857C35.634 7.51596 35.6413 10.2433 35.6413 12.9707C35.6413 13.209 35.612 13.451 35.689 13.6819C35.9238 13.8799 36.1953 13.8065 36.4484 13.8065C40.0621 13.8102 43.6721 13.8065 47.2857 13.8102C47.5646 13.8102 47.847 13.7919 48.1222 13.8835C48.5844 14.0412 48.8669 14.3418 48.9 14.8403C48.911 15.0199 48.911 15.1996 48.911 15.3829C48.911 23.4624 48.911 31.5456 48.911 39.6251C48.911 39.8047 48.9183 39.988 48.9036 40.1676C48.8559 40.7908 48.4817 41.1501 47.858 41.1831C47.6966 41.1904 47.5352 41.1831 47.3775 41.1831C33.1283 41.1831 18.8791 41.1831 4.62989 41.1831C4.46846 41.1831 4.30704 41.1904 4.14929 41.1831C3.52928 41.1501 3.12939 40.7872 3.11105 40.164C3.08537 39.2218 3.08904 38.2797 3.11105 37.3376C3.12205 36.7987 3.40821 36.5421 3.89248 36.5494C4.3584 36.5568 4.65557 36.8391 4.68492 37.3559C4.71427 37.8545 4.68859 38.3567 4.69959 38.8589C4.69959 39.0752 4.65924 39.2988 4.79865 39.5628H9.39551C9.57895 39.3208 9.52025 39.0715 9.52392 38.8369C9.52759 36.8317 9.59362 34.8228 9.51291 32.8213C9.38818 29.6797 11.1198 27.2785 14.2565 26.3731C16.41 25.7535 18.5159 24.9617 20.64 24.2359C21.3041 24.0086 21.4508 23.785 21.4582 23.0811C21.4655 22.6412 21.4582 22.2013 21.4582 21.7028C19.0332 20.2878 17.4043 18.2349 16.6522 15.4635H4.80965C4.61521 15.7165 4.69225 16.0061 4.69225 16.2773C4.68858 21.9337 4.69225 27.5865 4.68858 33.2429C4.68858 33.4628 4.69959 33.6901 4.65924 33.9027C4.57486 34.3206 4.25568 34.5516 3.83011 34.5369C3.40821 34.5222 3.1514 34.2693 3.10371 33.8111C3.08537 33.6314 3.09271 33.4518 3.09271 33.2685C3.09271 27.3115 3.09271 21.3582 3.09271 15.4012C3.09271 15.2216 3.08904 15.0383 3.10371 14.8586C3.14774 14.3418 3.42289 14.0192 3.9255 13.8689C4.18231 13.7919 4.44278 13.8102 4.70326 13.8102C8.31692 13.8102 11.9269 13.8102 15.5406 13.8065C15.7937 13.8065 16.0652 13.8689 16.3147 13.6892C16.3844 13.286 16.4064 12.8754 16.3073 12.4905C16.0945 12.3365 15.8891 12.3805 15.691 12.3805C11.8792 12.3805 8.06378 12.3842 4.25201 12.3732C3.2578 12.3732 2.43234 12.6518 1.92239 13.5609C1.69493 13.9715 1.59588 14.4187 1.59588 14.888C1.59588 23.3084 1.59588 31.7325 1.59588 40.153C1.59588 41.6156 2.59743 42.6384 4.08325 42.6384C18.692 42.6201 33.3007 42.6201 47.9131 42.6384C49.2925 42.6384 50.3344 41.7733 50.3968 40.2116C50.4115 39.8927 50.3968 39.5701 50.3968 39.2475C50.3968 31.245 50.3968 23.2461 50.3968 15.2436C50.3968 14.9833 50.4041 14.7193 50.3674 14.4627C50.1657 13.099 49.1604 12.3585 47.8617 12.3659C44.8534 12.3879 41.8414 12.3732 38.8294 12.3695C38.6496 12.3695 38.4662 12.3805 38.2864 12.3585C37.8425 12.3036 37.5527 11.9626 37.5784 11.5374C37.6004 11.1232 37.8755 10.8409 38.3085 10.8079C38.4882 10.7932 38.668 10.8006 38.8514 10.8006C41.8634 10.8006 44.8717 10.8006 47.8837 10.8006C50.3087 10.8006 51.8716 12.2889 51.9927 14.7193C52 14.8806 51.9963 15.0419 51.9963 15.1996C51.9963 23.4001 51.9963 31.6042 51.9963 39.8047C51.9963 40.5526 51.9413 41.293 51.6148 41.9786C50.8847 43.5145 49.6227 44.2294 47.9498 44.2441C45.9613 44.2587 43.9766 44.2477 41.9881 44.2477C38.1947 44.2477 34.4013 44.2477 30.6079 44.2477C30.3511 44.2477 30.0869 44.1927 29.7787 44.365L29.7861 44.3834ZM31.1655 25.9148C31.0298 26.1018 30.9344 26.2851 30.7913 26.4244C29.6357 27.5938 28.4727 28.7559 27.3061 29.9143C26.4476 30.7684 25.7175 30.7757 24.8664 29.9289C23.6851 28.7559 22.5111 27.5755 21.3334 26.3987C21.1647 26.2301 21.0253 26.0248 20.6841 25.9222C19.6385 26.3071 18.4645 26.5637 17.4373 27.0879C17.0888 28.305 17.0154 29.445 17.4043 30.5411C17.5804 30.7208 17.7711 30.7061 17.9436 30.7611C19.4587 31.245 20.6217 32.6343 20.6804 34.0933C20.7171 35.0758 20.6914 36.0582 20.6877 37.0407C20.6877 37.5539 20.4456 37.9498 20.0017 38.1587C19.5028 38.397 18.9561 38.4264 18.4168 38.2577C18.0646 38.1478 17.9032 37.8911 17.9032 37.5319C17.9032 37.147 18.0903 36.894 18.4645 36.7731C18.6516 36.7107 18.8754 36.7731 19.0955 36.5311C19.0955 35.8896 19.1065 35.1711 19.0955 34.4562C19.0735 33.3052 18.2627 32.4254 17.0557 32.2164C16.1019 32.0515 14.9536 32.726 14.6454 33.7194C14.3482 34.6689 14.473 35.6513 14.5243 36.5824C14.7701 36.7694 15.0123 36.7107 15.2141 36.8097C15.5112 36.9527 15.702 37.1763 15.7203 37.5026C15.735 37.8288 15.5626 38.0818 15.2728 38.2321C14.1868 38.8039 12.9175 38.0708 12.8881 36.8537C12.8698 36.0729 12.8551 35.2884 12.8881 34.5076C12.9615 32.8139 13.7429 31.5786 15.3278 30.8967C15.4709 30.8344 15.6323 30.7867 15.7387 30.5741C15.5075 29.687 15.5332 28.7302 15.6029 27.8431C15.4709 27.7111 15.3902 27.7258 15.3168 27.7514C14.8398 27.9017 14.3556 28.041 13.8897 28.217C12.2498 28.8292 11.1675 30.3542 11.1602 32.0991C11.1491 34.3866 11.1565 36.6704 11.1602 38.9579C11.1602 39.1705 11.1051 39.4051 11.3069 39.5738H40.7225C40.8765 39.3575 40.8509 39.1742 40.8509 38.9946C40.8509 36.6668 40.8509 34.3426 40.8509 32.0148C40.8509 31.6335 40.8068 31.2596 40.6784 30.8894C40.0658 29.1078 38.7083 28.25 36.896 27.8467C36.874 28.4736 37.0648 29.0601 36.9804 29.654C36.896 30.2442 36.83 30.8344 36.7566 31.4099C39.2403 32.671 39.3724 34.5809 38.9431 35.9116C38.3928 37.6162 36.8813 38.4044 35.4432 38.3237C33.7483 38.2284 32.3615 36.9747 32.123 35.435C31.8259 33.5031 32.7247 32.1981 35.0396 31.2523C35.5423 29.9216 35.5019 28.5799 34.9883 27.1905C33.7886 26.747 32.5706 26.3071 31.1729 25.9185L31.1655 25.9148ZM47.2637 39.5774V15.4635H35.3845C35.014 16.8089 34.4453 18.0113 33.6235 19.0927C32.7871 20.1924 31.7121 21.0136 30.5492 21.7358C30.5492 22.2197 30.5418 22.6596 30.5492 23.0995C30.5602 23.7886 30.7069 24.0123 31.382 24.2432C33.5061 24.969 35.6083 25.7572 37.7618 26.3804C40.8875 27.2822 42.6228 29.6797 42.4944 32.8286C42.4137 34.8302 42.4761 36.8354 42.4834 38.8406C42.4834 39.0752 42.4247 39.3245 42.6192 39.5774H47.2601H47.2637ZM28.0875 7.69559C25.0058 9.64948 21.6379 10.6319 18.1123 10.8336C17.9582 11.0095 17.9582 11.1342 17.9619 11.2515C17.9913 12.2706 17.9142 13.2897 18.0683 14.3124C18.8497 19.5509 24.3344 22.6962 29.1734 20.548C33.3961 18.6711 34.4343 14.9283 33.9574 10.8152C32.8861 10.6099 31.7965 10.357 30.7913 9.83644C29.7641 9.30123 28.9203 8.5424 28.0875 7.69559ZM33.9244 9.11794C34.0785 8.832 34.0418 8.63038 34.0418 8.43242C34.0454 7.24835 34.0454 6.06795 34.0418 4.88389C34.0344 2.98131 32.7614 1.62862 30.861 1.60662C27.6106 1.57363 24.3638 1.56996 21.1133 1.60662C19.2386 1.62862 17.9692 2.98864 17.9619 4.85089C17.9582 6.07162 17.9619 7.29601 17.9619 8.51674C17.9619 8.71103 17.9179 8.91998 18.0646 9.11427C18.1233 9.12893 18.2004 9.16559 18.2737 9.16926C18.4535 9.17659 18.6369 9.17659 18.813 9.15826C21.8617 8.87965 24.6866 7.94853 27.2657 6.29157C28.1132 5.74903 28.6561 5.82234 29.3128 6.5885C29.9072 7.28135 30.5822 7.87155 31.382 8.30778C32.1744 8.73669 33.0035 9.06661 33.9207 9.1106L33.9244 9.11794ZM23.065 22.4103C23.1164 23.4294 23.0174 24.3349 22.4634 24.98C23.7401 26.2558 24.9581 27.4765 26.088 28.6056L29.6393 25.0534C29.3495 24.7674 29.1477 24.3422 29.0157 23.873C28.8836 23.4147 29.0377 22.9198 28.8432 22.4469C27.9004 22.6229 26.9832 22.8282 26.0404 22.8355C25.0718 22.8429 24.14 22.6302 23.065 22.4103ZM19.5504 50.3184C20.3466 50.487 32.0607 50.432 32.4459 50.267C32.4679 50.1864 32.4496 50.1131 32.4129 50.0361C32.013 49.2589 31.3563 48.9107 30.5088 48.907C28.7662 48.8997 27.0236 48.907 25.2773 48.907C24.0152 48.907 22.7532 48.8997 21.4912 48.907C20.4823 48.918 19.7889 49.4202 19.5541 50.3147L19.5504 50.3184ZM28.0655 44.3174H23.8575C23.8465 45.3365 23.8135 46.2969 23.8722 47.2647H28.0728C28.1975 46.6855 28.1939 44.8856 28.0691 44.3174H28.0655ZM33.6822 34.8302C33.6932 35.8786 34.5811 36.7437 35.6193 36.7217C36.6759 36.6997 37.5454 35.8089 37.516 34.7825C37.483 33.7267 36.6098 32.8763 35.5679 32.8909C34.5187 32.9056 33.6712 33.7744 33.6822 34.8302Z"
        fill={fill}
      />
    </svg>
  );
}