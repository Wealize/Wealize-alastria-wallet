import React from 'react'
import { ActivityIndicator, OpaqueColorValue, Text, View } from 'react-native'

import { Colors } from '../utils/themes'

interface ActivityIndicatorWidgetProps {
  size?: number | 'large' | 'small'
  color?: string | typeof OpaqueColorValue
  text?: string
  textColor?: string | typeof OpaqueColorValue
  textSize?: number
}

const ActivityIndicatorWidget = ({
  size = 'large',
  color = Colors.principal,
  text = 'Cargando...',
  textColor = '#555555',
  textSize = 16
}: ActivityIndicatorWidgetProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'center',
        right: 0,
        left: 0,
        top: '45%'
      }}
    >
      <ActivityIndicator size={size} color={color} />
      <Text style={{ fontSize: textSize, color: textColor }}>{text}</Text>
    </View>
  )
}

export default ActivityIndicatorWidget
