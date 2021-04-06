export interface CredentialQrData {
  id: string
  secret: string
  cbu: string
}

export interface AlastriaTokenQrData {
  // eslint-disable-next-line camelcase
  victim_id: string
  token: string
}
