import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import Snackbar from 'react-native-snackbar'

import ActivityIndicatorWidget from '../../components/ActivityIndicatorWidget'
import { EntityData } from '../../interfaces/entityData'
import AlastriaIdentityService from '../../services/AlastriaIdentityService'
import {
  popScreen,
  NavigationProps,
  pushScreen,
  setStackRoot
} from '../../utils/navigation-utils'
import CredentialsService from '../../services/CredentialsService'
import PresentationService from '../../services/PresentationService'
import { PresentationRequestPayload } from '../../interfaces/presentationRequest'
import { Colors } from '../../utils/themes'
import TopBar from '../../components/TopBar'
import CustomBackButton from '../../components/CustomBackButton'
import { CredentialRequest } from '../../interfaces/credentialInfo'
import { SCREEN } from '../../constants/screens'
import {
  ContainerBottom,
  RejectText,
  Subtitle,
  Title,
  ContainerSubtitle,
  SubtitleEntity,
  ScrollViewStyled,
  ViewContainerStyled,
  MainView,
  ContainerTopStyled
} from '../../styles/CommonStyles.styles'
import { CREDENTIAL_PR_INFO, QR } from '../../constants/text'
import TouchableButton from '../../components/TouchableButton'
import { showTypePrText } from '../../utils/translateTypes'

const CredentialPrInfo = ({
  componentId,
  presentationRequest
}: NavigationProps) => {
  const [entityData, setEntityData] = useState<EntityData | null>(null)
  const [loadingCredentials, setLoadingCredentials] = useState(false)
  const [typesNames, setTypesNames] = useState([''])

  useEffect(() => {
    loadEntityData()
  }, [])

  const loadEntityData = async () => {
    try {
      if (presentationRequest) {
        setEntityData(
          await AlastriaIdentityService.getEntityDataFromDid(
            presentationRequest.iss
          )
        )
        showCredential(presentationRequest)
      } else {
        throw new Error("Could't get a presentation request")
      }
    } catch (error) {
      Snackbar.show({
        text: CREDENTIAL_PR_INFO.ERROR.LOAD_ENTITY,
        duration: Snackbar.LENGTH_SHORT
      })
      popScreen(componentId)
    }
  }

  const parseRequestedCredential = (
    credentialString: string,
    required: boolean
  ): CredentialRequest => {
    const parsedCredentialData = {
      id: credentialString,
      required
    }

    return parsedCredentialData
  }

  const getRequestedCredentials = async () => {
    const credentialsRequest = presentationRequest
      ? presentationRequest.pr.data.map((request) =>
          parseRequestedCredential(request.field_name, request.required)
        )
      : []
    try {
      return await CredentialsService.getRequestedCredentials(
        credentialsRequest
      )
    } catch (error) {
      Snackbar.show({
        text: CREDENTIAL_PR_INFO.ERROR.CREDENTIAL,
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }

  const generateAndSendEmptyPresentation = async (
    presentationRequest: PresentationRequestPayload
  ) => {
    const {
      presentationJwt,
      presentationCbu
    } = await PresentationService.createPresentation(presentationRequest, [])
    await PresentationService.sendPresentation(presentationJwt, presentationCbu)
  }

  const shareAskedCredentials = async () => {
    const credentialsRequested = await getRequestedCredentials()

    if (credentialsRequested) {
      pushScreen(componentId, SCREEN.CREDENTIAL_SHARE, {
        presentationRequest: presentationRequest,
        serviceProviderName: entityData?.name,
        credentialsRequested: credentialsRequested
      })
    } else {
      setLoadingCredentials(true)
      try {
        if (presentationRequest) {
          await generateAndSendEmptyPresentation(presentationRequest)
          setStackRoot(componentId, SCREEN.ACCREDITATION_LIST)
        }
      } catch (error) {
        Snackbar.show({
          text: CREDENTIAL_PR_INFO.ERROR.SAHRE,
          duration: Snackbar.LENGTH_SHORT
        })
      }
      setLoadingCredentials(false)
    }
  }

  const showCredential = (presentationRequest: PresentationRequestPayload) => {
    const dataPR = presentationRequest?.pr.data.map(
      (presentation) => presentation.field_name
    )
    setTypesNames(dataPR)
  }

  const showVariousTypes = (name: string, index: number) => {
    if (index > 0) {
      return `, ${showTypePrText(name)}`
    }
    return showTypePrText(name)
  }

  return (
    <MainView>
      <ViewContainerStyled>
        {entityData && !loadingCredentials ? (
          <ScrollViewStyled>
            <ContainerTopStyled>
              <Title>{CREDENTIAL_PR_INFO.TITLE}</Title>
              <RejectText
                onPress={() => {
                  setStackRoot(componentId, SCREEN.ACCREDITATION_LIST)
                }}
              >
                {CREDENTIAL_PR_INFO.REJECT}
              </RejectText>
            </ContainerTopStyled>

            <ContainerSubtitle>
              <Subtitle>
                <SubtitleEntity>
                  {entityData?.name} con {entityData?.cif}
                </SubtitleEntity>{' '}
                <Text>{CREDENTIAL_PR_INFO.SUBTITLE}</Text>{' '}
                <SubtitleEntity>
                  {typesNames.map((name, index) =>
                    showVariousTypes(name, index)
                  )}
                </SubtitleEntity>
              </Subtitle>
            </ContainerSubtitle>

            <ContainerBottom>
              <TouchableButton
                title={
                  loadingCredentials
                    ? CREDENTIAL_PR_INFO.LOADING
                    : CREDENTIAL_PR_INFO.BUTTON
                }
                disabled={loadingCredentials}
                onPress={async () => {
                  await shareAskedCredentials()
                }}
              />
            </ContainerBottom>
          </ScrollViewStyled>
        ) : (
          <ActivityIndicatorWidget />
        )}
      </ViewContainerStyled>
    </MainView>
  )
}

CredentialPrInfo.options = {
  statusBar: {
    backgroundColor: Colors.principalDark
  },
  topBar: {
    visible: true,
    elevation: 0, // Remove border in Android
    borderColor: 'white', // Remove border in iOS
    background: {
      component: {
        name: TopBar.name,
        passProps: {
          title: QR.TITLE
        }
      }
    },
    rightButtons: [
      {
        id: CustomBackButton.name,
        text: QR.TRY,
        component: {
          name: CustomBackButton.name,
          passProps: {
            text: QR.TRY
          }
        }
      }
    ],
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

export default CredentialPrInfo
