import React from 'react'
import { useWindowDimensions } from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'

import WhiteButton from '../../components/WhiteButton'
import { Colors } from '../../utils/themes'
import { NavigationProps, setStackRoot } from '../../utils/navigation-utils'
import {
  BottomContainer,
  Subtitle,
  Title,
  ImageScreen,
  IconHeader,
  LinkHeader,
  TextHeader,
  SubtitleAlt,
  SwiperStyled,
  MainView,
  TitleContainer,
  SkipButton,
  SkipButtonAlt
} from './styles'
import { ONBOARDING } from '../../constants/text'
import { IMG } from '../../constants/urlImages'
import { SCREEN } from '../../constants/screens'

const OnBoarding: NavigationFunctionComponent = ({
  componentId
}: NavigationProps) => {
  return (
    <MainView>
      <SwiperStyled
        width={useWindowDimensions().width}
        height={useWindowDimensions().height}
        loop={false}
      >
        <ImageScreen source={IMG.ONBOARDING_BACKGROUND.FIRST_SCREEN} style={{}}>
          <LinkHeader>
            <IconHeader source={IMG.ONBOARDING_BACKGROUND.LINK_HEADER} />
            <TextHeader>{ONBOARDING.LINK_HEADER}</TextHeader>
          </LinkHeader>
          <TitleContainer>
            <Title>{ONBOARDING.FIRST_SCREEN.TITLE}</Title>
            <SkipButton
              onPress={() => setStackRoot(componentId, SCREEN.REGISTER)}
            >
              {ONBOARDING.SKIP}
            </SkipButton>
          </TitleContainer>
          <Subtitle>{ONBOARDING.FIRST_SCREEN.SUBTITLE}</Subtitle>
        </ImageScreen>

        <ImageScreen
          source={IMG.ONBOARDING_BACKGROUND.SECOND_SCREEN}
          style={{}}
        >
          <LinkHeader>
            <IconHeader source={IMG.ONBOARDING_BACKGROUND.LINK_HEADER} />
            <TextHeader>{ONBOARDING.LINK_HEADER}</TextHeader>
          </LinkHeader>
          <TitleContainer>
            <Title>{ONBOARDING.SECOND_SCREEN.TITLE}</Title>
            <SkipButtonAlt
              onPress={() => setStackRoot(componentId, SCREEN.REGISTER)}
            >
              {ONBOARDING.SKIP}
            </SkipButtonAlt>
          </TitleContainer>
          <SubtitleAlt>{ONBOARDING.SECOND_SCREEN.SUBTITLE}</SubtitleAlt>
        </ImageScreen>

        <ImageScreen source={IMG.ONBOARDING_BACKGROUND.THIRD_SCREEN} style={{}}>
          <LinkHeader>
            <IconHeader source={IMG.ONBOARDING_BACKGROUND.LINK_HEADER} />
            <TextHeader>{ONBOARDING.LINK_HEADER}</TextHeader>
          </LinkHeader>
          <Title>{ONBOARDING.THIRD_SCREEN.TITLE}</Title>
          <Subtitle>{ONBOARDING.THIRD_SCREEN.SUBTITLE}</Subtitle>
          <BottomContainer>
            <WhiteButton
              title={ONBOARDING.BUTTON}
              titleStyle={{ color: Colors.principalButtons }}
              onPress={() => setStackRoot(componentId, SCREEN.REGISTER)}
            />
          </BottomContainer>
        </ImageScreen>
      </SwiperStyled>
    </MainView>
  )
}

OnBoarding.options = {
  statusBar: {
    backgroundColor: Colors.mainBackground,
    style: 'dark'
  },
  topBar: {
    visible: false
  }
}

export default OnBoarding
