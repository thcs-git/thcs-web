import React, { useState, Props, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { useHistory } from "react-router-dom";

/**
 * Icons
 */
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BusinessIcon from '@material-ui/icons/Business';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import GavelIcon from '@material-ui/icons/Gavel';
import ExtensionIcon from '@material-ui/icons/Extension';
import PersonIcon from '@material-ui/icons/Person';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import { Link } from 'react-router-dom';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { AccordionMenu } from './styles';
import LOCALSTORAGE from '../../helpers/constants/localStorage';


const drawerWidth = 220;

const itemsMenu = [
  { title: 'Dashboard', route: '/', icon: <DashboardIcon style={{ color: '#fff' }} /> },
  { title: 'Clientes', route: '/customer', icon: <AssignmentIndIcon style={{ color: '#fff' }} /> },
  { title: 'Empresas', route: '/company', icon: <BusinessIcon style={{ color: '#fff' }} /> },
  { title: 'Especialidade', route: '/specialty', icon: <FolderSpecialIcon style={{ color: '#fff' }} /> },
  { title: 'Conselhos', route: '/council', icon: <GavelIcon style={{ color: '#fff' }} /> },
  { title: 'Área', route: '/area', icon: <ExtensionIcon style={{ color: '#fff' }} /> },
  { title: 'Usuários', route: '/user', icon: <PersonIcon style={{ color: '#fff' }} /> },
  { title: 'Pacientes', route: '/patient', icon: <GroupAddIcon style={{ color: '#fff' }} /> },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      background: '#0899BA',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      background: '#0899BA',
      color: '#fff',
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
      background: '#0899BA',
      color: '#fff',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);
console.log(localStorage.getItem(LOCALSTORAGE.TOGGLE_SIDEBAR));


export default function Sibebar(props: Props<any>) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState<Boolean>(() => {
    let toggleSidebar = localStorage.getItem(LOCALSTORAGE.TOGGLE_SIDEBAR) || 'false';
    return JSON.parse(toggleSidebar)
  });

  const AccordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log('entrou')
    // if (!open) AccordionRef.current?.removeAttribute('expanded')
    // else AccordionRef.current?.setAttribute('expanded', 'true');
  }, [open]);

  const handleDrawerClose = useCallback(() => {
    setOpen(prev => {
      localStorage.setItem(LOCALSTORAGE.TOGGLE_SIDEBAR, JSON.stringify(!prev));
      return !prev
    });
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
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
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon style={{ color: '#fff' }} /> : <MenuIcon style={{ color: '#fff' }} />}
          </IconButton>
        </div>
        {/* <Divider /> */}
        <List disablePadding={true}>
          {itemsMenu.map((item, index) => (
            <ListItem key={index} component="button" button onClick={() => history.push(item.route)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
          {/* <AccordionMenu
            ref={AccordionRef}
            // onClick={openDropDownAndMenu}
            // {...(!open ? { expanded: true } : {})}
            expanded={false}
          >
            <AccordionSummary
              expandIcon={open && <ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography display="block"><SupervisorAccountIcon />{open && 'Administrador'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </AccordionMenu> */}
        </List>
        {/* <Divider /> */}
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  );
}

