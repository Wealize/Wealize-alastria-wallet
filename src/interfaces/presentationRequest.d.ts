export interface PresentationRequestData {
  '@context': string[]
  type: string[]
  levelOfAssurance: number
  required: boolean
  // eslint-disable-next-line camelcase
  field_name: string
}

export interface PresentationRequestPayload {
  iss: string
  iat: number
  cbu: string
  pr: PresentationContent
  jti: string
}

export interface PresentationContent {
  '@context': string[]
  type: string[]
  procHash: string
  procUrl: string
  data: PresentationRequestData[]
}

export interface PresentationRequest {
  header: {
    alg: string
    typ: string
  }
  payload: PresentationRequestPayload
  signature: string
}

export interface PresetationResolve {
  presentationJwt: string
  presentationCbu: string
}
