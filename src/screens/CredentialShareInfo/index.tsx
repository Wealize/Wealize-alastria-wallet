import React, { useEffect, useState } from 'react'
import Snackbar from 'react-native-snackbar'

import ActivityIndicatorWidget from '../../components/ActivityIndicatorWidget'
import { EntityData } from '../../interfaces/entityData'
import AlastriaIdentityService from '../../services/AlastriaIdentityService'
import {
  popScreen,
  NavigationProps,
  setStackRoot
} from '../../utils/navigation-utils'
import { Colors } from '../../utils/themes'
import TopBar from '../../components/TopBar'
import CustomBackButton from '../../components/CustomBackButton'
import {
  ContainerBottom,
  RejectText,
  ContainerSubtitle,
  Title,
  SubtitleEntity,
  SubtitleType,
  Subtitle,
  MainView,
  ViewContainerStyled,
  ScrollViewStyled,
  ContainerTopStyled
} from '../../styles/CommonStyles.styles'
import TouchableButton from '../../components/TouchableButton'
import { CREDENTIAL_SHARE_INFO, QR } from '../../constants/text'
import { CredentialRepository } from '../../data/CredentialRepository'
import { AlertWithOutButtonDissmissable } from '../../utils/Alerts'
import {
  CredentialData,
  CredentialInfoPayload
} from '../../interfaces/credentialInfo'
import { SCREEN } from '../../constants/screens'
import { showDocumentFileType, showTypeText } from '../../utils/translateTypes'
import { HistoricRepository } from '../../data/HistoricRepository'
import { CREDENTIAL } from '../../constants/actionTypes'
import { useGlobalState } from '../../context/Actions/ActionContext'
import CredentialsService from '../../services/CredentialsService'

const CredentialShareInfo = ({
  componentId,
  credentialInfo,
  jwtData
}: NavigationProps) => {
  const [dataCredentials] = useGlobalState('dataCredentials')
  const [entityData, setEntityData] = useState<EntityData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const credentialSubjectInfo = credentialInfo?.vc.credentialSubject.victimInfo
  const { info_type: infoType } = credentialSubjectInfo || {}

  useEffect(() => {
    loadEntityData()
  }, [])

  const loadEntityData = async () => {
    try {
      if (credentialInfo) {
        setEntityData(
          await AlastriaIdentityService.getEntityDataFromDid(credentialInfo.iss)
        )
      } else {
        throw new Error('Couldn´t get a presentation request')
      }
    } catch (error) {
      Snackbar.show({
        text: CREDENTIAL_SHARE_INFO.ERRROR.ENTITY,
        duration: Snackbar.LENGTH_SHORT
      })
      popScreen(componentId)
    }
  }

  const checkCredentialExistInDevice = (): boolean => {
    if (!jwtData) return false
    return dataCredentials
      .map((credential) => credential.data)
      .includes(jwtData)
  }

  const saveCredentialInDevice = async () => {
    setIsLoading(true)

    if (checkCredentialExistInDevice()) {
      AlertWithOutButtonDissmissable(
        CREDENTIAL_SHARE_INFO.ALERT.EXIST.TITLE,
        CREDENTIAL_SHARE_INFO.ALERT.EXIST.SUBTITLE
      )
      setStackRoot(componentId, SCREEN.ACCREDITATION_LIST)
    } else {
      try {
        if (credentialInfo && entityData && jwtData) {
          await CredentialRepository.saveCredential(
            parsedCredential(credentialInfo, entityData)
          )
          await CredentialsService.registerInBlockchain([jwtData])
          AlertWithOutButtonDissmissable(
            CREDENTIAL_SHARE_INFO.ALERT.SUCCESS.TITLE,
            CREDENTIAL_SHARE_INFO.ALERT.SUCCESS.SUBTITLE
          )
          setStackRoot(componentId, SCREEN.ACCREDITATION_LIST)

          saveCredentialInHistorics(credentialInfo, entityData)
        }
      } catch (error) {
        Snackbar.show({
          text: CREDENTIAL_SHARE_INFO.ERRROR.SAVE,
          duration: Snackbar.LENGTH_SHORT
        })
      }
    }
    setIsLoading(false)
  }

  const parsedCredential = (
    credentialInfo: CredentialInfoPayload,
    entityData: EntityData
  ): CredentialData => {
    return {
      issuerCif: entityData.cif,
      issuerName: entityData.name,
      issuerDid: credentialInfo.iss,
      data: jwtData || '',
      key: infoType || '',
      value: JSON.stringify(credentialSubjectInfo),
      created: String(credentialInfo.iat)
    }
  }

  const saveCredentialInHistorics = async (
    credentialInfo: CredentialInfoPayload,
    entityData: EntityData
  ) => {
    if (credentialInfo) {
      const { created, issuerName, data, key } = parsedCredential(
        credentialInfo,
        entityData
      )
      await HistoricRepository.saveHistoric({
        data: data,
        datetime: created,
        entity: issuerName,
        type: CREDENTIAL.SAVE.TYPE,
        infoType: key,
        description: CREDENTIAL.SAVE.DESCRIPTION
      })
    }
  }

  return (
    <MainView>
      <ViewContainerStyled>
        {entityData ? (
          <ScrollViewStyled>
            <ContainerTopStyled>
              <Title>{CREDENTIAL_SHARE_INFO.TITLE}</Title>
              <RejectText
                onPress={() => {
                  setStackRoot(componentId, SCREEN.ACCREDITATION_LIST)
                }}
              >
                {CREDENTIAL_SHARE_INFO.REJECT}
              </RejectText>
            </ContainerTopStyled>

            <ContainerSubtitle>
              <Subtitle>
                <SubtitleEntity>{entityData?.name}</SubtitleEntity>{' '}
                {CREDENTIAL_SHARE_INFO.SUBTITLE}
              </Subtitle>
              <SubtitleType>
                {showTypeText(infoType)}{' '}
                {credentialSubjectInfo &&
                  showDocumentFileType(credentialSubjectInfo)}
              </SubtitleType>
            </ContainerSubtitle>

            <ContainerBottom>
              <TouchableButton
                title={
                  isLoading
                    ? CREDENTIAL_SHARE_INFO.LOADING
                    : CREDENTIAL_SHARE_INFO.BUTTON
                }
                disabled={isLoading}
                onPress={() => saveCredentialInDevice()}
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

CredentialShareInfo.options = {
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

export default CredentialShareInfo
