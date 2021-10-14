import LocalStorageService from '../../src/services/LocalStorageService'

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

})
