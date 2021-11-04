import Web3 from 'web3'
import { NODE_IP } from '@env'
import { tokensFactory } from 'alastria-identity-lib'

import { getDid } from '../utils/keychain'

export default class PsmHashService {
  public static async generate(jwt: string): Promise<string> {
    const web3 = new Web3(NODE_IP)
    const userDid = await getDid()

    return tokensFactory.tokens.PSMHash(web3, jwt, userDid)
  }

  public static generateCredentialPsmHash(jwt: string, issuerDid: string) {
    const web3 = new Web3(NODE_IP)
    return tokensFactory.tokens.PSMHash(web3, jwt, issuerDid)
  }
}
