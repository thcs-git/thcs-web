import React, { useState, useEffect, Props, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ApplicationState } from "../../store";

import { loadCompanyById } from "../../store/ducks/companies/actions";
import { changeMenuSelected } from "../../store/ducks/layout/actions";

import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  // ThemeProvider,
} from "@material-ui/core/styles";

import {
  createTheme,
  ThemeProvider,
  styled,
  // Theme,
} from "@mui/material/styles";

import theme from "../../theme/theme";
import {
  // Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Drawer from "@material-ui/core/Drawer";
// import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
// import IconButton from "@mui/material/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

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
} from "@mui/material";

import { useHistory } from "react-router-dom";

/**
 * Icons
 */
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import BusinessIcon from "@material-ui/icons/Business";
import LocationOncon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import LocalHospital from "@material-ui/icons/LocalHospital";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NotificationsIcon from "@material-ui/icons/Notifications";
import THCStype2Icon from "../Icons/THCS_type2";
import UserIcon from "../Icons/User";

import { Logo, UserContent } from "./styles";
import LOCALSTORAGE from "../../helpers/constants/localStorage";

// Components
import ConfigComponent from "../Configuration";
import SESSIONSTORAGE from "../../helpers/constants/sessionStorage";
import { toast } from "react-toastify";
import _ from "lodash";
import { loadRequest } from "../../store/ducks/layout/actions";
import Message from "../Message";
import DialogChangeCompany from "../Dialogs/ChangeCompany";
import Loading from "../Loading";

const drawerWidth = 250;

// const itemsMenu = [
//   menu.map((item: any) => {
//     test.push({ title: item.name, route: item.slug, icon: <AssignmentIndIcon style={{ color: '#fff' }} /> })
//   }),
//   { title: 'Dashboard', route: '/', icon: <DashboardIcon style={{ color: '#fff' }} /> },
//   { title: 'Clientes', route: '/customer', icon: <AssignmentIndIcon style={{ color: '#fff' }} /> },
//   { title: 'Empresas', route: '/company', icon: <BusinessIcon style={{ color: '#fff' }} /> },
//   { title: 'Meus Profissionais', route: "/user", icon: <PersonIcon style={{ color: '#fff' }} /> },
//   { title: 'Banco de Talentos', route: "/userdesengaged", icon: <StarRateIcon style={{ color: '#fff' }} /> },
//   { title: 'Área', route: '/area', icon: <LocationOncon style={{ color: '#fff' }} /> },
//   { title: 'Pacientes', route: '/patient', icon: <GroupAddIcon style={{ color: '#fff' }} /> },
//   { title: 'Avaliação', route: '/avaliation', icon: <FavoriteIcon style={{ color: '#fff' }} /> },
//   { title: 'Atendimento', route: '/care', icon: <LocalHospital style={{ color: '#fff' }} />},
// ]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flex: 1,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      background: theme.palette.primary.main,
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      background: theme.palette.primary.main,
      color: "#fff",
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
      background: theme.palette.primary.main,
      color: "#fff",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // paddingTop: "32px",

      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flex: 1,
      padding: theme.spacing(3),
      paddingBottom: 20,
    },
    logOutButton: {
      cursor: "pointer",
      // marginLeft: 5,
    },
    indicator: {
      borderBottom: "2px solid var(--secondary)",
    },
    padding: {
      padding: theme.spacing(0, 1),
    },
    customBadge: {
      backgroundColor: "var(--secondary)",
      color: "white",
    },
  })
);

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

