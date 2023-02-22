import dayjs from 'dayjs'

export const thisYear = (year: number) => {
  const d = dayjs(new Date(year, 1, 1))
  return { gte: d.startOf('year').toDate(), lte: d.endOf('year').toDate() }
}
