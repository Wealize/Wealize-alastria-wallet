import { Alert } from 'react-native'

export const AlertWithOutButton = (title: string, subtitle: string) =>
  Alert.alert(title, subtitle, [])

export const AlertWithOutButtonDissmissable = (
  title: string,
  subtitle: string
) =>
  Alert.alert(title, subtitle, [], {
    cancelable: true
  })

export const AlertWithTwoButton = (
  title: string,
  subtitle: string,
  onPressOk?: Function,
  onPressCancel?: Function
) =>
  Alert.alert(title, subtitle, [
    {
      text: 'Cancelar',
      onPress: () => onPressCancel || console.log('Cancel Pressed'),
      style: 'cancel'
    },
    {
      text: 'Permitir',
      onPress: () => onPressOk || console.log('OK Pressed'),
      style: 'default'
    }
  ])

export const AlertWithThreeButton = (
  title: string,
  subtitle: string,
  onPressOk?: Function,
  onPressCancel?: Function,
  onPressOther?: Function
) =>
  Alert.alert(title, subtitle, [
    {
      text: 'Ask me later',
      onPress: () => onPressOther || console.log('Other Pressed')
    },
    {
      text: 'Cancelar',
      onPress: () => onPressCancel || console.log('Cancel Pressed'),
      style: 'cancel'
    },
    { text: 'Permitir', onPress: () => onPressOk || console.log('OK Pressed') }
  ])
