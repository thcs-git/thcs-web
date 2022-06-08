import React, { useState, ReactNode, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { FormTitle } from "./styles";
import ButtonEdit from "../../Button/ButtonEdit";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../../../theme/theme";

interface IComponent {
  tittle: string;
  icon?: any;
}

const TabTittle = (props: IComponent) => {
  const { tittle, icon } = props;

  return (
    <ThemeProvider theme={theme}>
      <Grid
        item
        md={12}
        xs={12}
        sx={{ display: "flex", alignItems: "center", margin: "0 0 25px" }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          color={theme.palette.primary.main}
        >
          {tittle}
        </Typography>
        {icon}
      </Grid>
    </ThemeProvider>
  );
};

export default React.memo(TabTittle);
