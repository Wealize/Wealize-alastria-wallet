import React from 'react'
import moment from 'moment'

import {
  CredentialSubjectInfo,
  CredentialData,
  CredentialNieSubjectInfo,
  CredentialGenericSubjectInfo
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
import { SubjectInfo } from '../interfaces/InfoTypes'
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
  const SUBJECT_INFO = {
    nie_copy: renderNie(credential),
    generic: renderGeneric(credential, componentId)
  }
  const SUBJECT_DEFAULT_INFO = renderDefault(credential)

  return renderSubjectInfo(credential, SUBJECT_INFO, SUBJECT_DEFAULT_INFO)
}

const renderSubjectInfo = (
  credential: CredentialData,
  subject: SubjectInfo,
  defaultInfo: JSX.Element
) => {
  const credentialInfo: CredentialSubjectInfo = dataStringToJson(credential)
  const subjectInfo =
    subject[credentialInfo.info_type as keyof SubjectInfo] || defaultInfo

  return subjectInfo
}

const renderNie = (credential: CredentialData) => {
  const subjectNieInfo: CredentialNieSubjectInfo = dataStringToJson(credential)
  return <NieContent credential={credential} nieInfo={subjectNieInfo} />
}

const renderGeneric = (credential: CredentialData, componentId: string) => {
  const subjectGenericInfo: CredentialGenericSubjectInfo = dataStringToJson(
    credential
  )
  return (
    <GenericContent
      credential={credential}
      genericInfo={subjectGenericInfo}
      componentId={componentId}
    />
  )
}

const renderDefault = (credential: CredentialData) => {
  const subjectGenericInfo: CredentialGenericSubjectInfo = dataStringToJson(
    credential
  )
  return (
    <DefaultContent credential={credential} genericInfo={subjectGenericInfo} />
  )
}

const NieContent = ({
  credential,
  nieInfo
}: {
  credential: CredentialData
  nieInfo: CredentialNieSubjectInfo
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
  genericInfo: CredentialGenericSubjectInfo
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
  genericInfo: CredentialGenericSubjectInfo
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
