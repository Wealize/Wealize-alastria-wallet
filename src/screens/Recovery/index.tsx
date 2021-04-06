import React, { useEffect, useState } from 'react'
import FlashMessage from 'react-native-flash-message'
import { NavigationFunctionComponent } from 'react-native-navigation'
import Snackbar from 'react-native-snackbar'

import TouchableButton from '../../components/TouchableButton'
import { GET_EXTERNAL_SCREENS_OPTIONS } from '../../constants/options'
import { RECOVERY } from '../../constants/text'
import { checkSecurityPhrase, changePin } from '../../utils/keychain'
import { NavigationProps, popScreen } from '../../utils/navigation-utils'
import {
  MainContainer,
  Title,
  BackButton,
  Subtitle,
  InputsContainer,
  InputStyled,
  ContainerBottom,
  PhraseInput
} from './styles'

const Recovery: NavigationFunctionComponent = ({
  componentId
}: NavigationProps) => {
  const [securityPhrase, setSecurityPhrase] = useState('')
  const [firstPin, setFirstPin] = useState('')
  const [secondPin, setSecondPin] = useState('')
  const [isPinFilled, setIsPinFilled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const flashMessage: React.RefObject<any> = React.createRef()

  useEffect(() => {
    setIsPinFilled(arePinEquals())
  }, [firstPin, secondPin])

  const setNewPin = async (securityPhrase: string, pin: string) => {
    setIsLoading(true)

    const isCorrectPhrase = await checkSecurityPhrase(securityPhrase)
    isCorrectPhrase ? changePinAndClearForm(pin) : showError()
  }

  const changePinAndClearForm = async (pin: string) => {
    const isChanged = await changePin(pin)
    if (isChanged) {
      clearForm()
      Snackbar.show({
        text: RECOVERY.SUCCESS,
        duration: Snackbar.LENGTH_SHORT
      })
      setIsLoading(false)
    }
  }

  const clearForm = (): void => {
    setSecurityPhrase('')
    setFirstPin('')
    setSecondPin('')
    setIsLoading(false)
  }

  const renderErrorMessage = () => {
    if (firstPin === '' || secondPin === '' || arePinEquals()) {
      return ''
    }
    return RECOVERY.ERROR_PIN
  }

  const arePinEquals = () => {
    return firstPin !== '' && secondPin !== '' && firstPin === secondPin
  }

  const showError = (): void => {
    Snackbar.show({
      text: RECOVERY.ERROR_PHRASE,
      duration: Snackbar.LENGTH_SHORT
    })
    setIsLoading(false)
  }

  return (
    <MainContainer>
      <BackButton
        type="clear"
        title={RECOVERY.BACK}
        onPress={() => popScreen(componentId)}
      />
      <Title>{RECOVERY.TITLE}</Title>
      <Subtitle>{RECOVERY.SUBTITLE}</Subtitle>

      <InputsContainer>
        <PhraseInput
          value={securityPhrase}
          multiline
          placeholder={RECOVERY.FORM_PLACEHOLDER.SECURITY_KEY}
          onChangeText={(value) => setSecurityPhrase(value)}
        />
        <InputStyled
          value={firstPin}
          keyboardType="decimal-pad"
          onChangeText={(value) => setFirstPin(value.replace(/[^0-9]/g, ''))}
          placeholder={RECOVERY.FORM_PLACEHOLDER.PIN}
        />
        <InputStyled
          value={secondPin}
          keyboardType="decimal-pad"
          onChangeText={(value) => setSecondPin(value.replace(/[^0-9]/g, ''))}
          placeholder={RECOVERY.FORM_PLACEHOLDER.REPIN}
          errorMessage={renderErrorMessage()}
        />
      </InputsContainer>

      <ContainerBottom>
        <TouchableButton
          title={isLoading ? RECOVERY.LOADING : RECOVERY.BUTTON}
          disabled={!isPinFilled || isLoading}
          onPress={() => setNewPin(securityPhrase, secondPin)}
        />
      </ContainerBottom>
      <FlashMessage ref={flashMessage} position="top" />
    </MainContainer>
  )
}

Recovery.options = {
  ...GET_EXTERNAL_SCREENS_OPTIONS,
  statusBar: { ...GET_EXTERNAL_SCREENS_OPTIONS.statusBar, style: 'dark' }
}

export default Recovery
