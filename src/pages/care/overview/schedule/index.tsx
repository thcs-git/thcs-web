import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RouteComponentProps, useHistory} from 'react-router-dom';
import {Help as HelpIcon} from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Card,
  CardContent,
  TextField,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  DialogActions,
  Button,
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Tabs,
  Tab,
  Paper,
  AppBar,
  FormControl,
  FormLabel,
  Popover
} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import {
  AccountCircle,
  SupervisorAccountRounded,
  ReportProblemOutlined,
  Event as EventIcon,
  Cached as RefreshIcon,
  Schedule as ScheduleIcon,
  CommentRounded as CommentRoundedIcon,
  AccountBox as AccountBoxIcon,
  SwapHoriz as SwapHorizIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WarningRounded as WarningRoundedIcon
} from '@material-ui/icons';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';

import FullCalendar, {EventClickArg, EventApi, EventInput, EventAddArg} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

import SearchComponent from '../../../../components/List/Search';
import {ApplicationState} from '../../../../store';
import {
  loadCareById,
  loadScheduleRequest,
  createScheduleRequest as storeScheduleAction,
  deleteScheduleRequest as deleteScheduleAction,
  updateScheduleRequest as updateScheduleAction
} from '../../../../store/ducks/cares/actions';
import {ScheduleInterface} from '../../../../store/ducks/cares/types';
import {
  searchRequest as searchUserAction,
  loadProfessionsRequest as getProfessionsAction
} from '../../../../store/ducks/users/actions';
import {ProfessionUserInterface} from '../../../../store/ducks/users/types';

import {formatDate, translate as translateDateHelper, getDayOfTheWeekName} from "../../../../helpers/date";
import {exchangeTypes as exchageTypesHelper} from '../../../../helpers/schedule';

import {ReactComponent as IconProfile} from '../../../../assets/img/icon-profile.svg';
import {ReactComponent as IconPermuta} from '../../../../assets/img/icon-permuta.svg';
import {ReactComponent as IconNoturno} from '../../../../assets/img/icon-noturno.svg';
import {ReactComponent as IconDiurno} from '../../../../assets/img/icon-diurno.svg';
import {ReactComponent as IconPlantao} from '../../../../assets/img/icon-plantao.svg';
import {ReactComponent as IconPlantaoTransparent} from '../../../../assets/img/icon-plantao-transparent.svg';
import {ReactComponent as IconEquipe} from '../../../../assets/img/icon-equipe-medica.svg';

import Sidebar from '../../../../components/Sidebar';
import Loading from '../../../../components/Loading';

import {FieldContent, FormTitle, RadioComponent as Radio} from '../../../../styles/components/Form';
import {TextCenter} from '../../../../styles/components/Text';
import ButtonComponent from '../../../../styles/components/Button';
import {ComplexityStatus} from '../../../../styles/components/Table';
import DatePicker from '../../../../styles/components/DatePicker';

import {
  ScheduleItem,
  CardTitle,
  CalendarContent,
  ScheduleEventStatus,
  HeaderContent,
  BottomContent,
  ResumeList,
  TabsMenuWrapper,
  ContainerSearch,
  CardPlantonistas
} from './styles';
import _ from 'lodash';

interface IDay {
  allDay: boolean;
  end: Date | null;
  endStr: string;
  jsEvent: any;
  start: Date | null;
  startStr: string;
  view: any;
}

interface IPageParams {
  id?: string;
}

interface ISchedule extends ScheduleInterface {
  day?: string | Date | null;
  profession_id?: string;
  duration?: string;
  data?: any;
  start_plantao?: string;
  end_plantao?: string;
  start_hour_plantao?: string;
  end_hour_plantao?: string;
  duty_day?: any;
  professional_type?: string;
}

interface ITabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: number | string;
}

