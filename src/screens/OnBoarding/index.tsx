import React from 'react'
import { useWindowDimensions } from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'

import WhiteButton from '../../components/WhiteButton'
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
  SkipButton
} from './styles'
import { ONBOARDING } from '../../constants/text'
import { IMG } from '../../constants/urlImages'
import { SCREEN } from '../../constants/screens'
import { ScreenView } from '../../styles/CommonStyles.styles'

const OnBoarding: NavigationFunctionComponent = ({
  componentId
}: NavigationProps) => {
  return (
    <MainView>
      <ImageScreen source={IMG.ONBOARDING_BACKGROUND.MAIN} style={{}}>
        <SwiperStyled
          width={useWindowDimensions().width}
          height={useWindowDimensions().height}
          loop={false}
        >
          <ScreenView>
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
          </ScreenView>
          <ScreenView>
            <LinkHeader>
              <IconHeader source={IMG.ONBOARDING_BACKGROUND.LINK_HEADER} />
              <TextHeader>{ONBOARDING.LINK_HEADER}</TextHeader>
            </LinkHeader>
            <TitleContainer>
              <Title>{ONBOARDING.SECOND_SCREEN.TITLE}</Title>
              <SkipButton
                onPress={() => setStackRoot(componentId, SCREEN.REGISTER)}
              >
                {ONBOARDING.SKIP}
              </SkipButton>
            </TitleContainer>
            <SubtitleAlt>{ONBOARDING.SECOND_SCREEN.SUBTITLE}</SubtitleAlt>
          </ScreenView>
          <ScreenView>
            <LinkHeader>
              <IconHeader source={IMG.ONBOARDING_BACKGROUND.LINK_HEADER} />
              <TextHeader>{ONBOARDING.LINK_HEADER}</TextHeader>
            </LinkHeader>
            <Title>{ONBOARDING.THIRD_SCREEN.TITLE}</Title>
            <Subtitle>{ONBOARDING.THIRD_SCREEN.SUBTITLE}</Subtitle>
            <BottomContainer>
              <WhiteButton
                title={ONBOARDING.BUTTON}
                onPress={() => setStackRoot(componentId, SCREEN.REGISTER)}
              />
            </BottomContainer>
          </ScreenView>
        </SwiperStyled>
      </ImageScreen>
    </MainView>
  )
}

OnBoarding.options = {
  statusBar: {
    drawBehind: true,
    visible: true,
    backgroundColor: 'transparent',
    style: 'light'
  },
  topBar: {
    visible: false
  }
}

export default OnBoarding
