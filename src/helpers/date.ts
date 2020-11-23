import dayjs from 'dayjs';

const daysOfWeek = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

export const getDayOfTheWeekName = (dayOfTheWeek: number) => {
  return daysOfWeek[dayOfTheWeek];
}

export const formatDate = (value: string, format: string) => {
  return dayjs(value).format(format);
}

export const formatToISOString = (value: any) => {
  return (!value) ? '' : dayjs(value).toISOString();
}

export const stringToDate = (value: string) => {
  return dayjs(value).toDate();
}
