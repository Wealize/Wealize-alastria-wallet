import React from 'react'
import { View, Text, Image } from 'react-native'
import styled from 'styled-components'

import { ICONS } from '../constants/icons'
import { TITLE_FONT } from '../styles/FontFamilies'
import { Colors } from '../utils/themes'

interface IconListElementProps {
  title?: string
  icon?: string
  color?: string
}

const ListElementContainer = styled(View)`
  flex-direction: row;
  padding: 16px 40px 16px 0px;
  border-right-width: 1px;
  border-right-color: ${Colors.space};
`

const Title = styled(Text)`
  margin: 0 0 0 33px;
  font-family: ${TITLE_FONT};
  font-size: 16px;
  font-weight: bold;
`

const IconListElement = ({
  title,
  icon,
  color = '#000000'
}: IconListElementProps) => {
  return (
    <ListElementContainer>
      {icon ? (
        <Image
          source={ICONS[icon]}
          style={{ tintColor: color, width: 20, height: 20 }}
        ></Image>
      ) : null}
      <Title style={{ color: color }}>{title}</Title>
    </ListElementContainer>
  )
}

export default IconListElement
