import React, { useState, ReactNode } from "react";
import { Theme } from "@mui/material/styles";

import { Badge, Divider, Grid, Typography } from "@mui/material";

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
  WrapperHeaderForm,
  ButtonStyle,
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
import ChangePasswordConfiguration from "../Inputs/Forms/ChangePasswordTab";

import CompanyIcon from "../Icons/Company";
import UserIcon from "../Icons/User";
import { ReactComponent as EmailIcon } from "../../assets/img/Icon-email.svg";
import { ReactComponent as PrintIcon } from "../../assets/img/Icon-imprimir.svg";
import PatientIcon from "../Icons/Patient";
import { ReactComponent as MaleIcon } from "../../assets/img/icon-male-1.svg";
import { ReactComponent as FemaleIcon } from "../../assets/img/ionic-md-female.svg";
import { ReactComponent as ProfileIcon } from "../../assets/img/icon-user-1.svg";
import { ReactComponent as PortalActiveIcon } from "../../assets/img/icon-portal-active.svg";
import { ReactComponent as PortalDesactiveIcon } from "../../assets/img/icon-portal-desactive.svg";
import ComputerIcon from "../Icons/Computer";
import CellphoneIcon from "../Icons/Cellphone";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CustomerState } from "../../store/ducks/customers/types";
import { UserState } from "../../store/ducks/users/types";
import SESSIONSTORAGE from "../../helpers/constants/sessionStorage";
import { checkEditPermission } from "../../utils/permissions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { IButtons } from "../Button/ButtonTabs";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../../theme/theme";

