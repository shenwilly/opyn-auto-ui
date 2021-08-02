import { format } from 'date-fns'

export const dateFormat = (date: number | Date, format_: string = 'E, d LLL y') => {
  return format(date, format_);
}