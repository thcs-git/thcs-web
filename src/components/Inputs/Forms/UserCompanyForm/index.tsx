import React from "react";
import {FormGroupSection} from "./styles";
import {Grid} from "@material-ui/core";
import ViewCard from "../../../Card/ViewCard";
import {ChipList, DivideTitle} from "../../../../pages/user/form/styles";
import {ChipComponent as Chip} from "../../../../styles/components/Chip";


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
  const {state, setState, setValidations, canEdit, params} = props;

  return (
    <FormGroupSection>
      <Grid container>
        {state.companies_links.length > 0 && (
          <>
          {params.mode === 'view' && !canEdit ? (
              <>
                <div>
                  <DivideTitle>Empresas:</DivideTitle>
                  <Grid item md={12} xs={12}>
                    <ChipList>
                      {state.companies_links?.map((item: any, index: number) => (
                        <Chip
                          key={`company_selected_${index}`}
                          label={item.companie_id.name}
                        />
                      ))}
                    </ChipList>
                  </Grid>
                </div>
              </>
            ) : (
              <>
              </>
            )}
          </>
        )}
      </Grid>
    </FormGroupSection>
  );

}

export default React.memo(UserCompanyForm);
