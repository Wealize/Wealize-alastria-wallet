import React from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { useWindowDimensions } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { BarCodeReadEvent, RNCamera } from 'react-native-camera'
import Snackbar from 'react-native-snackbar'

import {
  NavigationProps,
  pushScreen,
} from '../../utils/navigation-utils'
import PresentationService from '../../services/PresentationService'
import QrCustomMarker from '../../components/QrCustomMarker'
import { Colors } from '../../utils/themes'
import { QR } from '../../constants/text'
import { PresentationRequest } from '../../interfaces/presentationRequest'
import ApiClient from '../../services/ApiClient'
import { CredentialQrData, AlastriaTokenQrData } from '../../interfaces/qrData'
import { SCREEN } from '../../constants/screens'
import AlastriaIdentityService from '../../services/AlastriaIdentityService'
import AlastriaTokenService from '../../services/AlastriaTokenService'

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
      const jwtData = qrReadEvent.data
      const decodeJWT = AlastriaTokenService.decode(jwtData)
      // @ts-ignore
      const type = decodeJWT.payload.type[1]
      // This code was changed. It is not really linking to an organization, it is styarting the proces of requesting a Credential Issuance or a Presentation request
      if (jwtData) {
        // Discriminate depending of the type received in payload
        if (type === 'US221') {
          // TODO: rename function in service
          const response = await AlastriaIdentityService.linkToOrganization(qrReadEvent, type)

          response.verifiableCredential.forEach((credential: string) => {
            const decodedJWT = PresentationService.decodePresentationRequest(credential)
            checkPayloadType(decodedJWT, credential)
          })
          Snackbar.dismiss()
          return
        } else {

          const response = await AlastriaIdentityService.linkToOrganization(qrReadEvent, type);

          (async () => {
            if (response.presentationRequest.length > 0) {
              const presentation = response.presentationRequest[0]
              const decodedJWT = PresentationService.decodePresentationRequest(presentation)

              const serviceProviderPublicKey = await PresentationService.getPublicKeyFromDid(decodedJWT)

              if (PresentationService.verify(jwtData, serviceProviderPublicKey)) {
                checkPayloadType(decodedJWT, presentation)
              }
            }
          })()

        }
      }

      Snackbar.dismiss()
    } catch (error) {
      Snackbar.show({
        text: QR.ERROR,
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }

  // Unused functions for now. LinkTo Organization is actually Getting a credential
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
    console.log(JSON.stringify(decodedJWT.payload, null, 2))
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
