/* eslint-disable camelcase */
import { CredentialData, CredentialGenericVictimInfo } from '../interfaces/credentialInfo'

export const fileCheckType = (documentBase64: string) => {
  const decodeDocument = Buffer.from(documentBase64, 'base64')
  const HexDocument = decodeDocument.toString('ascii')
  return HexDocument.slice(0, 10)
}

export const checkCredentialType = (data: CredentialData) => {
  const { file_type }: CredentialGenericVictimInfo = JSON.parse(data.value)
  if (data.key === 'generic' && file_type) return file_type
  return data.key
}
