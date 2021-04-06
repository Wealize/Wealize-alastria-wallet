import React from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { useWindowDimensions } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { BarCodeReadEvent, RNCamera } from 'react-native-camera'

import { NavigationProps, setStackRoot } from '../../utils/navigation-utils'
import QrCustomMarker from '../../components/QrCustomMarker'
import { REGISTER } from '../../constants/text'
import { Colors } from '../../utils/themes'
import { IMG } from '../../constants/urlImages'
import { SCREEN } from '../../constants/screens'

const REACTIVATE_TIMEOUT_MS = 5000

const AlastriaTokenQrReader: NavigationFunctionComponent = ({
  componentId
}: NavigationProps) => {
  const window = useWindowDimensions()

  const onSuccess = async (qrReadEvent: BarCodeReadEvent) => {
    setStackRoot(componentId, SCREEN.ALASTRIA_CREATION_PROCESS, {
      qrReadEvent
    })
  }

  return (
    <QRCodeScanner
      cameraStyle={{
        flex: 1,
        justifyContent: 'center',
        width: window.width,
        height: window.height
      }}
      onRead={onSuccess}
      reactivate
      reactivateTimeout={REACTIVATE_TIMEOUT_MS}
      showMarker
      cameraProps={{ flashMode: RNCamera.Constants.FlashMode.auto }}
      customMarker={<QrCustomMarker subtitle={REGISTER.QR_SUBTITLE} />}
    />
  )
}

AlastriaTokenQrReader.options = {
  topBar: {
    visible: true,
    drawBehind: true,
    backButton: {
      color: Colors.textButton,
      icon: IMG.BACKWARD
    },
    elevation: 0, // Remove border in Android
    noBorder: true,
    background: {
      color: 'transparent',
      translucent: true,
      blur: false
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

export default AlastriaTokenQrReader
