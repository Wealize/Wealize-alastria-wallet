import { CredentialData } from '../interfaces/credentialInfo'

export const dataStringToJson = (credential: CredentialData) => {
  return JSON.parse(credential.value)
}
