import { View, Text } from 'react-native'
import styled from 'styled-components'

import { TITLE_FONT } from '../../styles/FontFamilies'
import { Colors } from '../../utils/themes'

export const TopBarView = styled(View)`
  flex: 1;
  background-color: ${Colors.mainBackground};
`

export const TopBarContainer = styled(View)<{ backgroundColor: string }>`
  flex: 1;
  padding: 0 36px 0 36px;
  height: 50px;
  border-bottom-right-radius: 40px;
  flex-direction: row;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

export const Title = styled(Text)<{ textColor: string }>`
  font-family: ${TITLE_FONT};
  color: ${({ textColor }) => textColor};
  font-size: 20px;
  margin-top: auto;
  margin-bottom: auto;
`
