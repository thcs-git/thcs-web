import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export default function NoPermission(props: any) {
  const history = useHistory();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        gap: "2rem",
      }}
    >
      <h2>Vocês não tem permissão para acesar esta página</h2>
      <Button variant="contained" onClick={() => history.push("/dashboard")}>
        Início
      </Button>
    </Container>
  );
}
