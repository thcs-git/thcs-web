import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, Grid, Card, CardContent, TextField, FormGroup, FormControlLabel, RadioGroup, DialogActions, Button, List, ListItem, Typography, ListItemIcon, ListItemText, IconButton, Divider } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { AccountCircle, SupervisorAccountRounded, ReportProblemOutlined, Event as EventIcon, Cached as RefreshIcon, Schedule as ScheduleIcon, CommentRounded as CommentRoundedIcon, AccountBox as AccountBoxIcon, SwapHoriz as SwapHorizIcon, Edit as EditIcon, Delete as DeleteIcon, WarningRounded as WarningRoundedIcon } from '@material-ui/icons';
import dayjs from 'dayjs';

import FullCalendar, { EventClickArg, EventApi, EventInput, EventAddArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

import { ApplicationState } from '../../../../store';
import { loadCareById, loadScheduleRequest, createScheduleRequest as storeScheduleAction, deleteScheduleRequest as deleteScheduleAction, updateScheduleRequest as updateScheduleAction } from '../../../../store/ducks/cares/actions';
import { ScheduleInterface } from '../../../../store/ducks/cares/types';
import { searchRequest as searchUserAction, loadProfessionsRequest as getProfessionsAction } from '../../../../store/ducks/users/actions';
import { ProfessionUserInterface } from '../../../../store/ducks/users/types';

import { formatDate, translate as translateDateHelper, getDayOfTheWeekName } from "../../../../helpers/date";
import { exchangeTypes as exchageTypesHelper } from '../../../../helpers/schedule';

import { ReactComponent as IconPlantao } from '../../../../assets/img/icon-plantao.svg';

import Sidebar from '../../../../components/Sidebar';
import Loading from '../../../../components/Loading';

import { FieldContent, FormTitle, RadioComponent as Radio } from '../../../../styles/components/Form';
import { TextCenter } from '../../../../styles/components/Text';
import ButtonComponent from '../../../../styles/components/Button';
import { ComplexityStatus } from '../../../../styles/components/Table';
import DatePicker from '../../../../styles/components/DatePicker';

import { ScheduleItem, CardTitle, CalendarContent, ScheduleEventStatus, HeaderContent, ResumeList } from './styles';

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
}

