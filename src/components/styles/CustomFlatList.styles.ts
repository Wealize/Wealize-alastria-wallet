import { Text, View } from 'react-native'
import styled from 'styled-components'

import { RejectText } from '../../styles/CommonStyles.styles'
import { TITLE_FONT } from '../../styles/FontFamilies'
import { Colors } from '../../utils/themes'

export const Title = styled(Text)`
  font-size: 18px;
  font-family: ${TITLE_FONT};
`

export const ViewStyled = styled(View)`
  padding-left: 36px;
  padding-right: 28px;
  margin-bottom: 24px;
`

export const RejectStyled = styled(RejectText)`
  padding-right: 8px;
`

export const InfoChip = styled(Text)`
  font-size: 10px;
  font-style: italic;
  margin-left: 5%;
`

export const CheckboxStyled = styled(View)`
  background-color: ${Colors.selectedItem};
  border-bottom-width: 2px;
  border-bottom-color: ${Colors.space};
`

export const SeparatorStyled = styled(View)`
  height: 2px;
  width: 100%;
  background-color: ${Colors.space};
`

export const CheckboxExtraText = styled(Text)`
  padding-bottom: 16px;
  margin-left: 71px;
  margin-top: -12px;
`
