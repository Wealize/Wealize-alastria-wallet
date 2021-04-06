import { ScrollView, Text } from 'react-native'
import styled from 'styled-components'
import { Button } from 'react-native-elements'

import ViewContainer from '../../components/ViewContainer'
import { Colors } from '../../utils/themes'

export const MainView = styled(ViewContainer)`
  background-color: ${Colors.mainBackground};
  padding-left: 0;
  padding-right: 0;
`

export const ScrollViewStyled = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1
  }
})``

export const ViewContainerStyled = styled(ViewContainer)`
  justify-content: center;
  padding-bottom: 105px;
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

export const ContentTitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  text-align: justify;
`

export const Content = styled(Text)`
  font-size: 14px;
  text-align: justify;
`
