import React from 'react'
import { OpaqueColorValue, View, Text } from 'react-native'
import styled from 'styled-components'

import { TITLE_FONT } from '../styles/FontFamilies'
import { Colors } from '../utils/themes'

interface TopBarProps {
  title: string
  textColor?: string | typeof OpaqueColorValue
  color?: string | typeof OpaqueColorValue
}

const TopBarContainer = styled(View)`
  flex: 1;
  padding: 0 36px 0 36px;
  height: 50px;
  border-bottom-right-radius: 40px;
  flex-direction: row;
`

const Title = styled(Text)`
  font-family: ${TITLE_FONT};
  font-size: 20px;
  margin-top: auto;
  margin-bottom: auto;
`

const TopBar = ({
  title,
  textColor = '#ffffff',
  color = Colors.principalDark
}: TopBarProps) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <TopBarContainer style={{ backgroundColor: color }}>
        <Title style={{ color: textColor }}>{title}</Title>
      </TopBarContainer>
    </View>
  )
}

export default TopBar
