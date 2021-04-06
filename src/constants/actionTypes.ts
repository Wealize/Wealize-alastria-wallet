import { SCREEN } from './screens'

export const PRESENTATION = {
  REVOKE: {
    TYPE: 'PRESENTATION_REVOKE',
    DESCRIPTION: 'Revocación de acceso'
  },
  ACCESS: {
    TYPE: 'PRESENTATION_ACCESS',
    DESCRIPTION: 'Autorización de acceso'
  }
}

export const CREDENTIAL = {
  SAVE: {
    TYPE: 'CREDENTIAL_SAVE',
    DESCRIPTION: 'Acreditación añadida'
  }
}

export const HISTORIC_TYPES = {
  PRESENTATION_REVOKE: 'Revocada a: ',
  PRESENTATION_ACCESS: 'Compartida con: ',
  CREDENTIAL_SAVE: 'Emitida por: '
}

export const DEFAULT_ACTION = 'Entidad'

export const SELECT_CREDENTIAL = {
  [PRESENTATION.REVOKE.TYPE]: '',
  [PRESENTATION.ACCESS.TYPE]: SCREEN.PRESENTATION_LIST,
  [CREDENTIAL.SAVE.TYPE]: SCREEN.ACCREDITATION_LIST
}
