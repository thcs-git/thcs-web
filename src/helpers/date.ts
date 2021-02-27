import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault("America/Sao_Paulo");

const daysOfWeek = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

export const translate: any = {
  week: 'Semana',
  month: 'Mês',
  year: 'Ano',
  day: 'Dia'
}

export const getDayOfTheWeekName = (dayOfTheWeek: number) => {
  return daysOfWeek[dayOfTheWeek];
}

export const formatDate = (value: any, format: string) => {
  return dayjs(value).format(format);
}

export const formatToISOString = (value: any) => {
  return (!value) ? '' : dayjs(value).toISOString();
}

export const stringToDate = (value: string) => {
  return dayjs(value).toDate();
}

export const age = (date: any) => {
  const years = dayjs().diff(date, 'year');

  /**
   * De 0-2 anos: <anos>, <meses>, <dias>. Ex: 1 ano, 3 meses e 2 dias;
   * De 3-12 anos: <anos>, <meses>. Ex: 15 anos e 35 dias;
   * > 12 anos: <anos>. Ex: 27 anos;
   */

  if (years <= 2) {
    const months = dayjs().diff(date, 'month') % 12;
    const days = dayjs().diff(date, 'day') % 365;

    const yearsText = years > 1 ? `${years} anos` : `${years} ano`;
    const monthText = months > 1 ? `${months} meses` : `${months} mês`;
    const daysText = days > 1 ? `e ${days} dias` : `e ${days} dia`;

    return `${yearsText} ${monthText} ${daysText}`;
  } else if (years > 2 && years <= 12) {
    const months = dayjs().diff(date, 'month') % 12;

    const monthText = months > 1 ? `e ${months} meses` : `e ${months} mês`;

    return `${years} anos ${monthText}`;
  } else if (years > 12) {
    return `${years} anos`;
  } else {
    return (date) ? dayjs(date).format('DD/MM/YYYY') : '';
  }
};
