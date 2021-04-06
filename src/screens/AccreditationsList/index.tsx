import React, { useState, useEffect, useRef } from 'react'
import { View, TouchableOpacity } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { MenuProvider } from 'react-native-popup-menu'

import { NavigationProps, pushScreen } from '../../utils/navigation-utils'
import ActivityIndicatorWidget from '../../components/ActivityIndicatorWidget'
import { Colors } from '../../utils/themes'
import IconListElement from '../../components/IconListElement'
import { dismount, mount, isMount } from '../../utils/mountComponentUtils'
import { CredentialData } from '../../interfaces/credentialInfo'
import { CredentialRepository } from '../../data/CredentialRepository'
import { RenderInfoContent } from '../../components/CredentialContainer'
import {
  AccordionContainer,
  AccordionStyled,
  MainContainer,
  TopView
} from './styles'
import { TOP_BAR } from '../../constants/text'
import { SCREEN } from '../../constants/screens'
import { showFileTypeText, showTypeText } from '../../utils/translateTypes'
import {
  AccordionAngleIcon,
  ScrollViewStyled,
  FilterContainer
} from '../../styles/CommonStyles.styles'
import { CredentialsFilterMenu } from '../../components/CredentialsFilterMenu'
import { FilterCheckbox } from '../../interfaces/checkbox'
import { FILE_TYPES, INFO_TYPES } from '../../constants/infoTypes'
import { dataStringToJson } from '../../utils/jsonParser'
import { useGlobalState } from '../../context/Actions/ActionContext'
import { ALL_FILTER_INDEX } from '../../constants/filters'
import { GET_MAIN_SCREENS_OPTIONS } from '../../constants/options'

const AccreditationsList = ({ componentId }: NavigationProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([])
  const [dataCredentials, setDataCredentials] = useGlobalState(
    'dataCredentials'
  )
  const [filteredDataCredentials, setFilteredDataCredentials] = useState<
    CredentialData[]
  >([])
  const [activeCredential] = useGlobalState('activeCredential')
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState<FilterCheckbox[]>([])
  const componentRef = useRef(false)

  useEffect(() => {
    mount(componentRef)
    loadFilters()
    loadCredentials()
    return () => {
      dismount(componentRef)
    }
  }, [])

  useEffect(() => {
    if (dataCredentials) {
      const storeSelected = dataCredentials.findIndex(
        (credential) => credential.data === activeCredential
      )
      setActiveSections([storeSelected])
    }
  }, [activeCredential])

  const loadCredentials = async () => {
    setIsLoading(true)
    const data = await CredentialRepository.getCredentials()

    if (isMount(componentRef)) {
      setDataCredentials(data)
      setFilteredDataCredentials(data)
      setIsLoading(false)
    }
  }

  const loadFilters = () => {
    const infoTypes = Object.keys(INFO_TYPES).filter(
      (infoType) => infoType !== 'generic'
    )
    const fileTypes = Object.keys(FILE_TYPES)

    const filters = infoTypes
      .map((infoType, index) => {
        return {
          index: index + 1,
          name: showTypeText(infoType),
          checked: true,
          type: infoType
        }
      })
      .concat(
        fileTypes.map((fileType, index) => {
          return {
            index: index + 1 + infoTypes.length,
            name: showFileTypeText(fileType),
            checked: true,
            type: fileType
          }
        })
      )
    filters.unshift({
      index: ALL_FILTER_INDEX,
      name: 'Todo',
      checked: true,
      type: ''
    })

    setFilters(filters)
  }

  const _renderHeader = (
    credential: CredentialData,
    index: number,
    isActive: boolean
  ) => {
    return (
      <View>
        <IconListElement title={showTypeText(credential.key)} />
        <AccordionAngleIcon
          source={
            isActive
              ? require('../../assets/img/angle-up-icon.png')
              : require('../../assets/img/angle-down-icon.png')
          }
        />
      </View>
    )
  }

  const _renderContent = (credential: CredentialData) => {
    return (
      <RenderInfoContent credential={credential} componentId={componentId} />
    )
  }

  const areFiltersAllChecked = (filters: FilterCheckbox[]) => {
    return filters.every((filter, index) => {
      if (index !== ALL_FILTER_INDEX) {
        return filter.checked
      }
      return true
    })
  }

  const handleAllFilterPress = () => {
    const newFilters = [...filters]
    const areAllChecked = !areFiltersAllChecked(newFilters)

    newFilters.forEach((filter) => {
      filter.checked = areAllChecked
    })

    setFilters(newFilters)
  }

  const handleFilterPress = (filter: FilterCheckbox) => {
    if (filter.index === ALL_FILTER_INDEX) {
      handleAllFilterPress()
    } else {
      const newFilters = [...filters]
      newFilters[filter.index].checked = !newFilters[filter.index].checked
      newFilters[0].checked = areFiltersAllChecked(newFilters)
      setFilters(newFilters)
    }
    filterCredentials()
  }

  const filterCredentials = () => {
    let newFilteredDataCredentials = [...dataCredentials]

    if (!areFiltersAllChecked(filters)) {
      newFilteredDataCredentials = newFilteredDataCredentials.filter(
        (dataCredential) =>
          filters
            .filter((filter) => {
              const dataCredentialJson = dataStringToJson(dataCredential)

              return (
                filter.type === dataCredentialJson.file_type ||
                filter.type === dataCredentialJson.info_type
              )
            })
            .some((filter) => filter.checked)
      )
    }

    setFilteredDataCredentials(newFilteredDataCredentials)
  }

  return (
    <MenuProvider>
      <MainContainer>
        {isLoading ? (
          <ActivityIndicatorWidget />
        ) : (
          <ScrollViewStyled>
            <TopView>
              <FilterContainer>
                <CredentialsFilterMenu
                  filters={filters}
                  onPress={handleFilterPress}
                />
              </FilterContainer>
            </TopView>
            <AccordionContainer>
              <AccordionStyled
                sections={filteredDataCredentials}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={setActiveSections}
                touchableComponent={TouchableOpacity}
              />
            </AccordionContainer>
          </ScrollViewStyled>
        )}

        <ActionButton
          buttonColor={Colors.principalButtons}
          size={82}
          onPress={() => {
            pushScreen(componentId, SCREEN.QR_READER)
          }}
          renderIcon={() => (
            <Icon
              name="qr-code-scanner"
              size={32}
              style={{ color: Colors.mainBackground }}
            />
          )}
        />
      </MainContainer>
    </MenuProvider>
  )
}

AccreditationsList.options = GET_MAIN_SCREENS_OPTIONS(
  TOP_BAR.ACCREDITATIONS_LIST
)

export default AccreditationsList
