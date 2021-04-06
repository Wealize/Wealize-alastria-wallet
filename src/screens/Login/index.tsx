import React, { useState } from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'
import FlashMessage, { showMessage } from 'react-native-flash-message'

import {
  initStackWithScreen,
  NavigationProps,
  pushScreen
} from '../../utils/navigation-utils'
import LocalStorageService, {
  STORAGE_KEYS
} from '../../services/LocalStorageService'
import { checkPin } from '../../utils/keychain'
import {
  ContainerBottom,
  Title,
  InputsContainer,
  InputStyled,
  MainContainer,
  RecoveryButton
} from './styles'
import { Colors } from '../../utils/themes'
import { LOGIN, REGISTER } from '../../constants/text'
import TouchableButton from '../../components/TouchableButton'
import { SCREEN } from '../../constants/screens'

const Login: NavigationFunctionComponent = ({
  componentId
}: NavigationProps) => {
  const [pin, setPin] = useState('')

  const login = async () => {
    const IS_DID_CREATED = await LocalStorageService.getBool(
      STORAGE_KEYS.IS_DID_CREATED
    )

    if (IS_DID_CREATED) {
      initStackWithScreen(SCREEN.ACCREDITATION_LIST)
    } else {
      pushScreen(componentId, SCREEN.ALASTRIA_TOKEN_QR_READER)
    }
  }

  const showError = (): void => {
    showMessage({
      message: LOGIN.ERROR,
      floating: true,
      style: {
        backgroundColor: Colors.error,
        alignItems: 'center'
      }
    })
  }

  return (
    <MainContainer>
      {/* TODO - ENLAZAR BUTTON CON RECUPERACION DE CUENTA */}
      <RecoveryButton
        type="clear"
        title={REGISTER.RECOVERY}
        onPress={() => pushScreen(componentId, SCREEN.RECOVERY)}
      />
      <Title>{LOGIN.TITLE}</Title>
      <InputsContainer>
        <InputStyled
          value={pin}
          keyboardType="decimal-pad"
          onChangeText={(value) => setPin(value.replace(/[^0-9]/g, ''))}
          placeholder={LOGIN.PIN}
        />
      </InputsContainer>

      <ContainerBottom>
        <TouchableButton
          title={LOGIN.BUTTON}
          onPress={async () => ((await checkPin(pin)) ? login() : showError())}
        />
      </ContainerBottom>
      <FlashMessage position="top" />
    </MainContainer>
  )
}

Login.options = {
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
    },
    pop: {
      content: {
        translationX: {
          from: 0,
          to: require('react-native').Dimensions.get('window').width,
          duration: 300
        }
      }
    }
  }
}

export default Login
