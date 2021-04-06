import { Text, View, Dimensions } from 'react-native'
import styled from 'styled-components'

import { SUBTITLE_FONT, TITLE_FONT } from '../../styles/FontFamilies'

const MARKER_WIDTH = Dimensions.get('window').width * 0.8
const overlayColor = 'rgba(0, 0, 0, 0.6)'

export const ViewContainer = styled(View)`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-bottom: 12px;
`

export const LateralSpace = styled(View)`
  flex-grow: 1;
  background-color: ${overlayColor};
`

export const MarkerContainer = styled(View)`
  flex-grow: 2;
  max-width: ${MARKER_WIDTH}px;
`

export const Marker = styled(View)`
  width: ${MARKER_WIDTH}px;
  height: ${MARKER_WIDTH}px;
`

export const TextContainer = styled(View)`
  flex-grow: 2;
  background-color: ${overlayColor};
  justify-content: flex-end;
  padding-bottom: 32px;
`

export const Title = styled(Text)`
  font-size: 20px;
  font-family: ${TITLE_FONT};
  color: white;
  margin-bottom: 5%;
`

export const SubTitle = styled(Text)`
  font-size: 14px;
  font-family: ${SUBTITLE_FONT};
  color: white;
`

export const BottomSpace = styled(View)`
  flex-grow: 3;
  background-color: ${overlayColor};
`
