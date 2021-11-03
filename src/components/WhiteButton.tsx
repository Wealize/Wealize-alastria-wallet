import { Button as BaseButton } from 'react-native-elements'
import styled from 'styled-components'

import { Colors } from '../utils/themes'

const WhiteButton = styled(BaseButton).attrs({
  titleStyle: { color: Colors.principalButtons, letterSpacing: 0.57 },
  buttonStyle: {
    height: 39,
    width: 224,
    borderRadius: 45,
    backgroundColor: Colors.backgroundButtons,
    borderColor: Colors.principalButtons,
    borderStyle: 'solid',
    borderWidth: 1
  }
})``

export default WhiteButton
