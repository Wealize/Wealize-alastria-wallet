import React from 'react'
import { render } from '@testing-library/react-native'

import TouchableButton from '../../src/components/TouchableButton'

describe('TouchableButton', () => {
  it('should render correctly TouchableButton', () => {
    const result = render(
      <TouchableButton
        title="title"
        disabled={false}
        onPress={() => 'pressed'}
      />
    )

    expect(result).toMatchSnapshot()
  })
})
