import React from 'react'
import { Button, Dimensions, Modal, View } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { NavigationFunctionComponent } from 'react-native-navigation'

import { NavigationProps, popScreen } from '../../utils/navigation-utils'
import { Colors } from '../../utils/themes'

const ImagenViewer: NavigationFunctionComponent = ({
  file,
  componentId
}: NavigationProps) => {
  const imagen = [
    {
      url: `data:image/jpeg;base64,${file}` || '',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      props: {
        resizeMode: 'contain'
      }
    }
  ]

  return (
    <View>
      <Modal visible={true} transparent={true}>
        <Button
          color={Colors.mainButton}
          onPress={async () => popScreen(componentId)}
          title="Volver atras"
        />
        <ImageViewer imageUrls={imagen} />
      </Modal>
    </View>
  )
}

ImagenViewer.options = {
  topBar: {
    visible: true,
    elevation: 0, // Remove border in Android
    borderColor: 'white' // Remove border in iOS
  }
}

export default ImagenViewer
