import React, { useCallback, useEffect, useState } from "react";
// Redux e Sagas
import { ProfessionUserInterface } from "../../../../store/ducks/users/types";
import { loadCustomerById } from "../../../../store/ducks/customers/actions";
import { loadProfessionsRequest as getProfessionsAction } from "../../../../store/ducks/users/actions";
import { useDispatch, useSelector } from "react-redux";
//MUI
import {
  FormControlLabel,
  Grid,
  Checkbox,
  Box,
  Tooltip,
  Typography,
  Switch,
} from "@mui/material";
import { Theme, withStyles } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
// icon
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { ReactComponent as InactiveIcon } from "../../../../assets/img/icon-inative.svg";
// styles
import { TabBody, TabBodyItem } from "../../../Tabs/styles";
import theme from "../../../../theme/theme";
// componentes
import TabForm from "../../../Tabs";
// utils
import _ from "lodash";

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

  const handleControlForm = (mode: string) => {
    if (mode === "view") {
      return (
        <Checkbox
          sx={{
            width: "35px",
            height: "35px",
            backgroundColor: "none",
            borderRadius: "0",
            color: theme.palette.text.disabled,
            "&.Mui-checked": { color: theme.palette.success.main },
          }}
          disabled
          checked={state.active}
          icon={<InactiveIcon />}
          checkedIcon={<CheckCircleOutlineOutlinedIcon />}
        />
      );
    } else {
      return (
        <Switch
          color="secondary"
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
        <Typography
          fontWeight={600}
          variant="body1"
          color={theme.palette.success.main}
        >
          Função ativa
        </Typography>
      );
    } else if (mode === "view" && !state.active) {
      return (
        <Typography
          fontWeight={600}
          variant="body1"
          color={theme.palette.text.disabled}
        >
          Função inativa
        </Typography>
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
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "16px",
                height: "16px",
                backgroundColor: theme.palette.grey[400],
                borderRadius: "10px",
                textAlign: "center",
                marginRight: "5.3px",
              }}
            >
              <Typography
                variant="body1"
                fontWeight={600}
                color={theme.palette.common.white}
              >
                ?
              </Typography>
            </Box>
          </Tooltip>
          <Typography variant="body1">Ativo?</Typography>
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
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
          backgroundColor: theme.palette.background.paper,
        }}
      >
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
    </ThemeProvider>
  );
};

export default React.memo(PermissionForm);
