import { Text, View } from 'react-native'
import styled from 'styled-components'

import { Colors } from '../../utils/themes'
import { FIELD_NAME_FONT } from '../../styles/FontFamilies'
import { ViewContainerStyled } from '../../styles/CommonStyles.styles'
import { TextInfo } from '../../styles/ContainerStyles.styles'

export const ContainerTop = styled(View)`
  margin-top: 16px;
  flex-direction: row;
`

export const Title = styled(Text)`
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
`

export const HistoricFieldName = styled(Text)`
  font-family: ${FIELD_NAME_FONT};
`

export const HistoricContainer = styled(View)`
  display: flex;
  padding: 20px 0px 20px 15px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.space};
`

export const HistoricView = styled(ViewContainerStyled)`
  padding-left: 0px;
  padding-right: 0px;
`

export const HistoricTextInfo = styled(TextInfo)`
margin-top: 5px;
margin-left: 31px;
`