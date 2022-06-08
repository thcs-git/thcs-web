import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default React.memo(Alert);
