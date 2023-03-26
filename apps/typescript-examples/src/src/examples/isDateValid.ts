import { z } from 'zod'
export function isLeap(year: number): boolean {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}

export function daysInMonth(month: number, year: number): number {
  switch (month) {
    case 2:
      return isLeap(year) ? 29 : 28

    case 4:
    case 6:
    case 9:
    case 11:
      return 30

    default:
      return 31
  }
}

function isMonthValid(month: number): boolean {
  return month >= 1 && month <= 12
}

function isDayValid(year: number, month: number, day: number): boolean {
  return day >= 1 && day <= daysInMonth(month, year)
}

const DateOnly = z.object({
  year: z.number(),
  month: z.number(),
  day: z.number(),
})
type DateOnly = z.infer<typeof DateOnly>

export function isDateValid({ year, month, day }: DateOnly): boolean {
  return year >= 1642 && isMonthValid(month) && isDayValid(year, month, day)
}
