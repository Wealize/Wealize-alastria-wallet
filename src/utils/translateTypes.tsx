import { DEFAULT_ACTION, HISTORIC_TYPES } from '../constants/actionTypes'
import { FILTER_HISTORIC } from '../constants/filters'
import { DEFAULT_TYPE, FILE_TYPES, INFO_TYPES } from '../constants/infoTypes'
import { CredentialVictimInfo } from '../interfaces/credentialInfo'
import { HistoricTypes } from '../interfaces/historicTypes'
import { FileTypes, InfoTypes } from '../interfaces/InfoTypes'

export const showTypeText = (type: string | undefined): string => {
  return INFO_TYPES[type as keyof InfoTypes] || DEFAULT_TYPE
}

export const showTypePrText = (type: string): string => {
  const fileTypes = FILE_TYPES[type as keyof FileTypes]
  if (fileTypes) return fileTypes
  return INFO_TYPES[type as keyof InfoTypes] || type
}

export const showFileTypeText = (fileType: string | undefined): string => {
  return FILE_TYPES[fileType as keyof FileTypes] || DEFAULT_TYPE
}

export const showDocumentFileType = (
  victimInfo: CredentialVictimInfo
): string => {
  const { file_type: fileType } = victimInfo
  if (!fileType) return ''
  return `- ${FILE_TYPES[fileType as keyof FileTypes]}` || DEFAULT_TYPE
}

export const showAcctionText = (action: string): string => {
  return HISTORIC_TYPES[action as keyof HistoricTypes] || DEFAULT_ACTION
}

export const showHistoricText = (action: string): string => {
  return FILTER_HISTORIC[action as keyof HistoricTypes] || DEFAULT_ACTION
}