import React from 'react'
import renderer from 'react-test-renderer'

import OnBoarding from '../../src/screens/OnBoarding'


describe('OnboardginComponent', () => {
  it('should render correctly', () => {
    const result = renderer.create(<OnBoarding componentId={'1'} />)
    expect(result).toMatchSnapshot()
  })
})