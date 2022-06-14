import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import theme from "../../../theme/theme";
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
      <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
        Vocês não tem permissão para acessar esta página.
      </Typography>
      <Button variant="contained" onClick={() => history.push("/")}>
        Início
      </Button>
    </Container>
  );
}
