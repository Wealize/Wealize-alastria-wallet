import React, { useState, useEffect } from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'
import Clipboard from '@react-native-community/clipboard'
import FlashMessage from 'react-native-flash-message'

import ViewContainer from '../../components/ViewContainer'
import { ALERT, SECURITY_PHRASE } from '../../constants/text'
import { getSecurityPhrase } from '../../utils/keychain'
import { Colors } from '../../utils/themes'
import {
  ContainerBottom,
  Subtitle,
  StyledButton,
  Title,
  BlurredText,
  BlurredPhrase,
  BlurredContainer,
  TouchableBlurred
} from './styles'
import { IMG } from '../../constants/urlImages'
import autologin from '../../utils/AutoLogin'
import { showSuccessNotification } from '../../utils/notifications'

const SecurityPhrase: NavigationFunctionComponent = (options) => {
  const [copiedPhrase, setCopiedPhrase] = useState('')
  const [showedPhrase, setShowedPhrase] = useState(false)

  const copyAndShow = () => {
    Clipboard.setString(copiedPhrase)
    setShowedPhrase(!showedPhrase)
  }

  const showPin = async () => {
    const pin = await getSecurityPhrase()
    setCopiedPhrase(pin)
  }

  const showFirstNotification = (): void => {
    const isFirstLogin = Object.values(options).includes(true)
    if (isFirstLogin) {
      showSuccessNotification(
        ALERT.CREATION_SUCCESS.TITLE,
        ALERT.CREATION_SUCCESS.SUBTITLE
      )
    }
  }

  useEffect(() => {
    showPin()
    showFirstNotification()
  }, [])

  return (
    <ViewContainer>
      <Title>{SECURITY_PHRASE.TITLE}</Title>
      <Subtitle>{SECURITY_PHRASE.SUBTITLE}</Subtitle>

      <TouchableBlurred onPress={copyAndShow}>
        <BlurredPhrase
          editable={false}
          multiline
          caretHidden
          value={copiedPhrase}
          onChangeText={(copiedPhrase) => setCopiedPhrase(copiedPhrase)}
        />
        {!showedPhrase && (
          <BlurredContainer source={IMG.SECURITY_PHRASE} style={{}}>
            <BlurredText>{SECURITY_PHRASE.HIDDEN_TITLE}</BlurredText>
          </BlurredContainer>
        )}
      </TouchableBlurred>

      <ContainerBottom>
        <StyledButton
          onPress={() => autologin()}
          title={SECURITY_PHRASE.BUTTON}
        />
      </ContainerBottom>
      <FlashMessage position="bottom" />
    </ViewContainer>
  )
}

SecurityPhrase.options = {
  statusBar: {
    backgroundColor: Colors.mainBackground,
    style: 'dark'
  },
  topBar: {
    visible: false,
    elevation: 0, // Remove border in Android
    borderColor: Colors.mainBackground // Remove border in iOS
  }
}

export default SecurityPhrase
