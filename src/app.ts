import {
  Navigation,
  NavigationFunctionComponent
} from 'react-native-navigation'
import { ActionSheetIOS } from 'react-native'

import Splash from './screens/SplashScreen'
import Login from './screens/Login'
import TermsAndConditions from './screens/TermsAndConditions'
import Register from './screens/Register'
import SecurityPhrase from './screens/SecurityPhrase'
import AccreditationsList from './screens/AccreditationsList'
import AlastriaTokenQrReader from './screens/AlastriaTokenQrReader'
import CredentialShare from './screens/CredentialShare'
import QrReader from './screens/QrReader'
import CredentialPrInfo from './screens/CredentialPrInfo'
import CredentialShareInfo from './screens/CredentialShareInfo'
import AlastriaCreationProcess from './screens/AlastriaIdCreationProcess'
import OnBoarding from './screens/OnBoarding'
import TopBar from './components/TopBar'
import CustomBackButton from './components/CustomBackButton'
import PresentationsList from './screens/PresentationsList'
import HistoricList from './screens/HistoricList'
import Recovery from './screens/Recovery'
import PdfViewer from './screens/PdfViewer'
import ImagenViewer from './screens/ImagenViewer'
import AboutHelp from './screens/AboutHelp'
import LocalStorageService, {
  STORAGE_KEYS
} from './services/LocalStorageService'
import { initStackWithScreen, pushScreen } from './utils/navigation-utils'
import { setupDatabase } from './data/DatabaseInitialization'
import { TOP_BAR } from './constants/text'
import { SCREEN } from './constants/screens'

class Application {
  constructor() {
    this.setupNavigation()
    this.setupORM()
    // Register top bar elements and make sure the last component id is stored
    Navigation.events().registerComponentDidAppearListener((event) =>
      LocalStorageService.storeData(
        STORAGE_KEYS.LAST_COMPONENT_ID,
        event.componentId
      )
    )
    Navigation.events().registerNavigationButtonPressedListener(
      this.navigationButtonPressed
    )
    Navigation.registerComponent(TopBar.name, () => TopBar)
    Navigation.registerComponent(CustomBackButton.name, () => CustomBackButton)
  }

  setupNavigation = () => {
    const screens: Record<string, NavigationFunctionComponent> = {
      Splash,
      Login,
      Register,
      TermsAndConditions,
      SecurityPhrase,
      AccreditationsList,
      AlastriaTokenQrReader,
      QrReader,
      CredentialShare,
      CredentialPrInfo,
      AlastriaCreationProcess,
      OnBoarding,
      PresentationsList,
      HistoricList,
      Recovery,
      CredentialShareInfo,
      PdfViewer,
      ImagenViewer,
      AboutHelp
    }

    Object.keys(screens).map((key: string) => {
      return Navigation.registerComponent(`${key}`, () => screens[key])
    })
  }

  async setupORM() {
    await setupDatabase()
  }

  navigationButtonPressed = async ({
    buttonId,
    componentId
  }: {
    buttonId: string
    componentId: string
  }) => {
    switch (buttonId) {
      case SCREEN.RECOVERY: {
        pushScreen(componentId, buttonId)
        break
      }
      case SCREEN.TERMS_AND_CONDITIONS: {
        pushScreen(componentId, buttonId)
        break
      }
      case SCREEN.ABOUT_HELP: {
        pushScreen(componentId, buttonId)
        break
      }
      case SCREEN.LOGIN: {
        initStackWithScreen(buttonId)
        break
      }
      case 'Options': {
        this.handleIosNavigationButtonPressed(componentId)
        break
      }
    }
  }

  handleIosNavigationButtonPressed = (componentId: string) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          TOP_BAR.CANCEL,
          TOP_BAR.SECURITY_PHRASE,
          TOP_BAR.TERMS,
          TOP_BAR.ABOUT_HELP,
          TOP_BAR.SIGN_OUT
        ],
        destructiveButtonIndex: 4,
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 1: {
            pushScreen(componentId, SCREEN.RECOVERY)
            break
          }
          case 2: {
            pushScreen(componentId, SCREEN.TERMS_AND_CONDITIONS)
            break
          }
          case 3: {
            pushScreen(componentId, SCREEN.ABOUT_HELP)
            break
          }
          case 4: {
            initStackWithScreen(SCREEN.LOGIN)
            break
          }
          default: {
            break
          }
        }
      }
    )
  }

  startAppWithScreen = (screenName: string) => {
    Navigation.events().registerAppLaunchedListener(async () => {
      Navigation.setRoot({
        root: {
          component: {
            name: screenName
          }
        }
      })
    })
  }
}

export default Application
