import React, { useEffect } from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { BarCodeReadEvent } from 'react-native-camera'
import Snackbar from 'react-native-snackbar'

import { NavigationProps, setStackRoot } from '../../utils/navigation-utils'
import LocalStorageService, {
  STORAGE_KEYS
} from '../../services/LocalStorageService'
import AlastriaIdentityService from '../../services/AlastriaIdentityService'
import {
  ProcessActivityIndicator,
  ProcessContainer,
  ProcessText
} from './styles'
import { Colors } from '../../utils/themes'
import { QR, REGISTER } from '../../constants/text'
import { SCREEN } from '../../constants/screens'

const AlastriaIdCreationProcess: NavigationFunctionComponent = ({
  componentId,
  qrReadEvent
}: NavigationProps) => {
  useEffect(() => {
    if (qrReadEvent) alastriaIdCreationProcess(qrReadEvent)
  }, [])

  const alastriaIdCreationProcess = async (qrReadEvent: BarCodeReadEvent) => {
    try {
      await AlastriaIdentityService.createAlastriaId(qrReadEvent)

      if (await LocalStorageService.getBool(STORAGE_KEYS.IS_DID_CREATED)) {
        setStackRoot(componentId, SCREEN.SECURITY_PHRASE, { firstLogin: true })
      } else {
        Snackbar.show({
          text: REGISTER.ERROR_SAVE,
          duration: Snackbar.LENGTH_SHORT
        })
        setStackRoot(componentId, SCREEN.ALASTRIA_TOKEN_QR_READER)
      }
    } catch (error) {
      Snackbar.show({
        text: QR.ERROR,
        duration: Snackbar.LENGTH_SHORT
      })
      setStackRoot(componentId, SCREEN.ALASTRIA_TOKEN_QR_READER)
    }
  }

  return (
    <ProcessContainer>
      <ProcessActivityIndicator size={80} color={Colors.indicatorLoading} />
      <ProcessText style={{ textAlign: 'center' }}>
        {REGISTER.CREATING_DID}
      </ProcessText>
    </ProcessContainer>
  )
}

AlastriaIdCreationProcess.options = {
  statusBar: {
    backgroundColor: Colors.mainBackground,
    style: 'dark'
  },
  topBar: {
    visible: false
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

export default AlastriaIdCreationProcess
