import React from "react";
import { FormGroupSection } from "./styles";
import { Grid } from "@material-ui/core";
import ViewCard from "../../../Card/ViewCard";

interface IComponent {
  state: any;
  setState: Function;
  setValidations: Function;
  canEdit: boolean;
  params: IPageParams;
}

interface IPageParams {
  id?: string;
  mode?: string;
}

const UserProfessionForm = (props: IComponent) => {
  const { state, setState, setValidations, canEdit, params } = props;

  const specialties: any[] = [];
  state.specialties.lenght > 0 &&
    state.specialties.map((item: any) => {
      specialties.push(item.name);
    });

  const content1 = {
    tittle: "Função",
    rows: [
      {
        name: "Função",
        value: state.profession_external ?  state.profession_external : state.main_specialty_id ? state.main_specialty_id.name : "",
      },
      {
        name: "Conselho",
        value: state.council_id ? state.council_id.name : "",
      },
      { name: "UF", value: state.council_state },
      { name: "Número", value: state.council_number },
    ],
    details: "UserProfessionForm",
  };

  const content2 = {
    tittle: "Especialidades",
    rows: [
      {
        name: "Principal",
        value: state.main_specialty_external ?  state.main_specialty_external : state.main_specialty_id ? state.main_specialty_id.name : "",
      },
      { name: "Outras", value: state.specialties_external ? state.specialties_external : specialties ? specialties.join(", ") : '' },
    ],
    details: "UserProfessionForm",
  };

  const content3 = {
    tittle: "Dados para contato",
    rows: [
      {
        name: "Nome do prestador",
        value: state.name ? state.name : "",
      },
      {
        name: "E-mail",
        value: state.email ? state.email : "",
      },
      {
        name: "CPF",
        value: state.fiscal_number ? state.fiscal_number : "",
      },
    ],
    details: "UserProfessionForm",
  };

  return (
    <FormGroupSection>
      {params.mode === "view" && !canEdit ? (
        <>
          <Grid container>
            <>
              <ViewCard content={content3} />
            </>
          </Grid>
          <Grid container>
            <>
              <ViewCard content={content1} />
            </>
          </Grid>
          <Grid container>
            <>
              <ViewCard content={content2} />
            </>
          </Grid>
        </>
      ) : (
        <Grid container>
          <></>
        </Grid>
      )}
    </FormGroupSection>
  );
};

export default React.memo(UserProfessionForm);
