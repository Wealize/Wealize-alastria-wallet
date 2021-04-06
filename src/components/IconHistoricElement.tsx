import React from 'react'

import {
  FielNameStyled,
  IconStyled,
  ListElementContainer
} from './styles/IconHistoricElement.styles'
import { ICONS } from '../constants/icons'
import { Colors } from '../utils/themes'

type IconListElementProps = {
  title?: string
  icon?: string
  colorText?: string
  colorIcon?: string
}

const IconHistoricElement = ({
  title,
  icon,
  colorText = Colors.textIcon,
  colorIcon = Colors.icon
}: IconListElementProps) => {
  return (
    <ListElementContainer>
      {icon ? (
        <IconStyled
          source={ICONS[icon]}
          style={{
            tintColor: colorIcon
          }}
        />
      ) : null}
      <FielNameStyled colorText={colorText}>{title}</FielNameStyled>
    </ListElementContainer>
  )
}

export default IconHistoricElement
