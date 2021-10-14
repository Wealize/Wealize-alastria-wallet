import styled from 'styled-components'
import { View, Text } from 'react-native'
import { LinearProgress } from 'react-native-elements'

export const ModalContainer = styled(View)`
  width: 240px;
  height: 90px;
  align-items: center;
`

export const ModalText = styled(Text)`
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`

export const LinearProgressStyled = styled(LinearProgress).attrs({
  color: '#f06078'
})``
