import React, { ReactNode } from "react";
import { Button, Grid } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";

interface IComponent {
  setCanEdit: any;
  canEdit: boolean;
  children?: ReactNode;
}

const ButtonView = (props: IComponent) => {
  const { setCanEdit, canEdit, children } = props;

  return (
    <Grid item md={2} xs={12} style={{ paddingTop: "5px" }}>
      <Button
        style={{ color: "#0899BA", textAlign: "center" }}
        onClick={setCanEdit}
      >
        <Visibility style={{ width: 18 }} />
        {children}
      </Button>
    </Grid>
  );
};

export default React.memo(ButtonView);
