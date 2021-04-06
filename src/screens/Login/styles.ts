import { Text, View } from 'react-native'
import styled from 'styled-components'
import { Button, Input } from 'react-native-elements'

import ViewContainer from '../../components/ViewContainer'
import { Colors } from '../../utils/themes'

export const MainContainer = styled(ViewContainer)`
  background-color: #ffffff;
  padding-left: 0;
  padding-right: 0;
`

export const RecoveryButton = styled(Button).attrs({
  containerStyle: {
    marginTop: 25
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
    name: 'arrow-forward',
    size: 21,
    color: Colors.activeInput
  }
})``

export const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  padding-top: 5%;
  margin-left: 9%;
`

export const InputsContainer = styled(View)`
  margin-left: 6%;
  margin-right: 8%;
  margin-top: 12%;
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
