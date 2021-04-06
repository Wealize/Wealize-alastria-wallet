import React from 'react'
import moment from 'moment'

import {
  CredentialVictimInfo,
  CredentialData,
  CredentialNieVictimInfo,
  CredentialCensusVictimInfo,
  CredentialGenericVictimInfo,
  InternationalProtectionRequestStateInfo,
  InternationalProtectionRecognitionCertificate
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
    census_copy: renderCensus(credential),
    international_protection_request_state: renderInternationalProtectionRequestState(
      credential
    ),
    international_protection_recognition_certificate: renderInternationalProtectionRecognitionCertificate(
      credential
    ),
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

const renderCensus = (credential: CredentialData) => {
  const victimCensusInfo: CredentialCensusVictimInfo = dataStringToJson(
    credential
  )
  return <CensusContent credential={credential} censusInfo={victimCensusInfo} />
}

const renderInternationalProtectionRequestState = (
  credential: CredentialData
) => {
  const victimInternationalProtectionRequestStateContent: InternationalProtectionRequestStateInfo = dataStringToJson(
    credential
  )

  return (
    <InternationalProtectionRequestStateContent
      credential={credential}
      internationalProtectionRequestStateInfo={
        victimInternationalProtectionRequestStateContent
      }
    />
  )
}

const renderInternationalProtectionRecognitionCertificate = (
  credential: CredentialData
) => {
  const victimInternationalProtectionRecognitionCertificateContent: InternationalProtectionRecognitionCertificate = dataStringToJson(
    credential
  )

  return (
    <InternationalProtectionRecognitionCertificateContent
      credential={credential}
      internationalProtectionRecognitionCertificateInfo={
        victimInternationalProtectionRecognitionCertificateContent
      }
    />
  )
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

const CensusContent = ({
  credential,
  censusInfo
}: {
  credential: CredentialData
  censusInfo: CredentialCensusVictimInfo
}): JSX.Element => {
  return (
    <ContainerSyled>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.STATUS} </FieldName>
        {credential.status}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.ORGANIZATION} </FieldName>
        {censusInfo.singular_entity}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.DATE} </FieldName>{' '}
        {showDate(credential.created)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.TOWN} </FieldName>
        {CREDENTIAL_DESCRIPTION.TOWN_DESCRIPTION} {censusInfo.town}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.ADDRESS} </FieldName>
        {censusInfo.address}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.NUCLEUS} </FieldName>
        {censusInfo.nucleus_disseminated}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.ISSUER} </FieldName>
        {credential.issuerName}
      </TextInfo>
    </ContainerSyled>
  )
}

const InternationalProtectionRequestStateContent = ({
  credential,
  internationalProtectionRequestStateInfo
}: {
  credential: CredentialData
  internationalProtectionRequestStateInfo: InternationalProtectionRequestStateInfo
}): JSX.Element => {
  return (
    <ContainerSyled>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.STATUS} </FieldName>
        {credential.status}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.RECORD_NUMBER} </FieldName>
        {internationalProtectionRequestStateInfo.record_number}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.NAME} </FieldName>
        {internationalProtectionRequestStateInfo.name}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.LAST_NAME} </FieldName>
        {internationalProtectionRequestStateInfo.last_name}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.REQUEST_REASON} </FieldName>
        {internationalProtectionRequestStateInfo.request_reason}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.STATE_CERTIFIER} </FieldName>
        {internationalProtectionRequestStateInfo.state_certifier}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.REQUEST_DATE} </FieldName>
        {showDate(internationalProtectionRequestStateInfo.request_date)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.TRANSACTION_STATE} </FieldName>
        {internationalProtectionRequestStateInfo.transaction_state}
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

const InternationalProtectionRecognitionCertificateContent = ({
  credential,
  internationalProtectionRecognitionCertificateInfo
}: {
  credential: CredentialData
  internationalProtectionRecognitionCertificateInfo: InternationalProtectionRecognitionCertificate
}): JSX.Element => {
  return (
    <ContainerSyled>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.STATUS} </FieldName>
        {credential.status}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.RECORD_NUMBER} </FieldName>
        {internationalProtectionRecognitionCertificateInfo.record_number}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.NAME} </FieldName>
        {internationalProtectionRecognitionCertificateInfo.name}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.LAST_NAME} </FieldName>
        {internationalProtectionRecognitionCertificateInfo.last_name}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.REQUEST_FORMALIZATION_DATE} </FieldName>
        {showDate(internationalProtectionRecognitionCertificateInfo.request_formalization_date)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.BIRTHDATE} </FieldName>
        {showDate(internationalProtectionRecognitionCertificateInfo.birthdate)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.FILIATION} </FieldName>
        {internationalProtectionRecognitionCertificateInfo.filiation}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.BIRTHPLACE} </FieldName>
        {internationalProtectionRecognitionCertificateInfo.birthplace}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.BIRTHCOUNTRY} </FieldName>
        {internationalProtectionRecognitionCertificateInfo.birthcountry}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.CERTIFICATE_CERTIFIER} </FieldName>
        {internationalProtectionRecognitionCertificateInfo.certificate_certifier}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.ASYLUM_RECOGNITION_DATE} </FieldName>
        {showDate(internationalProtectionRecognitionCertificateInfo.asylum_recognition_date)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.RESOLUTION_NOTIFICATION_DATE} </FieldName>
        {showDate(internationalProtectionRecognitionCertificateInfo.resolution_notification_date)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.VALIDITY} </FieldName>
        {showDate(internationalProtectionRecognitionCertificateInfo.validity)}
      </TextInfo>
      <TextInfo>
        <FieldName>{CREDENTIAL_DESCRIPTION.LEGAL_BASIS} </FieldName>
        {internationalProtectionRecognitionCertificateInfo.legal_basis}
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
