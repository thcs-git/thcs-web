import React, { useCallback, useEffect, useState } from "react";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { TabBody, TabBodyItem } from "../../../Tabs/styles";
import ButtonEdit from "../../../Button/ButtonEdit";
import TabTittle from "../../../Text/TabTittle";
import _ from "lodash";

import { SwitchComponent as Switch } from "../../../Button/ToggleActive/styles";
import { InputFiled as TextField } from "../IntegrationForm/styles";
import {
  cleanPermission,
  loadCustomerById,
  loadPermissionRequest,
} from "../../../../store/ducks/customers/actions";
import { loadProfessionsRequest as getProfessionsAction } from "../../../../store/ducks/users/actions";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";
import { ProfessionUserInterface } from "../../../../store/ducks/users/types";
import TabForm from "../../../Tabs";
import { RouteComponentProps } from "react-router-dom";
//MUI
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
// icon
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { ReactComponent as InactiveIcon } from "../../../../assets/img/icon-inative.svg";
// styles
import { FormLabelComponent, CheckboxStyle as Checkbox } from "./styles";
interface IComponent {
  state: any;
  setState: any;
  customerState: any;
  userState: any;
  params: any;
  modePermission?: any;
  idPermission?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <TabBody
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <TabBodyItem style={{ display: "grid", justifyContent: "center" }}>
        {children}
      </TabBodyItem>
    </TabBody>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  formLabel: {
    color: "var(--primary)",
    "&.Mui-disabled": {
      color: "var(--gray-dark)",
    },
    "&.Mui-focused": {
      color: "var(--primary)",
    },
    // '&.Mui-disabled:hover': { background:theme.palette.secondary.main },
  },
}));

