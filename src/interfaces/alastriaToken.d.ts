export interface AlastriaToken {
  header: {
    alg: string
    typ: string
  }
  payload: {
    ani: string
    cbu: string
    exp: number
    gwu: string
    iat: number
    iss: string
  }
  signature: string
}
