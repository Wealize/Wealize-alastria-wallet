import React from 'react'
import { MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'

import { FILTER_TEXT } from '../constants/text'
import { FilterCheckbox } from '../interfaces/checkbox'
import { FilterText } from '../styles/CommonStyles.styles'
import { CredentialFilter } from './CredentialFilter'
import {
  MenuOptionsStyle,
  MenuStyled,
  MenuTriggerStyle,
  TriggerViewIconStyled,
  TriggerViewStyled
} from './styles/CredentialFilterMenu.styles'

// Don't forget to wrap your screen with MenuProvider before using this!!

export const CredentialsFilterMenu = ({
  filters,
  onPress
}: {
  filters: FilterCheckbox[]
  onPress: (filter: FilterCheckbox) => void
}): JSX.Element => {
  return (
    <MenuStyled>
      <MenuTrigger customStyles={MenuTriggerStyle}>
        <TriggerViewStyled>
          <FilterText>{FILTER_TEXT} </FilterText>
          <TriggerViewIconStyled name="keyboard-arrow-down" />
        </TriggerViewStyled>
      </MenuTrigger>
      <MenuOptions customStyles={MenuOptionsStyle}>
        {filters.map((filter, index) => (
          <MenuOption
            key={`MenuOption_${index}`}
            // Disable container click
            disabled={true}
          >
            <CredentialFilter item={filter} onPress={onPress} />
          </MenuOption>
        ))}
      </MenuOptions>
    </MenuStyled>
  )
}
