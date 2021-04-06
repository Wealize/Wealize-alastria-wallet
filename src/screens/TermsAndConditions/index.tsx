import React from 'react'
import { View } from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'

import { GET_EXTERNAL_SCREENS_OPTIONS } from '../../constants/options'
import { SCREEN } from '../../constants/screens'
import { TERMS, TERMS_AND_CONDITIONS_CONTENT } from '../../constants/text'
import { ScrollViewStyled } from '../../styles/CommonStyles.styles'
import {
  NavigationProps,
  popScreen,
  setStackRoot
} from '../../utils/navigation-utils'
import {
  Content,
  ContentTitle,
  MainView,
  ViewContainerStyled,
  BackButton
} from '../AboutHelp/styles'

const TermsAndConditions: NavigationFunctionComponent = ({
  componentId,
  lastComponent
}: NavigationProps) => {
  const checkWhereToReturn = (): void => {
    lastComponent
      ? setStackRoot(componentId, SCREEN.REGISTER)
      : popScreen(componentId)
  }

  const renderSections = () => {
    return TERMS_AND_CONDITIONS_CONTENT.SECTIONS.map((section, index) => (
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
          title={TERMS.BACK}
          onPress={() => checkWhereToReturn()}
        />
        <ViewContainerStyled>{renderSections()}</ViewContainerStyled>
      </ScrollViewStyled>
    </MainView>
  )
}

TermsAndConditions.options = {
  ...GET_EXTERNAL_SCREENS_OPTIONS,
  statusBar: { ...GET_EXTERNAL_SCREENS_OPTIONS.statusBar, style: 'dark' }
}

export default TermsAndConditions
