export interface VaccineCodingInterface {
  code: string
  // display: string
}
export interface VaccineCodeInterface {
  text?: string
  coding?: VaccineCodingInterface[]
}

export interface ContainedInterface {
  id: number
  resourceType: string
  birthDate?: string
  gender?: string
  name: string
}

export interface Vaccine {
  resource?: {
    id?: number
    date: string
    status: string
    resourceType?: string
    location: { reference: string }
    note?: string
    patient?: {
      reference: string
    }
    vaccineCode: VaccineCodeInterface
    contained?: [
      {
        id: number
        resourceType: string
        birthDate: string
        gender?: string
        name?: {
          family?: string
          given?: []
        }
      },
      {
        id: number
        resourceType: string
        name?: string
      }
    ]
    wasNotGiven: boolean
    reported: boolean
    // lotNumber: string Este falta en la API
    // note
    // explanation
  }
}

export interface VaccineCredentialPayload {
  iat: number,
  iss: string,
  vc: {
    "@context": string[],
    credentialSubject: {
      levelOfAssurance: number,
      vacuna: Vaccine
    },
    type: string[]
  }
}

export interface MultipleVaccinesCredentialsPayload {
  iat: number,
  iss: string,
  vc: {
    "@context": string[],
    credentialSubject: {
      levelOfAssurance: number,
      verifiableCredential: string[]
    },
    type: string[]
  }
}

export interface VaccineCredentialToken {
  header: {
    alg: string
    typ: string
  }
  payload: VaccineCredentialPayload
  signature: string
}

export interface MultipleVaccinesCredentialsToken {
  header: {
    alg: string
    typ: string
  }
  payload: MultipleVaccinesCredentialsPayload
  signature: string
}

export interface VaccineRequest {
  id: string
  description: string
  required: boolean
}

export interface VaccineRequested {
  index: number
  vaccine: Vaccine
  required: boolean
}
