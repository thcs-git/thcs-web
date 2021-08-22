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

const UserContactForm = (props: IComponent) => {
  const {state, setState, setValidations, canEdit, params} = props;

  const content = {
    tittle: 'Contato',
    rows: [
      {name: "E-mail", value: state.email},
      {name: "Telefone", value: ''},
      {name: "Celular", value: ''},
    ]
  }

  return (
    <FormGroupSection>
      <Grid container>
        {params.mode === 'view' && !canEdit ? (
          <>
            <ViewCard
              content={content}
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

export default React.memo(UserContactForm);
