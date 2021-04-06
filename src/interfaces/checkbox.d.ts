import { CredentialData } from "./credentialInfo";

export interface FilterCheckbox {
  index: number
  name: string
  checked: boolean
  type: string
}

export interface CredentialShareCheckboxData {
  type: string
  data: string
}

export interface CredentialCheckBox extends CredentialData {
  checked: boolean
}

export interface PresentationCheckboxData {
  id: number
  presentationId: number
  checked: boolean
  serviceProviderName: string
  created: string
  data: string
  infoType: string
}

export interface PresentationIterable<
  T extends PresentationCheckboxData = PresentationCheckboxData
> {
  [Symbol.iterator](): IterableIterator
}
