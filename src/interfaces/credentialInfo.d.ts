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
  victimInfo: CredentialSubjectInfo
}

export interface CredentialSubjectInfo {
  info_type: string
  file_type?: string
}

export interface CredentialNieSubjectInfo extends CredentialSubjectInfo {
  gender: string
  birthDate: string
  givenName: string
  familyName: string
  identifier: CredentiaInfoIdentifier
  name: string
}


export interface CredentialGenericSubjectInfo extends CredentialSubjectInfo {
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
