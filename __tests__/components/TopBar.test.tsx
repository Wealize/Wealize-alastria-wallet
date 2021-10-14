import React from 'react'
import renderer from 'react-test-renderer'

import TopBar from '../../src/components/TopBar'

describe('OnboardginComponent', () => {
  it('should render correctly TopBar with Props', () => {
    const result = renderer.create(
      <TopBar title="title" textColor="red" color="blue" />
    )
    expect(result).toMatchSnapshot()
  })

  it('should render correctly TopBar without Props', () => {
    const result = renderer.create(<TopBar title="title" />)
    expect(result).toMatchSnapshot()
  })
})
