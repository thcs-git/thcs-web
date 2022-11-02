import React, { useState, useEffect, useCallback } from "react";
// REDUX e REDUX-SAGA
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { loadCompanyById } from "../../store/ducks/companies/actions";
import { changeMenuSelected } from "../../store/ducks/layout/actions";
import { useNavigate } from "react-router-dom";

// MUI
import {
  createStyles,
  // makeStyles,
  useTheme,
  Theme,
  // ThemeProvider,
} from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import {
  // Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
import { TransitionProps } from "@mui/material/transitions";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Typography,
  Container,
  Drawer,
  Divider,
  Slide,
} from "@mui/material";

//UTILS
// import clsx from "clsx";
/**
 * Icons
 */
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExitToApp from "@mui/icons-material/ExitToApp";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOncon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LocalHospital from "@mui/icons-material/LocalHospital";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PublicIcon from "@mui/icons-material/Public";
import NotificationsIcon from "@mui/icons-material/Notifications";
import THCStype3Icon from "../Icons/THCS_Type3";
import THCStype4Icon from "../Icons/THCS_Type4";
import UserIcon from "../Icons/User";
import { Logo, UserContent } from "./styles";
import LOCALSTORAGE from "../../helpers/constants/localStorage";
// Components
import SESSIONSTORAGE from "../../helpers/constants/sessionStorage";
import _ from "lodash";
import { loadRequest } from "../../store/ducks/layout/actions";
import Message from "../Message";
import DialogChangeCompany from "../Dialogs/ChangeCompany";
import Loading from "../Loading";
import crypto from "crypto";
import CryptoJS from "crypto-js";

const drawerWidth = 250;

import localStorageConst from "../../helpers/constants/localStorage";
import sessionStorageConst from "../../helpers/constants/sessionStorage";

