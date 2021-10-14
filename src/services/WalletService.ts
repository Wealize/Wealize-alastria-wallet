import 'react-native-get-random-values'
import '@ethersproject/shims'
import { ethers } from 'ethers'

import { KeyChainData, setKeychainDataObject } from '../utils/keychain'

export const createEncryptedWallet = async (
  pin: string
): Promise<{
  mnemonicPhrase: string
}> => {
  const wallet = ethers.Wallet.createRandom()
  const encryptedWallet = await wallet.encrypt(pin)

  const keychainData: KeyChainData = {
    wallet: encryptedWallet,
    mnemonic: wallet.mnemonic.phrase,
    privateKey: wallet.privateKey,
    pin
  }
  await setKeychainDataObject(keychainData)

  return {
    mnemonicPhrase: wallet.mnemonic.phrase
  }
}
