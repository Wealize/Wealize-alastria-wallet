import React from 'react'
import renderer from 'react-test-renderer'

import Login from '../../src/screens/Login'

describe('OnboardginComponent', () => {
  it('should render correctly', () => {
    const result = renderer.create(<Login componentId={'1'} />)
    expect(result).toMatchSnapshot()
  })
})
