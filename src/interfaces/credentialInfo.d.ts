/* eslint-disable camelcase */
export interface CredentialInfo {
  header: {
    alg: string
    typ: string
  }
  payload: CredentialInfoPayload
}

export interface CredentialInfoPayload {
  iat: number
  iss: string
  vc: {
    type: string[]
    '@context': string[]
    credentialSubject: CredentialSubjectData
  }
}

export interface CredentialSubjectData {
  victimInfo: CredentialVictimInfo
}

export interface CredentialVictimInfo {
  info_type: string
  file_type?: string
}

export interface CredentialNieVictimInfo extends CredentialVictimInfo {
  gender: string
  birthDate: string
  givenName: string
  familyName: string
  identifier: CredentiaInfoIdentifier
  name: string
}

export interface CredentialCensusVictimInfo extends CredentialVictimInfo {
  nie: string
  sex: string
  name: string
  town: string
  address: CredentiaInfoIdentifier
  section: string
  district: string
  birthdate: string
  last_name: string
  birthplace: string
  order_number: string
  padronal_sheet: string
  singular_entity: string
  inscription_date: string
  province_of_birth: string
  nucleus_disseminated: string
  country_of_nationality: string
}

export interface InternationalProtectionRequestStateInfo
  extends CredentialVictimInfo {
  record_number: string
  name: string
  last_name: string
  request_reason: string
  state_certifier: string
  request_date: string
  transaction_state: string
}

export interface InternationalProtectionRecognitionCertificate
  extends CredentialVictimInfo {
  record_number: string
  name: string
  last_name: string
  request_formalization_date: string
  birthdate: string
  filiation: string
  birthplace: string
  birthcountry: string
  certificate_certifier: string
  asylum_recognition_date: string
  resolution_notification_date: string
  validity: string
  legal_basis: string
}

export interface CredentialGenericVictimInfo extends CredentialVictimInfo {
  document: string
}

export interface CredentiaInfoIdentifier {
  value: string
  propertyID: string
}

export interface CredentialData {
  issuerCif: string
  issuerName: string
  issuerDid: string
  data: string
  key: string
  value: string
  created: string
  status?: string
}

export interface CredentialRequest {
  id: string
  required: boolean
}

export interface CredentialRequested {
  index: number
  credential: CredentialInfo
  required: boolean
}
