import React from 'react'
import { View } from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'

import { GET_EXTERNAL_SCREENS_OPTIONS } from '../../constants/options'
import { ABOUT_HELP, RECOVERY } from '../../constants/text'
import { NavigationProps, popScreen } from '../../utils/navigation-utils'
import {
  BackButton,
  Content,
  ContentTitle,
  MainView,
  ScrollViewStyled,
  ViewContainerStyled
} from './styles'

const AboutHelp: NavigationFunctionComponent = ({
  componentId
}: NavigationProps) => {
  const renderSections = () => {
    return ABOUT_HELP.SECTIONS.map((section, index) => (
      <View key={`Section_${index}}`}>
        <ContentTitle>{section.TITLE}</ContentTitle>
        <Content>{section.CONTENT}</Content>
      </View>
    ))
  }

  return (
    <MainView>
      <ScrollViewStyled>
        <BackButton
          type="clear"
          title={RECOVERY.BACK}
          onPress={() => popScreen(componentId)}
        />
        <ViewContainerStyled>{renderSections()}</ViewContainerStyled>
      </ScrollViewStyled>
    </MainView>
  )
}

AboutHelp.options = {
  ...GET_EXTERNAL_SCREENS_OPTIONS,
  statusBar: { ...GET_EXTERNAL_SCREENS_OPTIONS.statusBar, style: 'dark' }
}

export default AboutHelp
