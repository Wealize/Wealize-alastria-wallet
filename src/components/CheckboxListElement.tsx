import React from 'react'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import styled from 'styled-components'

import { Colors } from '../utils/themes'

interface CheckboxListElementProps {
  checked: boolean
  onPress?: () => void
  disabled?: boolean
  title?: string
  color?: string
  textColor?: string
}

const ListElementContainer = styled(View)`
  flex-direction: row;
  padding: 14px 32px 16px 26px;
  border-right-width: 1px;
  border-right-color: ${Colors.space};
`

const CheckboxListElement = ({
  checked,
  title,
  onPress,
  disabled = false,
  color = '#000000',
  textColor = '#000000'
}: CheckboxListElementProps) => {
  return (
    <ListElementContainer>
      <CheckBox
        title={title}
        checked={checked}
        onPress={onPress}
        disabled={disabled}
        iconType="material"
        checkedIcon="check-box"
        uncheckedIcon="check-box-outline-blank"
        checkedColor={disabled ? Colors.disable : color}
        containerStyle={{
          flex: 1,
          backgroundColor: undefined,
          borderWidth: 0,
          padding: 0,
          margin: 0
        }}
        textStyle={{
          fontFamily: 'Mulish-Bold',
          fontSize: 16,
          color: disabled ? Colors.disable : textColor
        }}
      ></CheckBox>
    </ListElementContainer>
  )
}

export default CheckboxListElement
