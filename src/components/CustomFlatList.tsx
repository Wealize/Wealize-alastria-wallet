import React from 'react'
import { View, ToastAndroid } from 'react-native'
import { Divider } from 'react-native-elements'

import { SCREEN } from '../constants/screens'
import { ICON_SIZE, TOAST_POSITION } from '../constants/sizes'
import { CREDENTIAL_SHARE_PR } from '../constants/text'
import {
  CredentialCheckBox,
  CredentialShareCheckboxData
} from '../interfaces/checkbox'
import { SplashActivityIndicator } from '../screens/Register/styles'
import {
  ChipStyled,
  ContainerBottom,
  ContainerChip,
  ContainerSubtitle,
  ContainerTopStyled,
  Subtitle,
  Title
} from '../styles/CommonStyles.styles'
import { checkCredentialType } from '../utils/checkTypes'
import { initStackWithScreen } from '../utils/navigation-utils'
import { Colors } from '../utils/themes'
import { getDate } from '../utils/transformDate'
import { showTypePrText } from '../utils/translateTypes'
import CheckboxListElement from './CheckboxListElement'
import {
  RejectStyled,
  ViewStyled,
  SeparatorStyled,
  CheckboxExtraText,
  InfoChip
} from './styles/CustomFlatList.styles'
import TouchableButton from './TouchableButton'

export const FlatListHeader = ({
  serviceProviderName,
  requiredRequests,
  selectedCredential
}: {
  serviceProviderName: string | undefined
  requiredRequests: string[]
  selectedCredential: CredentialShareCheckboxData[]
}): JSX.Element => {
  return (
    <>
      <ViewStyled>
        <ContainerTopStyled>
          <Title>{CREDENTIAL_SHARE_PR.TITLE}</Title>
          <RejectStyled
            onPress={() => {
              initStackWithScreen(SCREEN.ACCREDITATION_LIST)
            }}
          >
            {CREDENTIAL_SHARE_PR.REJECT}
          </RejectStyled>
        </ContainerTopStyled>

        <ContainerSubtitle>
          <Subtitle>
            {CREDENTIAL_SHARE_PR.SUBTITLE} {serviceProviderName}
          </Subtitle>
          <Subtitle>{CREDENTIAL_SHARE_PR.REQUIRED}</Subtitle>
          <ContainerChip>
            {requiredRequests.map((request, index) => {
              const isCredentialSelected = selectedCredential
                .map((credential) => credential.type)
                .includes(request)
              return (
                <RequiredSelect
                  key={index}
                  request={request}
                  isCredentialSelected={isCredentialSelected}
                />
              )
            })}
            <InfoChip>{CREDENTIAL_SHARE_PR.INFO_CHIP}</InfoChip>
          </ContainerChip>
        </ContainerSubtitle>
      </ViewStyled>
    </>
  )
}

export const RequiredSelect = ({
  request,
  isCredentialSelected
}: {
  request: string
  isCredentialSelected: boolean
}): JSX.Element => {
  return (
    <>
      <ChipStyled
        title={showTypePrText(request)}
        icon={{
          name: isCredentialSelected ? 'check' : 'close',
          type: 'font-awesome',
          size: isCredentialSelected ? ICON_SIZE.CHECK : ICON_SIZE.CLOSE,
          color: isCredentialSelected ? Colors.activeInput : Colors.error
        }}
        onPress={() =>
          ToastAndroid.showWithGravityAndOffset(
            showTypePrText(request),
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            TOAST_POSITION.X_OFFSET,
            TOAST_POSITION.Y_OFFSET
          )
        }
      />
      <Divider width={7} color={'transparent'} />
    </>
  )
}

export const FlatListRenderItem = ({
  item,
  onPress
}: {
  item: CredentialCheckBox
  onPress: () => void
}): JSX.Element => {
  return (
    <View>
      <CheckboxListElement
        checked={item.checked}
        onPress={onPress}
        title={`${showTypePrText(checkCredentialType(item))} - ${
          item.issuerName
        }`}
        color={Colors.activeInput}
      />
      <CheckboxExtraText>
        {CREDENTIAL_SHARE_PR.DATE}
        {getDate(item.created)}
      </CheckboxExtraText>
      <CheckboxExtraText>
        {CREDENTIAL_SHARE_PR.STATUS}
        {item.status}
      </CheckboxExtraText>
    </View>
  )
}

export const FlatListItemSeparator = (): JSX.Element => {
  return <SeparatorStyled />
}

export const FlatListFooter = ({
  title,
  loading,
  disabled,
  onPress
}: {
  title: string
  loading: boolean
  disabled: boolean
  onPress: () => void
}): JSX.Element => {
  return (
    <ContainerBottom>
      {loading ? (
        <SplashActivityIndicator size={35} color={Colors.indicatorLoading} />
      ) : null}
      <TouchableButton title={title} disabled={disabled} onPress={onPress} />
    </ContainerBottom>
  )
}
