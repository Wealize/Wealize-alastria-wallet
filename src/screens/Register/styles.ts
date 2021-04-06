import { Text, View } from 'react-native'
import styled from 'styled-components'
import { UIActivityIndicator } from 'react-native-indicators'
import { CheckBox, Input } from 'react-native-elements'

import ViewContainer from '../../components/ViewContainer'
import { Colors } from '../../utils/themes'

export const MainContainer = styled(ViewContainer)`
  background-color: #ffffff;
  padding-left: 0;
  padding-right: 0;
`

export const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  padding-top: 15%;
  margin-left: 9%;
`

export const Subtitle = styled(Text)`
  margin-top: 13%;
  margin-bottom: 16px;
  margin-left: 9%;
  margin-right: 7%;
`

export const InputsContainer = styled(View)`
  margin-left: 6%;
  margin-right: 8%;
`

export const InputStyled = styled(Input).attrs({
  selectionColor: Colors.activeInput,
  errorStyle: {
    color: Colors.error
  }
})``

export const TermsCheckBox = styled(CheckBox).attrs({
  containerStyle: {
    backgroundColor: Colors.mainBackground,
    borderWidth: 0,
    height: 20,
    marginLeft: 1,
    paddingTop: 8
  },
  size: 24,
  checkedColor: Colors.activeInput,
  uncheckedIcon: 'square-o',
  checkedIcon: 'check-square'
})``

export const TermsText = styled(Text)`
  font-size: 14px;
  color: ${Colors.activeInput};
  font-weight: normal;
  margin-bottom: 1%;
  margin-left: 2%;
`

export const SplashActivityIndicator = styled(UIActivityIndicator)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 6%;
`

export const ContainerBottom = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin: 20px auto 40px auto;
  width: 100%;
`
