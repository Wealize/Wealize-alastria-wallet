import { BarCodeReadEvent } from 'react-native-camera'
import { Navigation } from 'react-native-navigation'

import { SCREEN } from '../constants/screens'
import { NAVIGATION } from '../constants/text'
import {
  CredentialInfoPayload,
  CredentialRequested
} from '../interfaces/credentialInfo'
import { PresentationRequestPayload } from '../interfaces/presentationRequest'
import { Colors } from './themes'

export interface NavigationProps {
  componentId: string
  lastComponent?: string
  showTopBar?: boolean
  presentationRequest?: PresentationRequestPayload
  credentialInfo?: CredentialInfoPayload
  serviceProviderName?: string
  qrReadEvent?: BarCodeReadEvent
  credentialsRequested?: CredentialRequested[]
  jwtData?: string
  file?: string
}

export const initStackWithScreen = (screenName: string, options?: object) => {
  if (
    screenName === SCREEN.ACCREDITATION_LIST ||
    screenName === SCREEN.PRESENTATION_LIST ||
    screenName === SCREEN.HISTORIC_LIST
  ) {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          options: {
            bottomTabs: {
              titleDisplayMode: 'alwaysShow',
              tabsAttachMode: 'afterInitialTab',
              preferLargeIcons: true,
              currentTabId: screenName
            }
          },
          children: [
            {
              stack: {
                id: SCREEN.ACCREDITATION_LIST,
                children: [
                  {
                    component: {
                      name: SCREEN.ACCREDITATION_LIST,
                      passProps: options
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    icon: require('../assets/img/icon-received-credential.png'),
                    text: NAVIGATION.ACCREDITATION,
                    selectedIconColor: Colors.principalButtons,
                    selectedTextColor: Colors.principalButtons,
                    fontSize: 10,
                    selectedFontSize: 10,
                    fontFamily: 'Mulish-Bold'
                  }
                }
              }
            },
            {
              stack: {
                id: SCREEN.PRESENTATION_LIST,
                children: [
                  {
                    component: {
                      name: SCREEN.PRESENTATION_LIST,
                      passProps: options
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    icon: require('../assets/img/presentations-icon.png'),
                    text: NAVIGATION.ACCESS,
                    selectedIconColor: Colors.principalButtons,
                    selectedTextColor: Colors.principalButtons,
                    fontSize: 10,
                    selectedFontSize: 10,
                    fontFamily: 'Mulish-Bold'
                  }
                }
              }
            },
            {
              stack: {
                id: SCREEN.HISTORIC_LIST,
                children: [
                  {
                    component: {
                      name: SCREEN.HISTORIC_LIST,
                      passProps: options
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    icon: require('../assets/img/history-icon.png'),
                    text: NAVIGATION.HISTORIC,
                    selectedIconColor: Colors.principalButtons,
                    selectedTextColor: Colors.principalButtons,
                    fontSize: 10,
                    selectedFontSize: 10,
                    fontFamily: 'Mulish-Bold'
                  }
                }
              }
            }
          ]
        }
      }
    })
  } else {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: screenName,
                passProps: options
              }
            }
          ]
        }
      }
    })
  }
}

export const setStackRoot = (
  id: string,
  screenName: string,
  options?: object
) => {
  Navigation.setStackRoot(id, {
    component: {
      name: screenName,
      passProps: options
    }
  })
}

export const pushScreen = (
  id: string,
  screenName: string,
  options?: object
) => {
  Navigation.push(id, {
    component: {
      name: screenName,
      passProps: options,
      options: {
        bottomTabs: {
          visible: false
        }
      }
    }
  })
}

export const popScreen = (id: string) => {
  Navigation.pop(id)
}

export const changeTab = (id: string, tabId: string) => {
  Navigation.mergeOptions(id, {
    bottomTabs: {
      currentTabId: tabId
    }
  })
}
