import { Image, ScrollView, Text, View } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'
import { Chip } from 'react-native-elements'
import styled from 'styled-components'

import ViewContainer from '../components/ViewContainer'
import {
  REJECT_TEXT_FONT,
  SUBTITLE_FONT,
  TITLE_FONT
} from '../styles/FontFamilies'
import { Colors } from '../utils/themes'

export const ScreenView = styled(View)`
  flex: 1;
`

export const MainView = styled(ScreenView)`
  background-color: ${Colors.principalDark};
`

export const ViewContainerStyled = styled(ViewContainer)`
  border-top-left-radius: 40px;
  background-color: ${Colors.mainBackground};
`

export const ScrollViewStyled = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1
  }
})``

export const FilterContainer = styled(ViewContainer)`
  flex-direction: row;
  height: auto;
  padding-left: 50px;
  padding-top: 27px;
  padding-bottom: 10px;
  padding-right: 0px;
  background-color: ${Colors.mainBackground};
`

export const FilterText = styled(Text)`
  font-size: 16px;
`

export const Title = styled(Text)`
  font-size: 18px;
  font-family: ${TITLE_FONT};
  font-weight: bold;
`

export const ContainerSubtitle = styled(View)`
  margin-top: 47px;
  font-family: ${SUBTITLE_FONT};
  color: ${Colors.normalText};
`

export const SubtitleEntity = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`

export const Subtitle = styled(Text)`
  font-size: 16px;
  margin-bottom: 3%;
  text-align: justify;
`

export const SubtitleType = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`

export const RejectText = styled(Text)`
  font-family: ${REJECT_TEXT_FONT};
  text-align: right;
  margin-left: auto;
  color: ${Colors.activeInput};
`

export const ContainerTop = styled(View)`
  flex-direction: row;
`

export const ContainerTopStyled = styled(ContainerTop)`
  margin-top: 20px;
`

export const ContainerBottom = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin: 20px auto 40px auto;
  width: 100%;
`

export const AccordionAngleIcon = styled(Image)`
  position: absolute;
  top: 16px;
  right: 14px;
  width: 24px;
  height: 24px;
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

export const ContainerChip = styled(View)`
  width: 70%;
  margin-top: 10px;
`

export const ChipStyled = styled(Chip).attrs({
  buttonStyle: {
    backgroundColor: Colors.disable,
    justifyContent: 'flex-start'
  },
  containerStyle: { borderRadius: 50, shadowColor: 'red' },
  titleProps: { ellipsizeMode: 'tail', numberOfLines: 1 },
  titleStyle: {
    color: Colors.normalText,
    marginRight: 24
  }
})`
  margin-bottom: 50px;
`
