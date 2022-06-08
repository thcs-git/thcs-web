import React, { ChangeEvent, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { ButtonComponent, ButtonGroupComponent } from "./styles";
import moment from "moment";
import { formatDate } from "../../../helpers/date";

interface switchesProps {
  setTabIndex: any;
}

export default function ButtonSwitches(props: switchesProps) {
  const { setTabIndex } = props;

  const [state, setState] = useState(0);

  const handleChange = (e: any) => {
    setState(
      e.target.tagName === "BUTTON"
        ? e.target.tabIndex
        : e.target.parentElement.tabIndex
    );
    setTabIndex(
      e.target.tagName === "BUTTON"
        ? e.target.tabIndex
        : e.target.parentElement.tabIndex
    );
  };

  function handleValue(value: number) {
    return state === value ? "selected" : "unSelected";
  }

  return (
    <>
      <Grid container mb={"20px"} gap={"12px"}>
        <ButtonComponent
          value={handleValue(0)}
          onClick={handleChange}
          tabIndex={0}
          variant="contained"
        >
          <Typography
            variant="body1"
            fontWeight={400}
            sx={{ cursor: "pointer" }}
          >
            Em Atendimento
          </Typography>
        </ButtonComponent>
        <ButtonComponent
          value={handleValue(1)}
          onClick={handleChange}
          tabIndex={1}
          variant="contained"
        >
          <Typography
            variant="body1"
            fontWeight={400}
            sx={{ cursor: "pointer" }}
          >
            Alta
          </Typography>
        </ButtonComponent>
        <ButtonComponent
          value={handleValue(2)}
          onClick={handleChange}
          tabIndex={2}
          variant="contained"
        >
          <Typography
            variant="body1"
            fontWeight={400}
            sx={{ cursor: "pointer" }}
          >
            Todos
          </Typography>
        </ButtonComponent>
      </Grid>
    </>
  );
}
