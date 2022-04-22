import React from "react";
import { FormGroupSection } from "./styles";
import { Grid } from "@material-ui/core";
import ViewCard from "../../../Card/ViewCard";
import LOCALSTORAGE from "../../../../helpers/constants/localStorage";

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
  const currentCompanyId = localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);

  const specialties: any[] = [];
  state.specialties.lenght > 0 &&
    state.specialties.map((item: any) => {
      specialties.push(item.name);
    });

  function handleCompanie_link(
    list: any,
    company: string | null,
    type: string
  ) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].companie_id._id === company) {
        if (type === "function") {
          return list[i].function ? list[i].function : "";
        } else if (type === "main") {
          return list[i].main_specialty ? list[i].main_specialty : "";
        } else if (type === "specialties") {
          return list[i].specialties ? list[i].specialties : "";
        } else {
          return "";
        }
      }
    }
  }

  const content1 = {
    tittle: "Função",
    rows: [
      {
        name: "Função",
        value:
          state.profession_id && state.companies_links && currentCompanyId
            ? handleCompanie_link(
                state.companies_links,
                currentCompanyId,
                "function"
              )
            : "",
      },
      {
        name: "Conselho",
        value: state.council_id?.name ? state.council_id.name : state.council ? state.council : "",
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
        value:
          state.companies_links.length > 0
            ? handleCompanie_link(
                state.companies_links,
                currentCompanyId,
                "main"
              )
            : "",
      },
      {
        name: "Outras",
        value:
          state.companies_links.length > 0
            ? handleCompanie_link(
                state.companies_links,
                currentCompanyId,
                "specialties"
              )
            : "",
      },
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
