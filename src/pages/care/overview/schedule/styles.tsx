import styled, { css } from 'styled-components';
import { List } from '@material-ui/core';

interface IEventStatus {
  color: 'complete' | 'late' | 'future' | 'visiting';
}

const statusColor: any = {
  complete: css`
    background: var(--success);
  `,
  late: css`
    background: var(--danger-hover);
  `,
  future: css`
    background: var(--gray);
  `,
  visiting: css`
   background: var(--warning);
  `,
};

export const CardPlantonistas = styled.div`
  display: flex;
  align-items: center;

  .diurno-icon {
    path.a {
      stroke: #EBB500;
      fill: none;
    }
  }

  .noturno-icon {
    path.a {
      stroke: #6B4FC9;
      fill: none;
    }
  }

  > svg {
    margin-right: 4px;
  }
`;

export const ContainerSearch = styled.div`
  form > div {
    width: 100%;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    font-size: 8px;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    font-size: 8px;
  }
  :-ms-input-placeholder { /* IE 10+ */
    font-size: 8px;
  }
  :-moz-placeholder { /* Firefox 18- */
    font-size: 8px;
  }
`;

export const ScheduleItem = styled.div`

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  word-wrap: break-word;
  white-space: pre-wrap;

  .late {
    width: 10px;
    height: 10px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 50px;

    path.a {
      stroke: none;
      fill: #FF6565;
    }
  }

  .visiting {
    width: 10px;
    height: 10px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 50px;

    box-shadow: 0 0 0 0 var(--warning);
    transform: scale(1);
    animation: pulse 2s infinite;

    path.a {
      stroke: none;
      fill: #F9CA24;
    }
  }

  .complete {
    width: 10px;
    height: 10px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 50px;

    path.a {
      stroke: none;
      fill: #4FC66A;
    }
  }

  .future {
    width: 10px;
    height: 10px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 50px;

    path.a {
      stroke: none;
      fill: #CCCCCC;
    }
  }

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

export const ScheduleEventStatus = styled.div<IEventStatus>`
  ${(props: IEventStatus) => statusColor[props.color || 'var(--gray)']};

  width: 10px;
  height: 10px;

  margin-left: 5px;
  margin-right: 5px;

  border-radius: 50px;

  &.pulse {
    box-shadow: 0 0 0 0 var(--warning);
    transform: scale(1);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 var(--warning);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .team-icon {
    width: 21px;
    height: 21px;
    background: var(--secondary);
    border-radius: 50%;
    padding: 0px;

    path.a {
      stroke: none;
      fill: #ffffff;
    }
  }
  .duty-icon {
    width: 21px;
    height: 21px;
    background: var(--secondary);
    border-radius: 50%;
    padding: 3px;

    path.a {
      stroke: none;
      fill: #ffffff;
    }
  }
  .permuta-icon {
    width: 21px;
    height: 21px;
    background: var(--secondary);
    border-radius: 50%;
    padding: 3px;

    path.a {
      stroke: none;
      fill: #ffffff;
    }
  }

  .profile-icon {
    width: 25px;
    height: 25px;

    path.a {
      fill: #ffffff;
    }
  }

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

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;

export const ResumeList = styled(List)`
  & svg {
    color: var(--secondary);
  }
`;

export const TabsMenuWrapper = styled.div`
  margin-bottom: 24px;

  .Mui-selected {
    background-color: var(--primary);
    color: var(--white) !important;
  }

  button:first-of-type {
    margin-right: 10px;
  }

  button {
    border-radius: 35px;
    color: #333 !important;
    background-color: var(--gray-light);
  }

  span {
    background-color: unset !important;
  }
`;