const capitalizeText = (words: string) => {
  if (words) {
    return words
      .toLowerCase()
      .split(" ")
      .map((text: string) => {
        return (text = text.charAt(0).toUpperCase() + text.substring(1));
      })
      .join(" ");
  } else return "";
};
const getFirstAndLastName = (fullName: string) => {
  return `${fullName.split(" ")[0]} ${
    fullName.split(" ")[fullName.split(" ").length - 1]
  }`;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PropsSidebar {
  permission?: boolean;
}

const Sibebar = (props: any) => {
  const navigate = useNavigate();
  // const classes = useStyles();
  const dispatch = useDispatch();
  const applicationState = useSelector((state: any) => state);
  const layoutState = useSelector((state: ApplicationState) => state.layout);
  const currentCompany = localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);

  const [open, setOpen] = useState<Boolean>(() => {
    let toggleSidebar =
      localStorage.getItem(LOCALSTORAGE.TOGGLE_SIDEBAR) || "false";
    return JSON.parse(toggleSidebar);
  });
  const [username, setUsername] = useState(
    localStorage.getItem(LOCALSTORAGE.USERNAME) || ""
  );
  const [company, setCompany] = useState({
    _id: localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED) || "",
    name: localStorage.getItem(LOCALSTORAGE.COMPANY_NAME) || "",
  });

  const [customer, setCustomer] = useState({
    _id: localStorage.getItem(LOCALSTORAGE.CUSTOMER) || "",
    name: localStorage.getItem(LOCALSTORAGE.CUSTOMER_NAME) || "",
  });
  const [openModalLogout, setOpenModalLogout] = useState(false);
  const [openModalConfig, setOpenModalConfig] = useState(false);
  const [openModalMessage, setOpenModalMessage] = useState(false);

  const [openDialogCompany, setOpenDialogCompany] = React.useState(false);
  const currentCompanyName =
    localStorage.getItem(LOCALSTORAGE.COMPANY_NAME) || "";
  const currentCustomerName =
    localStorage.getItem(LOCALSTORAGE.CUSTOMER_NAME) || "";

  const handleClickOpenDialogCompany = () => {
    setOpenDialogCompany(true);
  };

  const handleCloseDialogCompany = () => {
    setOpenDialogCompany(false);
  };

  const handleDrawerClose = useCallback(() => {
    setOpen((prev) => {
      localStorage.setItem(LOCALSTORAGE.TOGGLE_SIDEBAR, JSON.stringify(!prev));
      return !prev;
    });
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(localStorageConst.TOKEN);
    localStorage.removeItem(localStorageConst.USERNAME);
    localStorage.removeItem(localStorageConst.USER_ID);
    // localStorage.removeItem('@sollar_company_selected');
    // localStorage.removeItem('@sollar_company_name');
    localStorage.removeItem(localStorageConst.CUSTOMER);

    sessionStorage.removeItem(SESSIONSTORAGE.MENU);
    sessionStorage.removeItem(SESSIONSTORAGE.RIGHTS);
    sessionStorage.removeItem(SESSIONSTORAGE.INTEGRATION);
    sessionStorage.removeItem(SESSIONSTORAGE.INTEGRATION_NAME);
    sessionStorage.removeItem(SESSIONSTORAGE.INTEGRATION_TOKEN);

    window.location.reload();
  }, []);

  const handleCustomerName = useCallback((name: string) => {
    if (name.length > 25) {
      return _.truncate(name, {
        length: 25,
        separator: " ",
        omission: " ...",
      });
    } else {
      return name;
    }
  }, []);

  const handleCompanyName = useCallback((name: string) => {
    if (name.length > 25) {
      return _.truncate(name, {
        length: 25,
        separator: " ",
        omission: " ...",
      });
    } else {
      return name;
    }
  }, []);

  const handleOpenModalLogout = useCallback(() => {
    setOpenModalLogout(true);
  }, []);

  const handleCloseModalLogout = useCallback(() => {
    setOpenModalLogout(false);
  }, []);

  const handleToggleModalConfig = useCallback(() => {
    setOpenModalConfig(!openModalConfig);
  }, []);

  const [itemsMenu, setItemsMenu] = useState<any>([]);

  interface iconInterface {
    name: string;
    style?: any;
  }

  interface itemsInterface {
    title: any;
    route: any;
    modal: any;
    icon: JSX.Element;
  }

  const iconTypes: any = {
    AssignmentIndIcon: AssignmentIndIcon,
    BusinessIcon: BusinessIcon,
    DashboardIcon: DashboardIcon,
    ExitToApp: ExitToApp,
    FavoriteIcon: FavoriteIcon,
    GroupAddIcon: GroupAddIcon,
    LocalHospital: LocalHospital,
    LocationOncon: LocationOncon,
    PersonIcon: PersonIcon,
    StarRateIcon: StarRateIcon,
    SettingsIcon: SettingsIcon,
    PublicIcon: PublicIcon,
    default: AssignmentIndIcon,
  };

  const modalTypes: any = {
    ExitToApp: handleOpenModalLogout,
    default: handleOpenModalLogout,
  };

  const IconComponent = ({ name, ...props }: iconInterface) => {
    let Icon = iconTypes[name] ?? iconTypes.default;
    return <Icon {...props} />;
  };

  useEffect(() => {
    let menu = JSON.parse(sessionStorage.getItem(SESSIONSTORAGE.MENU) ?? "[]");
    if (itemsMenu.length === 0 && menu.length === 0) {
      dispatch(loadRequest());
    } else if (itemsMenu.length === 0 && menu.length > 0) {
      const items: itemsInterface[] = [];

      _.sortBy(menu, ["id"]).map((item: any) => {
        items.push({
          title: item.name,
          route: item.slug,
          modal: item.modal ? modalTypes[item.icon] : "",
          icon: (
            <IconComponent name={item.icon} style={{ color: item.color }} />
          ),
        });
      });
      setItemsMenu(items);
    }
  }, []);

  useEffect(() => {
    if (layoutState.success) {
      localStorage.setItem(LOCALSTORAGE.TOKEN, layoutState.data.token);

      sessionStorage.setItem(
        SESSIONSTORAGE.MENU,
        JSON.stringify(layoutState.data.menu)
      );
      sessionStorage.setItem(
        SESSIONSTORAGE.RIGHTS,
        JSON.stringify(layoutState.data.rights)
      );
      layoutState.data.integration
        ? sessionStorage.setItem(
            SESSIONSTORAGE.INTEGRATION,
            layoutState.data.integration
          )
        : sessionStorage.removeItem(SESSIONSTORAGE.INTEGRATION);
      layoutState.data.integration_name
        ? sessionStorage.setItem(
            SESSIONSTORAGE.INTEGRATION_NAME,
            layoutState.data.integration_name
          )
        : sessionStorage.removeItem(SESSIONSTORAGE.INTEGRATION_NAME);

      layoutState.data.integration_token
          ? sessionStorage.setItem(
              SESSIONSTORAGE.INTEGRATION_TOKEN,
              layoutState.data.integration_token
          )
          : sessionStorage.removeItem(SESSIONSTORAGE.INTEGRATION_TOKEN);

      layoutState.data.time_zone
        ? sessionStorage.setItem(
            SESSIONSTORAGE.INTEGRATION_TIME_ZONE,
            layoutState.data.time_zone
          )
        : sessionStorage.removeItem(SESSIONSTORAGE.INTEGRATION_TIME_ZONE);

      const items: itemsInterface[] = [];

      _.sortBy(layoutState.data.menu, ["id"]).map((item: any) => {
        items.push({
          title: item.name,
          route: item.slug,
          modal: item.modal ? modalTypes[item.icon] : "",
          icon: (
            <IconComponent name={item.icon} style={{ color: item.color }} />
          ),
        });
      });
      setItemsMenu(items);
    }
  }, [layoutState]);

  // useEffect(() => {
  //   let menu = JSON.parse(sessionStorage.getItem(SESSIONSTORAGE.MENU) ?? '[]')
  //
  //   if (itemsMenu.length <= 0) {
  //     dispatch(loadRequest())
  //   }
  //
  //   // if (!menu || menu.length <= 0) {
  //   //   dispatch(loadRequest())
  //   // }
  //
  //   // if (itemsMenu.length <= 0 && (menu || menu.length > 0)) {
  //   //   setItemsMenu(menu)
  //   // }
  //
  //   if (layoutState.success) {
  //     sessionStorage.setItem(SESSIONSTORAGE.MENU, JSON.stringify(menu))
  //     menu = _.sortBy(menu, ['id'])
  //
  //     const items: itemsInterface[] = [
  //       // {title: 'Dashboard', route: '/', icon: <DashboardIcon style={{color: '#fff'}}/>},
  //       // {title: 'Clientes', route: '/customer', icon: <AssignmentIndIcon style={{color: '#fff'}}/>},
  //       // {title: 'Empresas', route: '/company', icon: <BusinessIcon style={{color: '#fff'}}/>},
  //       // {title: 'Meus Profissionais', route: "/user", icon: <PersonIcon style={{color: '#fff'}}/>},
  //       // {title: 'Banco de Talentos', route: "/userdesengaged", icon: <StarRateIcon style={{color: '#fff'}}/>},
  //       // {title: 'Área', route: '/area', icon: <LocationOncon style={{color: '#fff'}}/>},
  //       // {title: 'Pacientes', route: '/patient', icon: <GroupAddIcon style={{color: '#fff'}}/>},
  //       // {title: 'Avaliação', route: '/avaliation', icon: <FavoriteIcon style={{color: '#fff'}}/>},
  //       // {title: 'Atendimento', route: '/care', icon: <LocalHospital style={{color: '#fff'}}/>},
  //     ]
  //
  //     menu.map((item: any) => {
  //       items.push({
  //         title: item.name,
  //         route: item.slug,
  //         modal: item.modal ? modalTypes[item.icon] : '',
  //         icon: <IconComponent name={item.icon} style={{color: item.color}}/>
  //       })
  //     })
  //     setItemsMenu(items)
  //   }
  // }, []);

  const checkLoading = useCallback(() => {
    let loading = false;

    const states: any = [
      // "allergies",
      "antibiotic",
      "areas",
      "attest",
      "cares",
      "companies",
      "councils",
      "customers",
      "documentGroups",
      "documents",
      "exams",
      "layout",
      "login",
      // "logo", // a logo
      "measurements",
      "message",
      "patients",
      "prescription",
      "profession",
      "qrCode",
      "specialties",
      "users",
      "cares.checkin",
      "cares.evolution",
      "telemedicine",
      "attachments",
      "forms",
      "logs",
      "customerLogs",
      // "attachmentsIntegration",
    ];

    for (let i = 0; i < states.length; i++) {
      if (applicationState[`${states[i]}`]?.loading) {
        loading = true;
      }
    }
    return loading;
  }, [applicationState]);
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      {checkLoading() && <Loading />}
      {/* <CssBaseline /> */}
      <Drawer
        variant="permanent"
        sx={{
          overflowX: open ? "visible" : "hidden",
          height: "100%",
          "& .MuiPaper-root": {
            overflowX: open ? "visible" : "hidden",
            backgroundColor: theme.palette.primary.main,
            transition: theme.transitions.create("all"),
            width: open ? drawerWidth : theme.spacing(9),
          },
          width: open ? drawerWidth : theme.spacing(9),
          flexShrink: 0,
          whiteSpace: "nowrap",
          background: theme.palette.primary.main,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "16px",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              marginLeft: `${open ? "32px" : "0"}`,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                display: `${open ? "initial" : "none"}`,
              }}
            >
              <THCStype4Icon fill={"#f4f7ff"} width={"140px"} />
            </Box>
            <IconButton
              sx={{
                marginBottom: `${open ? "22px" : "0"}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: `${open ? "48px" : "48px"}`,
                height: `${open ? "48px" : "48px"}`,
                cursor: "pointer",
                "& svg, path": { cursor: "pointer" },
                "& svg": { margin: "0px" },
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
              onClick={handleDrawerClose}
            >
              {open ? (
                <ChevronLeftIcon sx={{ color: theme.palette.common.white }} />
              ) : (
                <MenuIcon sx={{ color: theme.palette.common.white }} />
              )}
            </IconButton>
          </Box>
        </Box>
        {/* <Divider /> */}
        <Box
          sx={{
            paddingTop: "8px",
            width: "auto",
            transition: "0.2s linear",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // "& svg": { width: `${open ? "100px" : "auto"}` },
          }}
        >
          {open ? (
            <UserIcon
              fill={theme.palette.common.white}
              width={"48px"}
              height={"48px"}
            />
          ) : (
            <THCStype3Icon
              fill={theme.palette.common.white}
              width={"24px"}
              height={"24px"}
            />
          )}
          <Divider />
        </Box>

        <UserContent>
          {open ? (
            <>
              <div>
                <Grid
                  container
                  // spacing={2}
                  // xs={12}
                  // md={12}
                  style={{ justifyContent: "space-evenly" }}
                >
                  <Grid item>
                    <Typography
                      variant="h5"
                      color={"white"}
                      fontWeight="700"
                      sx={{
                        maxWidth: "230px",
                      }}
                    >
                      {getFirstAndLastName(capitalizeText(username))}
                    </Typography>
                  </Grid>
                  {/* <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        cursor: "auto",
                      }}
                      className={classes.logOutButton}
                      onClick={() => setOpenModalMessage(true)}
                    >
                      <Grid
                        item
                        sx={{
                          "& svg, path": { cursor: "pointer" },
                          paddingTop: "10px",
                        }}
                      >
                        <Badge
                          // classes={{ badge: classes.customBadge }}
                          // className={classes.padding}
                          color="primary"
                          badgeContent={1}
                          max={99}
                          sx={{
                            marginLeft: "6px",
                            "& span": {
                              backgroundColor: theme.palette.primary.light,
                            },
                          }}
                        >
                          <NotificationsIcon
                            sx={{ color: theme.palette.common.white }}
                          />
                        </Badge>
                      </Grid>
                    </ListItem> */}
                </Grid>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <ListItem
                    sx={{
                      cursor: "pointer",
                      "& svg, path, span, div, h4": {
                        cursor: "pointer",
                        color: theme.palette.common.white,
                      },
                    }}
                    style={{ padding: 0 }}
                    onClick={() => {
                      handleClickOpenDialogCompany();
                      setOpenModalConfig(true);
                    }}
                  >
                    <BusinessIcon />
                    <ListItemText style={{ color: "#ffff", cursor: "pointer" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ marginLeft: "10px", cursor: "pointer" }}
                          fontWeight="600"
                        >
                          {handleCustomerName(currentCustomerName)}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ marginLeft: "10px", cursor: "pointer" }}
                          fontWeight="600"
                        >
                          {handleCompanyName(currentCompanyName)}
                        </Typography>
                      </div>
                    </ListItemText>
                    <EditIcon
                      style={{
                        color: "#fff",
                        fontSize: "14px",
                        marginLeft: "10px",
                      }}
                    />
                  </ListItem>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* <ListItem
                  sx={{ width: "auto" }}
                  // className={classes.logOutButton}
                  onClick={() => setOpenModalMessage(true)}
                >
                  <Badge
                    // classes={{ badge: classes.customBadge }}
                    // className={classes.padding}
                    sx={{
                      "& svg, path": { cursor: "pointer" },
                      "& span": {
                        backgroundColor: theme.palette.primary.light,
                        margin: "-2px",
                        color: theme.palette.common.white,
                      },
                    }}
                    badgeContent={1}
                    max={99}
                  >
                    <NotificationsIcon
                      sx={{ color: theme.palette.common.white }}
                    />
                  </Badge>
                </ListItem> */}

              <br />
            </>
          )}
        </UserContent>
        <List>
          {itemsMenu.map((item: any, index: any) => (
            <>
              {item.modal ? (
                <ListItem
                  key={index}
                  onClick={item.modal}
                  sx={{
                    backgroundColor: `${
                      layoutState.data.menuSelected === item.title
                        ? `${theme.palette.primary.dark}`
                        : ""
                    }`,
                    "&:hover": {
                      transition: "ease-in-out 200ms",
                      backgroundColor: `${theme.palette.primary.light}`,
                      cursor: "pointer",
                      "& svg, path, span, div, h4": { cursor: "pointer" },
                    },
                  }}
                >
                  <ListItemIcon sx={{ marginLeft: "6px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ cursor: "pointer" }}
                        color={theme.palette.common.white}
                      >
                        {item.title}
                      </Typography>
                    }
                    style={{ color: "#ffff", cursor: "pointer" }}
                  />
                </ListItem>
              ) : (
                <ListItem
                  key={index}
                  onClick={() => {
                    if (item.route !== "/map") {
                      navigate(item.route);
                      dispatch(changeMenuSelected(item.title));
                    } else {
                      const token = localStorage.getItem(
                        localStorageConst.TOKEN
                      );
                      const integration_url = sessionStorage.getItem(
                        sessionStorageConst.INTEGRATION
                      );
                      const integration_token = sessionStorage.getItem(
                          sessionStorageConst.INTEGRATION_TOKEN
                      );
                      /** TODO COLOCAR ESSA VALOR DINAMICO (DESMOCAR)*/
                      const external_sector_id = "438";
                      const company_id = localStorage.getItem(
                        localStorageConst.COMPANY_SELECTED
                      );
                      const external_company_id = localStorage.getItem(
                        localStorageConst.INTEGRATION_COMPANY_SELECTED
                      );
                      const external_user_id = localStorage.getItem(
                        localStorageConst.SOLLAR_INTEGRATION_USER_ID
                      );

                      const key = process.env.REACT_APP_CHIPER_KEY || "";

                      const payload = {
                        token,
                        integration_url,
                        external_sector_id,
                        company_id,
                        external_company_id,
                        external_user_id,
                        integration_token,
                      };

                      const ciphertext = CryptoJS.AES.encrypt(
                        JSON.stringify(payload),
                        key
                      );
                      const hash = CryptoJS.enc.Base64url.stringify(
                        CryptoJS.enc.Utf8.parse(ciphertext.toString())
                      );
                      window.open(
                        process.env.REACT_APP_BASE_MAP + `/hash/${hash}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                  sx={{
                    backgroundColor: `${
                      layoutState.data.menuSelected === item.title
                        ? `${theme.palette.primary.dark}`
                        : ""
                    }`,
                    "&:hover": {
                      transition: "ease-in-out 200ms",
                      backgroundColor: `${theme.palette.primary.light}`,
                      cursor: "pointer",
                      "& svg, path, span, div, h4": { cursor: "pointer" },
                    },
                  }}
                >
                  <ListItemIcon sx={{ marginLeft: "6px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ cursor: "pointer" }}
                        color={theme.palette.common.white}
                      >
                        {item.title}
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </>
          ))}
        </List>
        {/*<Divider/>*/}
        {/*<List disablePadding={true}>*/}
        {/*  <ListItem className={classes.logOutButton} onClick={() => history.push("/userconfiguration")}>*/}
        {/*    <ListItemIcon>*/}
        {/*      <SettingsIcon style={{color: '#fff'}}/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Configurações"/>*/}
        {/*  </ListItem>*/}
        {/*  <ListItem className={classes.logOutButton} onClick={handleOpenModalLogout}>*/}
        {/*    <ListItemIcon>*/}
        {/*      <ExitToApp style={{color: '#fff'}}/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Sair"/>*/}
        {/*  </ListItem>*/}
        {/*</List>*/}
      </Drawer>
      {/* dialog sair */}
      <Dialog
        open={openModalLogout}
        onClose={handleCloseModalLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            variant="h5"
            color={theme.palette.primary.main}
            fontWeight="600"
          >
            Já vai?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="body1">
              Tem certeza que deseja sair do T+HCS?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} variant="contained" color="primary">
            Sair
          </Button>
          <Button
            onClick={handleCloseModalLogout}
            variant="outlined"
            color="secondary"
            autoFocus
          >
            Voltar
          </Button>
        </DialogActions>
      </Dialog>
      {/* dialog mensagens */}
      <Dialog
        open={openModalMessage}
        onClose={() => setOpenModalMessage(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle
          id="alert-dialog-title"
          // color={theme.palette.primary.main}
        >
          <Typography
            variant="h5"
            color={theme.palette.primary.main}
            fontWeight="600"
          >
            Mensagens
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Message />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModalMessage(false);
              // history.push(`/dashboard`);
              //location.reload()
            }}
            color="secondary"
            variant="outlined"
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <DialogChangeCompany
        open={openDialogCompany}
        setOpen={setOpenDialogCompany}
      />

      <Container sx={{ flex: 1, padding: theme.spacing(3), paddingBottom: 20 }}>
        {props.children}
      </Container>

      {/* {console.log(openDialogCompany)} */}

      {/* <Dialog
        open={openModalConfig}
        // onClose={handleToggleModalConfig}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">Configurações</DialogTitle>
        <DialogContent>
          <ConfigComponent />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModalConfig(false);
              history.push(`/dashboard`);
              //location.reload()
            }}
            color="primary"
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default React.memo(Sibebar);
