import {
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { Button } from 'react-native-elements'
import styled from 'styled-components'

import { Colors } from '../../utils/themes'

export const ContainerBottom = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin: 20px auto 40px auto;
  width: 100%;
`

export const Title = styled(Text)`
  padding-top: 9%;
  margin-bottom: 18%;
  font-size: 24px;
  font-weight: bold;
`

export const Subtitle = styled(Text)`
  font-size: 14px;
  text-align: justify;
  margin-bottom: 12%;
`

export const TouchableBlurred = styled(TouchableOpacity)`
  height: 15%;
`

export const BlurredContainer = styled(ImageBackground).attrs({
  blurRadius: 10,
  imageStyle: {
    borderRadius: 20
  }
})`
  width: 100%;
  height: 100%;
  opacity: 0.7;
  position: absolute;
`

export const BlurredText = styled(Text)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  top: 30%;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
`

export const BlurredPhrase = styled(TextInput)`
  height: 100%;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.05);
  text-align: center;
`

export const StyledButton = styled(Button).attrs({
  buttonStyle: {
    height: 39,
    width: 224,
    borderRadius: 45,
    backgroundColor: Colors.mainButton
  }
})``
