import { Text, Image, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { Icon, Input } from 'react-native-elements'

import { Colors } from '../../utils/themes'
import { REJECT_TEXT_FONT } from '../../styles/FontFamilies'
import { FilterContainer, Title } from '../../styles/CommonStyles.styles'
import ViewContainer from '../../components/ViewContainer'
import CheckboxListElement from '../../components/CheckboxListElement'

export const TitleSelect = styled(Title)`
  font-weight: normal;
`

export const SelectContainer = styled(FilterContainer)`
  padding-left: 34px;
  padding-top: 16px;
`

export const RevokeText = styled(Text)`
  font-size: 14px;
  font-family: ${REJECT_TEXT_FONT};
  color: ${Colors.error};
  text-align: right;
  right: 30%;
  margin-top: 17px;
`

export const RevokeTextActive = styled(RevokeText)`
  color: ${Colors.activeInput};
`

export const IconSearch = styled(Image)`
  width: 24px;
  height: 24px;
`

export const IconSearchColor = (searchTerm: string) => {
  return { tintColor: searchTerm ? Colors.activeInput : Colors.menuIcon }
}

export const SearchContainer = styled(View)`
  flex-direction: column;
  width: 90%;
  margin-left: 6%;
  margin-right: 6%;
  margin-top: 2%;
`

export const SearchInput = styled(Input).attrs({
  inputContainerStyle: {
    borderColor: Colors.searchBar
  },
  inputStyle: {
    marginLeft: 10
  },
  errorStyle: {
    height: 0,
    margin: 0
  },
  placeholderTextColor: Colors.searchBar
})``

export const CancelIcon = styled(Icon).attrs({
  color: Colors.searchBar,
  size: 26,
  name: 'close-outline',
  type: 'ionicon'
})``

export const OrderDateIcon = styled(Icon).attrs({
  color: Colors.normalText,
  size: 13,
  type: 'material-community'
})`
  margin-top: 2px;
  margin-right: 5px;
`

export const AccordionAngleIcon = styled(Image)`
  position: absolute;
  top: 16px;
  right: 14px;
  width: 24px;
  height: 24px;
`

export const AccordionContainer = styled(ViewContainer)`
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 5px;
  background-color: ${Colors.mainBackground};
`

export const TouchableOpacityStyled = styled(TouchableOpacity)`
  margin-left: auto;
`

export const TouchableOpacitySearch = styled(TouchableOpacityStyled)`
  margin-top: 25px;
  left: 60%;
`

export const CheckboxxStyled = styled(CheckboxListElement).attrs({
  color: Colors.activeInput
})``

export const imageStyled = {
  close: {
    tintColor: Colors.textIcon,
    width: 24,
    height: 24
  },
  delete: {
    tintColor: Colors.error,
    width: 24,
    height: 24
  },
  deleteActive: {
    tintColor: Colors.activeInput,
    width: 24,
    height: 24
  }
}
