import Web3 from 'web3'
import { NODE_IP } from '@env'
import {
  tokensFactory,
  transactionFactory,
  UserIdentity
} from 'alastria-identity-lib'
import { privateToPublic, toBuffer } from 'ethereumjs-util'

import { AlastriaToken } from '../interfaces/alastriaToken'
import { getDid, getPrivateKey, getWalletAddress } from '../utils/keychain'
import JwtService from './JwtService'

export default class AlastriaTokenService extends JwtService {
  public static decode(jwt: string): AlastriaToken {
    return tokensFactory.tokens.decodeJWT(jwt)
  }

  public static async createAlastriaAIC(jwt: string): Promise<string> {
    const web3 = new Web3(NODE_IP)
    const userPrivateKey = await getPrivateKey()
    const userWalletAddress = await getWalletAddress()

    if (!userPrivateKey || !userWalletAddress) {
      throw new Error('Error getting the credentials from secure storage!')
    }

    // Get user public key from private key
    const userPublicKey = `0x${privateToPublic(
      toBuffer(userPrivateKey)
    ).toString('hex')}`

    // Create Alastria Identity
    const subjectIdentity = new UserIdentity(
      web3,
      `0x${userWalletAddress}`,
      userPrivateKey.substring(2),
      0
    )

    // Create Alastria transaction
    const createTx = transactionFactory.identityManager.createAlastriaIdentity(
      web3,
      userPublicKey.substring(2)
    )

    // Sign the transaction
    const signedCreateTx = await subjectIdentity.getKnownTransaction(createTx)

    // Generate Alastria AIC
    const alastriaAIC = tokensFactory.tokens.createAIC(
      ['https://alastria.github.io/identity/artifacts/v1'],
      ['VerifiablePresentation', 'AlastriaVerifiablePresentation'],
      signedCreateTx,
      jwt,
      userPublicKey
    )

    // Sign Alastria AIC with the user private key
    return tokensFactory.tokens.signJWT(
      alastriaAIC,
      userPrivateKey.substring(2)
    )
  }

  public static async createAlastriaSession(jwt: string, type: string): Promise<string> {
    const userPrivateKey = await getPrivateKey()
    const userWalletAddress = await getWalletAddress()

    if (!userPrivateKey || !userWalletAddress) {
      throw new Error('Error getting the credentials from secure storage!')
    }

    const userPublicKey = `0x${privateToPublic(
      toBuffer(userPrivateKey)
    ).toString('hex')}`

    const context: string[] = []
    const iss = await getDid() || ''
    const kid = `${iss}#keys-1`
    const typeArray = [type]
    const exp = (Math.floor(Date.now() / 1000) + 3600)
    const nbf = (Math.floor(Date.now() / 1000) - 3600)
    const jti = 'Inetum dev/alastria-token/95e2e544-c5fa-46b4-ab91-82b97b42ff2e'


    const alastriaSession = tokensFactory.tokens.createAlastriaSession(
      context,
      iss,
      kid,
      typeArray,
      jwt,
      exp,
      userPublicKey,
      nbf,
      jti
    )

    return tokensFactory.tokens.signJWT(
      alastriaSession,
      userPrivateKey.substring(2)
    )
  }
}
