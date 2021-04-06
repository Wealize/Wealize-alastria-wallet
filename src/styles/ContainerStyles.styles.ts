import { Text, View } from 'react-native'
import styled from 'styled-components'

import { Colors } from '../utils/themes'
import { FIELD_NAME_FONT, SUBTITLE_FONT } from '../styles/FontFamilies'

export const FieldName = styled(Text)`
  font-family: ${FIELD_NAME_FONT};
`

export const TextInfo = styled(Text)`
  font-family: ${SUBTITLE_FONT};
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
`

export const ContainerSyled = styled(View)`
  display: flex;
  padding: 0px 32px 16px 33px;
  height: 100%;
  background-color: ${Colors.mainBackground};
  border-right-width: 1px;
  border-right-color: ${Colors.space};
`