export default function SchedulePage(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const careState = useSelector((state: ApplicationState) => state.cares);
  const userState = useSelector((state: ApplicationState) => state.users);
  const companyState = useSelector((state: ApplicationState) => state.companies);

  const {params} = props.match;

  let eventGuid = 0
  let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

  const [searchInputName, setSearchInputName] = useState('');
  const [currentTabValue, setCurrentTabValue] = React.useState(0);
  const [professionalTypeValue, setProfessionalTypeValue] = React.useState<string>('diarista');
  const [workInDaysValue, setWorkInDaysValue] = React.useState(0);
  const [anchorHelpPopover, setHelpPopover] = React.useState<HTMLButtonElement | null>(null);
  const [professionalChecks, setProfessionalChecks] = React.useState<string[]>([]);
  const openHelpPopover = Boolean(anchorHelpPopover);

  const [checkDiarista, setCheckDiarista] = useState(false);
  const [checkPlantonista, setCheckPlantonista] = useState(false);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>();
  const [dayOptionsModalOpen, setDayOptionsModalOpen] = useState(false);
  const [removeEventsModalOpen, setRemoveEventsModalOpen] = useState(false);
  const [professionScheduled, setProfessionScheduled] = useState<ProfessionUserInterface[] | undefined>([]);
  const [daySelected, setDaySelected] = useState<IDay>({
    allDay: true,
    end: null,
    endStr: '',
    jsEvent: {},
    start: null,
    startStr: '',
    view: {},
  });
  const [schedule, setSchedule] = useState<ISchedule>({
    day: '',
    user_id: '',
    profession_id: '',
    duration: '',
    data: '',
    type: '',
    start_plantao: '',
    end_plantao: '',
    start_hour_plantao: '',
    end_hour_plantao: '',
    professional_type: '',
    end_at: '',
    days_interval_repeat: 0,
    repeat_stop_at: '',
    exchange: {
      type: '',
      exchanged_to: null,
      description: '',
      created_at: '',
      vacation_end: ''
    },
    description: '',
  });
  const [events, setEvents] = useState<any[]>([]);
  const [eventSelected, setEventSelected] = useState<EventClickArg>();
  const [team, setTeam] = useState<any[]>([]);
  const [repeatOptions, setRepeatOptions] = useState([
    {title: 'Diariamente', interval: 1},
    {title: 'A cada 2 dias', interval: 2},
    {title: 'A cada 3 dias', interval: 3},
    {title: 'A cada 4 dias', interval: 4},
    {title: 'A cada 5 dias', interval: 5},
    {title: 'A cada 6 dias', interval: 6},
    {title: 'Semanalmente', interval: 7},
    {title: 'Quinzenalmente', interval: 15},
    {title: 'Mensalmente', interval: 30},
  ]);
  const [removeType, setRemoveType] = useState<string>('');
  const [exchangeType, setExchangeType] = useState<string>('');
  const [canEdit, setCanEdit] = useState<boolean>(true);
  const [canExchange, setCanExchange] = useState<boolean>(false);

  useEffect(() => {
    setSchedule({
      day: '',
      user_id: '',
      profession_id: '',
      duration: '',
      data: '',
      type: '',
      start_at: '',
      start_plantao: '',
      end_plantao: '',
      start_hour_plantao: '',
      end_hour_plantao: '',
      end_at: '',
      duty_day: 0,
      professional_type: '',
      days_interval_repeat: 0,
      repeat_stop_at: '',
      exchange: {
        type: '',
        description: '',
        created_at: '',
        vacation_end: ''
      },
      description: '',
    });
    setEvents([]);
  }, [])

  useEffect(() => {
    if (params.id) {
      dispatch(loadCareById(params.id));
    }

    dispatch(searchUserAction({}));
    dispatch(getProfessionsAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadScheduleRequest({attendance_id: params.id}))
  }, [careState.data._id]);

  useEffect(() => {
    // if (careState.schedule?.length) {
    translateSchedule();
    handleTeam();
    // }

    // getAllProfessinalFilter();
  }, [careState.schedule, userState.data]);

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events)
  }

  const handleDateSelect = (date: IDay) => {
    setCanEdit(true);
    setDayOptionsModalOpen(true);
    setDaySelected(date);
    setCanExchange(false);
    setExchangeType('');

    setSchedule({
      day: date.start,
      start_plantao: formatDate(date.start, 'YYYY-MM-DD'),
      user_id: '',
      profession_id: '',
      duration: '',
      data: '',
      type: '',
      start_at: '',
      end_at: '',
      days_interval_repeat: 0,
      repeat_stop_at: '',
      exchange: {
        type: '',
        description: '',
        created_at: '',
        vacation_end: ''
      },
      description: '',
    });
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    setEventSelected(clickInfo);
    setCanExchange(false);
    setExchangeType('');

    const {event} = clickInfo;

    setSchedule({
      day: event.start,
      start_at: formatDate(event.startStr, 'HH:mm'),
      end_at: formatDate(event.endStr, 'HH:mm'),
      user_id: event.extendedProps.user_id,
      days_interval_repeat: event.extendedProps.days_interval_repeat || 0,
      duration: '',
      description: event.extendedProps.description,
      exchange: event.extendedProps.exchange,
      data: event.extendedProps
    });

    // setDaySelected(event.start || '');
    setDayOptionsModalOpen(true);
    setCanEdit(false);
    setCanExchange(!event.extendedProps.exchange);

    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
  }

  const savePlantaoEvent = useCallback(() => {
    // console.log('agora sim');

    // professionalTypeValue
    // schedule?.start_at && schedule?.end_at
    // selectProfession()
    // selectUser()
    // workInDaysValue

    const startDateAt = dayjs(`${schedule.start_plantao} ${schedule.start_hour_plantao}`).format();
    const endDateAt = dayjs(`${schedule.end_plantao} ${schedule.end_hour_plantao}`).format();

    console.log({
      professionalTypeValue,
      startDateAt,
      endDateAt,
      'selectProfession': selectProfession(),
      'selectUser': selectUser(),
      workInDaysValue
    });
  }, [professionalTypeValue, schedule, userState, workInDaysValue]);

  const handleAddEvent = useCallback((event: any) => {
    // if (schedule.day && schedule?.start_at && schedule?.end_at) {
    let startAt: string;
    let endAt: string;

    schedule.duty_day = (schedule.duty_day === 0) ? 'par' : 'impar';
    schedule.professional_type = professionalTypeValue;
    schedule.type = currentTabValue === 0 ? 'assistencia' : 'plantao';

    if (currentTabValue === 0 && schedule.day) {
      const [hourOfStart, minuteOfStart] = schedule.start_at ? schedule.start_at.split(':') : [0, 0]
      const [hourOfEnd, minuteOfEnd] = schedule.end_at ? schedule.end_at.split(':') : [0, 0]

      if (Number(hourOfStart) > Number(hourOfEnd)) {
        let endDate = new Date(schedule.day)
        endDate.setDate(endDate.getDate() + 1)

        startAt = dayjs(`${formatDate(schedule.day, 'YYYY-MM-DD')} ${schedule.start_at}`).format();
        endAt = dayjs(`${formatDate(endDate, 'YYYY-MM-DD')} ${schedule.end_at}`).format();
      } else {
        startAt = dayjs(`${formatDate(schedule.day, 'YYYY-MM-DD')} ${schedule.start_at}`).format();
        endAt = dayjs(`${formatDate(schedule.day, 'YYYY-MM-DD')} ${schedule.end_at}`).format();
      }
    } else {
      const [hourOfStart, minuteOfStart] = schedule.start_hour_plantao ? schedule.start_hour_plantao.split(':') : [0, 0]
      const [hourOfEnd, minuteOfEnd] = schedule.end_hour_plantao ? schedule.end_hour_plantao.split(':') : [0, 0]

      const day = schedule.start_plantao ? schedule.start_plantao : '0000-00-00'
      let endDate = new Date(day)

      if (Number(hourOfStart) > Number(hourOfEnd)) {
        endDate.setDate(endDate.getDate() + 2)
      } else {
        endDate.setDate(endDate.getDate() + 1)
      }

      if (professionalTypeValue === 'plantonista') {
        schedule.days_interval_repeat = 2
      } else {
        schedule.days_interval_repeat = 1
      }
      startAt = dayjs(`${formatDate(schedule.start_plantao, 'YYYY-MM-DD')} ${schedule.start_hour_plantao}`).format()
      endAt = dayjs(`${formatDate(endDate, 'YYYY-MM-DD')} ${schedule.end_hour_plantao}`).format()
      schedule.start_at = schedule.start_hour_plantao
      schedule.end_at = schedule.end_hour_plantao
    }

    if (schedule?.data?._id) {
      console.log(schedule.day);

      setDayOptionsModalOpen(false);

      const {data, ...scheduleData} = schedule;
      const eventCopy = [...events];

      eventCopy.forEach((item, key) => {
        if (item?.extendedProps?._id === data._id) {
          eventCopy[key] = {
            ...eventCopy[key],
            title: selectUser()?.name,
            start: startAt,
            end: endAt,
          };
          console.log(eventCopy[key]);
        }
      });

      setEvents(eventCopy);
      console.log('testando,', events);
      setSchedule(prevState => ({
        ...prevState,
        _id: data._id,
        attendance_id: params.id,
        start_at: startAt,
        end_at: endAt,
      }));

      console.log(schedule);
      dispatch(updateScheduleAction({
        ...schedule,
        _id: data._id,
        attendance_id: params.id,
        start_at: startAt,
        end_at: endAt,
      }));

    } else {
      const newEvent: EventInput = {
        id: createEventId(),
        title: selectUser()?.name,
        // start: todayStr,
        start: startAt,
        end: endAt,
        backgroundColor: '#0899BA',
        textColor: '#ffffff',
      };

      // A label fica com background azul quando o evento é do dia todo, ou seja, não tem hora de inicio ou fim, apenas a data '2021-02-22'
      console.log('newEvent', newEvent)

      setEvents((prevState: any) => ([...prevState, newEvent]));

      dispatch(storeScheduleAction({
        ...schedule,
        attendance_id: params.id,
        start_at: startAt,
        end_at: endAt,
      }));
    }

    setDayOptionsModalOpen(false);

    setTimeout(() => {
      dispatch(loadScheduleRequest({attendance_id: params.id}))
    }, 2000);
    // }
  }, [schedule, events]);

  const handleRemoveEvent = useCallback(() => {
    eventSelected?.event.remove();

    if (schedule.data._id) {
      dispatch(deleteScheduleAction(schedule.data._id, removeType));

      setTimeout(() => {
        dispatch(loadScheduleRequest({attendance_id: params.id}))
      }, 2000);

      setDayOptionsModalOpen(false);
      setRemoveEventsModalOpen(false);
    }
  }, [schedule, removeType]);

  const handleTeam = useCallback(() => {
    const teamUsers: any = [];

    try {
      careState.schedule?.forEach(item => {
        if (teamUsers.length === 0) {
          teamUsers.push(item.user_id);
        } else {
          const founded = teamUsers.findIndex((user: any) => {
            if (typeof item.user_id === 'object') {
              return user._id === item.user_id._id
            }
          });

          if (founded < 0) {
            teamUsers.push(item.user_id);
          }
        }
      });
    } catch (error) {

    }

    setTeam(teamUsers);

  }, [careState.schedule]);

  const renderEventStatus = (event: any) => {
    const today = dayjs();
    const eventDate = dayjs(event.start);
    const diffDate = eventDate.diff(today, 'm');
    const {extendedProps: eventData} = event;

    if (!_.isEmpty(eventData.exchange)) {
      if (diffDate < 0 && (!eventData.checkin || eventData.checkin.length === 0)) {
        return <IconPermuta className="late"/>
      } else if (eventData?.checkin?.length > 0) {

        const checkins = eventData.checkin.sort().reverse();

        const {start_at: checkIn, end_at: checkOut} = checkins[0];

        if (checkIn && !checkOut) {
          return <IconPermuta className="visiting"/>
        } else if (checkIn && checkOut) {
          return <IconPermuta className="complete"/>
        } else {
          return <IconPermuta className="future"/>
        }

      } else {
        return <IconPermuta className="future"/>
      }
    } else {
      if (eventData.type === 'plantao' && eventData.professional_type === 'plantonista') {
        if (diffDate < 0 && (!eventData.checkin || eventData.checkin.length === 0)) {
          return <IconPlantaoTransparent className="late"/>
        } else if (eventData?.checkin?.length > 0) {

          const checkins = eventData.checkin.sort().reverse();

          const {start_at: checkIn, end_at: checkOut} = checkins[0];

          if (checkIn && !checkOut) {
            return <IconPlantaoTransparent className="visiting"/>
          } else if (checkIn && checkOut) {
            return <IconPlantaoTransparent className="complete"/>
          } else {
            return <IconPlantaoTransparent className="future"/>
          }

        } else {
          return <IconPlantaoTransparent className="future"/>
        }
      } else {
        if (diffDate < 0 && (!eventData.checkin || eventData.checkin.length === 0)) {
          return <ScheduleEventStatus color="late"/>
        } else if (eventData?.checkin?.length > 0) {

          const checkins = eventData.checkin.sort().reverse();

          const {start_at: checkIn, end_at: checkOut} = checkins[0];

          if (checkIn && !checkOut) {
            return <ScheduleEventStatus color="visiting" className="pulse"/>
          } else if (checkIn && checkOut) {
            return <ScheduleEventStatus color="complete"/>
          } else {
            return <ScheduleEventStatus color="future"/>
          }

        } else {
          return <ScheduleEventStatus color="future"/>
        }
      }
    }
  };

  const renderOnlyPlantonistas = useCallback(() => {
    let uniqPlanotinista: any = [];
    const {schedule} = careState;

    try {
      schedule?.forEach(plantonista => {
        if (plantonista.type === 'plantao' && plantonista.professional_type === 'plantonista' && (typeof plantonista.user_id === 'object')) {
          let hasPlantonista = uniqPlanotinista.some((uniq: any) => (typeof plantonista.user_id === 'object') && uniq.user_id.name === plantonista.user_id.name)

          if (!hasPlantonista) uniqPlanotinista.push(plantonista)
        }
      })
    } catch (error) {

    }

    return (
      <>
        {uniqPlanotinista.length > 1 ? (
          <>
            <Grid container spacing={2}>
              {uniqPlanotinista.map((planto: any) => (
                <>
                  <Grid container item xs={"auto"} spacing={1}>
                    <Grid item xs={1}>
                      {dayjs(planto.start_at).hour() >= 6 && dayjs(planto.end_at).hour() <= 21 ? (
                        <>
                          <IconDiurno className="diurno-icon"/>
                        </>
                      ) : (
                        <>
                          <IconNoturno className="noturno-icon"/>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={10}>
                      <p>{planto.user_id.name}, {dayjs(planto.start_at).hour() >= 6 && dayjs(planto.end_at).hour() <= 21 ?
                        <b>diurno</b> : <b>noturno</b>}</p>
                    </Grid>
                  </Grid>
                </>
              ))}
            </Grid>
          </>
        ) : (
          <p style={{textAlign: 'center'}}>Nenhum plantonista foi adicionado</p>
        )}
      </>
    );
  }, [careState.schedule]);

  const renderComplexityList = useCallback(() => {
    const complexity = companyState.data.settings?.complexity?.find(item => item.title === (careState.data?.complexity || careState.data?.capture?.complexity || 'Sem Complexidade'));

    return (complexity?.recommendation.length) ? complexity?.recommendation.map((recommendation, key) => (
      <p
        key={`recommendation_${key}`}>{`${recommendation.amount} ${(typeof recommendation.profession_id === 'object' ? recommendation.profession_id.name : '')}, ${recommendation.interval}x por ${translateDateHelper[recommendation.frequency].toLowerCase()}`}</p>
    )) : (
      <TextCenter>
        Nenhuma periodicidade encontrada para essa complexidade
      </TextCenter>
    );
  }, [careState]);

  const renderEventContent = (eventInfo: any) => (
    <ScheduleItem>
      {renderEventStatus(eventInfo.event)}
      <div className="scheduleText">
        <i>{eventInfo.event.title}</i>
      </div>
    </ScheduleItem>
  );

  // const getAllProfessinalFilter = useCallback(() => {
  useEffect(() => {
    const {professions} = userState?.data;

    const allProfessionalScheduled = professions?.filter(profession => {
      const filtered = events.filter(schedule => {
        if (typeof schedule.user_id === 'object') {
          if (profession._id === schedule.user_id.profession_id) {
            return profession.name;
          }
        }
      }).length;

      // @ts-ignore: Unreachable code error
      if (filtered > 0) return profession;
    });

    setProfessionScheduled(allProfessionalScheduled)
  }, [dispatch, userState.data, events]);

  const translateSchedule = useCallback(() => {
    const schedules = careState.schedule;
    let scheduleArray: EventInput[] = [];

    try {
      if (schedules) {

        schedules.forEach(item => {
          let title = '';

          if (typeof item?.exchange?.exchanged_to === 'object' && item?.exchange?.exchanged_to) {
            title = item?.exchange?.exchanged_to.name;
          } else if (typeof item.user_id === 'object') {
            title = item.user_id.name;
          }

          scheduleArray.push({
            id: createEventId(),
            title,
            start: item.start_at,
            end: item.end_at,
            backgroundColor: '#0899BA',
            textColor: '#ffffff',
            extendedProps: item,
            user_id: item.user_id
          });
        });
      }
    } catch (error) {

    }

    setEvents(scheduleArray);

  }, [careState.schedule]);

  // Prestadores
  const handleSelectProfession = useCallback((value: ProfessionUserInterface) => {
    setSchedule((prevState: ISchedule) => ({
      ...prevState,
      profession_id: value._id
    }));

    dispatch(searchUserAction({profession_id: value._id}));
  }, [schedule]);

  const selectProfession = useCallback(() => {
    if (!userState.data.professions) {
      return null;
    }

    const selected = userState.data.professions.filter(item => item._id === schedule.profession_id);

    return (selected[0]) ? selected[0] : null;
  }, [schedule, userState.data.professions]);

  const selectUser = useCallback(() => {
    const selected = userState.list.data.filter((item) => {
      if (schedule?.exchange?.exchanged_to) {
        return (typeof schedule?.exchange?.exchanged_to === 'object') ? (item._id === schedule?.exchange?.exchanged_to._id) : (item._id === schedule?.exchange?.exchanged_to);
      } else {
        return (typeof schedule.user_id === 'object') ? (item._id === schedule.user_id._id) : (item._id === schedule.user_id)
      }
    });

    return selected[0] ? selected[0] : null;
  }, [schedule.user_id]);

  const selectExchangeUser = useCallback(() => {
    const selected = userState.list.data.filter((item) => (typeof schedule.user_id === 'object') ? (item._id === schedule?.exchange?.exchanged_to) : (item._id === schedule?.exchange?.exchanged_to));
    return selected[0] ? selected[0] : null;
  }, [schedule?.exchange]);

  const selectRepeatInterval = useCallback(() => {
    const selected = repeatOptions.filter((item) => item.interval === schedule.days_interval_repeat);
    return selected[0] ? selected[0] : null;
  }, [schedule]);

  function createEventId() {
    return String(eventGuid++)
  }

  const getRepeatLabel = useCallback((interval?: number) => {
    if (interval) {
      const optionSelected = repeatOptions.find(option => option.interval === interval);

      return optionSelected?.title.toLocaleLowerCase();
    } else {
      return interval;
    }

  }, [schedule]);

  const TabPanel = useCallback((props: ITabPanelProps) => {
    const {children, value, index, ...other} = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`calendar-tabpanel-${index}`}
        aria-labelledby={`calendar-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    );
  }, []);

  const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTabValue(newValue);
  }, [currentTabValue]);

  const handleWorkDaysValues = useCallback((event: React.ChangeEvent<{}>, newValue: number) => {
    setSchedule(prevState => ({
      ...prevState,
      duty_day: newValue,
    }));
  }, [schedule]);

  const a11yProps = useCallback((index) => {
    return {
      id: `calendar-tab-${index}`,
      'aria-controls': `calendar-tabpanel-${index}`,
    };
  }, []);

  const handleProfessionalChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setProfessionalTypeValue(event.target.value);
  }, [professionalTypeValue]);

  const handleClickHelpPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setHelpPopover(event.currentTarget);
  }, [anchorHelpPopover]);

  const handleCloseHelpPopover = useCallback(() => {
    setHelpPopover(null);
  }, []);

  const handleProfessionalCheck = useCallback((professionalID, event) => {
    const hasProfessionalID = professionalChecks.some(prof => prof === professionalID);

    if (hasProfessionalID) {
      setProfessionalChecks(professionalChecks.filter(prof => prof !== professionalID))
    } else {
      setProfessionalChecks(prev => ([
        ...prev,
        professionalID
      ]))
    }
    const checked = event.target.checked;

    dispatch(loadScheduleRequest({
      attendance_id: params.id,
      profession_id: checked ? professionalID : null,
      user_name: searchInputName
    }));
  }, [professionalChecks, searchInputName]);

  const handleCheckPlantonista = useCallback((event: any) => {
    setCheckPlantonista(prev => !prev);

    const checked = event.target.checked;

    dispatch(loadScheduleRequest({
      attendance_id: params.id,
      professional_type: checked ? event.target.name : null,
      user_name: searchInputName
    }));

  }, [checkPlantonista, searchInputName]);

  const handleCheckDiarista = useCallback((event: any) => {
    setCheckDiarista(prev => !prev);

    const checked = event.target.checked;

    dispatch(loadScheduleRequest({
      attendance_id: params.id,
      professional_type: checked ? event.target.name : null,
      user_name: searchInputName
    }));
  }, [checkDiarista, searchInputName]);

  const handleInputSearch = useCallback((event: any) => {
    setSearchInputName(event.target.value)

    dispatch(loadScheduleRequest({attendance_id: params.id, user_name: event.target.value}));
  }, []);

  const debounceSearchRequest = debounce(handleInputSearch, 900);

  const handleClickButton = useCallback(() => {
    // dispatch(setIfRegistrationCompleted(false))
    // history.push('/patient/create/')
  }, [])
  return (
    <>
      <Sidebar>
        {careState.loading && <Loading/>}

        <HeaderContent>
          <FormTitle>Agenda do Paciente</FormTitle>
          <div>
            <ButtonComponent onClick={() => {
              setSchedule({
                day: '',
                start_at: '',
                end_at: '',
                user_id: '',
                days_interval_repeat: 0,
                repeat_stop_at: '',
                type: '',
                exchange: {
                  type: '',
                  description: '',
                  created_at: '',
                  vacation_end: ''
                },
                duration: '',
                description: '',
              });
              setDayOptionsModalOpen(true);
              setCanEdit(true);
            }} background="success">
              Novo compromisso
            </ButtonComponent>
          </div>
        </HeaderContent>

        <Grid container>
          <Grid item md={3}>
            <div style={{paddingRight: 30}}>
              <Card style={{marginBottom: 20, color: 'white'}}>
                <div style={{background: '#16679A', height: '5px'}}/>
                <CardContent style={{background: '#0899BA', fontSize: 10}}>
                  <Grid container spacing={2}>
                    <CardTitle>
                      <Grid container item xs={"auto"} spacing={1}
                            style={{alignItems: 'center', marginTop: 10, marginLeft: 7}}>
                        <Grid item xs={2}>
                          <IconProfile className="profile-icon"/>
                        </Grid>
                        <Grid item xs={10}>
                          <h4 style={{
                            color: 'white',
                            fontSize: 14,
                            fontWeight: "bolder"
                          }}>{careState.data?.patient_id?.name}</h4>
                        </Grid>
                      </Grid>
                    </CardTitle>
                  </Grid>
                  <h4 style={{color: 'white', fontSize: 12, paddingTop: 5, fontWeight: "normal"}}>
                    Nº atendimento: {careState.data?._id}
                  </h4>
                  <h4 style={{color: 'white', fontSize: 12, paddingTop: 5, fontWeight: "normal"}}>
                    Data: {formatDate(careState.data?.created_at, 'DD/MM/YYYY [às] HH:mm:ss')}
                  </h4>
                  <h4 style={{color: 'white', fontSize: 13, paddingTop: 5, fontWeight: "bolder"}}>
                    {careState.data?.capture?.complexity}
                  </h4>
                </CardContent>
              </Card>

              <div style={{margin: '10px 0'}}>
                <p><strong>Filtrar por profissional:</strong></p>
                <FormControl component="fieldset">
                  <FormGroup>
                    {professionScheduled?.map(profession => (
                      <FormControlLabel
                        control={<Checkbox color="primary"
                                           checked={professionalChecks.some(prof => prof === profession._id)}
                                           onClick={((event: any) => handleProfessionalCheck(profession._id, event))}
                                           name={profession.name}/>}
                        label={profession.name}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </div>

              <div style={{margin: '10px 0'}}>
                <p><strong>Filtro por categoria:</strong></p>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox color="primary" checked={checkPlantonista} onChange={handleCheckPlantonista}
                                         name="plantonista"/>}
                      label="Plantonista"
                    />
                    <FormControlLabel
                      control={<Checkbox color="primary" checked={checkDiarista} onChange={handleCheckDiarista}
                                         name="diarista"/>}
                      label="Diarista"
                    />
                  </FormGroup>
                </FormControl>
              </div>
              <div style={{margin: '10px 0'}}>
                <p><strong>Filtrar por nome:</strong></p>
              </div>
              <ContainerSearch>
                <SearchComponent
                  handleButton={handleClickButton}
                  inputPlaceholder="Nome do profissional"
                  // buttonTitle="Novo"
                  onChangeInput={debounceSearchRequest}
                />
              </ContainerSearch>
              <div>
                <p><strong>Legendas:</strong></p>

                <List>
                  <ListItem key="legend_late" style={{paddingLeft: 0}}><ScheduleEventStatus
                    color="late"/> Falta</ListItem>
                  <ListItem key="legend_visiting" style={{paddingLeft: 0}}><ScheduleEventStatus color="visiting"
                                                                                                className="pulse"/> Em
                    atendimento</ListItem>
                  <ListItem key="legend_complete" style={{paddingLeft: 0}}><ScheduleEventStatus
                    color="complete"/> Atendimento concluído</ListItem>
                  <ListItem key="legend_future" style={{paddingLeft: 0}}><ScheduleEventStatus color="future"/> Próximos
                    atendimentos</ListItem>
                </List>
              </div>
            </div>
          </Grid>

          <Grid item md={9}>
            <div style={{background: '#0899BA', height: '5px'}}/>
            <Card>
              <CardContent>
                <CalendarContent>
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    locales={[ptBrLocale]}
                    headerToolbar={{
                      center: 'title',
                      left: 'dayGridMonth,timeGridWeek,timeGridDay',
                      right: 'today prev,next',
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={weekendsVisible}
                    events={events} // alternatively, use the `events` setting to fetch from a feed
                    select={handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick}
                    eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                    /* you can update a remote database when these fire:*/
                    eventAdd={event => console.log('eventAdded', event)}
                    eventChange={event => console.log('eventChanged', event)}
                    eventRemove={event => console.log('eventRemoved', event)}
                    navLinks
                  />
                </CalendarContent>
              </CardContent>
            </Card>

            <div style={{marginTop: 20}}>
              <Grid container>
                <Grid item md={4}>
                  <Card style={{marginRight: 10}}>
                    <div style={{background: '#0899BA', height: '5px'}}/>
                    <CardContent>
                      <CardTitle>
                        <IconPermuta className="permuta-icon"/>
                        <h4>Permutas</h4>
                      </CardTitle>

                      <div>
                        {events[0] == undefined ? (
                          <TextCenter>
                            Nenhuma permuta foi adicionada
                          </TextCenter>
                        ) : (
                          <>
                            {events?.map(event => (
                              <>
                                {event?.extendedProps?.exchange?.exchanged_to && (
                                  <p><b>{dayjs(event?.start).format('DD/MM')}</b> - {event?.user_id.name}
                                    <b> por</b> {event?.extendedProps?.exchange ? event?.extendedProps?.exchange?.exchanged_to?.name : 'Sem nome'}
                                  </p>
                                )}
                              </>
                            ))}
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item md={4}>
                  <Card style={{marginRight: 10}}>
                    <div style={{background: '#0899BA', height: '5px'}}/>
                    <CardContent>
                      <CardTitle>
                        <IconPlantaoTransparent className="duty-icon"/>
                        <h4>Plantonistas</h4>
                      </CardTitle>

                      {/* <TextCenter style={{ marginBottom: 20, fontWeight: 'bold' }}>
                        <ComplexityStatus status={careState.data?.complexity || careState.data?.capture?.complexity || 'Sem Complexidade'} style={{ justifyContent: 'center' }}>
                          {careState.data?.complexity || careState.data?.capture?.complexity || 'Sem Complexidade'}
                        </ComplexityStatus>
                      </TextCenter> */}

                      <CardPlantonistas>
                        {renderOnlyPlantonistas()}
                        {/* {careState.schedule &&
                          careState.schedule.map(event => event.professional_type === 'plantonista' && (typeof event.user_id === 'object') && <p>{event.user_id.name}</p>
                        )} */}

                        {/* {renderComplexityList()} */}
                      </CardPlantonistas>

                    </CardContent>
                  </Card>
                </Grid>

                <Grid item md={4}>
                  <Card style={{marginRight: 0}}>
                    <div style={{background: '#0899BA', height: '5px'}}/>
                    <CardContent>
                      <CardTitle>
                        {/*<SupervisorAccountRounded/>*/}
                        <IconEquipe className="team-icon"/>
                        <h4>Equipe Multidisciplinar</h4>

                      </CardTitle>
                      <div>

                        {team.length > 1 ? (
                          <>
                            {team.map(user => (
                              <p style={{marginBottom: 10}}><b>{user?.profession_id[0]?.name}</b> - {user?.name}</p>
                            ))}
                          </>
                        ) : (
                          <TextCenter>
                            Nenhum profissional foi adicionado
                          </TextCenter>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>

          </Grid>
        </Grid>

        <BottomContent>
          <FormTitle/>
          <div>
            <ButtonComponent onClick={() => history.push(`/care/${params.id}/overview`)}
                             background="primary">Voltar</ButtonComponent>
          </div>
        </BottomContent>

      </Sidebar>

      {/* Create and Resume Modal */}
      <Dialog
        open={dayOptionsModalOpen}
        onClose={() => setDayOptionsModalOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
        // maxWidth={canExchange ? 'md' : 'sm'}
        fullWidth
      >
        {canEdit ? (
          <>
            <DialogTitle id="scroll-dialog-title">
              <strong>
                Agendamento
                - {formatDate(schedule.day || new Date, 'DD/MM/YYYY')} ({formatDate(schedule.day || new Date, 'dddd')})
              </strong>
            </DialogTitle>

            <DialogContent>

              <p>Para iniciar o agendamento de um evento, selecione a categoria:</p>
              <br/>

              {/* <AppBar position="static" color="default"> */}
              <TabsMenuWrapper>
                <Tabs
                  value={currentTabValue}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  aria-label="disabled tabs example"
                >
                  <Tab label="Assistência" {...a11yProps(0)} />
                  <Tab label="Plantão" {...a11yProps(1)} />
                </Tabs>
              </TabsMenuWrapper>
              {/* </AppBar> */}

              <TabPanel value={currentTabValue} index={0}>
                <FieldContent>
                  <Autocomplete
                    id="combo-box-profession"
                    options={userState.data.professions || []}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Selecione a função do profissional"
                                                        variant="outlined"/>}
                    size="small"
                    // onChange={(element, value) => setSchedule(prevState => ({ ...prevState, user_id: value?._id }))}
                    noOptionsText="Nenhum resultado encontrado"
                    value={selectProfession()}
                    onChange={(event, value) => {
                      if (value) {
                        handleSelectProfession(value)
                      }
                    }}
                    fullWidth
                  />
                </FieldContent>

                <FieldContent>
                  <Autocomplete
                    id="combo-box-user"
                    options={userState.list.data}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Agora, selecione o profissional"
                                                        variant="outlined"/>}
                    size="small"
                    onChange={(element, value) => setSchedule(prevState => ({...prevState, user_id: `${value?._id}`}))}
                    value={selectUser()}
                    noOptionsText="Nenhum resultado encontrado"
                    fullWidth
                  />
                </FieldContent>

                <Grid container>
                  <Grid item md={6}>

                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                      <p>
                        Data início do evento:
                      </p>
                      <IconButton aria-describedby={'popover_help_abemid'} onClick={handleClickHelpPopover}
                                  style={{marginLeft: 10}}>
                        <HelpIcon style={{color: "#ccc"}}/>
                      </IconButton>
                      <Popover
                        id={'popover_help_abemid'}
                        open={openHelpPopover}
                        anchorEl={anchorHelpPopover}
                        onClose={handleCloseHelpPopover}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <div
                          style={{
                            paddingTop: 20,
                            paddingLeft: 30,
                            paddingBottom: 20,
                            paddingRight: 30,
                            maxWidth: 500,
                            listStylePosition: 'inside',
                            textAlign: 'justify'
                          }}>
                          <p>Para contratos temporários, defina data de início e fim do contrato. Para eventos sem
                            limitações, basta definir data de início do evento.</p>
                        </div>
                      </Popover>

                    </div>
                    <FieldContent>
                      <TextField
                        id="event-date"
                        type="date"
                        size="small"
                        label=""
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={e => setSchedule(prevState => ({...prevState, day: e.target.value}))}
                        value={formatDate(schedule.day, 'YYYY-MM-DD')}
                        fullWidth
                      />
                    </FieldContent>
                  </Grid>
                </Grid>


                <p>Defina o horário do atendimento:</p>
                <br/>

                <Grid container>
                  <Grid item md={3} style={{paddingRight: 10}}>

                    <FieldContent>

                      <TextField
                        id="start-time"
                        type="time"
                        size="small"
                        label="Início"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        onChange={e => setSchedule(prevState => ({...prevState, start_at: e.target.value}))}
                        value={schedule.start_at}
                        fullWidth
                      />

                    </FieldContent>

                  </Grid>

                  <Grid item md={3} style={{paddingLeft: 10}}>

                    <FieldContent>

                      <TextField
                        id="end-time"
                        type="time"
                        size="small"
                        label="Fim"
                        variant="outlined"
                        // defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        onChange={e => setSchedule(prevState => ({...prevState, end_at: e.target.value}))}
                        value={schedule.end_at}
                        fullWidth
                      />

                    </FieldContent>

                  </Grid>

                  <Grid item md={6}></Grid>

                  <Grid item md={6} style={{paddingRight: 10}}>
                    <FieldContent>
                      <FormGroup>
                        <p>Repetir evento?</p>
                        <br/>

                        <Autocomplete
                          id="combo-box-repeat-options"
                          options={repeatOptions}
                          getOptionLabel={(option) => option.title}
                          renderInput={(params) => <TextField {...params} label="Selecione a frequência"
                                                              variant="outlined"/>}
                          size="small"
                          onChange={(element, value) => setSchedule(prevState => ({
                            ...prevState,
                            days_interval_repeat: value?.interval
                          }))}
                          value={selectRepeatInterval()}
                          noOptionsText="Nenhum resultado encontrado"
                          fullWidth
                        />
                      </FormGroup>
                    </FieldContent>
                  </Grid>

                  {schedule?.days_interval_repeat && schedule?.days_interval_repeat > 0 ? (
                    <Grid item md={6}>
                      <FieldContent>
                        <FormGroup>
                          <p>Quando esta repetição vai acabar?</p>
                          <br/>

                          <TextField
                            id="repeat-end"
                            type="date"
                            size="small"
                            label="Fim da repetição"
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={e => setSchedule(prevState => ({...prevState, repeat_stop_at: e.target.value}))}
                            value={schedule?.repeat_stop_at}
                            fullWidth
                          />

                        </FormGroup>
                      </FieldContent>
                    </Grid>
                  ) : null}
                </Grid>

                <FieldContent>
                  <TextField
                    id="input-description"
                    variant="outlined"
                    size="small"
                    rows={6}
                    rowsMax={6}
                    label="Observações"
                    placeholder="Digite aqui alguma observação para o agendamento"
                    value={schedule.description}
                    onChange={(element) => setSchedule(prevState => ({
                      ...prevState,
                      description: element.target.value
                    }))}
                    fullWidth
                    multiline
                  />
                </FieldContent>
              </TabPanel>

              <TabPanel value={currentTabValue} index={1}>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                  <p>
                    Data de início e fim do evento:
                  </p>
                  <IconButton aria-describedby={'popover_help_abemid'} onClick={handleClickHelpPopover}
                              style={{marginLeft: 10}}>
                    <HelpIcon style={{color: "#ccc"}}/>
                  </IconButton>
                  <Popover
                    id={'popover_help_abemid'}
                    open={openHelpPopover}
                    anchorEl={anchorHelpPopover}
                    onClose={handleCloseHelpPopover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <div
                      style={{
                        paddingTop: 20,
                        paddingLeft: 30,
                        paddingBottom: 20,
                        paddingRight: 30,
                        maxWidth: 500,
                        listStylePosition: 'inside',
                        textAlign: 'justify'
                      }}>
                      <p>Para contratos temporários, defina data de início e fim do contrato. Para eventos sem
                        limitações, basta definir data de início do evento.</p>
                    </div>
                  </Popover>

                </div>
                <br/>

                <FormControl component="fieldset" margin="dense">
                  <FormLabel component="legend" color="primary">O profissional é:</FormLabel>
                  <RadioGroup aria-label="professional" name="professional_type" value={professionalTypeValue}
                              onChange={handleProfessionalChange}>
                    <FormControlLabel value="diarista" control={<Radio/>} label="Diarista"/>
                    <FormControlLabel value="plantonista" control={<Radio/>} label="Plantonista (regime 12x36h)"/>
                  </RadioGroup>
                </FormControl>

                <br/>
                <p>Selecione a função do profissional:</p>
                <br/>

                <FieldContent>
                  <Autocomplete
                    id="combo-box-profession"
                    options={userState.data.professions || []}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="" variant="outlined"/>}
                    size="small"
                    // onChange={(element, value) => setSchedule(prevState => ({ ...prevState, user_id: value?._id }))}
                    noOptionsText="Nenhum resultado encontrado"
                    value={selectProfession()}
                    onChange={(event, value) => {
                      if (value) {
                        handleSelectProfession(value)
                      }
                    }}
                    fullWidth
                  />
                </FieldContent>


                <p>Agora, selecione o profissional:</p>
                <br/>
                <FieldContent>
                  <Autocomplete
                    id="combo-box-user"
                    options={userState.list.data}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="" variant="outlined"/>}
                    size="small"
                    onChange={(element, value) => setSchedule(prevState => ({...prevState, user_id: `${value?._id}`}))}
                    value={selectUser()}
                    noOptionsText="Nenhum resultado encontrado"
                    fullWidth
                  />
                </FieldContent>

                {/* <p>Este profissional irá trabalhar em dias:</p>
                <br />

                <TabsMenuWrapper>
                  <Tabs
                    value={schedule.duty_day}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleWorkDaysValues}
                  >
                    <Tab label="Pares" />
                    <Tab label="Ímpares" />
                  </Tabs>
                </TabsMenuWrapper> */}

                <p>Defina os horários de início e fim do turno:</p>
                <br/>

                {professionalTypeValue === 'plantonista' ? (
                  <Grid container>
                    <Grid item md={3} style={{paddingRight: 10}}>

                      <FieldContent>

                        <TextField
                          id="start-time"
                          type="time"
                          size="small"
                          label="Início"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          onChange={e => {
                            const WORK_HOURS = 12;

                            const value = e.target.value;
                            const [hourOfValue, minuteOfValue] = value.split(':');
                            let currentDate = new Date();

                            currentDate.setHours(parseInt(hourOfValue) + WORK_HOURS, parseInt(minuteOfValue));

                            setSchedule(prevState => ({
                              ...prevState,
                              start_hour_plantao: value,
                              end_hour_plantao: `${(currentDate.getHours() >= 0 && currentDate.getHours() < 10) ? '0' + currentDate.getHours() : currentDate.getHours()}:${(currentDate.getMinutes() >= 0 && currentDate.getMinutes() < 10) ? '0' + currentDate.getMinutes() : currentDate.getMinutes()}`
                            }))
                          }}
                          value={schedule.start_hour_plantao}
                          fullWidth
                        />

                      </FieldContent>

                    </Grid>

                    <Grid item md={3} style={{paddingLeft: 10}}>

                      <FieldContent>

                        <TextField
                          id="end-time"
                          type="time"
                          size="small"
                          label="Fim"
                          variant="outlined"
                          disabled={!!(professionalTypeValue === 'plantonista')}
                          // defaultValue="07:30"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          onChange={e => setSchedule(prevState => ({...prevState, end_hour_plantao: e.target.value}))}
                          value={schedule.end_hour_plantao}
                          fullWidth
                        />

                      </FieldContent>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container>
                    <Grid item md={3} style={{paddingRight: 10}}>
                      <FieldContent>
                        <TextField
                          id="start-time"
                          type="time"
                          size="small"
                          label="Início"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          onChange={e => setSchedule(prevState => ({...prevState, start_hour_plantao: e.target.value}))}
                          value={schedule.start_hour_plantao}
                          fullWidth
                        />

                      </FieldContent>

                    </Grid>

                    <Grid item md={3} style={{paddingLeft: 10}}>

                      <FieldContent>

                        <TextField
                          id="end-time"
                          type="time"
                          size="small"
                          label="Fim"
                          variant="outlined"
                          // defaultValue="07:30"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          onChange={e => setSchedule(prevState => ({...prevState, end_hour_plantao: e.target.value}))}
                          value={schedule.end_hour_plantao}
                          fullWidth
                        />

                      </FieldContent>
                    </Grid>
                  </Grid>
                )}
              </TabPanel>
            </DialogContent>

            <DialogActions>
              {schedule?.data?._id && (
                <Button onClick={() => setRemoveEventsModalOpen(true)} color="secondary">
                  Remover
                </Button>
              )}
              <Button onClick={() => setDayOptionsModalOpen(false)} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleAddEvent} color="primary" autoFocus>
                Salvar
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>
              Evento Agendado

              &nbsp;
              <ButtonComponent
                variant="outlined"
                background="secondary"
                startIcon={<EditIcon/>}
                onClick={() => setCanEdit(!canEdit)}
              >
                Editar
              </ButtonComponent>
              &nbsp;
              <ButtonComponent
                startIcon={<DeleteIcon/>}
                background="danger"
                onClick={() => setRemoveEventsModalOpen(true)}
              >
                Excluir
              </ButtonComponent>
            </DialogTitle>

            <DialogContent>
              <Typography><strong>Este evento se inicia:</strong></Typography>

              <ResumeList>
                <ListItem key="resume_day">
                  <ListItemIcon>
                    <EventIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary={formatDate(schedule.day, 'dddd[,] DD [de] MMMM [de] YYYY')}
                  />
                </ListItem>

                {typeof schedule.days_interval_repeat === 'number' && schedule?.days_interval_repeat > 0 && (
                  <ListItem key="resume_repeat">
                    <ListItemIcon>
                      <RefreshIcon/>
                    </ListItemIcon>
                    <ListItemText
                      primary={`O evento se repete ${getRepeatLabel(schedule.days_interval_repeat)}`}
                    />
                  </ListItem>
                )}

                <ListItem key="resume_period">
                  <ListItemIcon>
                    <ScheduleIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary={`Se inicia em ${schedule.start_at} e finaliza às ${schedule.end_at}`}
                  />
                </ListItem>

                {schedule.type && (
                  <ListItem key="resume_type">
                    <ListItemIcon>
                      <IconPlantao style={{marginLeft: '.35rem'}}/>
                    </ListItemIcon>
                    <ListItemText
                      primary={schedule.type}
                    />
                  </ListItem>
                )}

                {schedule?.data?.description && (
                  <ListItem key="resume_description">
                    <ListItemIcon>
                      <CommentRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText
                      primary={schedule?.data?.description}
                    />
                  </ListItem>

                )}
              </ResumeList>


              <Typography><strong>Evento cadastrado por:</strong></Typography>

              <ResumeList>
                <ListItem key="resume_created_by">
                  <ListItemIcon>
                    <AccountCircle/>
                  </ListItemIcon>
                  <ListItemText
                    primary={(typeof schedule.data.created_by === 'object') ? `${schedule.data.created_by.name} - ${formatDate(schedule.day, 'dddd[,] DD [de] MMMM [de] YYYY')}` : ''}
                  />
                </ListItem>
              </ResumeList>


              {schedule.data.exchange.type ? (
                <>
                  <Divider/>
                  <br/>

                  <Typography><strong>Dados da permuta de profissional:</strong></Typography>

                  <ResumeList>
                    <ListItem key="resume_exchange_professionals">
                      <ListItemIcon>
                        <AccountBoxIcon/>
                      </ListItemIcon>
                      <ListItemText
                        primary={(
                          <Grid container>
                            <Grid item md={5}>
                              <Typography>{(typeof schedule?.exchange?.exchanged_to === 'object' && schedule.exchange.exchanged_to) ? schedule?.exchange?.exchanged_to.name : ''}</Typography>
                            </Grid>
                            <Grid item md={2}>
                              <SwapHorizIcon style={{color: '#4FC66A'}}/>
                            </Grid>
                            <Grid item md={5}>
                              <Typography
                                style={{color: '#ccc'}}>{(typeof schedule.user_id === 'object') ? schedule.user_id.name : ''}</Typography>
                            </Grid>
                          </Grid>
                        )}
                      />
                    </ListItem>

                    <Typography><strong>Motivo da permuta:</strong></Typography>

                    <ListItem key="resume_exchange_type">
                      <ListItemIcon>
                        <AccountCircle/>
                      </ListItemIcon>
                      <ListItemText
                        primary={schedule?.exchange?.type ? exchageTypesHelper[schedule?.exchange?.type] : schedule?.exchange?.type}
                      />
                    </ListItem>

                    <Typography><strong>Observações:</strong></Typography>

                    <ListItem key="resume_exchange_description">
                      <ListItemIcon>
                        <WarningRoundedIcon style={{color: '#f9ca24'}}/>
                      </ListItemIcon>
                      <ListItemText
                        primary={schedule?.exchange?.description}
                      />
                    </ListItem>

                    <Typography><strong>Permuta cadastrada por:</strong></Typography>

                    <ListItem key="resume_exchange_created_by">
                      <ListItemIcon>
                        <AccountCircle/>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography>{(typeof schedule?.exchange?.created_by === 'object' && schedule.exchange.created_by) ? schedule?.exchange?.created_by.name : ''}</Typography>}
                      />
                    </ListItem>
                  </ResumeList>
                </>
              ) : (
                <>
                  <Typography><strong>Dados do profissional:</strong></Typography>

                  <ResumeList>
                    <ListItem key="resume_professional">
                      <ListItemIcon>
                        <AccountBoxIcon/>
                      </ListItemIcon>
                      <ListItemText
                        primary={(
                          <Grid container>
                            <Grid item md={6}>
                              <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                                <div
                                  style={{marginRight: 20}}>{(typeof schedule.user_id === 'object') ? schedule.user_id.name : ''}</div>

                                {!canExchange ? (
                                  <Button
                                    variant="outlined"
                                    startIcon={<SwapHorizIcon/>}
                                    onClick={() => setCanExchange(!canExchange)}
                                  >
                                    Permutar
                                  </Button>
                                ) : (
                                  <IconButton
                                    color="secondary"
                                    onClick={() => setCanExchange(!canExchange)}
                                  >
                                    <SwapHorizIcon/>
                                  </IconButton>
                                )}
                              </div>
                            </Grid>
                            <Grid item md={6}>
                              {canExchange && (
                                <Autocomplete
                                  id="combo-box-user"
                                  options={userState.list.data}
                                  getOptionLabel={(option) => option.name}
                                  renderInput={(params) => <TextField {...params} label="Digite o nome do profissional"
                                                                      variant="outlined"/>}
                                  size="small"
                                  onChange={(element, value) => setSchedule(prevState => ({
                                    ...prevState,
                                    exchange: {...prevState.exchange, exchanged_to: `${value?._id}`}
                                  }))}
                                  value={selectExchangeUser()}
                                  noOptionsText="Nenhum resultado encontrado"
                                  fullWidth
                                />
                              )}
                            </Grid>
                          </Grid>
                        )}
                      />
                    </ListItem>
                  </ResumeList>
                  {canExchange && (
                    <>
                      <Typography><strong>Permutar por:</strong></Typography>

                      <FieldContent>
                        <RadioGroup
                          aria-label="exchangeType"
                          name="exchangeType"
                          value={schedule?.exchange?.type}
                          onChange={(event, value) => setSchedule(prevState => ({
                            ...prevState,
                            exchange: {...prevState.exchange, type: value}
                          }))}

                        >
                          <FormControlLabel value="miss" control={<Radio/>} label={exchageTypesHelper["miss"]}
                                            checked={schedule?.exchange?.type === 'miss'}/>
                          <FormControlLabel value="off" control={<Radio/>} label={exchageTypesHelper["off"]}
                                            checked={schedule?.exchange?.type === 'off'}/>
                          <FormControlLabel value="switch" control={<Radio/>} label={exchageTypesHelper["switch"]}
                                            checked={schedule?.exchange?.type === 'switch'}/>
                          <FormControlLabel value="vacation" control={<Radio/>} label={exchageTypesHelper["vacation"]}
                                            checked={schedule?.exchange?.type === 'vacation'}/>
                        </RadioGroup>
                      </FieldContent>
                    </>
                  )}

                  {schedule?.exchange?.type === 'vacation' && (
                    <>
                      <Typography><strong>Defina a data de fim da férias:</strong></Typography>
                      <br/>
                      <FieldContent>
                        <DatePicker
                          id="input-vacation-end"
                          label="Data fim de férias"
                          // value={state?.birthdate?.length > 10 ? formatDate(state.birthdate, 'YYYY-MM-DD') : state.birthdate}
                          onChange={(element) => {
                            setSchedule(prevState => ({...prevState, vacation_end: element.target.value}));
                            // setFieldValidations((prevState: any) => ({ ...prevState, birthdate: !validator.isEmpty(element.target.value) }));
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          // error={!fieldsValidation.birthdate}
                          // helperText={!fieldsValidation.birthdate ? `Por favor, insira a data de nascimento.` : null}
                          fullWidth
                        />
                      </FieldContent>
                    </>
                  )}

                  {schedule?.exchange?.type && (
                    <>
                      <Typography><strong>Justificativa:</strong></Typography>
                      <br/>
                      <FieldContent>
                        <TextField
                          id="input-exchange-description"
                          variant="outlined"
                          size="small"
                          rows={6}
                          rowsMax={6}
                          label="Justificativa"
                          placeholder="Faça uma breve explanação do motivo da permuta"
                          value={schedule?.exchange?.description || ''}
                          onChange={(element) => setSchedule(prevState => ({
                            ...prevState,
                            exchange: {...prevState.exchange, description: element.target.value}
                          }))}
                          fullWidth
                          multiline
                        />
                      </FieldContent>
                    </>
                  )}
                </>
              )}


            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDayOptionsModalOpen(false)} color="primary">
                Voltar
              </Button>
              <ButtonComponent background="success" onClick={handleAddEvent}>
                OK
              </ButtonComponent>
            </DialogActions>
          </>
        )}

      </Dialog>


      {/* Delete Event Modal */}
      <Dialog
        open={removeEventsModalOpen}
        onClose={() => setRemoveEventsModalOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography color="error" style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
            <ReportProblemOutlined style={{marginRight: 10}}/><strong>Atenção</strong>
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Typography>
            <strong>Você está prestes a excluir um ou mais eventos da agenda.</strong> Selecione se deseja excluir
            apenas esse evento ou todos os próximos eventos relacionados.
          </Typography>
          <br/>

          <FieldContent>
            <RadioGroup aria-label="removeOption" name="removeOption" value={removeType}
                        onChange={(event, value) => setRemoveType(value)}>
              <FormControlLabel value="current" control={<Radio/>} label="Este evento"
                                checked={removeType === 'current' || removeType === ''}/>
              <FormControlLabel value="nexts" control={<Radio/>} label="Todos os próximos"
                                checked={removeType === 'nexts'}/>
            </RadioGroup>
          </FieldContent>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setRemoveEventsModalOpen(false)} color="primary">
            Voltar
          </Button>
          <Button onClick={handleRemoveEvent} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


/**
 * ✅ 1. Adicionar popup de exclusão de evento
 * 2. Adicionar tela de resumo ao clicar em um evento existente
 * 3. Criar regras para verificar conflitos de horários entre profissionais e com o mesmo profissional
 */
