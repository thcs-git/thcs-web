import React, { useState, ReactNode, useCallback } from "react";
import { FormControlLabel, Grid, makeStyles } from "@material-ui/core";
import { ButtonsContent, ButtonComponent } from "./styles";

interface IComponent {
  canEdit: boolean;
  buttons: IButtons[];
}

interface IButtons {
  name: string;
  variant: any;
  background: string;
  onClick?: any;
  show?: boolean;
  component?: JSX.Element;
}

function a11yProps(name: string, index: number) {
  return {
    id: `${name}-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  cancel: {
    textTransform: "capitalize",
    fontSize: "18px",
    "&:hover": {
      backgroundColor: "var(--danger-hover)",
      color: "var(--danger)",
      borderColor: "var(--danger-hover)",
    },
    maxHeight: "38px",
    borderColor: "var(--danger-hover)",
    color: "var(--danger-hover)",
    contrastText: "#fff",
  },
}));

const ButtonTabs = (props: IComponent) => {
  const classes = useStyles();

  const { canEdit, buttons } = props;
  return (
    <ButtonsContent
      style={{
        paddingRight: buttons[0].name === "Gerar novo QR Code" ? 0 : 15,
        marginTop: 25,
      }}
    >
      {buttons.map(
        ({ name, variant, background, onClick, show, component }: IButtons) => (
          <>
            {(show || canEdit) && (
              <ButtonComponent
                variant={variant}
                background={background}
                onClick={onClick}
              >
                {name}
                {component}
              </ButtonComponent>
            )}
          </>
        )
      )}
    </ButtonsContent>
  );
};

export default React.memo(ButtonTabs);
