import { Button as BaseButton } from 'react-native-elements'
import styled from 'styled-components'

import { Colors } from '../utils/themes'

const Button = styled(BaseButton).attrs({
  buttonStyle: {
    height: 39,
    borderRadius: 45,
    backgroundColor: Colors.principal
  }
})``

export default Button