const Sibebar = (props: Props<any>) => {
  const history = useHistory();
  const classes = useStyles();
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
    localStorage.removeItem("@sollar_token");
    localStorage.removeItem("@sollar_username");
    localStorage.removeItem("@sollar_user_id");
    // localStorage.removeItem('@sollar_company_selected');
    // localStorage.removeItem('@sollar_company_name');
    localStorage.removeItem("@sollar_customer");

    sessionStorage.removeItem(SESSIONSTORAGE.MENU);
    sessionStorage.removeItem(SESSIONSTORAGE.RIGHTS);
    sessionStorage.removeItem(SESSIONSTORAGE.INTEGRATION);
    sessionStorage.removeItem(SESSIONSTORAGE.INTEGRATION_NAME);

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
    ];

    for (let i = 0; i < states.length; i++) {
      if (applicationState[`${states[i]}`]?.loading) {
        loading = true;
      }
    }
    return loading;
  }, [applicationState]);

  return (
    <div className={classes.root}>
      {checkLoading() && <Loading />}
      {/* <CssBaseline /> */}
      <ThemeProvider theme={theme}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
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
                {/* <Logo /> */}
                <THCStype2Icon fill={"#f4f7ff"} width={"140px"} />
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
                }}
                onClick={handleDrawerClose}
              >
                {open ? (
                  <ChevronLeftIcon style={{ color: "#f4f7ff" }} />
                ) : (
                  <MenuIcon style={{ color: "#f4f7ff" }} />
                )}
              </IconButton>
            </Box>
          </Box>
          {/* <Divider /> */}
          <Box
            sx={{
              paddingTop: "10px",
              width: "auto",
              transition: "0.2s linear",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "& svg": { width: "100px" },
            }}
          >
            <UserIcon fill={"#FFF"} width={"48px"} height={"48px"} />
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
                        fontWeight="500"
                        sx={{
                          maxWidth: "230px",
                        }}
                      >
                        {username}
                      </Typography>
                    </Grid>
                    <ListItem
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
                          classes={{ badge: classes.customBadge }}
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
                          <NotificationsIcon />
                        </Badge>
                      </Grid>
                    </ListItem>
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
                        "& svg, path, span, div, h4": { cursor: "pointer" },
                      }}
                      style={{ padding: 0 }}
                      className={classes.logOutButton}
                      onClick={() => {
                        handleClickOpenDialogCompany();
                        setOpenModalConfig(true);
                      }}
                    >
                      <BusinessIcon />
                      <ListItemText
                        style={{ color: "#ffff", cursor: "pointer" }}
                      >
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
                <div>
                  <Grid
                    container
                    spacing={2}
                    xs={12}
                    md={12}
                    style={{ justifyContent: "space-evenly" }}
                  >
                    <ListItem
                      style={{ padding: 0 }}
                      className={classes.logOutButton}
                      onClick={() => setOpenModalMessage(true)}
                    >
                      <Grid item sx={{ margin: "20px 0 10px 27px" }}>
                        <Badge
                          // classes={{ badge: classes.customBadge }}
                          // className={classes.padding}
                          sx={{
                            "& svg, path": { cursor: "pointer" },
                            "& span": {
                              backgroundColor: theme.palette.primary.light,
                              margin: "-2px",
                            },
                          }}
                          badgeContent={1}
                          max={99}
                        >
                          <NotificationsIcon />
                        </Badge>
                      </Grid>
                    </ListItem>
                  </Grid>
                  <br />
                </div>
              </>
            )}
          </UserContent>
          <List>
            {itemsMenu.map((item: any, index: any) => (
              <>
                {item.modal ? (
                  <ListItem
                    className={classes.logOutButton}
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
                        backgroundColor: `${theme.palette.secondary.dark}`,
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
                        <Typography variant="body1" sx={{ cursor: "pointer" }}>
                          {item.title}
                        </Typography>
                      }
                      style={{ color: "#ffff", cursor: "pointer" }}
                    />
                  </ListItem>
                ) : (
                  <ListItem
                    className={classes.logOutButton}
                    key={index}
                    onClick={() => {
                      history.push(item.route);
                      dispatch(changeMenuSelected(item.title));
                    }}
                    sx={{
                      backgroundColor: `${
                        layoutState.data.menuSelected === item.title
                          ? `${theme.palette.primary.dark}`
                          : ""
                      }`,
                      "&:hover": {
                        transition: "ease-in-out 200ms",
                        backgroundColor: `${theme.palette.secondary.dark}`,
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
                        <Typography variant="body1" sx={{ cursor: "pointer" }}>
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
            <Button
              onClick={handleCloseModalLogout}
              variant="outlined"
              color="secondary"
              autoFocus
            >
              Não
            </Button>
            <Button onClick={handleLogout} variant="outlined" color="secondary">
              Sim
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
      </ThemeProvider>
      <main className={classes.content}>{props.children}</main>

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
    </div>
  );
};

export default React.memo(Sibebar);
