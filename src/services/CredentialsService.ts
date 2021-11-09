import { tokensFactory, transactionFactory } from 'alastria-identity-lib'
import { NODE_IP } from '@env'
import Web3 from 'web3'

import { CredentialRepository } from '../data/CredentialRepository'
import {
  CredentialData,
  CredentialInfo,
  CredentialRequest,
  CredentialRequested,
  FoundRequestedCredentials
} from '../interfaces/credentialInfo'
import PsmHashService from './PsmHashService'
import { CREDENTIAL_STATUS } from '../constants/text'
import { CredentialStatus } from '../interfaces/credentialStatus'
import TransactionService from './TransactionService'

const CREDENTIAL_VALID_STATUS = 0

class CredentialsService {
  private static decodeJWT(jwt: string) {
    return tokensFactory.tokens.decodeJWT(jwt)
  }

  public static getInformationTypeFromCredentials(
    credentials: string[]
  ): string[] {
    const decodedCredentials = this.getDecodedCredentials(credentials)
    const informationType = decodedCredentials.map((decodedCredential) =>
      this.getCredentialType(decodedCredential)
    )

    return informationType
  }

  public static async getJsonCredential(): Promise<CredentialInfo[]> {
    const credentials = await this.getCredentials()

    return credentials ? this.getDecodedCredentials(credentials) : []
  }

  public static async getCredentials(): Promise<string[]> {
    const credentials = await CredentialRepository.getCredentials()

    return credentials.map((credential) => credential.data)
  }

  private static getDecodedCredentials(
    credentials: string[]
  ): CredentialInfo[] {
    let decodedCredentials: CredentialInfo[] = []

    if (credentials.length > 0) {
      decodedCredentials = credentials.map(
        (validCredential): CredentialInfo => {
          const decodedValidCred: CredentialInfo =
            this.decodeJWT(validCredential)
          return decodedValidCred
        }
      )
    }

    return decodedCredentials
  }

  public static async getRequestedCredentials(
    credentialsRequest: CredentialRequest[]
  ): Promise<CredentialRequested[]> {
    const credentials = await this.getJsonCredential()
    const requestedCredentials = await this.findRequestedCredentials(
      credentials,
      credentialsRequest
    )

    return requestedCredentials.map((requestedCredential) => ({
      index: requestedCredential.index,
      credential: credentials[requestedCredential.index],
      required: requestedCredential.required
    }))
  }

  private static async findRequestedCredentials(
    credentials: CredentialInfo[],
    credentialsRequest: CredentialRequest[]
  ): Promise<FoundRequestedCredentials[]> {
    return credentialsRequest
      .map((credentialRequest) => {
        const index = credentials.findIndex(
          (credential) =>
            this.getCredentialType(credential) === credentialRequest.id
        )
        if (index === -1 && credentialRequest.required)
          throw new Error('Required credential not found')
        return { index, required: credentialRequest.required }
      })
      .filter((requestedCredential) => requestedCredential.index !== -1)
  }

  public static getCredentialType(credential: CredentialInfo) {
    return (
      credential.payload.vc.credentialSubject.victimInfo.file_type ||
      credential.payload.vc.credentialSubject.victimInfo.info_type
    )
  }

  public static async getCredentialStatus(
    credential: CredentialData
  ): Promise<string> {
    const web3 = new Web3(NODE_IP)
    const psmHash = await PsmHashService.generateCredentialPsmHash(
      credential.data,
      credential.issuerDid
    )
    const issuerCredentialTransaction =
      transactionFactory.credentialRegistry.getIssuerCredentialStatus(
        web3,
        credential.issuerDid,
        psmHash
      )

    return await web3.eth
      .call(issuerCredentialTransaction)
      .then((IssuerCredentialStatus) => {
        const result = web3.eth.abi.decodeParameters(
          ['bool', 'uint8'],
          IssuerCredentialStatus
        )
        const credentialStatus = {
          exists: result[0],
          status: result[1]
        }

        return this.parseCredentialStatus(credentialStatus)
      })
      .catch(() => {
        return CREDENTIAL_STATUS.ERROR
      })
  }

  private static parseCredentialStatus(
    credentialStatus: CredentialStatus
  ): string {
    let credentialStatusParsed: string
    if (credentialStatus.exists) {
      if (parseInt(credentialStatus.status) === CREDENTIAL_VALID_STATUS) {
        credentialStatusParsed = CREDENTIAL_STATUS.VALID
      } else {
        credentialStatusParsed = CREDENTIAL_STATUS.REVOKED
      }
    } else {
      credentialStatusParsed = CREDENTIAL_STATUS.NOT_VALID
    }

    return credentialStatusParsed
  }

  public static async registerInBlockchain(credentials: string[]) {
    const transactions = await Promise.all(
      credentials.map(async (credential: string) => {
        const credentialHash = await PsmHashService.generate(credential)
        // Is not clear what URI the smart contract expect
        return TransactionService.addSubjectCredential(
          credentialHash,
          'https://wealize.digital'
        )
      })
    )
    await TransactionService.sendTransactions(transactions)
  }
}

export default CredentialsService
