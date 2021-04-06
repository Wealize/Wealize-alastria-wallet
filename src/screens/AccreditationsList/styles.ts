import { View } from 'react-native'
import styled from 'styled-components'
import Accordion from 'react-native-collapsible/Accordion'

import ViewContainer from '../../components/ViewContainer'
import { Colors } from '../../utils/themes'

export const MainContainer = styled(View)`
  background-color: ${Colors.mainBackground};
  flex: 1;
`

export const TopView = styled(View)`
  background-color: ${Colors.principalDark};
`

export const AccordionContainer = styled(ViewContainer)`
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 5px;
  border-left-width: 1px;
  border-color: ${Colors.space};
`

export const AccordionStyled = styled(Accordion).attrs({
  containerStyle: {
    marginTop: 16
  },
  sectionContainerStyle: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.space
  }
})``
