import { getRepository } from 'typeorm/browser'

import Credential from '../entities/Credential'
import { CredentialData } from '../interfaces/credentialInfo'
import CredentialsService from '../services/CredentialsService'

export class CredentialRepository {
  static async saveCredential(credentialData: CredentialData): Promise<void> {
    const credential = new Credential()
    credential.issuerCif = credentialData.issuerCif
    credential.issuerName = credentialData.issuerName
    credential.issuerDid = credentialData.issuerDid
    credential.data = credentialData.data
    credential.key = credentialData.key
    credential.value = credentialData.value
    credential.created = credentialData.created

    const repository = getRepository(Credential)
    await repository.save(credential)
  }

  static async getCredentials(): Promise<CredentialData[]> {
    const repository = getRepository(Credential)
    const credentials: CredentialData[] = await repository.find()

    const credentialsWithStatus = Promise.all(
      credentials.map(async (credential) => {
        credential.status = await CredentialsService.getCredentialStatus(
          credential
        )
        return credential
      })
    )

    return credentialsWithStatus
  }

  static async credentialExists(
    credentialData: CredentialData
  ): Promise<boolean> {
    const repository = getRepository(Credential)
    // TODO right now the test API wont return vaccine codes so we need to check the vaccine name instead
    // return (await repository.count({ key: credentialData.key })) > 0

    const credentials = await repository.find()
    return credentials.some((credential) => {
      const credentialsNames = CredentialsService.getInformationTypeFromCredentials(
        [credential.data, credentialData.data]
      )
      return credentialsNames[0] === credentialsNames[1]
    })
  }
}
