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

  const rows = []

  if (state.name?.length > 0) {
    rows.push({name: "Razão Social", value: state.name})
  }
  if (state.fiscal_number?.length > 0) {
    rows.push({name: "CNPJ", value: state.fiscal_number})
  }
  if (state.address?.street?.length > 0) {
    rows.push({name: "Endereço", value: state.address.street})
  }
  if (state.address?.number?.length > 0) {
    rows.push({name: "Número", value: state.address.number})
  }
  if (state.address?.complement?.length > 0) {
    rows.push({name: "Complemento", value: state.address.complement})
  }
  if (state.address?.district?.length > 0) {
    rows.push({name: "Bairro", value: state.address.district})
  }
  if (state.address?.city?.length > 0) {
    rows.push({name: "Cidade", value: state.address.city})
  }
  if (state.address?.state?.length > 0) {
    rows.push({name: "UF", value: state.address.state})
  }
  if (state.responsable_name?.length > 0) {
    rows.push({name: "Nome do responsável", value: state.responsable_name})
  }
  if (state.email?.length > 0) {
    rows.push({name: "E-mail", value: state.email})
  }
  if (state.phone?.length > 0) {
    rows.push({name: "Telefone", value: state.phone})
  }
  if (state.tipo?.length > 0) {
    rows.push({name: "Tipo", value: state.tipo})
  }

  const content = {
    tittle: state.fantasy_name,
    // icon: <InfoRoundedIcon style={{color: "#ffffff"}}/>,
    rows: rows
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
