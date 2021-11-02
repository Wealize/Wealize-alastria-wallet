import { View } from 'react-native'
import styled from 'styled-components'

import { Colors } from '../utils/themes'

const ViewContainer = styled(View)`
  display: flex;
  padding: 0 36px 0 36px;
  height: 100%;
  background-color: ${Colors.mainBackground};
`

export default ViewContainer
