import LocalStorageService, {
  STORAGE_KEYS
} from '../../src/services/LocalStorageService'

describe('LocalStorageService', () => {
  it('should store and get data', async () => {
    await LocalStorageService.storeData('key', 'value')

    const isStoredData = await LocalStorageService.getData('key')

    expect(isStoredData).toEqual('value')
  })

  it('should return empty when not obtaining result ', async () => {
    const isStoredData = await LocalStorageService.getData('notExists')

    expect(isStoredData).toEqual('')
  })

  it('should store and get bool', async () => {
    await LocalStorageService.storeBool('key', true)

    const isStoredBoolData = await LocalStorageService.getBool('key')

    expect(isStoredBoolData).toBeTruthy()
  })

  it('should return false when not obtaining bool data', async () => {
    const isStoredBoolData = await LocalStorageService.getBool('notExists')

    expect(isStoredBoolData).toBeFalsy()
  })

  it('should return empty array when not obtaining AssociatedCenters', async () => {
    const isInstitutionData = await LocalStorageService.getAssociatedCenters()

    expect(isInstitutionData).toEqual([])
  })

  it('should store and get AssociatedCenters', async () => {
    const institutionData = [
      {
        id: '1',
        name: 'one'
      },
      {
        id: '2',
        name: 'two'
      }
    ]

    await LocalStorageService.storeAssociatedCenters(
      STORAGE_KEYS.ASSOCIATED_CENTERS,
      institutionData
    )
    const isInstitutionData = await LocalStorageService.getAssociatedCenters()

    expect(isInstitutionData).toEqual(institutionData)
  })
})
