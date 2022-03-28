import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

export default function NoPermission(props: any) {
  const history = useHistory();
  return (
    <>
      <h2>Vocês não tem permissão para Accesar esta página</h2>
      <Button variant="contained" onClick={() => history.push("/dashboard")}>
        Início
      </Button>
    </>
  );
}
