import React, { useEffect } from 'react'
import { View } from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'

import { SCREEN } from '../../constants/screens'
import { IMG } from '../../constants/urlImages'
import LocalStorageService, {
  STORAGE_KEYS
} from '../../services/LocalStorageService'
import { initStackWithScreen } from '../../utils/navigation-utils'
import { Colors } from '../../utils/themes'
import {
  SplashActivityIndicator,
  SplashImageBackground,
  SplashLogo
} from './style'

const SplashScreen: NavigationFunctionComponent = () => {
  useEffect(() => {
    loadAppState()
  })

  /*
   * Timeout is added so the SplahScreen can be seen for atleast 2 seconds. Once
   * this code start growing and take more time due to async tasks,
   * we could remove it
   */
  const loadAppState = async () => {
    const isWalletCreated = await LocalStorageService.getBool(
      STORAGE_KEYS.IS_WALLET_CREATED
    )
    setTimeout(() => {
      isWalletCreated
        ? initStackWithScreen(SCREEN.LOGIN)
        : initStackWithScreen(SCREEN.ONBOARDING)
    }, 2000)
  }

  return (
    <View style={{ flex: 1 }}>
      <SplashImageBackground source={IMG.SPLASH_BAKCGROUND} style={{}}>
        <SplashLogo
          source={require('../../assets/img/splash-logo.png')}
          style={{
            resizeMode: 'contain'
          }}
        ></SplashLogo>
      </SplashImageBackground>
      <SplashActivityIndicator size={35} color={Colors.indicatorLoadingAlt} />
    </View>
  )
}

SplashScreen.options = {
  statusBar: {
    backgroundColor: Colors.mainBackground,
    style: 'dark'
  }
}

export default SplashScreen
