import React from "react";
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import { Title } from "../../../styles/components/Text";
import Button from "@mui/material/Button";
import theme from "../../../theme/theme";
import THCStype2 from "../../../components/Icons/THCS_Type2";
import { ReactComponent as SollarLogo } from "../../../assets/img/marca-sollar-azul.svg";
import { ReactComponent as NotFoundImage } from "../../../assets/img/404-illustration.svg";

import { ContainerComponent as Container } from "./styles";

export default function NotFound() {
  const history = useHistory();

  return (
    <Container>
      <THCStype2 fill={theme.palette.primary.main} />

      <div className="illustration-container">
        <NotFoundImage />
      </div>

      <Typography variant="h3" color="primary.main" fontWeight={600} mb={2}>
        Não encontramos sua página
      </Typography>
      <Typography>
        Sentimos muito, mas no momento esta página não está por aqui. Ela pode
        ter sido movida ou excluída.
        <br />
        Confira se você digitou a URL corretamente e tente novamente.
      </Typography>

      <Button onClick={() => history.push("/")} variant="contained">
        Voltar
      </Button>
    </Container>
  );
}
