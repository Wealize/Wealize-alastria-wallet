import styled from 'styled-components'

import { ViewContainerStyled } from '../../styles/CommonStyles.styles'

export const ContainerStyled = styled(ViewContainerStyled)`
  padding-left: 0px;
  padding-right: 0px;
`

export const FlatListStyle = {
  container: {
    flexGrow: 1
  },
  footer: {
    flex: 1
  }
}
