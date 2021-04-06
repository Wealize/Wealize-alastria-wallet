export const numericDateToTime = (numberInString: string) => {
  return new Date(parseInt(numberInString) * 1000)
}
