import React from 'react'
import renderer from 'react-test-renderer'

import Recovery from '../../src/screens/Recovery'

describe('OnboardginComponent', () => {
  it('should render correctly', () => {
    const result = renderer.create(<Recovery componentId={'1'} />)
    expect(result).toMatchSnapshot()
  })
})
