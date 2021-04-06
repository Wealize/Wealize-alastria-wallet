import React from 'react'
import { View } from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'
import Pdf from 'react-native-pdf'

import { NavigationProps } from '../../utils/navigation-utils'
import { PdfStyles } from './styles'

const PdfViewer: NavigationFunctionComponent = ({ file }: NavigationProps) => {
  const source = {
    uri: `data:application/pdf;base64,${file}`
  }

  return (
    <View style={PdfStyles.container}>
      <Pdf
        source={source}
        onError={(error) => {
          console.log(error)
        }}
        style={PdfStyles.pdf}
      />
    </View>
  )
}

PdfViewer.options = {
  topBar: {
    visible: true,
    elevation: 0, // Remove border in Android
    borderColor: 'white' // Remove border in iOS
  }
}

export default PdfViewer
