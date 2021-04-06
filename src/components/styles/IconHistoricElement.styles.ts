import styled from 'styled-components'
import { View, Text, Image } from 'react-native'

import { TITLE_FONT } from '../../styles/FontFamilies'
import { FieldName } from '../../styles/ContainerStyles.styles'

export const ListElementContainer = styled(View)`
  flex-direction: row;
`

export const Title = styled(Text)`
  font-family: ${TITLE_FONT};
  font-size: 16px;
  padding-left: 15px;
`

export const FielNameStyled = styled(FieldName)<{ colorText: string }>`
  flex-direction: row;
  color: ${({ colorText }) => colorText};
  font-size: 16px;
  margin-left: 10px;
`

export const IconStyled = styled(Image)`
  width: 16px;
  height: 16px;
  top: 4px;
  margin-left: 5px;
`
