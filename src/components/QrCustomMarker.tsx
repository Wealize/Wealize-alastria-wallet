import React from 'react'
import { View } from 'react-native'

import { QR } from '../constants/text'
import {
  BottomSpace,
  LateralSpace,
  Marker,
  MarkerContainer,
  SubTitle,
  TextContainer,
  Title,
  ViewContainer
} from './styles/QrCustomMarker.styles'

interface QrCustomMarkerProps {
  subtitle: string
}

const QrCustomMarker = ({ subtitle }: QrCustomMarkerProps) => {
  return (
    <ViewContainer>
      <LateralSpace />
      <MarkerContainer>
        <TextContainer>
          <View>
            <Title>{QR.TITLE}</Title>
          </View>
          <View>
            <SubTitle>{subtitle}</SubTitle>
          </View>
        </TextContainer>
        <Marker />
        <BottomSpace />
      </MarkerContainer>
      <LateralSpace />
    </ViewContainer>
  )
}

export default QrCustomMarker
