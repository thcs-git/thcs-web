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

const UserContactForm = (props: IComponent) => {
  const { state, setState, setValidations, canEdit, params } = props;

  const rows: any[] = [];

  function handleRows(state: any, name: string) {
    state && rows.push({ name: name, value: state });
  }

  handleRows(state.email, "E-mail");
  handleRows(state.phone, "Telefone");
  handleRows(state.cellphone, "Celular");

  const content = {
    tittle: "Contato",
    rows: rows,
    details: "UserContactForm",
  };

  return (
    <FormGroupSection>
      <Grid container>
        {params.mode === "view" && !canEdit ? (
          <>{rows.length > 0 && <ViewCard content={content} />}</>
        ) : (
          <></>
        )}
      </Grid>
    </FormGroupSection>
  );
};

export default React.memo(UserContactForm);
