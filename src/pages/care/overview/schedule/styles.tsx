import styled from 'styled-components';
import FullCalendar, { EventClickArg, EventApi, EventInput, EventAddArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

export const ScheduleItem = styled.div`

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  word-wrap: break-word;
  white-space: pre-wrap;

  & > .scheduleBadge {
    padding: 2px;
    border-radius: 20px;
    margin-right: 3px;
    color: var(--white);

    /* width: 10px; */
    /* height: 10px; */

    /* font-size: 10px; */

    background: var(--primary)
  }

  & > .scheduleText {
    color: var(--black);
  }
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  & > svg {
    margin-right: 10px;
    color: var(--secondary)
  }

  & > h4 {
    color: var(--secondary) !important;
  }
`;

export const CalendarContent = styled.div`
  & td.fc-day-today {
    background-color: #EBF3F5 !important;

    a.fc-daygrid-day-number {
      color: var(--primary);
      font-weight: bold;
    }
  }

  & .fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active {
    background-color: var(--primary);
    border-color: var(--primary);
  }

  & .fc .fc-button-primary:not(:disabled), .fc .fc-button-primary:not(:disabled) {
    background-color: var(--secondary);
    border-color: var(--secondary);
  }

  & .fc-today-button .fc-button .fc-button-primary {
    background-color: var(--secondary);
  }

  & .fc-prev-button.fc-button, & .fc-next-button.fc-button {
    background-color: #EFF1F2 !important;
    border-color: #EFF1F2 !important;
    color: var(--secondary) !important;
  }
`;
