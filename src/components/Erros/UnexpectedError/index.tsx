import React from "react";
// router
import { useHistory } from "react-router-dom";
//mui
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//icons
import AlertIcon from "../../Icons/Alert";

// style
import theme from "../../../theme/theme";

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
          color: theme.palette.text.primary,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            fontWeight: "700",
            fontSize: "1.5rem",
          }}
        >
          <Typography variant="h4" fontWeight={500} color="error.main">
            Sentimos muito, algo inesperado ocorreu
          </Typography>

          <AlertIcon
            fill={theme.palette.error.main}
            width={"3rem"}
            height={"3rem"}
          />
        </Box>

        <Typography sx={{ marginBottom: "1rem", marginTop: "1rem" }}>
          Qual pode ser o problema:
        </Typography>
        <Box sx={{ marginLeft: "1rem" }}>
          <Typography>
            &bull; Verifique se você você tem <b>permissão</b> para acessar essa
            página.
          </Typography>
          <Typography>
            &bull; O conteúdo pode estar indisponível ou pode ter sido removido.
          </Typography>
          <Typography>
            &bull; O servidor pode estar fora do ar no momento.
          </Typography>
        </Box>
        <Typography sx={{ paddingTop: "1rem" }}>
          Tente novamente em alguns minutos, caso o erro persista entre em
          contato com a empresa responsável.
        </Typography>

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
