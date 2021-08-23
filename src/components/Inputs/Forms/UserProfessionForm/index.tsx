import React from "react";
import {FormGroupSection} from "./styles";
import {Grid} from "@material-ui/core";
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
  const {state, setState, setValidations, canEdit, params} = props;

  const specialties: any[] = []
  state.specialties.map((item: any) => {
    specialties.push(item.name)
  })

  const content1 = {
    tittle: 'Função',
    rows: [
      {name: "Função", value: state.profession_id ? state.profession_id.name : ''},
      {name: "Conselho", value: state.council_id ? state.council_id.name : ''},
      {name: "UF", value: state.council_state},
      {name: "Número", value: state.council_number},
    ]
  }

  const content2 = {
    tittle: 'Especialidades',
    rows: [
      {name: "Principal", value: state.main_specialty_id ? state.main_specialty_id.name : ''},
      {name: "Outras", value: specialties.join(',')},
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

export default React.memo(UserProfessionForm);
