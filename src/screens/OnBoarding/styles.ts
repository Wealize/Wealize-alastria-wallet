import styled from 'styled-components'
import { View, Text, ImageBackground, Image } from 'react-native'
import Swiper from 'react-native-swiper'

import { SUBTITLE_FONT, TITLE_FONT } from '../../styles/FontFamilies'
import { Colors } from '../../utils/themes'

export const MainView = styled(View)`
  flex: 1;
  flex-direction: column;
`

export const SwiperStyled = styled(Swiper).attrs({
  activeDotColor: Colors.backgroundButtons,
  paginationStyle: { bottom: '15%' }
})``

export const ImageScreen = styled(ImageBackground).attrs({
  imageStyle: { resizeMode: 'cover' }
})`
  width: 100%;
  height: 100%;
`

export const LinkHeader = styled(Text)`
  margin-top: 10%;
  margin-left: 7.5%;
  margin-bottom: 3%;
`

export const TextHeader = styled(Text)`
  margin-top: 10%;
  margin-left: 8%;
  font-family: ${TITLE_FONT};
  font-weight: 600;
  font-size: 14px;
  color: ${Colors.normalText};
`

export const IconHeader = styled(Image)`
  width: 24px;
  height: 24px;
`

export const TitleContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled(Text)`
  width: 50%;
  margin-left: 9%;
  margin-bottom: 7%;
  font-family: ${TITLE_FONT};
  font-weight: bold;
  font-size: 20px;
  color: ${Colors.normalText};
`

export const SkipButton = styled(Text)`
  font-size: 13px;
  margin-right: 9%;
  color: ${Colors.textButton};
`

export const SkipButtonAlt = styled(SkipButton)`
  color: ${Colors.normalText};
`

export const Subtitle = styled(Text)`
  width: 45%;
  margin-left: 9%;
  margin-top: 20px;
  font-family: ${SUBTITLE_FONT};
  font-size: 14px;
  color: ${Colors.normalText};
`

export const SubtitleAlt = styled(Subtitle)`
  margin-top: 0px;
`

export const BottomContainer = styled(View)`
  position: absolute;
  left: 25%;
  bottom: 8%;
`
