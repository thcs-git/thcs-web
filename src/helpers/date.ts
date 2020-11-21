const daysOfWeek = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

export const getDayOfTheWeekName = (dayOfTheWeek: number) => {
  return daysOfWeek[dayOfTheWeek];
}
