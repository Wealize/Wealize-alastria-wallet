import { getRepository } from 'typeorm/browser'

import Presentation from '../entities/Presentation'

interface IPresentation {
  psmHash: string
  serviceProviderName: string
  serviceProviderCif: string
  serviceProviderDid: string
  created: string
  credentialNames: string[]
  data: string
  cbu: string
}

export class PresentationRepository {
  static async savePresentation(
    presentationData: IPresentation
  ): Promise<void> {
    const presentation = new Presentation()
    presentation.psmHash = presentationData.psmHash
    presentation.serviceProviderName = presentationData.serviceProviderName
    presentation.serviceProviderCif = presentationData.serviceProviderCif
    presentation.serviceProviderDid = presentationData.serviceProviderDid
    presentation.created = presentationData.created
    presentation.credentialNames = presentationData.credentialNames
    presentation.data = presentationData.data
    presentation.cbu = presentationData.cbu

    const repository = getRepository(Presentation)
    await repository.save(presentation)
  }

  static async getPresentations(): Promise<Presentation[]> {
    const repository = getRepository(Presentation)
    return await repository.find()
  }

  static async getPresentationsById(ids: number[]): Promise<Presentation[]> {
    const repository = getRepository(Presentation)
    return await repository.findByIds(ids)
  }

  static async deletePresentationsById(ids: number[]): Promise<void> {
    const repository = getRepository(Presentation)
    await repository.delete(ids)
  }
}
