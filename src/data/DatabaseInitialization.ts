import { createConnection } from 'typeorm/browser'

import Credential from '../entities/Credential'
import Presentation from '../entities/Presentation'
import Historic from '../entities/Historic'

export const setupDatabase = async () => {
  return createConnection({
    type: 'react-native',
    database: 'alastria-wallet',
    location: 'default',
    logging: ['error', 'query', 'schema'],
    synchronize: true,
    entities: [Credential, Presentation, Historic]
  })
}
