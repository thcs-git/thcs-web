import React, { useState } from "react";
import { FormGroupSection } from "./styles";
import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import {
  ChipList,
  DivideTitle,
  InputFiled as TextField,
} from "../../../../pages/user/form/styles";
import { ChipComponent as Chip } from "../../../../styles/components/Chip";
import LOCALSTORAGE from "../../../../helpers/constants/localStorage";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ButtonComponent from "../../../../styles/components/Button";
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

const UserCompanyForm = (props: IComponent) => {
  const { state, setState, setValidations, canEdit, params } = props;

  function handleDeleteLink(item: any) {
    item.active = false;

    setState((prevState: any) => ({
      ...prevState,
      // companies_links:[ ...professionSelected ]
    }));
  }

  function handleCompaniesLinked() {
    const currentCustomer = localStorage.getItem(LOCALSTORAGE.CUSTOMER) || "";

    return state.companies_links?.map((item: any, index: number) => {
      if (item.customer_id === currentCustomer && item.active) {
        return (
          <Chip
            key={`company_selected_${index}`}
            label={item.companie_id.name}
            onDelete={(event) => handleDeleteLink(item)}
          />
        );
      }
    });
  }
  let companies: any = [];

  state.companies.forEach((e: any) => {
    companies.push({ name: e.name, value: e.name });
  });

  const content = {
    tittle: "Empresas",
    rows: companies,
    details: "UserCompanyForm",
  };
  // state.companies.forEach((e: any) => {
  //   companies.push({ name: e.name, value: e.name });
  // });
  const [add, setAdd] = useState(false);
  const [linkChecked, setLinkChecked] = useState(false);
  const [companyLink, setcompanyLink] = useState("");

  return (
    <FormGroupSection>
      <Grid container>
        {state.companies_links.length > 0 && (
          <>
            {params.mode === "view" && !canEdit ? (
              <>
                <Grid container>
                  <>
                    <ViewCard content={content} />
                  </>
                </Grid>

                {/* <DivideTitle>Empresas:</DivideTitle>
                <Grid item md={12} xs={12}>
                  <ChipList>{handleCompaniesLinked()}</ChipList>
                </Grid>
                <Grid container style={{ display: "flex" }}>
                  {add ? (
                    <>
                      <Grid item md={2} xs={2}>
                        <ButtonComponent
                          style={{ maxWidth: "10px" }}
                          onClick={() => setAdd(!add)}
                        >
                          <CheckCircleRoundedIcon
                            fontSize={"large"}
                            style={{ color: "#4FC66A" }}
                          />
                        </ButtonComponent>
                      </Grid>
                      <Grid item md={10} xs={10}>
                        <Grid item md={3} xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={linkChecked}
                                onChange={() => setLinkChecked(!linkChecked)}
                                name="link"
                              />
                            }
                            label="Temporário"
                          />
                          {linkChecked && (
                            <Grid item md={7} xs={12}>
                              <TextField
                                id="link-end"
                                type="date"
                                size="small"
                                label="Vínculo até"
                                variant="outlined"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={(e) => setcompanyLink(e.target.value)}
                                value={companyLink}
                                fullWidth
                              />
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item md={2} xs={2}>
                        <ButtonComponent
                          style={{ maxWidth: "10px" }}
                          onClick={() => setAdd(!add)}
                        >
                          <AddIcon fontSize={"large"} color={"primary"} />
                        </ButtonComponent>
                      </Grid>
                      <Grid item md={10} xs={10}>
                        <DivideTitle>Adicionar vínculo à empresa:</DivideTitle>
                      </Grid>
                    </>
                  )}
                </Grid> */}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </Grid>
    </FormGroupSection>
  );
};

export default React.memo(UserCompanyForm);
