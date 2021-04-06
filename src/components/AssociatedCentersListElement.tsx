import React from 'react'
import { Text, Image, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

import { ICONS } from '../constants/icons'
import { SUBTITLE_FONT, TITLE_FONT } from '../styles/FontFamilies'
import { Colors } from '../utils/themes'

interface IconListElementProps {
  title: string
  icon?: string
  color?: string
  onPress?: () => void
}

const ListElementContainer = styled(TouchableOpacity)`
  border-radius: 20px;
  border: solid 1px rgba(204, 204, 204, 0.5);
  padding: 16px 19px 16px 18px;
  background-color: #ffffff;
`

const TopContainer = styled(View)`
  flex-direction: row;
`

const Title = styled(Text)`
  margin: 0 0 0 4px;
  font-family: ${TITLE_FONT};
  font-size: 16px;
`

const Subtitle = styled(Text)`
  margin-top: 6px;
  font-family: ${SUBTITLE_FONT};
  font-size: 14px;
  color: ${Colors.principal};
`

const AssociatedCentersListElement = ({
  title,
  icon = 'sas',
  color = '#000000',
  onPress = () => {}
}: IconListElementProps) => {
  return (
    <ListElementContainer
      onPress={onPress}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      }}
    >
      <TopContainer>
        <Image
          source={ICONS[icon]}
          style={{ tintColor: color, width: 20, height: 20 }}
        ></Image>
        <Title style={{ color: color }}>{title}</Title>
      </TopContainer>
      <Subtitle>{icon === 'add_service' ? 'Vincular' : 'Desvincular'}</Subtitle>
    </ListElementContainer>
  )
}

export default AssociatedCentersListElement
