import React from 'react'

import { Colors } from '../utils/themes'
import { TopBarContainer, Title, TopBarView } from './styles/TopBar.styles'

interface TopBarProps {
  title: string
  textColor?: string
  color?: string
}

const TopBar = ({
  title,
  textColor = '#ffffff',
  color = Colors.principalDark
}: TopBarProps) => {
  return (
    <TopBarView>
      <TopBarContainer backgroundColor={color}>
        <Title textColor={textColor}>{title}</Title>
      </TopBarContainer>
    </TopBarView>
  )
}

export default TopBar
