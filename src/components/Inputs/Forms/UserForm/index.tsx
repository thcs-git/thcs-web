import React from "react";
import {FormGroupSection} from "./styles";
import {Grid} from "@material-ui/core";
import ViewCard from "../../../Card/ViewCard";
import {age, formatDate} from "../../../../helpers/date";


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
  const {state, setState, setValidations, canEdit, params} = props;

  const birthdate = state.birthdate ? formatDate(state.birthdate, 'DD-MM-YYYY') : ''

  const content1 = {
    tittle: 'Contato',
    rows: [
      {name: "Nome do usuário", value: state.email},
      {name: "Data de nascimento", value: birthdate},
      {name: "Idade", value: age(state.birthdate)},
      {name: "Sexo", value: state.gender},
    ]
  }

  const content2 = {
    tittle: 'Contato',
    rows: [
      {name: "CPF", value: state.fiscal_number},
      {name: "RG", value: state.national_id},
      {name: "Órgão Emissor", value: state.issuing_organ},
      {name: "Nacionalidade", value: state.nationality},
      {name: "Nome da mãe", value: state.mother_name},
    ]
  }

  return (
    <FormGroupSection>
      <Grid container>
        {params.mode === 'view' && !canEdit ? (
          <>
            <ViewCard
              content={content1}
            />
            <ViewCard
              content={content2}
            />
          </>
        ) : (
          <>
          </>
        )}
      </Grid>
    </FormGroupSection>
  );

}

export default React.memo(UserForm);
