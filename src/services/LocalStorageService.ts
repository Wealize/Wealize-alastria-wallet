import AsyncStorage from '@react-native-community/async-storage'

import { InstitutionData } from '../interfaces/institutionData'

export const STORAGE_KEYS = {
  IS_WALLET_CREATED: 'isWalletCreated',
  HAS_CENTER_ASSOCIATED: 'has_center_associated',
  ASSOCIATED_CENTERS: 'associated_centers',
  IS_DID_CREATED: 'isDIDCreated',
  LAST_COMPONENT_ID: 'lastComponentId'
}

export default class LocalStorageService {
  public static async storeData(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (err) {
      throw new Error('Error storing data in LocalStorage')
    }
  }

  public static async storeBool(key: string, value: boolean) {
    try {
      await AsyncStorage.setItem(key, value.toString())
    } catch (err) {
      throw new Error('Error storing data in LocalStorage')
    }
  }

  public static async storeAssociatedCenters(key: string, value: InstitutionData[]) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      throw new Error('Error storing data in LocalStorage')
    }
  }

  public static async getData(key: string): Promise<string> {
    try {
      const value = await AsyncStorage.getItem(key)
      return value || ''
    } catch (err) {
      throw new Error('Error getting data in LocalStorage')
    }
  }

  public static async getBool(key: string): Promise<boolean> {
    try {
      const keyString = await AsyncStorage.getItem(key)
      return keyString ? this.StringToBool(keyString) : false
    } catch (err) {
      throw new Error('Error getting data in LocalStorage')
    }
  }

  public static async getAssociatedCenters(): Promise<InstitutionData[]> {
    try {
      const keyString = await AsyncStorage.getItem(STORAGE_KEYS.ASSOCIATED_CENTERS)
      return keyString ? JSON.parse(keyString) : []
    } catch (err) {
      throw new Error('Error getting data in LocalStorage')
    }
  }

  public static StringToBool(value: string): boolean {
    return value.toLowerCase() === 'true'
  }
}
