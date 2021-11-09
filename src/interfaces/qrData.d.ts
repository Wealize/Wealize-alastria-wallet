export interface CredentialQrData {
  id: string
  secret: string
  cbu: string
}

export interface AlastriaTokenQrData {
  // eslint-disable-next-line camelcase
  subject_id: string
  token: string
}
