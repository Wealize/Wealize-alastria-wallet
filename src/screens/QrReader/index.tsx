import React from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { useWindowDimensions } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { BarCodeReadEvent, RNCamera } from 'react-native-camera'
import Snackbar from 'react-native-snackbar'

import {
  NavigationProps,
  pushScreen,
  setStackRoot
} from '../../utils/navigation-utils'
import PresentationService from '../../services/PresentationService'
import QrCustomMarker from '../../components/QrCustomMarker'
import { Colors } from '../../utils/themes'
import { ALERT, QR } from '../../constants/text'
import { PresentationRequest } from '../../interfaces/presentationRequest'
import ApiClient from '../../services/ApiClient'
import { CredentialQrData, AlastriaTokenQrData } from '../../interfaces/qrData'
import { SCREEN } from '../../constants/screens'
import AlastriaIdentityService from '../../services/AlastriaIdentityService'
import { AlertWithOutButtonDissmissable } from '../../utils/Alerts'

const REACTIVATE_TIMEOUT_MS = 5000

const QrReader: NavigationFunctionComponent = ({
  componentId
}: NavigationProps) => {
  const window = useWindowDimensions()

  const onSuccess = async (qrReadEvent: BarCodeReadEvent) => {
    try {
      Snackbar.show({
        text: QR.LOADING,
        duration: Snackbar.LENGTH_INDEFINITE
      })
      let jwtData = qrReadEvent.data
      // Only credentials and alastria token are json
      if (isJson(jwtData)) {
        if (isAlastriaToken(qrReadEvent)) {
          await AlastriaIdentityService.linkToOrganization(qrReadEvent)
          AlertWithOutButtonDissmissable(
            ALERT.LINKING_SUCCESS.TITLE,
            ALERT.LINKING_SUCCESS.SUBTITLE
          )
          Snackbar.dismiss()
          setStackRoot(componentId, SCREEN.ACCREDITATION_LIST)
          return
        } else {
          jwtData = await getCredentialWithSecret(qrReadEvent)
        }
      }
      const decodedJWT = PresentationService.decodePresentationRequest(jwtData)
      const serviceProviderPublicKey = await PresentationService.getPublicKeyFromDid(
        decodedJWT
      )

      if (PresentationService.verify(jwtData, serviceProviderPublicKey)) {
        checkPayloadType(decodedJWT, jwtData)
      }
      Snackbar.dismiss()
    } catch (error) {
      Snackbar.show({
        text: QR.ERROR,
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }

  const isJson = (str: string) => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  const isAlastriaToken = (qrReadEvent: BarCodeReadEvent) => {
    // eslint-disable-next-line camelcase
    const { subject_id, token }: AlastriaTokenQrData = JSON.parse(
      qrReadEvent.data
    )
    // eslint-disable-next-line camelcase
    return subject_id && token
  }

  const getCredentialWithSecret = async (qrReadEvent: BarCodeReadEvent) => {
    const { cbu, id, secret }: CredentialQrData = JSON.parse(qrReadEvent.data)
    const response = await ApiClient.post(cbu, {
      id,
      secret
    })

    return response.credential
  }

  const checkPayloadType = (
    decodedJWT: PresentationRequest,
    jwtData: string
  ) => {
    if (decodedJWT.payload.pr) {
      pushScreen(componentId, SCREEN.CREDENTIAL_PR_INFO, {
        presentationRequest: decodedJWT.payload
      })
    }
    if (decodedJWT.payload.vc) {
      pushScreen(componentId, SCREEN.CREDENTIAL_SHARE_INFO, {
        credentialInfo: decodedJWT.payload,
        jwtData
      })
    }
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
      customMarker={<QrCustomMarker subtitle={QR.ADD_DID} />}
    />
  )
}

QrReader.options = {
  topBar: {
    visible: true,
    drawBehind: true,
    title: {
      text: QR.BACKWARD,
      color: Colors.textButton,
      fontSize: 14,
      fontFamily: 'Mulish-Regular'
    },
    backButton: {
      color: Colors.textButton,
      icon: require('../../assets/img/icon-angle.png')
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

export default QrReader
