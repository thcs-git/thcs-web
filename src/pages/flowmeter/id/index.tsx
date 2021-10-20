import React, {useState, useEffect, useRef, useCallback, ChangeEvent} from 'react';
import {useHistory, Link, RouteComponentProps} from 'react-router-dom';

import debounce from 'lodash.debounce';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../../../store/';
import {loadRequest, searchRequest, cleanAction} from '../../../store/ducks/companies/actions';
import {CompanyInterface, IProfession} from '../../../store/ducks/companies/types';

import {Container, Menu, MenuItem, TableRow, TableCell} from '@material-ui/core';
import {SearchOutlined, MoreVert} from '@material-ui/icons';

import PaginationComponent from '../../../components/Pagination';
import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import Table from '../../../components/Table';

import {FormTitle} from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';

import {formatDate} from '../../../helpers/date';

import {ButtonsContent, ListItemStatus} from './styles';
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

import On from '../../../assets/img/On.png'
import Off from '../../../assets/img/Off.png'

interface IPageParams {
  id?: string,
  mode?: string;
}

export interface FlowMeterInterface {
  _id?: string;
  mac?: string;
  date?: string;
}

import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    // display: 'contents',
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'var(--primary)',
  },
  status: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    color: 'var(--white)',
    background: 'var(--primary)',
  },
  header: {
    "& div": {
      display: 'flex',
      justifyContent: 'center',
    }
  },
}));

import {Connector, useSubscription} from 'mqtt-react-hooks';

import mqtt from "mqtt";
import {client} from "../../../helpers/mqtt";

const websocketUrl = "wss://idncmatm:OqfzZYeGyMls@driver.cloudmqtt.com:38621/mqtt";
// const apiEndpoint = "<API-ENDPOINT>/";

import LOCALSTORAGE from '../../../helpers/constants/localStorage';

export default function FlowMeterId(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();

  const {message, connectionStatus} = useSubscription('o2');
  const [messages, setMessages] = useState<any>({
    value: localStorage.getItem(LOCALSTORAGE.MQTT)
  });

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    client.on("connect", function () {
      client.subscribe("o2", function (err) {
        if (!err) {
        }
        // console.log("conectado");
      });
    });

    client.on("message", function (topic, payload) {
      // message is Buffer
      let valor = payload.toString();
      // console.log('dassd', valor)
      setMessages({
        value: valor,
      });
      localStorage.setItem(LOCALSTORAGE.MQTT, valor);
    });
  }, []);


  // useEffect(() => {
  //   console.log('asd', messages)
  // },[messages])

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const flowMeterState = {device: '123456798', mac: 'sadasd:dasdas:adasD:ASd', date: '20/10/2021'}


  return (
    <>
      <Sidebar>
        <Container>
          <FormTitle>Fluxômetro</FormTitle>
          <Card className={classes.root}>
            <CardHeader className={classes.header}
                        avatar={
                          <Avatar aria-label="recipe" className={classes.avatar}>
                            F
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <Button className={classes.button}
                                    onClick={() => history.push(`/logs/${flowMeterState.device}`)}>
                              Logs
                            </Button>
                          </IconButton>
                        }
                        title="123456789"
              // subheader="Outubro 20, 2021"
            />
            <CardMedia
              className={classes.media}
              image={messages?.value === 'Ativo' ? On : Off}
              title="Fluxômetro"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.status}>
                {messages?.value ? messages?.value : 'Indisponível'}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Sidebar>
    </>
  );
}
