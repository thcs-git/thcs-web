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
import {formatDate} from "../../../../helpers/date";


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


const PatientForm = (props: IComponent) => {
  const {index, state, setState, setValidations, canEdit, getAddress, cepStatus, params} = props;

  const rows = []

  state.name && rows.push({name: "Nome", value: state.name})
  state.email && rows.push({name: "Email", value: state.email})
  state.gender && rows.push({name: "Gênero", value: state.gender})
  state.marital_status && rows.push({name: "Estado Civil", value: state.marital_status})
  state.birthdate && rows.push({name: "Data de Nascimento", value: formatDate(state.birthdate, 'DD-MM-YYYY')})
  state.blood_type && rows.push({name: "tipo Sanguíneo", value: state.blood_type})
  state.nr_cpf && rows.push({name: "CPF", value: state.nr_cpf})
  state.profissao && rows.push({name: "Profissão", value: state.profissao})
  state.mother_name && rows.push({name: "Nome da Mãe", value: state.mother_name})
  state.national_id && rows.push({name: "RG", value: state.national_id})
  state.fiscal_number && rows.push({name: "CPF", value: state.fiscal_number})
  state.cd_uf_emissao_identidade && rows.push({name: "Emissor", value: state.cd_uf_emissao_identidade})
  state.phone && rows.push({name: "Telefone", value: state.phone})
  state.cellnumber && rows.push({name: "Celular", value: state.cellnumber})
  state.organ_donor && rows.push({name: "Doador de Órgãos", value: state.organ_donor})
  state.nationality && rows.push({name: "Nacionalidade", value: state.nationality})
  state.responsable_name && rows.push({name: "Responsável", value: state.responsable_name})
  state.responsable_cpf && rows.push({name: "CPF do Responsável", value: state.responsable_cpf})

  state.address?.postal_code?.length > 0 && rows.push({name: "CEP", value: state.address.postal_code})
  state.address?.street?.length > 0 && rows.push({name: "Endereço", value: state.address.street})
  state.address?.number?.length > 0 && rows.push({name: "Número", value: state.address.number})
  state.address?.complement?.length > 0 && rows.push({name: "Complemento", value: state.address.complement})
  state.address?.district?.length > 0 && rows.push({name: "Bairro", value: state.address.district})
  state.address?.city?.length > 0 && rows.push({name: "Cidade", value: state.address.city})
  state.address?.state?.length > 0 && rows.push({name: "UF", value: state.address.state})

  const content = {
    tittle: state.social_status ? state.social_status : state.name,
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

export default React.memo(PatientForm);
