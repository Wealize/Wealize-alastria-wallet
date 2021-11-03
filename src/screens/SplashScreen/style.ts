import styled from 'styled-components'
import { UIActivityIndicator } from 'react-native-indicators'
import { Text, ImageBackground, Image } from 'react-native'

import { TITLE_FONT } from '../../styles/FontFamilies'
import { Colors } from '../../utils/themes'

export const SplashImageBackground = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

export const SplashLogo = styled(Image)`
  width: 70%;
`

export const Title = styled(Text)`
  margin-top: auto;
  margin-bottom: auto;
  font-family: ${TITLE_FONT};
  font-weight: bold;
  font-size: 40px;
  color: ${Colors.normalText};
`

export const SplashActivityIndicator = styled(UIActivityIndicator)`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 9%;
`