interface IPropsPermissionFrom {
  state: {
    active: boolean;
    name: string;
    rights: never[];
    mode: string;
    _id: string;
    customer_id: string;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      active: boolean;
      name: string;
      rights: never[];
      mode: string;
      _id: string;
      customer_id: string;
    }>
  >;
  customerState: CustomerState;
  userState: UserState;
  params: IPageParams;
  canEditPermission: boolean;
  buttonsPermission: IButtons[];
  modePermission: string;
  setModePermission: React.Dispatch<React.SetStateAction<string>>;
  cleanSelectProfession: () => void;
}

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
  propsPermissionForm?: IPropsPermissionFrom;
  autoCompleteSetting?: any;
  modePermission?: string;
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
    autoCompleteSetting,
    modePermission,
  } = props;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    setInitialTab && setInitialTab(newValue);
  };
  const [value, setValue] = useState(initialTab);
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
  const rightsOfLayoutState = useSelector(
    (state: ApplicationState) => state.layout.data.rights
  );
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
            checkList={"portal"}
            autoCompleteSetting={autoCompleteSetting}
          />
        );
      case "CheckListFormApp":
        return (
          <CheckListForm
            state={state}
            setState={setState}
            rows={rowsApp}
            mode={mode}
            checkList={"app"}
            autoCompleteSetting={autoCompleteSetting}
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
      case "ChangePassword":
        return <ChangePasswordConfiguration state={state} />;
      default:
        return <TabBodyItem>Not found!</TabBodyItem>;
    }
  }
  return (
    <ThemeProvider theme={theme}>
      {navItems[0].components[0] === "CompanyForm" ? (
        <div
          style={{
            flexGrow: 1,
            width: "100%",
            backgroundColor: theme.palette.background.paper,
          }}
        >
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
                          <CompanyIcon fill={theme.palette.primary.main} />
                          <Typography variant="body2" fontWeight={600}>
                            {name}
                          </Typography>
                        </TabNavItemAlingLeft>
                      </TabNavItemDetails>
                    }
                    wrapped
                    className={value === index ? "active" : ""}
                    key={index}
                    {...a11yProps({ index })}
                  />
                )
              )}
            </TabNav>
          </TabContent>
          {navItems.map(
            ({ name, components, badge }: INavItems, index: number) => {
              const last = _.findLastIndex(components);

              return (
                <TabPanel value={value} index={index} key={index}>
                  {components.map((component: string, sub_index: number) => (
                    <>
                      {handleComponents(
                        component,
                        parseInt(`${index}${sub_index}`)
                      )}
                      {sub_index != last && (
                        <Grid item md={12} xs={12}>
                          <Divider sx={{ marginBottom: 28, marginTop: 20 }} />
                        </Grid>
                      )}
                    </>
                  ))}
                </TabPanel>
              );
            }
          )}
        </div>
      ) : navItems[0].components[0] === "PatientForm" ? (
        <div
          style={{
            flexGrow: 1,
            width: "100%",
            backgroundColor: theme.palette.background.paper,
          }}
        >
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
                          <PatientIcon
                            fill={theme.palette.common.white}
                            circleColor={theme.palette.primary.main}
                            width={"32px"}
                            height={"32px"}
                          />
                          <Typography variant="body2" fontWeight={600}>
                            {name}
                          </Typography>
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
                    key={index}
                    className={value === index ? "active" : ""}
                    {...a11yProps({ index })}
                  />
                )
              )}
            </TabNav>
          </TabContent>
          {navItems.map(
            ({ name, components, badge }: INavItems, index: number) => {
              const last = _.findLastIndex(components);
              return (
                <TabPanel value={value} index={index} key={index}>
                  {components.map((component: string, sub_index: number) => (
                    <>
                      {handleComponents(
                        component,
                        parseInt(`${index}${sub_index}`)
                      )}
                      {sub_index != last && (
                        <Grid item md={12} xs={12}>
                          <Divider
                            style={{ marginBottom: 28, marginTop: 20 }}
                          />
                        </Grid>
                      )}
                    </>
                  ))}
                </TabPanel>
              );
            }
          )}
        </div>
      ) : navItems[0].components[0] === "CheckListFormPortal" ||
        navItems[0].components[0] === "CheckListFormApp" ? (
        <div
          style={{
            flexGrow: 1,
            width: "100%",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px ",
              marginLeft: "15px",
              width: "600px",
            }}
          >
            {mode === "create" ? (
              <Autocomplete
                sx={{
                  display: "inline-block",
                  "& input": {},
                }}
                // sx={{ "& input": { height: 32 } }}
                id="combo-box-profession"
                // disabled={mode === "view"}
                options={autoCompleteSetting.handleProfessionList()}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecione a função"
                    variant="outlined"
                    style={{ fontSize: "12px", height: "32px" }}
                  />
                )}
                // getOptionSelected={(option, value) =>
                //   option._id == userState.data.professions[0]._id
                // }
                // defaultValue={selectProfession()}
                value={autoCompleteSetting.selectProfession()}
                onChange={(event, value) => {
                  if (value) {
                    autoCompleteSetting.handleSelectProfession(value);
                  }
                }}
                size="small"
                fullWidth
              />
            ) : (
              <Grid
                item
                style={{
                  fontSize: "16px",
                  color: "var(--black)",
                  fontWeight: "bold",
                }}
              >
                <Typography fontWeight={500}>{state.name}</Typography>
              </Grid>
            )}

            <TabContent
              position="static"
              style={{
                background: "none",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "256px",
              }}
            >
              <TabNavPermission
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                sx={{
                  fontSize: "13px",
                  background: "none",
                  display: "flex",
                  alignItems: "center",
                }}
                TabIndicatorProps={{ style: { display: "none" } }}
              >
                {navItems.map(({ name, badge }: INavItems, index: number) => (
                  <TabNavItemPermission
                    sx={{ display: "flex" }}
                    key={index}
                    value={index}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "5px",
                          minHeight: "32px",
                          cursor: "pointer",
                          "& svg, path, rect": { cursor: "pointer" },
                        }}
                      >
                        {name.toLowerCase() === "no portal" &&
                          (value === index ? (
                            <ComputerIcon fill={theme.palette.common.white} />
                          ) : (
                            <ComputerIcon fill={theme.palette.text.secondary} />
                          ))}
                        {name.toLowerCase() === "no aplicativo" &&
                          (value === index ? (
                            <CellphoneIcon
                              fill={theme.palette.common.white}
                              displayColor={theme.palette.secondary.main}
                            />
                          ) : (
                            <CellphoneIcon
                              fill={theme.palette.text.secondary}
                              displayColor={theme.palette.common.white}
                            />
                          ))}

                        <Typography variant="body2" sx={{ cursor: "pointer" }}>
                          {name}
                        </Typography>
                      </Box>
                    }
                    wrapped
                    className={value === index ? "active" : "desactive"}
                    {...a11yProps({ index })}
                  ></TabNavItemPermission>
                ))}
              </TabNavPermission>
            </TabContent>
          </Box>

          {navItems.map(
            ({ name, components, badge }: INavItems, index: number) => {
              const last = _.findLastIndex(components);
              return (
                <TabPanel value={value} index={index} key={index}>
                  {components.map((component: string, sub_index: number) => (
                    <>
                      {handleComponents(
                        component,
                        parseInt(`${index}${sub_index}`)
                      )}
                      {/* {sub_index != last && (
                      <Grid item md={12} xs={12}>
                        <Divider style={{ marginBottom: 28, marginTop: 20 }} />
                      </Grid>
                    )} */}
                    </>
                  ))}
                </TabPanel>
              );
            }
          )}
        </div>
      ) : (
        <div>
          <TabContent position="static">
            <TabNav
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              // color="secondary"
              indicatorColor="primary"
              // TabIndicatorProps={{ className: classes.indicator }}
              // style={{ fontSize: "13px", fontWeight: "normal" }}
            >
              {navItems.map(({ name, badge }: INavItems, index: number) =>
                name === "INTEGRAÇÃO" && !integration ? (
                  ""
                ) : (
                  <TabNavItem
                    sx={{ cursor: "pointer" }}
                    key={index}
                    value={index}
                    label={
                      <Typography
                        variant="body2"
                        // color={theme.palette.secondary.main}
                        fontWeight={500}
                        sx={{ cursor: "pointer" }}
                      >
                        {name}
                      </Typography>
                    }
                    wrapped
                    // className={value === index ? "active" : ""}
                    {...a11yProps({ index })}
                  ></TabNavItem>
                )
              )}
            </TabNav>
          </TabContent>

          {navItems.map(
            ({ name, components, badge }: INavItems, index: number) => {
              const last = _.findLastIndex(components);
              return (
                <TabPanel value={value} index={index} key={index}>
                  {state.name && (
                    <>
                      {components[0] === "PermissionList" ? (
                        propsPermissionForm?.modePermission === "start" ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <WrapperName>
                              <CompanyIcon fill={theme.palette.primary.main} />
                              <Typography variant="body1" fontWeight={600}>
                                Permissões - {state.name}
                              </Typography>
                            </WrapperName>
                            <ButtonStyle
                              variant="outlined"
                              onClick={() => {
                                !checkEditPermission(
                                  "permission",
                                  JSON.stringify(rightsOfLayoutState)
                                )
                                  ? toast.error(
                                      "Você não tem permissão para criar nova função."
                                    )
                                  : propsPermissionForm.setModePermission(
                                      "create"
                                    );
                                propsPermissionForm.cleanSelectProfession();
                              }}
                            >
                              <Box
                                sx={{
                                  position: "relative",
                                  border: " 1px solid var(--success)",
                                  borderRadius: "30px",
                                  width: "18px",
                                  height: "18px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                              >
                                <Typography
                                  fontWeight={500}
                                  sx={{
                                    position: "absolute",
                                    bottom: "-3px",
                                    left: "3px",
                                    cursor: "pointer",
                                  }}
                                >
                                  +
                                </Typography>
                              </Box>
                              <Typography
                                fontWeight={500}
                                sx={{
                                  cursor: "pointer",
                                }}
                              >
                                Adicionar função
                              </Typography>
                            </ButtonStyle>
                          </Box>
                        ) : (
                          ""
                        )
                      ) : (
                        <>
                          <WrapperName>
                            {name === "DADOS DO CLIENTE" ||
                            name === "INTEGRAÇÃO" ? (
                              <CompanyIcon fill={theme.palette.primary.main} />
                            ) : (
                              <UserIcon fill={theme.palette.primary.main} />
                            )}
                            <Typography fontWeight={600}>
                              {state.name}
                            </Typography>

                            {state.gender?.toLowerCase() === "masculino" && (
                              <MaleIcon />
                            )}
                            {state.gender?.toLowerCase() === "feminino" && (
                              <FemaleIcon />
                            )}
                          </WrapperName>
                          <Divider
                            style={{
                              marginBottom: 0,
                              marginTop: 16,
                              width: 458,
                            }}
                          />
                        </>
                      )}
                    </>
                  )}
                  {components.map((component: string, sub_index: number) => (
                    <>
                      {handleComponents(
                        component,
                        parseInt(`${index}${sub_index}`)
                      )}
                      {/* {sub_index != last && (
                      <Grid item md={12} xs={12}>
                        <Divider style={{ marginBottom: 28, marginTop: 20 }} />
                      </Grid>
                    )} */}
                    </>
                  ))}
                </TabPanel>
              );
            }
          )}
        </div>
      )}
    </ThemeProvider>
  );
};
export default React.memo(TabForm);
