import React from 'react'
import { OpaqueColorValue, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

import LocalStorageService, {
  STORAGE_KEYS
} from '../services/LocalStorageService'
import { SUBTITLE_FONT } from '../styles/FontFamilies'
import { popScreen } from '../utils/navigation-utils'

interface CustomBackButtonProps {
  text: string
  textColor?: string | typeof OpaqueColorValue
}

const ButtonContainer = styled(TouchableOpacity)`
  padding-right: 36px;
`

const Button = styled(Text)`
  font-family: ${SUBTITLE_FONT};
  font-size: 14px;
`

const CustomBackButton = ({
  text,
  textColor = '#ffffff'
}: CustomBackButtonProps) => {
  return (
    <ButtonContainer
      onPress={async () => {
        popScreen(
          await LocalStorageService.getData(STORAGE_KEYS.LAST_COMPONENT_ID)
        )
      }}
    >
      <Button style={{ color: textColor }}>{text}</Button>
    </ButtonContainer>
  )
}

export default CustomBackButton
