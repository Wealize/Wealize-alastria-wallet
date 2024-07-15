import { NODE_IP } from '@env'
import Web3 from 'web3'
import { transactionFactory } from 'alastria-identity-lib'
import { BarCodeReadEvent } from 'react-native-camera'
import axios from 'axios'

import { EntityData } from '../interfaces/entityData'
import { getDid, saveDID } from '../utils/keychain'
import AlastriaTokenService from './AlastriaTokenService'


export default class AlastriaIdentityService {
  public static async createAlastriaId(qrReadEvent: BarCodeReadEvent) {

    const data = qrReadEvent.data

    const decodedJWT = AlastriaTokenService.decode(data)

    const issuerPublicKey = await AlastriaIdentityService.getPublicKeyFromDid(
      decodedJWT.payload.iss
    )
    // Token validation
    try {
      if (AlastriaTokenService.verify(data, issuerPublicKey)) {
        const alastriaAIC = await AlastriaTokenService.createAlastriaAIC(
          qrReadEvent.data
        )

        const did = await AlastriaIdentityService.getUserDid(
          alastriaAIC, // aic
          decodedJWT.payload.cbu // url
        )

        await saveDID(did)
      } else {
        console.error('InvalidToken')
        throw new Error('Invalid token')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }

  }


  public static async getUserDid(alastriaAIC: string, cbu: string) {
    try {
      const response = await axios.post(cbu, {
        // Cambiado el campo que espera de AIC a jwt (donde está el estandar¿?)
        jwt: alastriaAIC
      }, {
        timeout: 90000 // Para evitar que haga timeout, la tx demora mucho
      })
      return response.data.did
    } catch (error) {
      console.error('Config:', error)
      throw error
    }
  }


  public static async linkToOrganization(qrReadEvent: BarCodeReadEvent, type: string) {
    // JSON.parse is not neccesary here
    // const CredentialQrData = JSON.parse(qrReadEvent.data)
    const CredentialQrData = qrReadEvent.data

    // Originally we were waiting for an object with a subjectId and a token. Inetum is sending different information. Flow is broken because of that

    // const decodedJWT = AlastriaTokenService.decode(CredentialQrData.token)
    const decodedJWT = AlastriaTokenService.decode(CredentialQrData)

    const issuerPublicKey = await AlastriaIdentityService.getPublicKeyFromDid(
      decodedJWT.payload.iss
    )
    // Token validation
    try {
      if (AlastriaTokenService.verify(CredentialQrData, issuerPublicKey)) {
        const did = await getDid()
        if (!did) {
          throw new Error("Keychain couldn't be accessed!")
        }
        try {

          const jwt = await AlastriaTokenService.createAlastriaSession(CredentialQrData, type)

          const response = await axios.get(decodedJWT.payload.cbu, {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              'signed-object': jwt.toString()
            }
          })

          return response.data

        } catch (error) {
          console.error('Config:', error)
          throw error
        }
      } else {
        throw new Error('Invalid token')
      }
    } catch (error) {
      console.error('An error occurred:', error)
      throw error
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
