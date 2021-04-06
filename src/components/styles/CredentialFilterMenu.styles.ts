import { TouchableOpacity, View } from 'react-native'
import { Menu, renderers } from 'react-native-popup-menu'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'

export const MenuStyled = styled(Menu).attrs({
  renderer: renderers.Popover,
  rendererProps: { placement: 'bottom' }
})`
  align-self: flex-start;
`

export const TriggerViewStyled = styled(View)`
  flex-direction: row;
  align-items: center;
`

export const TriggerViewIconStyled = styled(Icon)`
  font-size: 16;
`

export const MenuTriggerStyle = {
  TriggerTouchableComponent: TouchableOpacity
}

export const MenuOptionsStyle = {
  optionsContainer: {
    height: '100%',
    width: 200,
    marginLeft: 45,
    paddingRight: 10
  }
}
