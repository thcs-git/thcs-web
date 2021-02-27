import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, Grid, Card, CardContent, Container, TextField, FormGroup, FormControlLabel, Checkbox, FormControl, FormLabel, Radio, RadioGroup, DialogActions, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { AccountCircle, SupervisorAccountRounded } from '@material-ui/icons';
import dayjs from 'dayjs';
import { useHistory } from "react-router-dom";

import FullCalendar, { EventClickArg, EventApi, EventInput, EventAddArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

import { DateRange } from '@material-ui/icons';

import { ApplicationState } from '../../../../store';
import { loadCareById, loadScheduleRequest, createScheduleRequest as storeScheduleAction, deleteScheduleRequest as deleteScheduleAction, updateScheduleRequest as updateScheduleAction } from '../../../../store/ducks/cares/actions';
import { searchRequest as searchUserAction } from '../../../../store/ducks/users/actions';

import { formatDate, translate as translateDateHelper } from "../../../../helpers/date";

import Sidebar from '../../../../components/Sidebar';
import Loading from '../../../../components/Loading';

import { FieldContent, FormTitle } from '../../../../styles/components/Form';
import { TextCenter } from '../../../../styles/components/Text';
import ButtonComponent from '../../../../styles/components/Button';
import { ComplexityStatus } from '../../../../styles/components/Table';

import { ScheduleItem, CardTitle, CalendarContent, ScheduleEventStatus } from './styles';

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

interface ISchedule {
  day?: Date | null;
  start_at?: string;
  end_at?: string;
  user_id?: string;
  repeat?: boolean;
  duration?: string;
  description?: string;
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
  const [daySelected, setDaySelected] = useState<IDay>({
    allDay: true,
    end: null,
    endStr: '',
    jsEvent: {},
    start: null,
    startStr: '',
    view: {},
  });
  const [schedule, setSchedule] = useState<ISchedule>({});
  const [events, setEvents] = useState<any[]>([]);
  const [eventSelected, setEventSelected] = useState<EventClickArg>();
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    setSchedule({});
    setEvents([]);
  }, [])

  useEffect(() => {
    if (params.id) {
      dispatch(loadCareById(params.id));
    }

    dispatch(searchUserAction(''));

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

  useEffect(() => {
    console.log(events)
  }, [events]);

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events)
  }

  const handleDateSelect = (date: IDay) => {
    setSchedule({ day: date.start });
    setDaySelected(date);
    setDayOptionsModalOpen(true);
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log(`clickInfo`, clickInfo);

    setEventSelected(clickInfo);

    const { event } = clickInfo;

    setSchedule({
      day: event.start,
      start_at: formatDate(event.startStr, 'HH:mm'),
      end_at: formatDate(event.endStr, 'HH:mm'),
      user_id: event.extendedProps.user_id._id,
      repeat: false,
      duration: '',
      description: event.extendedProps.description,
      data: event.extendedProps
    });

    // setDaySelected(event.start || '');
    setDayOptionsModalOpen(true);

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
            console.log(item);
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

      // setDayOptionsModalOpen(false);

    }

  }, [schedule, events]);

  const handleRemoveEvent = useCallback(() => {

    eventSelected?.event.remove();

    if (schedule.data._id) {
      dispatch(deleteScheduleAction(schedule.data._id));
      setDayOptionsModalOpen(false);
    }
  }, [schedule]);

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
    const diffDate = eventDate.diff(today, 'days');
    const { extendedProps: eventData } = event;

    if (diffDate < 0 && !eventData.checkin) {
      return <ScheduleEventStatus color="late" />
    } else if (eventData?.checkin?.length > 0) {

      const checkins = eventData.checkin.sort().reverse();

      const { start_at: checkIn, end_at: checkOut } = checkins[0];

      if (checkIn && !checkOut) {
        return <ScheduleEventStatus color="visiting" />
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

    return complexity?.recommendation.map((recommendation, key) => (
      <p key={`recommendation_${key}`}>{`${recommendation.amount} ${(typeof recommendation.profession_id === 'object' ? recommendation.profession_id.name : '')}, ${recommendation.interval}x por ${translateDateHelper[recommendation.frequency].toLowerCase()}`}</p>
    ));
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
        scheduleArray.push({
          id: createEventId(),
          title: (typeof item.user_id === 'object') ? item.user_id.name : '',
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

  const selectUser = useCallback(() => {
    const selected = userState.list.data.filter((item) => item._id === schedule.user_id);
    return selected[0] ? selected[0] : null;
  }, [schedule.user_id]);

  function createEventId() {
    return String(eventGuid++)
  }

  return (
    <>
      <Sidebar>
        {careState.loading && <Loading />}

        <FormTitle>Agenda do Paciente</FormTitle>

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
                <p><strong>Filtrar por profissional:</strong></p>


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

                      <TextCenter style={{ marginBottom: 20 }}>
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
                        {team.map(user => (
                          <p>{user.name}</p>
                        ))}
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

      <Dialog
        open={dayOptionsModalOpen}
        onClose={() => setDayOptionsModalOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">O que deseja fazer?</DialogTitle>

        <DialogContent>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
            <DateRange style={{ color: '#16679A', marginRight: 5 }} />
            <h2>{formatDate(schedule.day, 'DD/MM/YYYY')}</h2>
          </div>

          <FieldContent>
            <Autocomplete
              id="combo-box-gender"
              options={userState.list.data}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Profissional" variant="outlined" />}
              size="small"
              onChange={(element, value) => setSchedule(prevState => ({ ...prevState, user_id: value?._id }))}
              value={selectUser()}
              noOptionsText="Nenhum resultado encontrado"
              fullWidth
            />
          </FieldContent>

          <Grid container>
            <Grid item md={6} style={{ paddingRight: 10 }}>

              <FieldContent>

                <TextField
                  id="start-time"
                  type="time"
                  size="small"
                  label="Hora Início"
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
            <Grid item md={6} style={{ paddingLeft: 10 }}>

              <FieldContent>

                <TextField
                  id="end-time"
                  type="time"
                  size="small"
                  label="Hora Fim"
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

            <Grid item md={6}>
              <FieldContent>

                <FormGroup>

                  <FormControlLabel
                    label="Repetir?"
                    onChange={(e, checked) => setSchedule(prevState => ({ ...prevState, repeat: checked }))}
                    control={(
                      <Checkbox color="primary"
                        checked={schedule?.repeat ?? false}
                      />
                    )}
                  />
                </FormGroup>

              </FieldContent>
            </Grid>
            <Grid item md={6}>
              <FieldContent>
                {schedule.repeat && (
                  <>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Duração</FormLabel>
                      <RadioGroup aria-label="repeat-duration" name="repeat-duration" value={schedule.duration} onChange={(e, value) => setSchedule(prevState => ({ ...prevState, duration: value }))}>
                        <FormControlLabel value="month" control={<Radio />} label="Mensal" />
                        <FormControlLabel value="week" control={<Radio />} label="Semanal" />
                        <FormControlLabel value="days" control={<Radio />} label="Diário" />
                      </RadioGroup>
                    </FormControl>
                  </>
                )}

              </FieldContent>
            </Grid>
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
            <Button onClick={handleRemoveEvent} color="secondary">
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
      </Dialog>
    </>
  );
}
