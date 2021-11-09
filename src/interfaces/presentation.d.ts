export interface PresentationPayload {
  jti?: string
  iss: string
  aud: string
  iat: number
  exp?: number
  nbf?: number
  vp: VerifiablePresentation
}

export interface VerifiablePresentation {
  '@context': string[]
  type: string[]
  procHash: string
  procUrl: string
  verifiableCredential: string[]
}

export interface Presentation {
  header: {
    alg: string
    typ: string
  }
  payload: PresentationPayload
  signature: string
}
