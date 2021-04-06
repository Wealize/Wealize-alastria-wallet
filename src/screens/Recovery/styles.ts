import { Text, View, TextInput } from 'react-native'
import styled from 'styled-components'
import { Button, Input } from 'react-native-elements'

import ViewContainer from '../../components/ViewContainer'
import { Colors } from '../../utils/themes'

export const MainContainer = styled(ViewContainer)`
  background-color: #ffffff;
  padding-left: 0;
  padding-right: 0;
`

export const BackButton = styled(Button).attrs({
  containerStyle: {
    marginTop: 25,
    alignSelf: 'flex-start'
  },
  buttonStyle: {
    justifyContent: 'flex-start',
    marginLeft: 18
  },
  titleStyle: {
    color: Colors.activeInput,
    fontFamily: 'SourceSansPro',
    fontSize: 14
  },
  icon: {
    name: 'arrow-back-ios',
    size: 20,
    color: Colors.activeInput
  }
})``

export const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  padding-top: 5%;
  margin-left: 9%;
`

export const Subtitle = styled(Text)`
  margin-top: 13%;
  margin-bottom: 10%;
  margin-left: 9%;
  margin-right: 7%;
  font-size: 13px;
  text-align: justify;
`

export const InputsContainer = styled(View)`
  margin-left: 6%;
  margin-right: 8%;
  margin-bottom: 6%;
`

export const PhraseInput = styled(TextInput).attrs({
  selectionColor: Colors.activeInput,
  placeholderTextColor: 'rgba(60, 60, 67, 0.29)'
})`
  height: 90px;
  border-radius: 20px;
  border-width: 1px;
  border-color: rgba(60, 60, 67, 0.29);
  text-align: center;
  font-size: 16px;
  margin-bottom: 5%;
`

export const InputStyled = styled(Input).attrs({
  selectionColor: Colors.activeInput,
  errorStyle: {
    color: Colors.error
  }
})``

export const ContainerBottom = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin: 20px auto 40px auto;
  width: 100%;
`