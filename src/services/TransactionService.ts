import Web3 from 'web3'
import { NODE_IP } from '@env'
import { transactionFactory, UserIdentity } from 'alastria-identity-lib'

import { Transaction } from '../interfaces/transaction'
import { getPrivateKey, getWalletAddress } from '../utils/keychain'

export default class TransactionService {
  public static addSubjectCredential(
    psmHash: string,
    url: string
  ): Transaction {
    const web3 = new Web3(NODE_IP)

    return transactionFactory.credentialRegistry.addSubjectCredential(
      web3,
      psmHash,
      url
    )
  }

  public static addSubjectPresentation(
    psmHash: string,
    url: string
  ): Transaction {
    const web3 = new Web3(NODE_IP)

    return transactionFactory.presentationRegistry.addSubjectPresentation(
      web3,
      psmHash,
      url
    )
  }

  public static updateSubjectPresentation(
    presentationPmHash: string,
    status: number
  ): Transaction {
    const web3 = new Web3(NODE_IP)

    return transactionFactory.presentationRegistry.updateSubjectPresentation(
      web3,
      presentationPmHash,
      status
    )
  }

  public static async sendTransaction(transaction: Transaction) {
    this.sendTransactions([transaction])
  }

  public static async sendTransactions(transactions: Transaction[]) {
    const web3 = new Web3(NODE_IP)
    const userPrivateKey = await getPrivateKey()
    const userWalletAddress = await getWalletAddress()

    if (!userPrivateKey || !userWalletAddress) {
      throw new Error('Error getting the credentials from secure storage!')
    }

    const subjectIdentity = new UserIdentity(
      web3,
      `0x${userWalletAddress}`,
      userPrivateKey.substring(2),
      0
    )

    await this.recursiveSendTransaction(subjectIdentity, web3, transactions)
  }

  private static async recursiveSendTransaction(
    identity: UserIdentity,
    web3: Web3,
    transactions: Transaction[]
  ) {
    const signedTransaction = await identity.getKnownTransaction(
      transactions.shift()
    )

    await web3.eth
      .sendSignedTransaction(signedTransaction)
      .on('receipt', () => {
        if (transactions.length > 0) {
          this.recursiveSendTransaction(identity, web3, transactions)
        }
      })
  }
}
