import { Platform } from 'react-native'

import TopBar from '../components/TopBar'
import { Colors } from '../utils/themes'
import { SCREEN } from './screens'
import { TOP_BAR } from './text'

const ANDROID_RIGHT_BUTTON_OPTIONS = [
  {
    text: TOP_BAR.SIGN_OUT,
    id: SCREEN.LOGIN,
    showAsAction: 'never'
  },
  {
    text: TOP_BAR.ABOUT_HELP,
    id: SCREEN.ABOUT_HELP,
    showAsAction: 'never'
  },
  {
    text: TOP_BAR.TERMS,
    id: SCREEN.TERMS_AND_CONDITIONS,
    showAsAction: 'never'
  },
  {
    text: TOP_BAR.SECURITY_PHRASE,
    id: SCREEN.RECOVERY,
    showAsAction: 'never'
  }
]

const IOS_RIGHT_BUTTON_OPTIONS = [
  {
    text: 'Opciones',
    id: 'Options',
    icon: require('../assets/img/more-icon.png')
  }
]

export const GET_MAIN_SCREENS_OPTIONS = (title: string) => {
  return {
    statusBar: {
      backgroundColor: Colors.principalDark
    },
    topBar: {
      visible: true,
      elevation: 0, // Remove border in Android
      borderColor: Colors.mainBackground, // Remove border in iOS
      background: {
        component: {
          name: TopBar.name,
          passProps: {
            title: title
          }
        }
      },
      rightButtonColor: Colors.mainBackground,
      rightButtons:
        Platform.OS === 'android'
          ? ANDROID_RIGHT_BUTTON_OPTIONS
          : IOS_RIGHT_BUTTON_OPTIONS,
      backButton: {
        visible: false
      }
    },
    animations: {
      push: {
        content: {
          translationX: {
            from: require('react-native').Dimensions.get('window').width,
            to: 0,
            duration: 300
          }
        }
      },
      pop: {
        content: {
          translationX: {
            from: 0,
            to: require('react-native').Dimensions.get('window').width,
            duration: 300
          }
        }
      }
    }
  }
}

export const GET_EXTERNAL_SCREENS_OPTIONS = {
  statusBar: {
    backgroundColor: Colors.mainBackground
  },
  topBar: {
    visible: false,
    elevation: 0, // Remove border in Android
    borderColor: Colors.mainBackground, // Remove border in iOS
    backButton: {
      visible: false
    }
  },
  animations: {
    push: {
      content: {
        translationX: {
          from: require('react-native').Dimensions.get('window').width,
          to: 0,
          duration: 300
        }
      }
    }
  }
}