export default function SchedulePage(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const careState = useSelector((state: ApplicationState) => state.cares);
  const userState = useSelector((state: ApplicationState) => state.users);
  const companyState = useSelector((state: ApplicationState) => state.companies);

  const { params } = props.match;

  let eventGuid = 0
  let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>();
  const [dayOptionsModalOpen, setDayOptionsModalOpen] = useState(false);
  const [removeEventsModalOpen, setRemoveEventsModalOpen] = useState(false);
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
    start_at: '',
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
    { title: 'Diariamente', interval: 1 },
    { title: 'A cada 2 dias', interval: 2 },
    { title: 'A cada 3 dias', interval: 3 },
    { title: 'A cada 4 dias', interval: 4 },
    { title: 'A cada 5 dias', interval: 5 },
    { title: 'A cada 6 dias', interval: 6 },
    { title: 'Semanalmente', interval: 7 },
    { title: 'Quinzenalmente', interval: 15 },
    { title: 'Mensalmente', interval: 30 },
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
    dispatch(loadScheduleRequest({ attendance_id: params.id }))
  }, [careState.data._id]);

  useEffect(() => {
    if (careState.schedule?.length) {
      translateSchedule();
      handleTeam();
    }
  }, [careState.schedule]);

  // useEffect(() => {
  //   console.log(events)
  // }, [events]);

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

    const { event } = clickInfo;

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

  const handleAddEvent = useCallback((event: any) => {

    if (schedule.day && schedule?.start_at && schedule?.end_at) {

      const startAt = dayjs(schedule.day).startOf('day').format('YYYY-MM-DD');
      const endAt = dayjs(schedule.day).startOf('day').format('YYYY-MM-DD');

      if (schedule?.data?._id) {

        const startAt = dayjs(schedule.day).startOf('day').format('YYYY-MM-DD');
        const endAt = dayjs(schedule.day).startOf('day').format('YYYY-MM-DD');

        setDayOptionsModalOpen(false);

        const { data, ...scheduleData } = schedule;
        const eventCopy = [...events];

        eventCopy.forEach((item, key) => {
          if (item?.extendedProps?._id === data._id) {
            eventCopy[key] = {
              ...eventCopy[key],
              title: selectUser()?.name,
              start: `${startAt}T${schedule.start_at}:00`,
              end: `${endAt}T${schedule.end_at}:00`,
            };
          }
        });

        setEvents(eventCopy);

        dispatch(updateScheduleAction({
          ...scheduleData,
          _id: data._id,
          attendance_id: params.id,
          start_at: `${startAt}T${schedule.start_at}:00`,
          end_at: `${endAt}T${schedule.end_at}:00`,
        }));

      } else {

        const newEvent: EventInput = {
          id: createEventId(),
          title: selectUser()?.name,
          // start: todayStr,
          start: `${startAt}T${schedule.start_at}:00`,
          end: `${endAt}T${schedule.end_at}:00`,
          backgroundColor: '#0899BA',
          textColor: '#ffffff',
        };

        // A label fica com background azul quando o evento é do dia todo, ou seja, não tem hora de inicio ou fim, apenas a data '2021-02-22'
        // console.log('newEvent', newEvent)

        setEvents((prevState: any) => ([...prevState, newEvent]));

        dispatch(storeScheduleAction({
          ...schedule,
          attendance_id: params.id,
          start_at: `${startAt}T${schedule.start_at}:00`,
          end_at: `${endAt}T${schedule.end_at}:00`,
        }));
      }

      setDayOptionsModalOpen(false);

      setTimeout(() => {
        dispatch(loadScheduleRequest({ attendance_id: params.id }))
      }, 2000);

    }

  }, [schedule, events]);

  const handleRemoveEvent = useCallback(() => {
    eventSelected?.event.remove();

    if (schedule.data._id) {
      dispatch(deleteScheduleAction(schedule.data._id, removeType));

      setTimeout(() => {
        dispatch(loadScheduleRequest({ attendance_id: params.id }))
      }, 2000);

      setDayOptionsModalOpen(false);
      setRemoveEventsModalOpen(false);
    }
  }, [schedule, removeType]);

  const handleTeam = useCallback(() => {
    const teamUsers: any = [];

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

    setTeam(teamUsers);

  }, [careState.schedule]);

  const renderEventStatus = (event: any) => {
    const today = dayjs();
    const eventDate = dayjs(event.start);
    const diffDate = eventDate.diff(today, 'minutes');
    const { extendedProps: eventData } = event;

    if (diffDate < 0 && (!eventData.checkin || eventData.checkin.length === 0)) {
      return <ScheduleEventStatus color="late" />
    } else if (eventData?.checkin?.length > 0) {

      const checkins = eventData.checkin.sort().reverse();

      const { start_at: checkIn, end_at: checkOut } = checkins[0];

      if (checkIn && !checkOut) {
        return <ScheduleEventStatus color="visiting" className="pulse" />
      } else if (checkIn && checkOut) {
        return <ScheduleEventStatus color="complete" />
      } else {
        return <ScheduleEventStatus color="future" />
      }

    } else {
      return <ScheduleEventStatus color="future" />
    }
  };

  const renderComplexityList = useCallback(() => {
    const complexity = companyState.data.settings?.complexity?.find(item => item.title === (careState.data?.complexity || careState.data?.capture?.complexity || 'Sem Complexidade'));

    return (complexity?.recommendation.length) ? complexity?.recommendation.map((recommendation, key) => (
      <p key={`recommendation_${key}`}>{`${recommendation.amount} ${(typeof recommendation.profession_id === 'object' ? recommendation.profession_id.name : '')}, ${recommendation.interval}x por ${translateDateHelper[recommendation.frequency].toLowerCase()}`}</p>
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

  const translateSchedule = useCallback(() => {
    const schedules = careState.schedule;
    let scheduleArray: EventInput[] = [];

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
          extendedProps: item
        });
      });
    }

    setEvents(scheduleArray);

  }, [careState.schedule]);

  // Prestadores
  const handleSelectProfession = useCallback((value: ProfessionUserInterface) => {
    setSchedule((prevState: ISchedule) => ({
      ...prevState,
      profession_id: value._id
    }));

    dispatch(searchUserAction({ profession_id: value._id }));
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

  return (
    <>
      <Sidebar>
        {careState.loading && <Loading />}

        <HeaderContent>
          <FormTitle>Agenda do Paciente</FormTitle>
          <div>
            <ButtonComponent onClick={() => {
              setSchedule({
                day: new Date,
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
            <div style={{ paddingRight: 30 }}>
              <Card style={{ marginBottom: 20 }}>
                <CardContent>
                  <h4>{careState.data?.patient_id?.name}</h4>
                  <br />
                  <p>Nº atendimento: {careState.data?._id}</p>
                  <p>Data atendimento: {formatDate(careState.data?.created_at, 'DD/MM/YYYY [às] HH:mm:ss')}</p>
                </CardContent>
              </Card>

              <div>
                <p><strong>Legendas:</strong></p>

                <List>
                  <ListItem key="legend_late" style={{ paddingLeft: 0 }}><ScheduleEventStatus color="late" /> Falta</ListItem>
                  <ListItem key="legend_visiting" style={{ paddingLeft: 0 }}><ScheduleEventStatus color="visiting" className="pulse" /> Em atendimento</ListItem>
                  <ListItem key="legend_complete" style={{ paddingLeft: 0 }}><ScheduleEventStatus color="complete" /> Atendimento concluído</ListItem>
                  <ListItem key="legend_future" style={{ paddingLeft: 0 }}><ScheduleEventStatus color="future" /> Próximos atendimentos</ListItem>
                </List>
              </div>
            </div>
          </Grid>
          <Grid item md={9}>
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

            <div style={{ marginTop: 20 }}>
              <Grid container>
                <Grid item md={4}>
                  <Card style={{ marginRight: 10 }}>
                    <CardContent>
                      <CardTitle>
                        <AccountCircle />
                        <h4>Informações do Paciente</h4>
                      </CardTitle>

                      <p>DN: {formatDate(careState.data?.patient_id?.birthdate, 'DD/MM/YYYY')}</p>
                      <p>Mãe: {careState.data?.patient_id?.mother_name}</p>
                      <p>CPF: {careState.data?.patient_id?.fiscal_number}</p>
                      <p>CID: {(typeof careState.data?.cid_id === 'object') ? careState.data?.cid_id.name : ''}</p>
                      <p>Médico Assistente: {careState.data?.capture?.assistant_doctor}</p>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item md={4}>
                  <Card style={{ marginRight: 10 }}>
                    <CardContent>
                      <CardTitle>
                        <SupervisorAccountRounded />
                        <h4>Complexidade - Indicações</h4>
                      </CardTitle>

                      <TextCenter style={{ marginBottom: 20, fontWeight: 'bold' }}>
                        <ComplexityStatus status={careState.data?.complexity || careState.data?.capture?.complexity || 'Sem Complexidade'} style={{ justifyContent: 'center' }}>
                          {careState.data?.complexity || careState.data?.capture?.complexity || 'Sem Complexidade'}
                        </ComplexityStatus>
                      </TextCenter>

                      <div>
                        {renderComplexityList()}
                      </div>

                    </CardContent>
                  </Card>
                </Grid>

                <Grid item md={4}>
                  <Card style={{ marginRight: 10 }}>
                    <CardContent>
                      <CardTitle>
                        <SupervisorAccountRounded />
                        <h4>Equipe Multidisciplinar</h4>
                      </CardTitle>
                      <div>
                        {team.length ? (
                          <>
                            {team.map(user => (
                              <p style={{ marginBottom: 10 }}>{user.name}</p>
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

        <TextCenter style={{ marginTop: 50 }}>
          <ButtonComponent onClick={() => history.push(`/care/${params.id}/overview`)} background="primary">Voltar</ButtonComponent>
        </TextCenter>

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
                Agendamento - {formatDate(schedule.day, 'DD/MM/YYYY')} ({getDayOfTheWeekName(parseInt(formatDate(schedule.day, 'd')))})
              </strong>
            </DialogTitle>

            <DialogContent>

              <p>Para iniciar o agendamento de um evento, selecione a categoria:</p>
              <br />

              <FieldContent>
                <Autocomplete
                  id="combo-box-profession"
                  options={userState.data.professions || []}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label="Selecione a função do profissional" variant="outlined" />}
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
                  renderInput={(params) => <TextField {...params} label="Agora, selecione o profissional" variant="outlined" />}
                  size="small"
                  onChange={(element, value) => setSchedule(prevState => ({ ...prevState, user_id: `${value?._id}` }))}
                  value={selectUser()}
                  noOptionsText="Nenhum resultado encontrado"
                  fullWidth
                />
              </FieldContent>

              <Grid container>
                <Grid item md={6}>
                  <FieldContent>
                    <TextField
                      id="event-date"
                      type="date"
                      size="small"
                      label="Data de início e fim do evento:"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={e => setSchedule(prevState => ({ ...prevState, start_at: e.target.value }))}
                      value={formatDate(schedule.day, 'YYYY-MM-DD')}
                      fullWidth
                      disabled
                    />
                  </FieldContent>
                </Grid>
              </Grid>


              <p>Defina os horários de início e fim do turno:</p>
              <br />

              <Grid container>
                <Grid item md={3} style={{ paddingRight: 10 }}>

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
                      onChange={e => setSchedule(prevState => ({ ...prevState, start_at: e.target.value }))}
                      value={schedule.start_at}
                      fullWidth
                    />

                  </FieldContent>

                </Grid>

                <Grid item md={3} style={{ paddingLeft: 10 }}>

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
                      onChange={e => setSchedule(prevState => ({ ...prevState, end_at: e.target.value }))}
                      value={schedule.end_at}
                      fullWidth
                    />

                  </FieldContent>

                </Grid>

                <Grid item md={6}></Grid>

                <Grid item md={6} style={{ paddingRight: 10 }}>
                  <FieldContent>
                    <FormGroup>
                      <p>Repetir evento?</p>
                      <br />

                      <Autocomplete
                        id="combo-box-repeat-options"
                        options={repeatOptions}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Selecione a frequência" variant="outlined" />}
                        size="small"
                        onChange={(element, value) => setSchedule(prevState => ({ ...prevState, days_interval_repeat: value?.interval }))}
                        value={selectRepeatInterval()}
                        noOptionsText="Nenhum resultado encontrado"
                        fullWidth
                      />
                    </FormGroup>
                  </FieldContent>
                </Grid>

                {schedule?.days_interval_repeat && schedule?.days_interval_repeat > 0 && (
                  <Grid item md={6}>
                    <FieldContent>
                      <FormGroup>
                        <p>Quando esta repetição vai acabar?</p>
                        <br />

                        <TextField
                          id="repeat-end"
                          type="date"
                          size="small"
                          label="Fim da repetição"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={e => setSchedule(prevState => ({ ...prevState, repeat_stop_at: e.target.value }))}
                          value={schedule?.repeat_stop_at}
                          fullWidth
                        />

                      </FormGroup>
                    </FieldContent>
                  </Grid>
                )}
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
                  onChange={(element) => setSchedule(prevState => ({ ...prevState, description: element.target.value }))}
                  fullWidth
                  multiline
                />
              </FieldContent>

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
                startIcon={<EditIcon />}
                onClick={() => setCanEdit(!canEdit)}
              >
                Editar
            </ButtonComponent>
              &nbsp;
            <ButtonComponent
                startIcon={<DeleteIcon />}
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
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={formatDate(schedule.day, 'dddd[,] DD [de] MMMM [de] YYYY')}
                  />
                </ListItem>

                {typeof schedule.days_interval_repeat === 'number' && schedule?.days_interval_repeat > 0 && (
                  <ListItem key="resume_repeat">
                    <ListItemIcon>
                      <RefreshIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`O evento se repete ${getRepeatLabel(schedule.days_interval_repeat)}`}
                    />
                  </ListItem>
                )}

                <ListItem key="resume_period">
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Se inicia em ${schedule.start_at} e finaliza às ${schedule.end_at}`}
                  />
                </ListItem>

                <ListItem key="resume_type">
                  <ListItemIcon>
                    <IconPlantao style={{ marginLeft: '.35rem' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={schedule.type}
                  />
                </ListItem>

                <ListItem key="resume_description">
                  <ListItemIcon>
                    <CommentRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={schedule?.data?.description || ''}
                  />
                </ListItem>
              </ResumeList>


              <Typography><strong>Evento cadastrado por:</strong></Typography>

              <ResumeList>
                <ListItem key="resume_created_by">
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText
                    primary={(typeof schedule.data.created_by === 'object') ? `${schedule.data.created_by.name} - ${formatDate(schedule.day, 'dddd[,] DD [de] MMMM [de] YYYY')}` : ''}
                  />
                </ListItem>
              </ResumeList>

              {schedule.data.exchange.type ? (
                <>
                  <Divider />
                  <br />

                  <Typography><strong>Dados da permuta de profissional:</strong></Typography>

                  <ResumeList>
                    <ListItem key="resume_exchange_professionals">
                      <ListItemIcon>
                        <AccountBoxIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={(
                          <Grid container>
                            <Grid item md={5}>
                              <Typography>{(typeof schedule?.exchange?.exchanged_to === 'object' && schedule.exchange.exchanged_to) ? schedule?.exchange?.exchanged_to.name : ''}</Typography>
                            </Grid>
                            <Grid item md={2}>
                              <SwapHorizIcon style={{ color: '#4FC66A' }} />
                            </Grid>
                            <Grid item md={5}>
                              <Typography style={{ color: '#ccc' }}>{(typeof schedule.user_id === 'object') ? schedule.user_id.name : ''}</Typography>
                            </Grid>
                          </Grid>
                        )}
                      />
                    </ListItem>

                    <Typography><strong>Motivo da permuta:</strong></Typography>

                    <ListItem key="resume_exchange_type">
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText
                        primary={schedule?.exchange?.type ? exchageTypesHelper[schedule?.exchange?.type] : schedule?.exchange?.type}
                      />
                    </ListItem>

                    <Typography><strong>Observações:</strong></Typography>

                    <ListItem key="resume_exchange_description">
                      <ListItemIcon>
                        <WarningRoundedIcon style={{ color: '#f9ca24' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={schedule?.exchange?.description}
                      />
                    </ListItem>

                    <Typography><strong>Permuta cadastrada por:</strong></Typography>

                    <ListItem key="resume_exchange_created_by">
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography>{(typeof schedule?.exchange?.created_by === 'object' && schedule.exchange.created_by) ? schedule?.exchange?.created_by.name : ''}</Typography>}
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
                        <AccountBoxIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={(
                          <Grid container>
                            <Grid item md={6}>
                              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                <div style={{ marginRight: 20 }}>{(typeof schedule.user_id === 'object') ? schedule.user_id.name : ''}</div>

                                {!canExchange ? (
                                  <Button
                                    variant="outlined"
                                    startIcon={<SwapHorizIcon />}
                                    onClick={() => setCanExchange(!canExchange)}
                                  >
                                    Permutar
                                  </Button>
                                ) : (
                                  <IconButton
                                    color="secondary"
                                    onClick={() => setCanExchange(!canExchange)}
                                  >
                                    <SwapHorizIcon />
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
                                  renderInput={(params) => <TextField {...params} label="Digite o nome do profissional" variant="outlined" />}
                                  size="small"
                                  onChange={(element, value) => setSchedule(prevState => ({ ...prevState, exchange: { ...prevState.exchange, exchanged_to: `${value?._id}` } }))}
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
                          onChange={(event, value) => setSchedule(prevState => ({ ...prevState, exchange: { ...prevState.exchange, type: value } }))}

                        >
                          <FormControlLabel value="miss" control={<Radio />} label={exchageTypesHelper["miss"]} checked={schedule?.exchange?.type === 'miss'} />
                          <FormControlLabel value="off" control={<Radio />} label={exchageTypesHelper["off"]} checked={schedule?.exchange?.type === 'off'} />
                          <FormControlLabel value="switch" control={<Radio />} label={exchageTypesHelper["switch"]} checked={schedule?.exchange?.type === 'switch'} />
                          <FormControlLabel value="vacation" control={<Radio />} label={exchageTypesHelper["vacation"]} checked={schedule?.exchange?.type === 'vacation'} />
                        </RadioGroup>
                      </FieldContent>
                    </>
                  )}

                  {schedule?.exchange?.type === 'vacation' && (
                    <>
                      <Typography><strong>Defina a data de fim da férias:</strong></Typography>
                      <br />
                      <FieldContent>
                        <DatePicker
                          id="input-vacation-end"
                          label="Data fim de férias"
                          // value={state?.birthdate?.length > 10 ? formatDate(state.birthdate, 'YYYY-MM-DD') : state.birthdate}
                          onChange={(element) => {
                            setSchedule(prevState => ({ ...prevState, vacation_end: element.target.value }));
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
                      <br />
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
                          onChange={(element) => setSchedule(prevState => ({ ...prevState, exchange: { ...prevState.exchange, description: element.target.value } }))}
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
          <Typography color="error" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <ReportProblemOutlined style={{ marginRight: 10 }} /><strong>Atenção</strong>
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Typography>
            <strong>Você está prestes a excluir um ou mais eventos da agenda.</strong> Selecione se deseja excluir apenas esse evento ou todos os próximos eventos relacionados.
          </Typography>
          <br />

          <FieldContent>
            <RadioGroup aria-label="removeOption" name="removeOption" value={removeType} onChange={(event, value) => setRemoveType(value)}>
              <FormControlLabel value="current" control={<Radio />} label="Este evento" checked={removeType === 'current' || removeType === ''} />
              <FormControlLabel value="nexts" control={<Radio />} label="Todos os próximos" checked={removeType === 'nexts'} />
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
