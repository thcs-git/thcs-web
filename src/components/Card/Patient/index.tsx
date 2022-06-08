import React, { ComponentProps } from "react";
import { AccountCircle } from "@mui/icons-material";

import { PatientInterface } from "../../../store/ducks/patients/types";

import { age, formatDate } from "../../../helpers/date";

import {
  PatientResume,
  PatientResumeContent,
  PatientData,
  MaleIconLogo,
  FemaleIconLogo,
} from "./styles";

interface IProps {
  patient: PatientInterface;
}

export default function PatientCard(props: any) {
  const { patient, capture } = props;

  return (
    <PatientResume>
      <PatientResumeContent>
        <PatientData>
          <div className="patientIcon">
            <AccountCircle />
          </div>
          <div>
            <p className="title">{patient?.name}</p>
            <div className="subTitle">
              <a>
                {patient?.birthdate ? age(patient?.birthdate) : ""} | CPF:{" "}
                {patient?.fiscal_number} | Mãe: {patient?.mother_name} |{" "}
              </a>
              {patient?.gender != "Masculino" ? (
                <>
                  <a> Sexo: </a> <FemaleIconLogo />
                </>
              ) : (
                <>
                  <a>Sexo: </a> <MaleIconLogo />
                </>
              )}
              <p>Pedido: {capture?.order_number}</p>
              <p>
                Data de Nascimento:{" "}
                {formatDate(patient?.birthdate, "DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </PatientData>
      </PatientResumeContent>
    </PatientResume>
  );
}
