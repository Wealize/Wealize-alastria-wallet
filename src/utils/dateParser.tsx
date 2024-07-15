export const numericDateToTime = (numberInString: string) => {
  return new Date(parseInt(numberInString) * 1000)
}


export function convertToTitleCase(text: string) {

  const words = text?.split("_") || [text]

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1)
  }

  return words.join(" ")
}