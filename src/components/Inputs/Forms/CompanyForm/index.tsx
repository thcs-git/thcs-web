import React, {useState, ReactNode, useCallback} from 'react';
import {Divider, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel} from "@material-ui/core";

import {FormGroupSection, InputFiled as TextField} from "./styles";
import InputMask, {Props} from "react-input-mask";
import validator from "validator";
import {validateCNPJ as validateCNPJHelper} from "../../../../helpers/validateCNPJ";
import {OutlinedInputFiled} from "../../../../pages/customer/form/styles";
import {SearchOutlined} from "@material-ui/icons";
import {SwitchComponent as Switch} from "../../../../styles/components/Switch";
import ViewCard from "../../../Card/ViewCard";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import _ from 'lodash';


interface IComponent {
  index: number;
  state: any;
  setState: Function;
  setValidations: Function;
  canEdit: boolean;
  getAddress: any;
  cepStatus: any;
  params: IPageParams;
}

interface IPageParams {
  id?: string;
  mode?: string;
}

function a11yProps(name: string, index: number) {
  return {
    id: `${name}-${index}`,
  };
}


const CompanyForm = (props: IComponent) => {
  const {index, state, setState, setValidations, canEdit, getAddress, cepStatus, params} = props;

  // console.log(state.phones)
  // console.log(_.some(state.phones, function(o) { return o }))

  const content = {
    tittle: state.fantasy_name,
    // icon: <InfoRoundedIcon style={{color: "#ffffff"}}/>,
    rows: [
      {name: "Razão Social", value: state.name},
      // {name: "Nome Fantasia", value: state.fantasy_name},
      {name: "CNPJ", value: state.fiscal_number, placeholder: '00.000.000/0000-00'},
      {name: "Endereço", value: state.address.street},
      {name: "Número", value: state.address.number},
      {name: "Complemento", value: state.address.complement},
      {name: "Bairro", value: state.address.district},
      {name: "Cidade", value: state.address.city},
      {name: "UF", value: state.address.state},
      {name: "Nome do responsável", value: state.responsable_name},
      {name: "E-mail", value: state.email},
      {name: "Telefone", value: state.phone},
      {name: "Tipo", value: state.tipo},
    ]
  }

  return (
    <FormGroupSection>
      <Grid container>
        {params.mode === 'view' && !canEdit ? (
          <ViewCard
            content={content}
          />
        ) : (
          <>
          </>
        )}
      </Grid>
    </FormGroupSection>
  );
}

export default React.memo(CompanyForm);
