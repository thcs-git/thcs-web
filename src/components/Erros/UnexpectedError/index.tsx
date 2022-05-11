import React from "react";
// router
import { useHistory } from "react-router-dom";
//mui
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//icons

import AlertIcon from "../../Icons/Alert";

export default function UnexpectedError() {
  const history = useHistory();

  return (
    <Container sx={{ width: "100%", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          color: "var(--black)",
        }}
      >
        <Box
          sx={{
            color: "var(--danger)",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            fontWeight: "700",
            fontSize: "1.5rem",
          }}
        >
          <Box>Sentimos muito, algo inesperado ocorreu</Box>

          <AlertIcon fill={"var(--danger)"} width={"3rem"} height={"3rem"} />
        </Box>

        <Box sx={{ marginBottom: "1rem", marginTop: "1rem" }}>
          Qual pode ser o problema:
        </Box>
        <Box sx={{ marginLeft: "1rem" }}>
          <Box>
            &bull; Verifique se você você tem <b>permissão</b> para acessar essa
            página.
          </Box>
          <Box>
            &bull; O conteúdo pode estar indisponível ou pode ter sido removido.
          </Box>
          <Box>&bull; O servidor pode estar fora do ar no momento.</Box>
        </Box>
        <Box sx={{ paddingTop: "1rem" }}>
          Tente novamente em alguns minutos, caso o erro persista entre em
          contato com a empresa responsável.
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            marginTop: "1rem",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{ minWidth: "11.5rem" }}
            variant="outlined"
            onClick={() => history.push("/")}
          >
            Início
          </Button>
          <Button
            variant="outlined"
            sx={{ minWidth: "11.5rem" }}
            onClick={() => window.location.reload()}
          >
            Recarregar página
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
