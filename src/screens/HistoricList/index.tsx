import React, { useState, useEffect, useCallback } from 'react'
import {
  FlatList,
  RefreshControl,
  ToastAndroid,
  ListRenderItemInfo
} from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'

import ActivityIndicatorWidget from '../../components/ActivityIndicatorWidget'
import { HistoricRepository } from '../../data/HistoricRepository'
import Historic from '../../entities/Historic'
import {
  HistoricContainer,
  HistoricFieldName,
  HistoricTextInfo,
  HistoricView
} from './styles'
import IconHistoricElement from '../../components/IconHistoricElement'
import { getDate } from '../../utils/transformDate'
import { HISTORIC_LIST, TOP_BAR } from '../../constants/text'
import {
  showAcctionText,
  showHistoricText,
  showTypePrText
} from '../../utils/translateTypes'
import {
  ContainerTop,
  FilterContainer,
  MainView
} from '../../styles/CommonStyles.styles'
import { changeTab, NavigationProps } from '../../utils/navigation-utils'
import { useGlobalState } from '../../context/Actions/ActionContext'
import {
  CREDENTIAL,
  PRESENTATION,
  SELECT_CREDENTIAL
} from '../../constants/actionTypes'
import { AlertWithOutButtonDissmissable } from '../../utils/Alerts'
import { FilterCheckbox } from '../../interfaces/checkbox'
import { CredentialsFilterMenu } from '../../components/CredentialsFilterMenu'
import { ALL_FILTER_INDEX, FILTER_HISTORIC } from '../../constants/filters'
import { GET_MAIN_SCREENS_OPTIONS } from '../../constants/options'

const HistoricList = ({ componentId }: NavigationProps) => {
  const [dataHistorics, setDataHistorics] = useState<Historic[]>([])
  const [, setActivePresentation] = useGlobalState('activePresentation')
  const [, setActiveCredential] = useGlobalState('activeCredential')
  const [filteredDataHistorics, setFilteredDataHistorics] = useState<
    Historic[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [filters, setFilters] = useState<FilterCheckbox[]>([])
  const [reloadHistoric, setReloadHistoric] = useGlobalState('reloadHistoric')

  useEffect(() => {
    loadFilters()
    loadHistorics()
  }, [])

  useEffect(() => {
    if (reloadHistoric === 'isReloading') {
      loadFilters()
      loadHistorics()
      setReloadHistoric('')
    }
  }, [reloadHistoric])

  const loadHistorics = async () => {
    setIsLoading(true)
    const historics = await HistoricRepository.getHistoric()
    setDataHistorics(historics.reverse())
    setFilteredDataHistorics(historics)
    setIsLoading(false)
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await loadHistorics()
    } catch (error) {
      ToastAndroid.show(HISTORIC_LIST.ERROR, ToastAndroid.SHORT)
    }
    loadFilters()
    setRefreshing(false)
  }, [refreshing])

  const loadFilters = () => {
    const filterTypes = Object.keys(FILTER_HISTORIC)

    const filters = filterTypes.map((infoType, index) => {
      return {
        index: index + 1,
        name: showHistoricText(infoType),
        checked: true,
        type: infoType
      }
    })
    filters.unshift({
      index: ALL_FILTER_INDEX,
      name: 'Todo',
      checked: true,
      type: ''
    })

    setFilters(filters)
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
    filterHistorics()
  }

  const filterHistorics = () => {
    let newFilteredDataHistoric = [...dataHistorics]

    if (!areFiltersAllChecked(filters)) {
      newFilteredDataHistoric = newFilteredDataHistoric.filter(
        (dataHistorics) =>
          filters
            .filter((filter) => {
              return filter.type === dataHistorics.type
            })
            .some((filter) => filter.checked)
      )
    }

    setFilteredDataHistorics(newFilteredDataHistoric)
  }

  const renderScreenHeader = () => {
    return (
      <ContainerTop>
        <FilterContainer>
          <CredentialsFilterMenu
            filters={filters}
            onPress={handleFilterPress}
          />
        </FilterContainer>
      </ContainerTop>
    )
  }

  const renderHistoricList = ({ item }: ListRenderItemInfo<Historic>) => (
    <HistoricContainer
      onTouchEnd={() => {
        switchToSelectedTab(item)
      }}
    >
      <IconHistoricElement
        title={item.description}
        icon={item.type.toLowerCase()}
      ></IconHistoricElement>
      <HistoricTextInfo>
        <HistoricFieldName>{showAcctionText(item.type)}</HistoricFieldName>
        {item.entity}
      </HistoricTextInfo>
      <HistoricTextInfo>
        <HistoricFieldName>{HISTORIC_LIST.TYPE}</HistoricFieldName>
        {showTypePrText(item.infoType)}
      </HistoricTextInfo>
      <HistoricTextInfo>
        <HistoricFieldName>{HISTORIC_LIST.DATE}</HistoricFieldName>
        {getDate(item.datetime)}
      </HistoricTextInfo>
    </HistoricContainer>
  )

  const switchToSelectedTab = (item: Historic) => {
    switch (item.type) {
      case CREDENTIAL.SAVE.TYPE:
        setActiveCredential(item.data)
        changeTab(componentId, SELECT_CREDENTIAL[item.type])
        break
      case PRESENTATION.ACCESS.TYPE:
        setActivePresentation(item.data)
        changeTab(componentId, SELECT_CREDENTIAL[item.type])
        break
      case PRESENTATION.REVOKE.TYPE:
        AlertWithOutButtonDissmissable(
          HISTORIC_LIST.ALERT.TITLE,
          HISTORIC_LIST.ALERT.SUBTITLE
        )
    }
  }

  return (
    <MenuProvider>
      <MainView>
        <HistoricView>
          {isLoading ? (
            <ActivityIndicatorWidget />
          ) : (
            <>
              {renderScreenHeader()}
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={filteredDataHistorics}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => renderHistoricList(item)}
              />
            </>
          )}
        </HistoricView>
      </MainView>
    </MenuProvider>
  )
}

HistoricList.options = GET_MAIN_SCREENS_OPTIONS(TOP_BAR.HISTORIC_LIST)

export default HistoricList
