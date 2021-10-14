import { NODE_IP } from '@env'
import Web3 from 'web3'
import { transactionFactory } from 'alastria-identity-lib'
import { BarCodeReadEvent } from 'react-native-camera'

import ApiClient from './ApiClient'
import { EntityData } from '../interfaces/entityData'
import { getDid, saveDID } from '../utils/keychain'
import AlastriaTokenService from './AlastriaTokenService'

export default class AlastriaIdentityService {
  public static async createAlastriaId(qrReadEvent: BarCodeReadEvent) {
    const CredentialQrData = JSON.parse(qrReadEvent.data)
    const decodedJWT = AlastriaTokenService.decode(CredentialQrData.token)
    const issuerPublicKey = await AlastriaIdentityService.getPublicKeyFromDid(
      decodedJWT.payload.iss
    )
    // Token validation
    if (AlastriaTokenService.verify(CredentialQrData.token, issuerPublicKey)) {
      const alastriaAIC = await AlastriaTokenService.createAlastriaAIC(
        CredentialQrData.token
      )
      const did = await AlastriaIdentityService.getUserDid(
        alastriaAIC,
        CredentialQrData.subject_id,
        decodedJWT.payload.cbu
      )

      await saveDID(did)
    } else {
      throw new Error('Invalid token')
    }
  }

  public static async getUserDid(
    alastriaAIC: string,
    subjectId: string,
    cbu: string
  ) {
    const response = await ApiClient.post(cbu, {
      AIC: alastriaAIC,
      subject_id: subjectId
    })
    return response.did
  }

  public static async linkToOrganization(qrReadEvent: BarCodeReadEvent) {
    const CredentialQrData = JSON.parse(qrReadEvent.data)
    const decodedJWT = AlastriaTokenService.decode(CredentialQrData.token)
    const issuerPublicKey = await AlastriaIdentityService.getPublicKeyFromDid(
      decodedJWT.payload.iss
    )
    // Token validation
    if (AlastriaTokenService.verify(CredentialQrData.token, issuerPublicKey)) {
      const did = await getDid()
      if(!did) {
        throw new Error("Keychain couldn't be accessed!")
      }

      await ApiClient.post(decodedJWT.payload.cbu, {
        did: did,
        subject_id: CredentialQrData.subject_id
      })
    } else {
      throw new Error('Invalid token')
    }
  }

  public static async getPublicKeyFromDid(did: string): Promise<string> {
    const web3 = new Web3(NODE_IP)
    const currentPubKey = transactionFactory.publicKeyRegistry.getCurrentPublicKey(
      web3,
      did
    )

    return await web3.eth
      .call(currentPubKey)
      .then((result: any) => {
        const pubKey = web3.eth.abi.decodeParameters(['string'], result)
        return pubKey[0]
      })
      .catch((error: any) => {
        throw new Error(error)
      })
  }

  public static async getEntityDataFromDid(did: string): Promise<EntityData> {
    const web3 = new Web3(NODE_IP)
    const entityData = transactionFactory.identityManager.getEntity(web3, did)
    return await web3.eth
      .call(entityData)
      .then((entityInfo) => {
        const resultList = web3.eth.abi.decodeParameters(
          ['string', 'string', 'string', 'string', 'string', 'bool'],
          entityInfo
        )
        const data = {
          name: resultList[0],
          cif: resultList[1],
          urlLogo: resultList[2],
          urlCreateAID: resultList[3],
          urlAOA: resultList[4],
          status: resultList[5]
        }

        return data
      })
      .catch((errorList) => {
        throw new Error(errorList)
      })
  }
}
