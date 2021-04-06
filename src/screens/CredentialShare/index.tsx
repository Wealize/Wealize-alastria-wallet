import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import Snackbar from 'react-native-snackbar'

import {
  CredentialCheckBox,
  CredentialShareCheckboxData
} from '../../interfaces/checkbox'
import { PresentationRequestPayload } from '../../interfaces/presentationRequest'
import PresentationService from '../../services/PresentationService'
import {
  NavigationProps,
  initStackWithScreen
} from '../../utils/navigation-utils'
import TopBar from '../../components/TopBar'
import { Colors } from '../../utils/themes'
import CredentialsService from '../../services/CredentialsService'
import { SCREEN } from '../../constants/screens'
import { CREDENTIAL_SHARE_PR, QR } from '../../constants/text'
import { MainView } from '../../styles/CommonStyles.styles'
import {
  FlatListFooter,
  FlatListHeader,
  FlatListItemSeparator,
  FlatListRenderItem
} from '../../components/CustomFlatList'
import { ContainerStyled, FlatListStyle } from './styles'
import { AlertWithOutButtonDissmissable } from '../../utils/Alerts'
import { checkCredentialType } from '../../utils/checkTypes'
import { useGlobalState } from '../../context/Actions/ActionContext'

const CredentialShare = ({
  presentationRequest,
  serviceProviderName,
  credentialsRequested
}: NavigationProps) => {
  const [dataCredentials] = useGlobalState('dataCredentials')
  const [checkboxData, setCheckboxData] = useState<CredentialCheckBox[]>([])
  const [selectedCredential, setSelectedCredential] = useState<
    CredentialShareCheckboxData[]
  >([])
  const [requiredRequests, setRequiredRequests] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadMatchesRequest()
    loadRequiredRequest()
  }, [])

  const loadMatchesRequest = async () => {
    if (!credentialsRequested) return
    const selectedCredentials = dataCredentials.filter((data) =>
      credentialsRequested
        .map((dataCredential) => {
          return CredentialsService.getCredentialType(dataCredential.credential)
        })
        .includes(checkCredentialType(data))
    )

    const credentialCheckbox = selectedCredentials.map((credential, index) => {
      return { ...credential, id: index, checked: false }
    })
    setCheckboxData(credentialCheckbox)
  }

  const loadRequiredRequest = () => {
    if (!credentialsRequested) return
    const credentialsRequired = credentialsRequested
      .map((dataCredential) => {
        return dataCredential.required
          ? CredentialsService.getCredentialType(dataCredential.credential)
          : ''
      })
      .filter((required) => required !== '')
    setRequiredRequests(credentialsRequired)
  }

  const handleCheckBoxClick = (data: CredentialCheckBox) => {
    const newCheckboxData: CredentialCheckBox[] = Object.assign(
      [],
      checkboxData
    )
    newCheckboxData[data.id].checked = !newCheckboxData[data.id].checked
    newCheckboxData.map((checkbox) => {
      if (checkbox.key === data.key && checkbox.id !== data.id) {
        newCheckboxData[checkbox.id].checked = false
      }
      return null
    })
    selectedData(newCheckboxData)
    setCheckboxData(newCheckboxData)
  }

  const selectedData = (newCheckboxData: CredentialCheckBox[]) => {
    const selectedCredentialData = newCheckboxData
      .map((credential) =>
        credential.checked
          ? { type: checkCredentialType(credential), data: credential.data }
          : { type: '', data: '' }
      )
      .filter((credential) => credential.data !== '')

    setSelectedCredential(selectedCredentialData)
  }

  const shareCredentials = async () => {
    setIsLoading(true)

    if (presentationRequest && selectedCredential) {
      await generateAndSendPresentation(
        presentationRequest,
        selectedCredential.map((credential) => credential.data)
      )
    } else {
      Snackbar.show({
        text: CREDENTIAL_SHARE_PR.ERROR.SHARE,
        duration: Snackbar.LENGTH_SHORT
      })
    }
    setIsLoading(false)
  }

  const generateAndSendPresentation = async (
    presentationRequest: PresentationRequestPayload,
    credentials: string[]
  ) => {
    try {
      const {
        presentationJwt,
        presentationCbu
      } = await PresentationService.createPresentation(
        presentationRequest,
        credentials
      )
      await PresentationService.sendPresentation(
        presentationJwt,
        presentationCbu
      )
      await PresentationService.storePresentation(
        presentationJwt,
        presentationCbu
      )

      AlertWithOutButtonDissmissable(
        CREDENTIAL_SHARE_PR.ALERT.TITLE,
        `${CREDENTIAL_SHARE_PR.ALERT.SUBTITLE} ${serviceProviderName} \n`
      )

      initStackWithScreen(SCREEN.ACCREDITATION_LIST)
    } catch (error) {
      Snackbar.show({
        text: CREDENTIAL_SHARE_PR.ERROR.PRESENTATION,
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }

  return (
    <MainView>
      <ContainerStyled>
        <FlatList
          ListHeaderComponent={
            <FlatListHeader
              serviceProviderName={serviceProviderName}
              requiredRequests={requiredRequests}
              selectedCredential={selectedCredential}
            />
          }
          data={checkboxData}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={FlatListStyle.container}
          renderItem={({ item, index }) => (
            <FlatListRenderItem
              item={item}
              onPress={() => {
                handleCheckBoxClick(checkboxData[index])
              }}
            />
          )}
          ItemSeparatorComponent={() => <FlatListItemSeparator />}
          ListFooterComponentStyle={FlatListStyle.footer}
          ListFooterComponent={
            <FlatListFooter
              title={
                isLoading
                  ? CREDENTIAL_SHARE_PR.LOADING
                  : CREDENTIAL_SHARE_PR.BUTTON
              }
              loading={isLoading}
              disabled={
                selectedCredential.length < requiredRequests.length || isLoading
              }
              onPress={() => {
                shareCredentials()
              }}
            />
          }
        />
      </ContainerStyled>
    </MainView>
  )
}

CredentialShare.options = {
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

export default CredentialShare
