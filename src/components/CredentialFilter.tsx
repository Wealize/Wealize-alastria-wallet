import React from 'react'

import { FilterCheckbox } from '../interfaces/checkbox'
import { CheckboxStyled } from './styles/CredentialFilter.styles'

export const CredentialFilter = ({
  item,
  onPress
}: {
  item: FilterCheckbox
  onPress: (filter: FilterCheckbox) => void
}): JSX.Element => {
  return (
    <CheckboxStyled
      title={item.name}
      checked={item.checked}
      onPress={() => onPress(item)}
    ></CheckboxStyled>
  )
}
