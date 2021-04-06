import React, { useState } from 'react'
import {
  TouchableHighlight,
  View,
  Text,
  GestureResponderEvent
} from 'react-native'

import { Colors } from '../utils/themes'
import StylesButton from './styles/TouchableButton.styles'

const TouchableButton = ({
  title,
  disabled,
  onPress
}: {
  title?: string
  disabled?: boolean
  onPress: (event: GestureResponderEvent) => void
}) => {
  const [isPressed, setIsPressed] = useState(false)

  const selectStyle = () => {
    if (disabled) {
      return StylesButton.btnDisabled
    }
    return isPressed ? StylesButton.btnPress : StylesButton.btnNormal
  }

  const touchProps = {
    activeOpacity: 1,
    underlayColor: Colors.pressedMainButton,
    style: selectStyle(),
    onHideUnderlay: () => setIsPressed(false),
    onShowUnderlay: () => setIsPressed(true)
  }

  return (
    <View style={StylesButton.container}>
      <TouchableHighlight disabled={disabled} onPress={onPress} {...touchProps}>
        <Text style={StylesButton.text}>{title}</Text>
      </TouchableHighlight>
    </View>
  )
}

export default TouchableButton
