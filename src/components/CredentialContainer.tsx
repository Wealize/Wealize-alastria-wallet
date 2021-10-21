import React from 'react'
import moment from 'moment'

import {
  CredentialVictimInfo,
  CredentialData,
  CredentialNieVictimInfo,
  CredentialGenericVictimInfo
} from '../interfaces/credentialInfo'
import { numericDateToTime } from '../utils/dateParser'
import { DocumentLink } from './styles/CredentialContainer.styles'
import {
  ContainerSyled,
  FieldName,
  TextInfo
} from '../styles/ContainerStyles.styles'
import { dataStringToJson } from '../utils/jsonParser'
import { CREDENTIAL_DESCRIPTION } from '../constants/text'
import { VictimInfo } from '../interfaces/InfoTypes'
import { pushScreen } from '../utils/navigation-utils'
import { fileCheckType } from '../utils/checkTypes'
import { DAY_MONTH_YEAR } from '../constants/formats'
import { SCREEN } from '../constants/screens'
import { showFileTypeText } from '../utils/translateTypes'
import { translateGender } from '../utils/translates'

export const RenderInfoContent = ({
  componentId,
  credential
}: {
  componentId: string
  credential: CredentialData
}): JSX.Element => {
  const VICTIM_INFO = {
    nie_copy: renderNie(credential),
    generic: renderGeneric(credential, componentId)
  }
  const VICTIM_DEFAULT_INFO = renderDefault(credential)

  return renderVictimInfo(credential, VICTIM_INFO, VICTIM_DEFAULT_INFO)
}

const renderVictimInfo = (
  credential: CredentialData,
  victim: VictimInfo,
  defaultInfo: JSX.Element
) => {
  const credentialInfo: CredentialVictimInfo = dataStringToJson(credential)
  const victimInfo =
    victim[credentialInfo.info_type as keyof VictimInfo] || defaultInfo

  return victimInfo
}

const renderNie = (credential: CredentialData) => {
  const victimNieInfo: CredentialNieVictimInfo = dataStringToJson(credential)
  return <NieContent credential={credential} nieInfo={victimNieInfo} />
}

const renderGeneric = (credential: CredentialData, componentId: string) => {
  const victimGenericInfo: CredentialGenericVictimInfo = dataStringToJson(
    credential
  )
  return (
    <GenericContent
      credential={credential}
      genericInfo={victimGenericInfo}
      componentId={componentId}
    />
  )
}

const renderDefault = (credential: CredentialData) => {
  const victimGenericInfo: CredentialGenericVictimInfo = dataStringToJson(
    credential
  )
  return (
    <DefaultContent credential={credential} genericInfo={victimGenericInfo} />
  )
}

const NieContent = ({
  credential,
  nieInfo
}: {
  credential: CredentialData
  nieInfo: CredentialNieVictimInfo
}): JSX.Element => {
  return (
    <ContainerSyled>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.STATUS} </FieldName>
        {credential.status}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.ISSUER} </FieldName>
        {credential.issuerName}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.DATE} </FieldName>{' '}
        {showDate(credential.created)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.NAME} </FieldName>
        {nieInfo.name}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.SEX} </FieldName>
        {translateGender(nieInfo.gender)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.BIRTHDATE} </FieldName>
        {nieInfo.birthDate}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.NIE} </FieldName>
        {nieInfo.identifier.value}
      </TextInfo>
    </ContainerSyled>
  )
}

const GenericContent = ({
  componentId,
  credential,
  genericInfo
}: {
  componentId: string
  credential: CredentialData
  genericInfo: CredentialGenericVictimInfo
}): JSX.Element => {
  return (
    <ContainerSyled>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.STATUS} </FieldName>
        {credential.status}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.TYPE} </FieldName>
        {showFileTypeText(genericInfo.file_type)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.ISSUER} </FieldName>
        {credential.issuerName}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.DATE} </FieldName>{' '}
        {showDate(credential.created)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.DOCUMENT} </FieldName>
        <DocumentLink
          onPress={() => {
            checkFileTypeAndPush(genericInfo.document, componentId)
          }}
        >
          {CREDENTIAL_DESCRIPTION.DOCUMENT_LINK}
        </DocumentLink>
      </TextInfo>
    </ContainerSyled>
  )
}

const DefaultContent = ({
  credential,
  genericInfo
}: {
  credential: CredentialData
  genericInfo: CredentialGenericVictimInfo
}): JSX.Element => {
  return (
    <ContainerSyled>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.STATUS} </FieldName>
        {credential.status}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.TYPE} </FieldName>
        {showFileTypeText(genericInfo.file_type)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.ISSUER} </FieldName>
        {credential.issuerName}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.DATE} </FieldName>{' '}
        {showDate(credential.created)}
      </TextInfo>
    </ContainerSyled>
  )
}

const checkFileTypeAndPush = (documentBase64: string, componentId: string) => {
  const type = fileCheckType(documentBase64)
  if (type.includes(CREDENTIAL_DESCRIPTION.TYPE_PDF)) {
    pushScreen(componentId, SCREEN.PDF_VIEWER, { file: documentBase64 })
  } else {
    pushScreen(componentId, SCREEN.IMAGEN_VIEWER, { file: documentBase64 })
  }
}

const showDate = (date: string) => {
  return moment(numericDateToTime(date)).format(DAY_MONTH_YEAR)
}
