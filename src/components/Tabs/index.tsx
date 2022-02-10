import React, { useState, ReactNode } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Badge, Divider, Grid, withWidth } from "@material-ui/core";

import {
  TabBody,
  TabBodyItem,
  TabContent,
  TabNav,
  TabNavItem,
  TabNavItem_1,
  TabNavItemDetails,
  TabNavItemAlingRigth,
  TabNavItemAlingLeft,
  WrapperName,
  TabNavItemPermission,
  TabNavPermission,
} from "./styles";
import ClientFormHeader from "../Inputs/Forms/ClientName";
import _ from "lodash";
import CepForm from "../Inputs/Forms/CepForm";
import ResponsibleForm from "../Inputs/Forms/ResponsibleForm";
import ToggleActive from "../Button/ToggleActive";
import TabList from "../List/TabList";
import IntegrationForm from "../Inputs/Forms/IntegrationForm";
import PermissionList from "../List/PermissionList";
import UserContactForm from "../Inputs/Forms/UserContactForm";
import UserProfessionForm from "../Inputs/Forms/UserProfessionForm";
import UserForm from "../Inputs/Forms/UserForm";
import UserCompanyForm from "../Inputs/Forms/UserCompanyForm";
import CheckListForm from "../Inputs/Forms/CheckListForm";
import CompanyForm from "../Inputs/Forms/CompanyForm";
import PatientForm from "../Inputs/Forms/patientForm";

import { ReactComponent as CompanyIcon } from "../../assets/img/icon-company.svg";
import { ReactComponent as EmailIcon } from "../../assets/img/Icon-email.svg";
import { ReactComponent as PrintIcon } from "../../assets/img/Icon-imprimir.svg";
import { ReactComponent as PatientIcon } from "../../assets/img/icon-pacient.svg";
import { ReactComponent as MaleIcon } from "../../assets/img/icon-male-1.svg";
import { ReactComponent as FemaleIcon } from "../../assets/img/ionic-md-female.svg";
import { ReactComponent as ProfileIcon } from "../../assets/img/icon-user-1.svg";

import { ReactComponent as PortalActiveIcon } from "../../assets/img/icon-portal-active.svg";
import { ReactComponent as PortalDesactiveIcon } from "../../assets/img/icon-portal-desactive.svg";

import { ReactComponent as AppActiveIcon } from "../../assets/img/icon-app-active.svg";
import { ReactComponent as AppDesactiveIcon } from "../../assets/img/icon-app-desactive.svg";

import Box from "@mui/material/Box";

interface ITabprops {
  navItems: INavItems[];
  children?: ReactNode;
  state?: any;
  setState?: Function;
  setValidations?: Function;
  fieldsValidation?: any;
  canEdit?: boolean;
  getAddress?: any;
  cepStatus?: any;
  user?: string;
  customerState?: any;
  tableCells?: any;
  mode?: string;
  initialTab: number;
  setInitialTab?: any;
  params: IPageParams;
  rowsPortal?: any;
  rowsApp?: any;
  propsPermissionForm?: any;
}

interface IPageParams {
  id?: string;
  mode?: string;
}

interface INavItems {
  name: string;
  components: any;
  badge?: number;
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
      style={{ padding: "16px" }}
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <TabBodyItem>{children}</TabBodyItem>
    </TabBody>
  );
}

function a11yProps(index: any) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    borderBottom: "2px solid var(--secondary)",
  },
  indicatorCompany: {
    borderBottom: "2px solid var(--black)",
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  customBadge: {
    backgroundColor: "var(--secondary)",
    color: "white",
  },
  colorSecondary: {
    color: "var(--secondary)",
  },
}));

