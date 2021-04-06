import React from 'react'
import renderer from 'react-test-renderer'

import Register from '../../src/screens/Register'


describe('OnboardginComponent', () => {
  it('should render correctly', () => {
    const result = renderer.create(<Register componentId={'1'} />)
    expect(result).toMatchSnapshot()
  })
})