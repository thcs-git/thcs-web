import React from "react";
import { FormGroupSection } from "./styles";
import { Grid } from "@material-ui/core";
import ViewCard from "../../../Card/ViewCard";
import { age, formatDate } from "../../../../helpers/date";

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

const UserForm = (props: IComponent) => {
  const { state, setState, setValidations, canEdit, params } = props;

  const birthdate = state.birthdate
    ? formatDate(state.birthdate, "DD-MM-YYYY")
    : "";

  const rows: any[] = [];

  function handleRows(state: any, name: string) {
    state && rows.push({ name: name, value: state });
  }

  handleRows(state.name, "Nome do usuário");
  handleRows(state.mother_name, "Nome da mãe");
  handleRows(state.birthdate, "Data de nascimento");
  handleRows(age(state.birthdate), "Idade");
  handleRows(state.national_id, "RG");
  handleRows(state.issuing_organ, "Órgão Emissor");
  handleRows(state.fiscal_number, "CPF");
  handleRows(state.nationality, "Nacionalidade");
  // handleRows(state.email, 'E-mail')
  // handleRows(state.gender, 'Sexo')

  const content = {
    tittle: "Dados Pessoais",
    rows: rows,
    details: "UserForm",
  };
  // const rows1: any[] = []
  // const rows2: any[] = []

  // function handleRows1(state: any, name: string) {
  //   state && rows1.push({name: name, value: state})
  // }

  // function handleRows2(state: any, name: string) {
  //   state && rows2.push({name: name, value: state})
  // }

  // handleRows1(state.name, 'Nome do usuário')
  // handleRows1(state.email, 'E-mail')
  // handleRows1(state.birthdate, 'Data de nascimento')
  // handleRows1(age(state.birthdate), 'Idade')
  // handleRows1(state.gender, 'Sexo')

  // handleRows2(state.fiscal_number, 'CPF')
  // handleRows2(state.national_id, 'RG')
  // handleRows2(state.issuing_organ, 'Órgão Emissor')
  // handleRows2(state.nationality, 'Nacionalidade')
  // handleRows2(state.mother_name, 'Nome da mãe')

  // const content1 = {
  //   tittle: 'Contato',
  //   rows: rows1
  // }

  // const content2 = {
  //   tittle: 'Contato',
  //   rows: rows2
  // }

  return (
    <FormGroupSection>
      <Grid container>
        {params.mode === "view" && !canEdit ? (
          <>
            <ViewCard content={content} />
            {/* <ViewCard
              content={content1}
            />
            <ViewCard
              content={content2}
            /> */}
          </>
        ) : (
          <></>
        )}
      </Grid>
    </FormGroupSection>
  );
};

export default React.memo(UserForm);
