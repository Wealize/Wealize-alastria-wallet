import { initStackWithScreen } from '../utils/navigation-utils'
import LocalStorageService, {
  STORAGE_KEYS
} from '../services/LocalStorageService'
import { SCREEN } from '../constants/screens'

const autologin = async () => {
  const IS_DID_CREATED = await LocalStorageService.getBool(
    STORAGE_KEYS.IS_DID_CREATED
  )

  if (IS_DID_CREATED) {
    initStackWithScreen(SCREEN.ACCREDITATION_LIST)
  }
}

export default autologin