const TabForm = (props: ITabprops) => {
  const {
    navItems,
    state,
    setState,
    setValidations,
    fieldsValidation,
    canEdit,
    cepStatus,
    getAddress,
    user,
    customerState,
    mode,
    initialTab,
    setInitialTab,
    params,
    rowsPortal,
    rowsApp,
    propsPermissionForm,
  } = props;
  const classes = useStyles();
  const indicatorCompany = classes.indicator;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    setInitialTab && setInitialTab(newValue);
  };
  const [value, setValue] = useState(initialTab);

  function handleComponents(component: string, index: number) {
    switch (component) {
      case "ClientFormHeader":
        return (
          <ClientFormHeader
            index={index}
            state={state}
            setState={setState ? setState : () => false}
            setValidations={setValidations ? setValidations : () => false}
            fieldsValidation={fieldsValidation}
            canEdit={canEdit ? canEdit : false}
            params={params}
          />
        );
      case "CepForm":
        return (
          <CepForm
            index={index}
            state={state}
            setState={setState ? setState : () => false}
            setValidations={setValidations ? setValidations : () => false}
            canEdit={canEdit ? canEdit : false}
            cepStatus={cepStatus}
            getAddress={getAddress}
            params={params}
          />
        );
      case "CompanyForm":
        return (
          <CompanyForm
            index={index}
            state={state}
            setState={setState ? setState : () => false}
            setValidations={setValidations ? setValidations : () => false}
            canEdit={canEdit ? canEdit : false}
            cepStatus={cepStatus}
            getAddress={getAddress}
            params={params}
          />
        );
      case "PatientForm":
        return (
          <PatientForm
            index={index}
            state={state}
            setState={setState ? setState : () => false}
            setValidations={setValidations ? setValidations : () => false}
            canEdit={canEdit ? canEdit : false}
            cepStatus={cepStatus}
            getAddress={getAddress}
            params={params}
            detailsPatientIs={true}
          />
        );
      case "UserForm":
        return (
          <UserForm
            state={state}
            setState={setState ? setState : () => false}
            setValidations={setValidations ? setValidations : () => false}
            canEdit={canEdit ? canEdit : false}
            params={params}
          />
        );
      case "UserCompanyForm":
        return (
          <UserCompanyForm
            state={state}
            setState={setState ? setState : () => false}
            setValidations={setValidations ? setValidations : () => false}
            canEdit={canEdit ? canEdit : false}
            params={params}
          />
        );
      case "UserContactForm":
        return (
          <UserContactForm
            state={state}
            setState={setState ? setState : () => false}
            setValidations={setValidations ? setValidations : () => false}
            canEdit={canEdit ? canEdit : false}
            params={params}
          />
        );
      case "UserProfessionForm":
        return (
          <UserProfessionForm
            state={state}
            setState={setState ? setState : () => false}
            setValidations={setValidations ? setValidations : () => false}
            canEdit={canEdit ? canEdit : false}
            params={params}
          />
        );
      case "ResponsibleForm":
        return (
          <ResponsibleForm
            index={index}
            state={state}
            setState={setState ? setState : () => false}
            setValidations={setValidations ? setValidations : () => false}
            fieldsValidation={fieldsValidation}
            canEdit={canEdit ? canEdit : false}
            user={user}
            params={params}
          />
        );
      case "PermissionList":
        return (
          <PermissionList
            customerState={customerState}
            mode={mode ? mode : ""}
            propsPermissionForm={propsPermissionForm}
          />
        );
      case "CheckListFormPortal":
        return (
          <CheckListForm
            state={state}
            setState={setState}
            rows={rowsPortal}
            mode={mode}
          />
        );
      case "CheckListFormApp":
        return (
          <CheckListForm
            state={state}
            setState={setState}
            rows={rowsApp}
            mode={mode}
          />
        );
      case "ToggleActive":
        return (
          <ToggleActive
            index={index}
            state={state}
            setState={setState ? setState : () => false}
            canEdit={canEdit ? canEdit : false}
          />
        );
      case "IntegrationForm":
        return (
          <IntegrationForm
            index={index}
            state={state}
            setState={setState ? setState : () => false}
            canEdit={canEdit ? canEdit : false}
          />
        );
      default:
        return <TabBodyItem>Not found!</TabBodyItem>;
    }
  }
  return navItems[0].components[0] === "CompanyForm" ? (
    <div className={classes.root}>
      <TabContent position="static">
        <TabNav
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          {navItems.map(
            ({ name, badge, components }: INavItems, index: number) => (
              <TabNavItem_1
                // tabNavCompany={true}
                value={index}
                label={
                  <TabNavItemDetails>
                    <TabNavItemAlingLeft>
                      <CompanyIcon />
                      {name}
                    </TabNavItemAlingLeft>

                    {/* <TabNavItemAlingRigth>
                      <EmailIcon style={{ cursor: "pointer" }} />
                      <PrintIcon style={{ cursor: "pointer" }} />
                    </TabNavItemAlingRigth> */}
                  </TabNavItemDetails>
                }
                wrapped
                className={value === index ? "active" : ""}
                {...a11yProps({ index })}
              />
            )
          )}
        </TabNav>
      </TabContent>
      {navItems.map(({ name, components, badge }: INavItems, index: number) => {
        const last = _.findLastIndex(components);

        return (
          <TabPanel value={value} index={index}>
            {components.map((component: string, sub_index: number) => (
              <>
                {handleComponents(component, parseInt(`${index}${sub_index}`))}
                {sub_index != last && (
                  <Grid item md={12} xs={12}>
                    <Divider style={{ marginBottom: 28, marginTop: 20 }} />
                  </Grid>
                )}
              </>
            ))}
          </TabPanel>
        );
      })}
    </div>
  ) : navItems[0].components[0] === "PatientForm" ? (
    <div className={classes.root}>
      <TabContent position="static">
        <TabNav
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          // TabIndicatorProps={{ className: classes.indicator} }
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          {navItems.map(
            ({ name, badge, components }: INavItems, index: number) => (
              <TabNavItem_1
                // tabNavCompany={true}
                value={index}
                label={
                  <TabNavItemDetails>
                    <TabNavItemAlingLeft>
                      <PatientIcon />
                      {name}
                      {state.gender.toLowerCase() === "masculino" && (
                        <MaleIcon />
                      )}
                      {state.gender.toLowerCase() === "feminino" && (
                        <FemaleIcon />
                      )}
                    </TabNavItemAlingLeft>
                  </TabNavItemDetails>
                }
                wrapped
                className={value === index ? "active" : ""}
                {...a11yProps({ index })}
              />
            )
          )}
        </TabNav>
      </TabContent>
      {navItems.map(({ name, components, badge }: INavItems, index: number) => {
        const last = _.findLastIndex(components);
        return (
          <TabPanel value={value} index={index}>
            {components.map((component: string, sub_index: number) => (
              <>
                {handleComponents(component, parseInt(`${index}${sub_index}`))}
                {sub_index != last && (
                  <Grid item md={12} xs={12}>
                    <Divider style={{ marginBottom: 28, marginTop: 20 }} />
                  </Grid>
                )}
              </>
            ))}
          </TabPanel>
        );
      })}
    </div>
  ) : navItems[0].components[0] === "CheckListFormPortal" ||
    navItems[0].components[0] === "CheckListFormApp" ? (
    <div className={classes.root}>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "30px ",
          marginLeft: "15px",
        }}
      >
        <Grid
          item
          style={{
            fontSize: "16px",
            color: "var(--black)",
            fontWeight: "bold",
          }}
        >
          {state.name}
        </Grid>

        <TabContent
          position="static"
          style={{
            background: "none",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            maxWidth: "500px",
          }}
        >
          <TabNavPermission
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            style={{
              fontSize: "13px",
              background: "none",
              display: "flex",

              alignItems: "center",
            }}
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            {navItems.map(({ name, badge }: INavItems, index: number) => (
              <TabNavItemPermission
                value={index}
                label={
                  badge ? (
                    <Badge
                      classes={{ badge: classes.customBadge }}
                      className={classes.padding}
                      badgeContent={badge}
                      max={99}
                    >
                      {name}
                    </Badge>
                  ) : (
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "Center",
                        gap: "5px",
                        minHeight: "32px",
                      }}
                    >
                      {name.toLowerCase() === "no portal" &&
                        (value === index ? (
                          <PortalActiveIcon />
                        ) : (
                          <PortalDesactiveIcon />
                        ))}
                      {name.toLowerCase() === "no aplicativo" &&
                        (value === index ? (
                          <AppActiveIcon />
                        ) : (
                          <AppDesactiveIcon />
                        ))}

                      {name}
                    </Box>
                  )
                }
                wrapped
                className={value === index ? "active" : "desactive"}
                {...a11yProps({ index })}
              ></TabNavItemPermission>
            ))}
          </TabNavPermission>
        </TabContent>
      </Box>

      {navItems.map(({ name, components, badge }: INavItems, index: number) => {
        const last = _.findLastIndex(components);
        return (
          <TabPanel value={value} index={index}>
            {components.map((component: string, sub_index: number) => (
              <>
                {handleComponents(component, parseInt(`${index}${sub_index}`))}
                {/* {sub_index != last && (
                  <Grid item md={12} xs={12}>
                    <Divider style={{ marginBottom: 28, marginTop: 20 }} />
                  </Grid>
                )} */}
              </>
            ))}
          </TabPanel>
        );
      })}
    </div>
  ) : (
    <div className={classes.root}>
      <TabContent position="static">
        <TabNav
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          TabIndicatorProps={{ style: { display: "none" } }}
          style={{ fontSize: "13px" }}
        >
          {navItems.map(({ name, badge }: INavItems, index: number) => (
            <TabNavItem
              value={index}
              label={
                badge ? (
                  <Badge
                    classes={{ badge: classes.customBadge }}
                    className={classes.padding}
                    badgeContent={badge}
                    max={99}
                  >
                    {name}
                  </Badge>
                ) : (
                  name
                )
              }
              wrapped
              className={value === index ? "active" : ""}
              {...a11yProps({ index })}
            ></TabNavItem>
          ))}
        </TabNav>
      </TabContent>

      {navItems.map(({ name, components, badge }: INavItems, index: number) => {
        const last = _.findLastIndex(components);
        return (
          <TabPanel value={value} index={index}>
            {state.name && (
              <>
                {components[0] === "PermissionList" ? (
                  propsPermissionForm.modePermission === "start" ? (
                    <WrapperName>
                      <CompanyIcon />
                      Permissões - {state.name}
                    </WrapperName>
                  ) : (
                    ""
                  )
                ) : (
                  <>
                    <WrapperName>
                      {name === "DADOS DO CLIENTE" || name === "INTEGRAÇÃO" ? (
                        <CompanyIcon />
                      ) : (
                        <ProfileIcon />
                      )}

                      {state.name}
                      {state.gender?.toLowerCase() === "masculino" && (
                        <MaleIcon />
                      )}
                      {state.gender?.toLowerCase() === "feminino" && (
                        <FemaleIcon />
                      )}
                    </WrapperName>
                    <Divider
                      style={{ marginBottom: 0, marginTop: 16, width: 458 }}
                    />
                  </>
                )}
              </>
            )}
            {components.map((component: string, sub_index: number) => (
              <>
                {handleComponents(component, parseInt(`${index}${sub_index}`))}
                {/* {sub_index != last && (
                  <Grid item md={12} xs={12}>
                    <Divider style={{ marginBottom: 28, marginTop: 20 }} />
                  </Grid>
                )} */}
              </>
            ))}
          </TabPanel>
        );
      })}
    </div>
  );
};
export default React.memo(TabForm);
