import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native'

import ActivityIndicatorWidget from '../../components/ActivityIndicatorWidget'
import IconListElement from '../../components/IconListElement'
import Presentation from '../../entities/Presentation'
import { PresentationRepository } from '../../data/PresentationRepository'
import {
  PresentationCheckboxData,
  PresentationIterable
} from '../../interfaces/checkbox'
import PresentationService from '../../services/PresentationService'
import { HistoricRepository } from '../../data/HistoricRepository'
import { PRESENTATION } from '../../constants/actionTypes'
import { dismount, mount, isMount } from '../../utils/mountComponentUtils'
import {
  RevokeText,
  TitleSelect,
  RevokeTextActive,
  AccordionContainer,
  imageStyled,
  TouchableOpacityStyled,
  CheckboxxStyled,
  SelectContainer,
  TouchableOpacitySearch,
  IconSearch,
  IconSearchColor,
  SearchContainer,
  SearchInput,
  CancelIcon,
  OrderDateIcon
} from './styles'
import { getDateFromMiliseconds } from '../../utils/transformDate'
import { PRESENTATION_LIST, TOP_BAR } from '../../constants/text'
import { showTypePrText } from '../../utils/translateTypes'
import {
  ContainerTop,
  AccordionAngleIcon,
  AccordionStyled,
  MainView,
  ScrollViewStyled,
  FilterContainer,
  FilterText
} from '../../styles/CommonStyles.styles'
import {
  ContainerSyled,
  FieldName,
  TextInfo
} from '../../styles/ContainerStyles.styles'
import { useGlobalState } from '../../context/Actions/ActionContext'
import LoadingModal from '../../components/LoadingModal'
import { GET_MAIN_SCREENS_OPTIONS } from '../../constants/options'
import { PROGRESS_LOADING } from '../../constants/sizes'

