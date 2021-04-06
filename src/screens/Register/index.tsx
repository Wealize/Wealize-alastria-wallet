import React, { useState, useEffect } from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'

import { createEncryptedWallet } from '../../services/WalletService'
import LocalStorageService, {
  STORAGE_KEYS
} from '../../services/LocalStorageService'
import { NavigationProps, setStackRoot } from '../../utils/navigation-utils'
import {
  ContainerBottom,
  InputsContainer,
  Subtitle,
  Title,
  MainContainer,
  TermsCheckBox,
  InputStyled,
  TermsText,
  SplashActivityIndicator
} from './styles'
import { REGISTER } from '../../constants/text'
import { Colors } from '../../utils/themes'
import TouchableButton from '../../components/TouchableButton'
import { SCREEN } from '../../constants/screens'

const Register: NavigationFunctionComponent = ({
  componentId
}: NavigationProps) => {
  const [isPinFilled, setIsPinFilled] = useState(true)
  const [firstPin, setFirstPin] = useState('')
  const [secondPin, setSecondPin] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTermsCheckboxChecked, setIsTermsCheckboxChecked] = useState(false)

  useEffect(() => {
    arePinEquals() ? setIsPinFilled(false) : setIsPinFilled(true)
  }, [firstPin, secondPin])

  useEffect(() => {
    if (isLoading) {
      createWallet()
    }
  }, [isLoading])

  const arePinEquals = () => {
    return firstPin !== '' && secondPin !== '' && firstPin === secondPin
  }

  const createWallet = async () => {
    await createEncryptedWallet(firstPin)
    await LocalStorageService.storeBool(STORAGE_KEYS.IS_WALLET_CREATED, true)

    setIsLoading(false)
    setStackRoot(componentId, SCREEN.ALASTRIA_TOKEN_QR_READER)
  }

  const renderErrorMessage = () => {
    if (firstPin === '' || secondPin === '' || arePinEquals()) {
      return ''
    }
    return REGISTER.ERROR
  }

  return (
    <MainContainer>
      <Title>{REGISTER.TITLE}</Title>
      <Subtitle>{REGISTER.SUBTITLE}</Subtitle>

      <InputsContainer>
        <InputStyled
          value={firstPin}
          keyboardType="decimal-pad"
          onChangeText={(value) => setFirstPin(value.replace(/[^0-9]/g, ''))}
          placeholder={REGISTER.PIN}
        />
        <InputStyled
          value={secondPin}
          keyboardType="decimal-pad"
          onChangeText={(value) => setSecondPin(value.replace(/[^0-9]/g, ''))}
          placeholder={REGISTER.SECOND_PIN}
          errorMessage={renderErrorMessage()}
        />
        <TermsCheckBox
          title={
            <TermsText
              onPress={() =>
                setStackRoot(componentId, SCREEN.TERMS_AND_CONDITIONS, {
                  lastComponent: SCREEN.REGISTER
                })
              }
            >
              {REGISTER.CONDITIONS}
            </TermsText>
          }
          checked={isTermsCheckboxChecked}
          onPress={() => {
            setIsTermsCheckboxChecked(!isTermsCheckboxChecked)
          }}
        />
      </InputsContainer>

      <ContainerBottom>
        {isLoading ? (
          <SplashActivityIndicator size={35} color={Colors.indicatorLoading} />
        ) : null}
        <TouchableButton
          title={isLoading ? REGISTER.LOADING : REGISTER.BUTTON}
          disabled={isPinFilled || !isTermsCheckboxChecked || isLoading}
          onPress={() => {
            setIsLoading(true)
          }}
        />
      </ContainerBottom>
    </MainContainer>
  )
}

Register.options = {
  statusBar: {
    backgroundColor: Colors.mainBackground,
    style: 'dark'
  },
  topBar: {
    visible: false,
    elevation: 0, // Remove border in Android
    borderColor: Colors.mainBackground // Remove border in iOS
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

export default Register
