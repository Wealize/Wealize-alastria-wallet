import { getRepository } from 'typeorm/browser'

import Historic from '../entities/Historic'
import { HistoricData } from '../interfaces/historic'

export class HistoricRepository {
  static async saveHistoric(historicData: HistoricData): Promise<void> {
    const repository = getRepository(Historic)
    await repository.save(historicData)
  }

  static async getHistoric(): Promise<Historic[]> {
    const repository = getRepository(Historic)
    return await repository.find()
  }

  static async getHistoricById(ids: number[]): Promise<Historic[]> {
    const repository = getRepository(Historic)
    return await repository.findByIds(ids)
  }

  static async deleteHistoricById(ids: number[]): Promise<void> {
    const repository = getRepository(Historic)
    await repository.delete(ids)
  }
}