const PresentationsList = () => {
  const [activeSections, setActiveSections] = useState<number[]>([])
  const [dataPresentations, setDataPresentations] = useState<Presentation[]>([])
  const [isLoading, setIsLoading] = useGlobalState('isLoadingPresentation')
  const [isRevokeLoading, setIsRevokeLoading] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [progressValue, setProgressValue] = useState(PROGRESS_LOADING.DEFAULT)
  const [checkboxData, setCheckboxData] = useState<PresentationCheckboxData[]>(
    []
  )
  const [isDescendingOrder, setIsDescendingOrder] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchPresentations, setSearchPresentations] = useState<
    Presentation[]
  >([])
  const [searchMode, setSearchMode] = useState(false)
  const [activePresentation] = useGlobalState('activePresentation')
  const [, setReloadHistoric] = useGlobalState('reloadHistoric')
  const componentRef = useRef(false)

  useEffect(() => {
    mount(componentRef)
    loadPresentations()
    return () => {
      dismount(componentRef)
    }
  }, [])

  useEffect(() => {
    activeStoreSelected()
  }, [activePresentation])

  useEffect(() => {
    fiilterPresentationByTerms()
  }, [searchTerm])

  const activeStoreSelected = async () => {
    if (dataPresentations) {
      const storeSelected = dataPresentations.findIndex(
        (presentation) => presentation.data === activePresentation
      )
      setActiveSections([storeSelected])
    }
  }

  const loadPresentations = async () => {
    setIsLoading(true)
    const presentations = await PresentationRepository.getPresentations()
    loadCheckboxData(presentations)

    if (isMount(componentRef)) {
      setDataPresentations(presentations)
      setSearchPresentations(presentations)
      setIsLoading(false)
    }
  }

  const loadCheckboxData = (presentations: Presentation[]) => {
    const presentationsCheckboxData = presentations.map(
      (presentation, index): PresentationCheckboxData => {
        return {
          id: index,
          presentationId: presentation.id,
          serviceProviderName: presentation.serviceProviderName,
          created: presentation.created,
          checked: false,
          data: presentation.data,
          infoType: presentation.credentialNames[0]
        }
      }
    )

    if (isMount(componentRef)) {
      setCheckboxData(presentationsCheckboxData)
    }
  }

  const fiilterPresentationByTerms = () => {
    const newFilterPresentationTerm = dataPresentations.filter(
      (dataPresentation: Presentation) =>
        dataPresentation.serviceProviderName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        showTypePrText(dataPresentation.credentialNames[0])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    setSearchPresentations(newFilterPresentationTerm)
  }

  const renderScreenHeader = () => {
    return deleteMode ? (
      <ContainerTop>
        <TouchableOpacity onPress={() => cancelDeleteMode()}>
          <SelectContainer>
            <TitleSelect>
              <Image
                source={require('../../assets/img/close-icon.png')}
                style={imageStyled.close}
              ></Image>
              {getSelectedPresentationsNumber()} {PRESENTATION_LIST.SELECT}
            </TitleSelect>
          </SelectContainer>
        </TouchableOpacity>
        <TouchableOpacityStyled onPress={() => revokePresentations()}>
          <RevokeText>
            {PRESENTATION_LIST.REVOKE.TITLE}
            <Image
              source={require('../../assets/img/delete-icon.png')}
              style={imageStyled.delete}
            ></Image>
          </RevokeText>
        </TouchableOpacityStyled>
      </ContainerTop>
    ) : (
      <ContainerTop>
        {searchMode ? renderSearchBar() : renderNormalFilterBar()}
        <LoadingModal
          modalText={PRESENTATION_LIST.REVOKE.LOADING}
          isVisible={isRevokeLoading}
          progressValue={progressValue}
        />
      </ContainerTop>
    )
  }

  const renderSearchBar = (): JSX.Element => {
    return (
      <SearchContainer>
        <SearchInput
          placeholder={PRESENTATION_LIST.SEARCHBAR}
          value={searchTerm}
          onChangeText={(value) => setSearchTerm(value)}
          rightIcon={<CancelIcon onPress={() => setSearchMode(!searchMode)} />}
        />
      </SearchContainer>
    )
  }

  const renderNormalFilterBar = (): JSX.Element => {
    return (
      <>
        <TouchableOpacity onPress={() => switchPresentationOrder()}>
          <FilterContainer>
            <OrderDateIcon
              name={isDescendingOrder ? 'sort-descending' : 'sort-ascending'}
            />
            <FilterText>{PRESENTATION_LIST.ORDER_DATE}</FilterText>
          </FilterContainer>
        </TouchableOpacity>

        <TouchableOpacitySearch onPress={() => setSearchMode(!searchMode)}>
          <IconSearch
            style={IconSearchColor(searchTerm)}
            source={require('../../assets/img/icon-search.png')}
          />
        </TouchableOpacitySearch>

        <TouchableOpacityStyled onPress={() => setDeleteMode(true)}>
          <RevokeTextActive>
            {PRESENTATION_LIST.REVOKE.TITLE}
            <Image
              source={require('../../assets/img/delete-icon.png')}
              style={imageStyled.deleteActive}
            ></Image>
          </RevokeTextActive>
        </TouchableOpacityStyled>
      </>
    )
  }

  const switchPresentationOrder = () => {
    setSearchPresentations(searchPresentations.reverse())
    setIsDescendingOrder(!isDescendingOrder)
  }

  const cancelDeleteMode = () => {
    const newCheckboxData: PresentationCheckboxData[] = Object.assign(
      [],
      checkboxData
    )
    newCheckboxData.forEach((data) => {
      data.checked = false
    })
    setDeleteMode(false)
    setCheckboxData(newCheckboxData)
  }

  const revokePresentations = () => {
    const selected = selectedPresentations(checkboxData)
    if (selected.length > 0) {
      Alert.alert(
        PRESENTATION_LIST.ALERT.TITLE,
        PRESENTATION_LIST.ALERT.SUBTITLE,
        [
          {
            text: PRESENTATION_LIST.ALERT.CANCEL,
            style: 'cancel'
          },
          {
            text: PRESENTATION_LIST.ALERT.OK,
            onPress: async () => {
              revokeSelectedPresentations(selectedPresentationsIds(selected))

              setDeleteMode(false)
            },
            style: 'destructive'
          }
        ],
        { cancelable: true }
      )
    } else {
      setDeleteMode(false)
    }
  }

  const revokeSelectedPresentations = async (
    selectedPresentationsIds: number[]
  ) => {
    try {
      setIsRevokeLoading(true)

      setProgressValue(PROGRESS_LOADING.STEP_START)
      await PresentationService.revokePresentationsInBlockchain(
        await getSelectedPresentationPmhashesById(selectedPresentationsIds)
      )
      setProgressValue(PROGRESS_LOADING.STEP_REVOKE_IN_BLOCKCHAIN)
      await PresentationService.revokePresentationsInBackend(
        await PresentationRepository.getPresentationsById(
          selectedPresentationsIds
        )
      )
      setProgressValue(PROGRESS_LOADING.STEP_REVOKE_IN_BACKEND)

      await saveRevocationsInHistorics(selectedPresentations(checkboxData))
      setIsRevokeLoading(false)
    } catch (error) {
      ToastAndroid.show(PRESENTATION_LIST.REVOKE.ERROR, ToastAndroid.SHORT)
      setIsRevokeLoading(false)
    }

    setProgressValue(PROGRESS_LOADING.DEFAULT)
    loadPresentations()
    setReloadHistoric('isReloading')
  }

  const selectedPresentations = (checkboxData: PresentationCheckboxData[]) =>
    checkboxData.filter((checkbox) => checkbox.checked)

  const selectedPresentationsIds = (
    selectedPresentations: PresentationCheckboxData[]
  ) => selectedPresentations.map((checkbox) => checkbox.presentationId)

  const getSelectedPresentationPmhashesById = async (
    presentationsIds: number[]
  ) => {
    const presentations = await PresentationRepository.getPresentationsById(
      presentationsIds
    )

    return presentations.map((presentation) => presentation.psmHash)
  }

  const saveRevocationsInHistorics = async (
    selectedPresentations: PresentationIterable
  ) => {
    for (const presentation of selectedPresentations) {
      await HistoricRepository.saveHistoric({
        data: presentation.data,
        datetime: presentation.created,
        entity: presentation.serviceProviderName,
        type: PRESENTATION.REVOKE.TYPE,
        infoType: presentation.infoType,
        description: PRESENTATION.REVOKE.DESCRIPTION
      })
    }
  }

  const _renderHeader = (
    presentation: Presentation,
    index: number,
    isActive: boolean
  ) => {
    return (
      <TouchableOpacity
        onPress={() => handleAccordionClick(index)}
        onLongPress={() => {
          handleAccordionLongClick(index)
        }}
      >
        {deleteMode ? (
          <CheckboxxStyled
            title={presentation.serviceProviderName}
            checked={checkboxData[index].checked}
            onPress={() => {
              handleCheckBoxClick(checkboxData[index])
            }}
          />
        ) : (
          <IconListElement
            title={presentation.serviceProviderName}
          ></IconListElement>
        )}
        <AccordionAngleIcon
          source={
            isActive
              ? require('../../assets/img/angle-up-icon.png')
              : require('../../assets/img/angle-down-icon.png')
          }
        />
      </TouchableOpacity>
    )
  }

  const handleAccordionClick = (sectionIndex: number) => {
    activeSections.includes(sectionIndex)
      ? setActiveSections([])
      : setActiveSections([sectionIndex])
  }

  const handleAccordionLongClick = (sectionIndex: number) => {
    checkboxData[sectionIndex].checked = true
    setDeleteMode(true)
  }

  const handleCheckBoxClick = (data: PresentationCheckboxData) => {
    const newCheckboxData: PresentationCheckboxData[] = Object.assign(
      [],
      checkboxData
    )
    newCheckboxData[data.id].checked = !newCheckboxData[data.id].checked
    setCheckboxData(newCheckboxData)
    if (getSelectedPresentationsNumber() === 0) {
      setDeleteMode(false)
    }
  }

  const getSelectedPresentationsNumber = () => {
    return checkboxData.filter((checkbox) => checkbox.checked).length
  }

  const _renderContent = (presentation: Presentation) => {
    return (
      <ContainerSyled>
        <TextInfo>
          <FieldName>{PRESENTATION_LIST.CIF}</FieldName>
          {presentation.serviceProviderCif}
        </TextInfo>
        <TextInfo>
          <FieldName>{PRESENTATION_LIST.DATE}</FieldName>
          {getDateFromMiliseconds(presentation.created)}
        </TextInfo>
        <TextInfo>
          <FieldName>{PRESENTATION_LIST.INFO}</FieldName>
          {parseCredentialsNames(presentation.credentialNames)}
        </TextInfo>
      </ContainerSyled>
    )
  }

  const parseCredentialsNames = (credentialNames: string[]) => {
    return credentialNames.map(
      (credentialName) => `${'\n'}${showTypePrText(credentialName)}`
    )
  }

  return (
    <MainView>
      <ScrollViewStyled>
        <AccordionContainer>
          {isLoading ? (
            <ActivityIndicatorWidget />
          ) : (
            <>
              {renderScreenHeader()}
              <AccordionStyled
                sections={searchPresentations}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={setActiveSections}
              />
            </>
          )}
        </AccordionContainer>
      </ScrollViewStyled>
    </MainView>
  )
}

PresentationsList.options = GET_MAIN_SCREENS_OPTIONS(TOP_BAR.PRESENTATION_LIST)

export default PresentationsList