const CustomCheckbox = withStyles({
  root: {
    color: "var(--primary)",
    "&$checked": {
      color: "var(--secondary)",
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const PermissionForm = (props: IComponent) => {
  const {
    state,
    setState,
    customerState,
    userState,
    params,
    modePermission,
    idPermission,
  } = props;
  // const userState = useSelector((state: ApplicationState) => state.users);
  const classes = useStyles();
  const dispatch = useDispatch();
  interface rightsInterface {
    crud: string;
    label: string;
  }

  interface rowsInterface {
    legend: string;
    name: string;
    rights: rightsInterface[];
  }

  // const mode = _.split(window.location.pathname, "/").slice(-2)[0];
  // const _id = _.split(window.location.pathname, "/").slice(-3)[0];
  // const customer_id = _.split(window.location.pathname, "/").slice(-5)[0];
  const mode = modePermission;
  const _id = idPermission;
  const customer_id = customerState.data._id;

  const rowsPortal = [
    {
      legend: "Cliente",
      name: "client",
      rights: [
        { crud: "view", label: "Visualizar" },
        { crud: "edit", label: "Criar/Editar" },
        { crud: "create", label: "Gerar" },
      ],
    },
    {
      legend: "Permissões",
      name: "permission",
      rights: [
        { crud: "view", label: "Visualizar" },
        { crud: "edit", label: "Criar/Editar" },
        { crud: "create", label: "Gerar" },
      ],
    },
    {
      legend: "Integração",
      name: "integration",
      rights: [
        { crud: "view", label: "Visualizar" },
        { crud: "edit", label: "Criar/Editar" },
        { crud: "create", label: "Gerar" },
      ],
    },
    {
      legend: "Empresas",
      name: "company",
      rights: [
        { crud: "view", label: "Visualizar" },
        { crud: "edit", label: "Criar/Editar" },
        { crud: "create", label: "Gerar" },
      ],
    },
    {
      legend: "Todos Profissionais",
      name: "userclient",
      rights: [
        { crud: "view", label: "Visualizar" },
        { crud: "edit", label: "Criar/Editar" },
        { crud: "create", label: "Gerar" },
      ],
    },
    {
      legend: "Meus Profissionais",
      name: "user",
      rights: [
        { crud: "view", label: "Visualizar" },
        { crud: "edit", label: "Criar/Editar" },
        { crud: "create", label: "Gerar" },
      ],
    },
    // {
    //   legend: 'Banco de Talentos',
    //   name: 'userdesengaged',
    //   rights: [
    //     {crud: 'view', label: 'Visualizar'},
    //     {crud: 'status', label: 'Desativar'},
    //     {crud: 'create', label: 'Criar'},
    //     {crud: 'history', label: 'Histórico'},
    //   ]
    // },
    // {
    //   legend: 'Área',
    //   name: 'area',
    //   rights: [
    //     {crud: 'view', label: 'Visualizar'},
    //     {crud: 'status', label: 'Desativar'},
    //     {crud: 'create', label: 'Criar'},
    //     {crud: 'history', label: 'Histórico'},
    //   ]
    // },
    {
      legend: "Pacientes",
      name: "patient",
      rights: [
        { crud: "view", label: "Visualizar" },
        { crud: "edit", label: "Criar/Editar" },
        { crud: "create", label: "Gerar" },
      ],
    },
    // {
    //   legend: "Meus Pacientes",
    //   name: "myPatient",
    //   rights: [
    //     { crud: "view", label: "Visualizar" },
    //     { crud: "edit", label: "Criar/Editar" },
    //     { crud: "create", label: "Gerar" },
    //   ],
    // },
    // {
    //   legend: 'Avaliação',
    //   name: 'avaliation',
    //   rights: [
    //     {crud: 'view', label: 'Visualizar'},
    //     {crud: 'status', label: 'Desativar'},
    //     {crud: 'create', label: 'Criar'},
    //     {crud: 'history', label: 'Histórico'},
    //   ]
    // },
    {
      legend: "Atendimentos",
      name: "care",
      rights: [
        { crud: "view", label: "Visualizar" },
        { crud: "edit", label: "Criar/Editar" },
        { crud: "create", label: "Gerar" },
      ],
    },
    // {
    //   legend: "Meus Atendimento",
    //   name: "myCare",
    //   rights: [
    //     { crud: "view", label: "Visualizar" },
    //     { crud: "edit", label: "Criar/Editar" },
    //     { crud: "create", label: "Gerar" },
    //   ],
    // },
    {
      legend: "QR Code",
      name: "qrcode",
      rights: [
        { crud: "view", label: "Visualizar" },
        { crud: "edit", label: "Criar/Editar" },
        { crud: "create", label: "Gerar" },
      ],
    },
    // {
    //   legend: "Agenda",
    //   name: "schedule",
    //   rights: [
    //     { crud: "view", label: "Visualizar" },
    //     { crud: "edit", label: "Criar/Editar" },
    //     { crud: "create", label: "Gerar" },
    //   ],
    // },
  ];

  const rowsApp = [
    {
      legend: "",
      name: "app",
      rights: [
        { crud: "check.create", label: "Checagem" },
        { crud: "admeasurement.create", label: "Aferição" },
        { crud: "evolution.create", label: "Evolução" },
        { crud: "prescription.create", label: "Receituários" },
        { crud: "certificate.create", label: "Atestado" },
        { crud: "exam.create", label: "Exames" },
      ],
    },
  ];

  function handleChecked(name: string, crud: string) {
    return _.indexOf(state.rights, `${name}.${crud}`) > -1;
  }

  function handleSelectProfession(value: ProfessionUserInterface) {
    setState((prevState: any) => ({
      ...prevState,
      name: value.name,
    }));
  }

  const selectProfession = useCallback(() => {
    if (userState.data.professions) {
      const selected = userState.data.professions.filter((item: any) => {
        return item.name === state.name;
      });
      return selected[0] ? selected[0] : { _id: "0", name: "" };
    }
  }, [state, state.name, userState.data.professions, mode]);

  const handleProfessionList = useCallback(() => {
    const list = [...userState.data.professions];
    if (userState.data.professions.length > 0 && customerState.data.usertypes) {
      const selected = userState.data.professions.filter((item: any) => {
        return item.name === state.name;
      });

      customerState.data.usertypes.map((item: any, index: number) => {
        _.remove(list, { name: item.name });
      });

      if (selected.length > 0) {
        list.push(selected[0]);
      }
      return list;
    }

    return userState.data.professions;
  }, [userState.data.professions, customerState.data.usertypes, state, mode]);

  useEffect(() => {
    if (mode === "create") {
      setState((prevState: any) => ({
        ...prevState,
        active: true,
        mode: mode,
        _id: _id,
        customer_id: customerState.data._id,
      }));
    } else {
      setState((prevState: any) => ({
        ...prevState,
        mode: mode,
        _id: _id,
        customer_id: customerState.data._id,
      }));
    }

    // if (mode ==='create') {
    //   setState(() => ({
    //     active: true,
    //     name: "",
    //     rights: [],
    //     mode: "",
    //     _id: "",
    //     customer_id: "",
    //   }))
    // }

    if (!customerState.data.usertypes && mode != "create") {
      dispatch(loadCustomerById(customer_id));
    }
    if (userState.data.professions.length <= 0) {
      dispatch(getProfessionsAction());
    }
  }, []);

  useEffect(() => {
    if (customerState.permissionLoad && mode != "create") {
      const permission = _.find(customerState.data.usertypes, {
        permissions: customerState.permission._id,
      });

      if (permission) {
        setState((prevState: any) => ({
          ...prevState,
          active: permission.active,
          name: permission.name,
          rights: customerState.permission.rights,
        }));
      }
    }
  }, [customerState, mode]);

  const NavItems = [
    {
      name: "No Portal",
      components: ["CheckListFormPortal"],
    },
    {
      name: "No Aplicativo",
      components: ["CheckListFormApp"],
    },
  ];

  const CustomCheckbox = withStyles({
    root: {
      color: "var(--gray)",
      "&$checked": {
        color: "var(--action)",
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);

  const handleControlForm = (mode: string) => {
    if (mode === "view") {
      return (
        <CustomCheckbox
          style={{
            width: "35px",
            height: "35px",
            backgroundColor: "none",
            borderRadius: "0",
          }}
          checked={state.active}
          icon={<InactiveIcon />}
          checkedIcon={<CheckCircleOutlineOutlinedIcon />}
        />
      );
    } else {
      return (
        <Switch
          disabled={mode === "view"}
          checked={state.active}
          onChange={(event) => {
            setState((prevState: any) => ({
              ...prevState,
              active: event.target.checked,
            }));
          }}
        />
      );
    }
  };

  const handleLabelForm = (mode: string) => {
    if (mode === "view" && state.active) {
      return (
        <Box style={{ fontWeight: "bold", color: "var(--success" }}>
          Função ativa
        </Box>
      );
    } else if (mode === "view" && !state.active) {
      return (
        <Box style={{ fontWeight: "bold", color: "var(--gray)" }}>
          Função inativa
        </Box>
      );
    } else {
      return (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="Se ligado, função estará ativa no Portal e também no Aplicativo.">
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "16px",
                height: "16px",
                backgroundColor: "var(--gray)",
                borderRadius: "10px",
                textAlign: "center",
                marginRight: "5.3px",
                color: "var(--white)",
                fontWeight: "bold",
              }}
            >
              ?
            </Box>
          </Tooltip>{" "}
          <Box>Ativo?</Box>
        </Box>
      );
    }
  };
  const handleLabelPlacement = (mode: string) => {
    if (mode === "vieW") {
      return "end";
    } else {
      return "start";
    }
  };

  const autoCompleteProfession = {
    handleProfessionList: handleProfessionList,
    selectProfession: selectProfession,
    handleSelectProfession: handleSelectProfession,
    userState: userState,
    // _id: userState.data.professions[0]._id,
  };

  return (
    <div
      className={classes.root}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      {/* <TabPanel value={0} index={0}>
        <Grid container style={{ justifyContent: "flex-start" }}>
          <Grid item> */}
      {/*<TextField*/}
      {/*  // disabled={mode === 'create' || mode === 'view'}*/}
      {/*  disabled={true}*/}
      {/*  label="Nome"*/}
      {/*  variant="outlined"*/}
      {/*  size="small"*/}
      {/*  value={state.name}*/}
      {/*  onChange={(event) => {*/}
      {/*    setState((prevState: any) => ({*/}
      {/*      ...prevState,*/}
      {/*      name: event.target.value*/}
      {/*    }))*/}
      {/*  }}*/}
      {/*  fullWidth*/}
      {/*/>*/}
      {/* {modePermission === "create" && (
        <Autocomplete
          id="combo-box-profession"
          disabled={mode === "view"}
          options={handleProfessionList()}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Função" variant="outlined" />
          )}
          getOptionSelected={(option, value) =>
            option._id == userState.data.professions[0]._id
          }
          // defaultValue={selectProfession()}
          value={selectProfession()}
          onChange={(event, value) => {
            if (value) {
              handleSelectProfession(value);
            }
          }}
          size="small"
          fullWidth
        />
      )} */}
      {/* <Autocomplete
              id="combo-box-profession"
              disabled={mode === "view"}
              options={handleProfessionList()}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Função" variant="outlined" />
              )}
              getOptionSelected={(option, value) =>
                option._id == userState.data.professions[0]._id
              }
              // defaultValue={selectProfession()}
              value={selectProfession()}
              onChange={(event, value) => {
                if (value) {
                  handleSelectProfession(value);
                }
              }}
              size="small"
              fullWidth
            /> */}
      {/* </Grid>
        </Grid> */}

      {/*{rows.map(({legend, name, rights}: rowsInterface, index) => (*/}
      {/*  <FormControl component="fieldset" style={{marginBottom: '15px'}}>*/}
      {/*    <FormLabel className={classes.formLabel}>{legend}</FormLabel>*/}
      {/*    <FormGroup aria-label="position" row>*/}
      {/*      {rights.map(({crud, label}: rightsInterface, index: number) => (*/}
      {/*        <FormControlLabel*/}
      {/*          value={crud}*/}
      {/*          control={<CustomCheckbox checked={handleChecked(name, crud)}/>}*/}
      {/*          label={label}*/}
      {/*          labelPlacement="end"*/}
      {/*          disabled={mode === 'view'}*/}
      {/*          onChange={(event, value) => {*/}
      {/*            const rights = [...state.rights];*/}
      {/*            const right = `${name}.${crud}`*/}

      {/*            if (value) {*/}
      {/*              setState((prevState: any) => ({*/}
      {/*                ...prevState,*/}
      {/*                rights: [...prevState.rights, right]*/}
      {/*              }))*/}
      {/*            } else {*/}
      {/*              _.pull(rights, right);*/}
      {/*              setState((prevState: any) => ({*/}
      {/*                ...prevState,*/}
      {/*                rights: rights*/}
      {/*              }))*/}
      {/*            }*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*    </FormGroup>*/}
      {/*  </FormControl>*/}
      {/*))}*/}

      {/* </TabPanel> */}
      {/* <Grid
        item
        style={{
          width: "150px",
          fontSize: "16px",
          color: "var(--black)",
          fontWeight: "bold",
          position: "absolute",
          top: "0px",
          left: "15px",
        }}
      >
        {state.name}
      </Grid> */}
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          marginTop: "25px",
          maxWidth: "550px",
        }}
      >
        <TabForm
          navItems={NavItems}
          state={state}
          setState={setState}
          initialTab={0}
          params={params}
          rowsPortal={rowsPortal}
          rowsApp={rowsApp}
          mode={mode}
          autoCompleteSetting={autoCompleteProfession}
        />
      </Box>
      <Grid item md={3} xs={12}>
        <FormControlLabel
          control={handleControlForm(mode)}
          label={handleLabelForm(mode)}
          labelPlacement={handleLabelPlacement(mode)}
        />
      </Grid>
    </div>
  );
};

export default React.memo(PermissionForm);
