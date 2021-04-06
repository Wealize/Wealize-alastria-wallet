import { createGlobalState } from 'react-hooks-global-state'

import { CredentialData } from '../../interfaces/credentialInfo'

interface dataStore {
  dataCredentials: CredentialData[]
  activePresentation: string
  activeCredential: string
  isLoadingPresentation: boolean
  reloadHistoric: string
}

const initialState: dataStore = {
  dataCredentials: [],
  activePresentation: '',
  activeCredential: '',
  isLoadingPresentation: false,
  reloadHistoric: ''
}

export const { useGlobalState } = createGlobalState(initialState)
