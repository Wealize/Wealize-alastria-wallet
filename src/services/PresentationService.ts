import Web3 from 'web3'
import { NODE_IP } from '@env'
import { tokensFactory, transactionFactory } from 'alastria-identity-lib'
import { v4 as uuid4 } from 'uuid'

import {
  PresentationRequest,
  PresentationRequestPayload,
  PresetationResolve
} from '../interfaces/presentationRequest'
import { getDid, getPrivateKey } from '../utils/keychain'
import ApiClient from './ApiClient'
import PsmHashService from './PsmHashService'
import { Presentation } from '../interfaces/presentation'
import * as PresentationEntity from '../entities/Presentation'
import TransactionService from './TransactionService'
import AlastriaIdentityService from './AlastriaIdentityService'
import CredentialsService from './CredentialsService'
import { PresentationRepository } from '../data/PresentationRepository'
import { HistoricRepository } from '../data/HistoricRepository'
import { PRESENTATION } from '../constants/actionTypes'

const ASK_DELETION_STATUS = 2

export default class PresentationService {
  public static decodePresentationRequest(jwt: string): PresentationRequest {
    return tokensFactory.tokens.decodeJWT(jwt)
  }

  public static decodePresentation(jwt: string): Presentation {
    return tokensFactory.tokens.decodeJWT(jwt)
  }

  public static async getPublicKeyFromDid(
    decodedJWT: PresentationRequest
  ): Promise<string> {
    const web3 = new Web3(NODE_IP)
    const currentPubKey =
      transactionFactory.publicKeyRegistry.getCurrentPublicKey(
        web3,
        decodedJWT.payload.iss
      )

    return await web3.eth
      .call(currentPubKey)
      .then((result) => {
        const pubKey = web3.eth.abi.decodeParameters(['string'], result)
        const publicKey = pubKey[0]
        return publicKey
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  public static verify(jwt: string, issuerPublicKey: string): Boolean {
    return tokensFactory.tokens.verifyJWT(jwt, `04${issuerPublicKey}`)
  }

  public static async createPresentation(
    presentationRequest: PresentationRequestPayload,
    credentials: string[]
  ): Promise<PresetationResolve> {
    const userDid = await getDid()
    const userPrivateKey = await getPrivateKey()
    let presentationJwt: string = ''

    if (userDid && userPrivateKey) {
      const presentationContent = tokensFactory.tokens.createPresentation(
        userDid,
        presentationRequest.iss,
        ['http://www.hl7.org/fhir/immunization.html'],
        credentials,
        presentationRequest.pr.procUrl,
        presentationRequest.pr.procHash,
        // Remove types to avoid duplicated (library assigns them)
        [],
        undefined,
        undefined,
        undefined,
        undefined,
        uuid4()
      )
      // Add custom claim jtipr to presentationContent
      // @ts-ignore
      presentationContent.payload.jtipr = presentationRequest.jti

      presentationJwt = tokensFactory.tokens.signJWT(
        presentationContent,
        userPrivateKey.substring(2)
      )
    } else {
      throw new Error('Error accessing to keychain')
    }

    return { presentationJwt, presentationCbu: presentationRequest.cbu }
  }

  public static async storePresentation(
    presentationJwt: string,
    presentationCbu: string
  ) {
    const presentation = this.decodePresentation(presentationJwt)
    const serviceProviderData =
      await AlastriaIdentityService.getEntityDataFromDid(
        presentation.payload.aud
      )
    const credentialNames =
      CredentialsService.getInformationTypeFromCredentials(
        presentation.payload.vp.verifiableCredential
      )

    const parsedPresentation = {
      psmHash: await PsmHashService.generate(presentationJwt),
      serviceProviderName: serviceProviderData.name,
      serviceProviderCif: serviceProviderData.cif,
      serviceProviderDid: presentation.payload.aud,
      created: String(presentation.payload.iat),
      credentialNames: credentialNames,
      data: presentationJwt,
      cbu: presentationCbu
    }

    await PresentationRepository.savePresentation(parsedPresentation)

    HistoricRepository.saveHistoric({
      data: parsedPresentation.data,
      datetime: parsedPresentation.created,
      entity: parsedPresentation.serviceProviderName,
      type: PRESENTATION.ACCESS.TYPE,
      infoType: parsedPresentation.credentialNames[0],
      description: PRESENTATION.ACCESS.DESCRIPTION
    })
  }

  public static async revokePresentationsInBackend(
    presentations: PresentationEntity.default[]
  ) {
    for (const presentation of presentations) {
      await ApiClient.delete(presentation.cbu, {
        psmhash: presentation.psmHash
      })

      await PresentationRepository.deletePresentationsById([presentation.id])
    }
  }

  public static async revokePresentationsInBlockchain(
    presentationsPmHashes: string[]
  ) {
    const transactions = presentationsPmHashes.map((presentationPmHash) => {
      return TransactionService.updateSubjectPresentation(
        presentationPmHash,
        ASK_DELETION_STATUS
      )
    })

    await TransactionService.sendTransactions(transactions)
  }

  private static async registerInBlockchain(presentation: string) {
    const decodedPresentation = this.decodePresentation(presentation)
    const psmHash = await PsmHashService.generate(presentation)

    const transaction = TransactionService.addSubjectPresentation(
      psmHash,
      decodedPresentation.payload.vp.procUrl
    )
    await TransactionService.sendTransaction(transaction)
  }

  public static async sendPresentation(presentation: string, url: string) {
    await ApiClient.post(url, {
      jwt: presentation
    })
    await this.registerInBlockchain(presentation)
  }
}
