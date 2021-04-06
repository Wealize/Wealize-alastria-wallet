import React from 'react'
import { View } from 'react-native'
import { Overlay, LinearProgress, Divider } from 'react-native-elements'

import { ACTIVITY_INDICATOR_SIZE, DIVDER_SIZE } from '../constants/sizes'
import { SplashActivityIndicator } from '../screens/SplashScreen/style'
import { Colors } from '../utils/themes'
import { ModalContainer, ModalText } from './styles/LoadingModal.styles'

const LoadingModal = ({
  isVisible,
  modalText,
  progressValue
}: {
  isVisible: boolean
  modalText: string
  progressValue?: number
}) => {
  return (
    <View>
      <Overlay isVisible={isVisible}>
        <ModalContainer>
          <ModalText>{modalText}</ModalText>
          {(
            <>
              <Divider orientation="horizontal" width={DIVDER_SIZE} />
              <LinearProgress
                color="primary"
                value={progressValue}
                variant={'determinate'}
              />
            </>
          )}
          <SplashActivityIndicator size={ACTIVITY_INDICATOR_SIZE} color={Colors.indicatorLoading} />
        </ModalContainer>
      </Overlay>
    </View>
  )
}

export default LoadingModal
