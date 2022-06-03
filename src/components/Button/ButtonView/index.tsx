import React, { ReactNode } from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material/";
interface IComponent {
  setCanEdit: any;
  canEdit: boolean;
  children?: ReactNode;
}

const ButtonView = (props: IComponent) => {
  const { setCanEdit, canEdit, children } = props;

  return (
    <IconButton
      color="secondary"
      sx={{
        width: "32px",
        height: "32px",
        textAlign: "center",
        cursor: "pointer",
        "& svg, path": { cursor: "pointer" },
      }}
      onClick={setCanEdit}
    >
      <Visibility sx={{ width: 18 }} />
      {children}
    </IconButton>
  );
};

export default React.memo(ButtonView);
