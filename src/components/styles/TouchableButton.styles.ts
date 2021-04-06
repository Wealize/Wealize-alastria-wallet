import { StyleSheet } from 'react-native'

import { Colors } from '../../utils/themes'

const StylesButton = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btnNormal: {
    height: 39,
    width: 224,
    borderRadius: 45,
    backgroundColor: Colors.mainButton,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnPress: {
    height: 39,
    width: 224,
    borderRadius: 45,
    backgroundColor: Colors.pressedMainButton,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnDisabled: {
    height: 39,
    width: 224,
    borderRadius: 45,
    backgroundColor: Colors.disable,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: Colors.textButton,
    fontSize: 16
  }
})

export default StylesButton