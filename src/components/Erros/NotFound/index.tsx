import React, { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import { Title } from "../../../styles/components/Text";

import Button from "../../../styles/components/Button";

import { ReactComponent as SollarLogo } from "../../../assets/img/marca-sollar-azul.svg";
import { ReactComponent as NotFoundImage } from "../../../assets/img/404-illustration.svg";

import { ContainerComponent as Container } from "./styles";

interface ITabprops {
  backOnclick: any;
}

export default function NotFound(props: ITabprops) {
  const { backOnclick } = props;

  const history = useHistory();

  return (
    <Container>
      <SollarLogo className="sollar-logo" />

      <div className="illustration-container">
        <NotFoundImage />
      </div>

      <Title>Não encontramos sua página</Title>
      <Typography>
        Sentimos muito, mas no momento esta página não está por aqui. Ela pode
        ter sido movida ou excluída.
        <br />
        Confira se você digitou a URL corretamente e tente novamente.
      </Typography>

      <Button onClick={backOnclick}>Voltar</Button>
    </Container>
  );
}
