import { showMessage } from 'react-native-flash-message'

import { Colors } from './themes'

export const showSuccessNotification = (message: string, description: string) => {
  showMessage({
    message: message,
    description: description,
    icon: 'success',
    floating: true,
    style: {
      backgroundColor: Colors.notificationSuccess,
      marginBottom: 150,
      paddingTop: 30,
      paddingBottom: 20
    },
    titleStyle: {
      color: Colors.notificationText,
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 8
    },
    textStyle: {
      color: Colors.notificationText
    },
    duration: 2300
  })
}
