import { tokensFactory } from 'alastria-identity-lib'

export default abstract class JwtService {
  public static verify(jwt: string, publicKey: string): Boolean {
    return tokensFactory.tokens.verifyJWT(jwt, `04${publicKey}`)
  }
}
