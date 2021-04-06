import React from 'react'
import renderer from 'react-test-renderer'

import SecurityPhrase from '../../src/screens/SecurityPhrase'


describe('OnboardginComponent', () => {
  it('should render correctly', () => {
    const result = renderer.create(<SecurityPhrase componentId={'1'} />)
    expect(result).toMatchSnapshot()
  })
})