import { CheckBox } from 'react-native-elements'
import styled from 'styled-components'

import { Colors } from '../../utils/themes'

export const CheckboxStyled = styled(CheckBox).attrs({
  containerStyle: {
    flex: 1,
    backgroundColor: undefined,
    borderWidth: 0,
    padding: 0,
    margin: 0
  },
  textStyle: {
    fontSize: 14,
    fontWeight: 'normal'
  },
  iconType: 'material',
  checkedIcon: 'check-box',
  uncheckedIcon: 'check-box-outline-blank',
  checkedColor: Colors.activeInput
})``
