import moment from 'moment'

import {
  DAY_MONTH_YEAR_AND_SECONDS,
  DAY_MONTH_YEAR
} from '../constants/formats'

export const getDateFromMiliseconds = (miliseconds: string) => {
  const date = new Date(Number(miliseconds) * 1000)
  return moment(date).format(DAY_MONTH_YEAR_AND_SECONDS)
}

export const getDate = (miliseconds: string) => {
  const date = new Date(Number(miliseconds) * 1000)
  return moment(date).format(DAY_MONTH_YEAR)
}
