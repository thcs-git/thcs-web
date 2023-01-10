import React, { useEffect, useRef } from "react";
import Lottie from 'lottie-react'
import { createPortal } from "react-dom";
import { CircularProgressProps } from "@mui/material/CircularProgress";
import loading from "../../assets/img/Load_T+HCS.json";

const body = document.querySelector("body");
const divRoot = document.querySelector("#root");

const FacebookCircularProgress = (props: CircularProgressProps) => {
  const elementSpinner = useRef(document.createElement("div"));
  elementSpinner.current.setAttribute("class", "spinner-loading");

  useEffect(() => {
    body?.appendChild(elementSpinner.current);
    divRoot?.classList.add("blur");

    return () => {
      body?.removeChild(elementSpinner.current);
      divRoot?.classList.remove("blur");
    };
  }, []);

  const Loading = () => {
    return <Lottie animationData={loading} loop style={{width: 100, height: 100}} />
  }
  const spinner = (
      <Loading />
  );

  return createPortal(spinner, elementSpinner.current);
};

export default React.memo(FacebookCircularProgress);
