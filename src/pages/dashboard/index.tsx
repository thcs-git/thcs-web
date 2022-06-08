import React from "react";

import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { Title } from "../../styles/components/Text";

import {
  ActionCard,
  InfoSection,
  UserCheckIconImage,
  MeasurementIconImage,
  PatientPlusIconImage,
} from "./styles";

import ListItem from "../../components/List/Item";
import SearchInput from "../../components/Inputs/Search";

import SESSIONSTORAGE from "../../helpers/constants/sessionStorage";

export default function Dashboard() {
  const patients = [
    {
      id: 1,
      name: "patient 1",
      active: true,
      age: "2020-01-01T00:00:00",
      motherName: "Mother of patient 1",
    },
    {
      id: 2,
      name: "patient 2",
      active: false,
      age: "2020-01-01T00:00:00",
      motherName: "Mother of patient 2",
    },
  ];

  const users = [
    {
      id: 1,
      name: "user 1",
      active: true,
      specialty: "Cardiologista",
      type: "Médico",
      workArea: "Zona Norte",
    },
  ];
  // const rights = sessionStorage.getItem(SESSIONSTORAGE.RIGHTS);
  // console.log(rights);

  return (
    <Sidebar>
      <Container>
        <Title>Procurando algo?</Title>
        <InfoSection>
          <SearchInput label="Pesquisa por palavra-chave" />
        </InfoSection>

        <Title>Últimas ações</Title>

        <InfoSection>
          <Grid container>
            <Grid item xs={4} md={3}>
              <Link to="/patient">
                <ActionCard elevation={0}>
                  <UserCheckIconImage />
                  <p>Cadastro de Paciente</p>
                </ActionCard>
              </Link>
            </Grid>

            <Grid item xs={4} md={3}>
              <Link to="/patient">
                <ActionCard elevation={0}>
                  <MeasurementIconImage />
                  <p>Aferição do Paciente</p>
                </ActionCard>
              </Link>
            </Grid>

            <Grid item xs={4} md={3}>
              <Link to="/user">
                <ActionCard elevation={0}>
                  <MeasurementIconImage />
                  <p>Cadastro de Prestador</p>
                </ActionCard>
              </Link>
            </Grid>

            <Grid item xs={4} md={3}>
              <Link to="/care">
                <ActionCard elevation={0}>
                  <PatientPlusIconImage />
                  <p>Cadastrar Atendimento</p>
                </ActionCard>
              </Link>
            </Grid>
          </Grid>
        </InfoSection>

        <Title>Últimas pacientes registrados</Title>

        <InfoSection>
          {patients.map((patient, index) => (
            <ListItem key={index}>
              <div
                className={`listStatus ${
                  patient.active ? "active" : "inactive"
                }`}
              >
                {patient.active ? "Ativo" : "Inativo"}
              </div>

              <div>
                <p className="title">{patient.name}</p>
                <p className="subtitle">
                  {patient.age} • {patient.motherName}
                </p>
              </div>
            </ListItem>
          ))}
        </InfoSection>

        <Title>Últimas prestadores registrados</Title>

        <InfoSection>
          {users.map((user, index) => (
            <ListItem key={`user_${index}`}>
              <div
                className={`listStatus ${user.active ? "active" : "inactive"}`}
              >
                {user.active ? "Ativo" : "Inativo"}
              </div>
              <div>
                <p className="title">{user.name}</p>
                <p className="subtitle">
                  {user.type} • {user.specialty} <br />
                  {user.workArea}
                </p>
              </div>
            </ListItem>
          ))}
        </InfoSection>
      </Container>
    </Sidebar>
  );
}
