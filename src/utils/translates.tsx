import { GENDERS, GENDER_DEFAULT } from '../constants/genders'
import { Genders } from '../interfaces/genders'

export const translateGender = (gender: string): string => {
  return GENDERS[gender as keyof Genders] || GENDER_DEFAULT
}
