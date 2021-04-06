import { Text } from 'react-native'
import { UIActivityIndicator } from 'react-native-indicators'
import styled from 'styled-components'

import ViewContainer from '../../components/ViewContainer'
import { Colors } from '../../utils/themes'

export const ProcessContainer = styled(ViewContainer)`
  background-color: ${Colors.mainBackground};
`

export const ProcessText = styled(Text)`
flex: 1;
align-items: center;
font-size: 16px;
`

export const ProcessActivityIndicator = styled(UIActivityIndicator)`
flex: 1;
justify-content: flex-end;
align-items: center;
margin-bottom: 10%;
`
