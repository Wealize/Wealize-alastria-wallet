asdsadsadsada

```mermaid
classDiagram
class EntityData {
  <<interface>>
    cif: string
    name: string
    status: boolean
    urlAOA: string
    urlCreateAID: string
    urlLogo: string
}
class BarCodeReadEvent {
  <<interface>>
    (react-native-camera interface)
}
class AlastriaIdentityService {
  <<service>>
    createAlastriaId(qrReadEvent: BarCodeReadEvent) Promise(void)
    getUserDid(alastriaAIC: string, victimId: string, cbu: string) Promise(string)
    linkToOrganization(qrReadEvent: BarCodeReadEvent) Promise(void)
    getPublicKeyFromDid(did: string) Promise(string)
    getEntityDataFromDid(did: string) Promise(EntityData)
}
EntityData <|-- AlastriaIdentityService
BarCodeReadEvent --|> AlastriaIdentityService


class AlastriaToken {
  <<interface>>
    header
    payload
    signature: string
}
class header {
  <<interface>>
    alg: string
    typ: string
}
class payload {
  <<interface>>
    ani: string
    cbu: string
    exp: number
    gwu: string
    iat: number
    iss: string
}
payload --> AlastriaToken
header --> AlastriaToken
class AlastriaTokenService {
  <<service>>
    decode(jwt: string) AlastriaToken
    createAlastriaAIC(jwt: string) Promise(string)
}
AlastriaToken <|-- AlastriaTokenService


class JwtService {
  <<service>>
    verify(jwt: string, publicKey: string) boolean
}
JwtService --|> AlastriaTokenService


class ApiClient {
  <<service>>
    get(url: string) Promise
    post(url: string, data: Object) Promise
    patch(url: string, data: Object) Promise
    put(url: string, data: Object) Promise
    delete(url: string, data: Object) Promise
    _handleFetch(url: string, options: RequestInit) Promise
    _parseBody(response: Response) Promise
}
class ApiClientError {
  statusCode: number
  message: string
  name: string
  <<service>>
    constructor(status: number, body: object) ApiClientError
}
ApiClientError -- ApiClient


class CredentialInfo {
  <<interface>>
    header
    payload: CredentialInfoPayload
    signature: string
}
class CredentialInfoPayload {
  <<interface>>
    iat: number
    iss: string
    vc: VerifiableCredential
}
class VerifiableCredential {
  <<interface>>
    type: string[]
    '@context': string[]
    credentialSubject: CredentialSubjectData
}
class CredentialSubjectData {
  <<interface>>
    victimInfo: CredentialSubjectInfo
}
class CredentialSubjectInfo {
  <<interface>>
    info_type: string
    file_type?: string
}
class FoundRequestedCredentials {
  <<interface>>
    index: string
    required: boolean
}
class CredentialRequest {
  <<interface>>
    id: string
    required: boolean
}
class CredentialData {
  <<interface>>
    issuerCif: string
    issuerName: string
    issuerDid: string
    data: string
    key: string
    value: string
    created: string
    status?: string
}
class CredentialStatus {
  <<interface>>
    exists: boolean
    status: string
}
class CredentialRequested {
  <<interface>>
  index: number
  credential: CredentialInfo
  required: boolean
}
header --> CredentialInfo
CredentialInfoPayload --> CredentialInfo
VerifiableCredential --> CredentialInfoPayload
CredentialSubjectData --> VerifiableCredential
CredentialSubjectInfo --> CredentialSubjectData
CredentialInfo --> CredentialRequested
class CredentialsService {
  <<service>>
    decodeJWT(jwt: string)
    getInformationTypeFromCredentials(credentials: string[]) string[]
    getJsonCredential() Promise(CredentialInfo[])
    getCredentials(): Promise(string[])
    getDecodedCredentials(credentials: string[]) CredentialInfo[]
    getRequestedCredentials(credentialsRequest: CredentialRequest[]) Promise(CredentialRequested[])
    findRequestedCredentials(credentials: CredentialInfo[], credentialsRequest: CredentialRequest[]) Promise(FoundRequestedCredentials[])
    getCredentialType(credential: CredentialInfo) string
    getCredentialStatus(credential: CredentialData) Promise(string)
    parseCredentialStatus(credentialStatus: CredentialStatus) string
    registerInBlockchain(credentials: string[]) Promise(void)
}
CredentialsService <|-- CredentialRequest
CredentialsService <|-- CredentialData
CredentialsService <|-- CredentialStatus
CredentialsService <|--|> CredentialInfo
CredentialsService --|> FoundRequestedCredentials
CredentialsService --|> CredentialRequested


class LocalStorageService {
  <<service>>
    storeData(key: string, value: string) Promise(void)
    storeBool(key: string, value: boolean) Promise(void)
    getData(key: string) Promise(string)
    getBool(key: string) Promise(boolean)
    StringToBool(value: string) boolean
}


class PsmHashService {
  <<service>>
    generate(jwt: string): Promise(string)
    generateCredentialPsmHash(jwt: string, issuerDid: string)
}


class WalletMnemonicPhrase {
  <<interface>>
    mnemonicPhrase: string
}
WalletMnemonicPhrase --> WalletService
class WalletService {
  <<service>>
    createEncryptedWallet(pin: string) Promise(WalletMnemonicPhrase)
}


class Transaction {
  <<interface>>
    to: string
    data: string
    gasLimit: number
    gasPrice: number
}
class TransactionService {
  <<service>>
    addSubjectCredential(psmHash: string, url: string) Transaction
    addSubjectPresentation(psmHash: string, url: string) Transaction
    updateSubjectPresentation(presentationPmHash: string, status: number) Transaction
    sendTransaction(transaction: Transaction) Promise(void)
    sendTransactions(transactions: Transaction[]) Promise(void)
    recursiveSendTransaction(identity: UserIdentity, web3: Web3, transactions: Transaction[]) Promise(void)
}
TransactionService <|--|> Transaction


class Presentation {
  <<interface>>
    header
    payload: PresentationPayload
    signature: string
}
class PresentationPayload {
  <<interface>>
    jti?: string
    iss: string
    aud: string
    iat: number
    exp?: number
    nbf?: number
    vp: VerifiablePresentation
}
class VerifiablePresentation {
  <<interface>>
  '@context': string[]
  type: string[]
  procHash: string
  procUrl: string
  verifiableCredential: string[]
}
class PresentationRequest {
  <<interface>>
    header
    payload: PresentationRequestPayload
    signature: string
}
class PresentationRequestPayload {
  <<interface>>
    iss: string
    iat: number
    cbu: string
    pr: PresentationContent
    jti: string
}
class PresentationContent {
  <<interface>>
  '@context': string[]
  type: string[]
  procHash: string
  procUrl: string
  data: PresentationRequestData[]
}
class PresentationRequestData {
  <<interface>>
  '@context': string[]
  type: string[]
  levelOfAssurance: number
  required: boolean
  field_name: string
}
header --> Presentation
PresentationPayload --> Presentation
VerifiablePresentation --> PresentationPayload
header --> PresentationRequest
PresentationRequestPayload --> PresentationRequest
PresentationContent --> PresentationRequestPayload
PresentationRequestData --> PresentationContent
class PresentationService {
  <<service>>
    decodePresentationRequest(jwt: string) PresentationRequest
    decodePresentation(jwt: string) Presentation
    getPublicKeyFromDid(decodedJWT: PresentationRequest) Promise(string)
    verify(jwt: string, issuerPublicKey: string) Boolean
    createPresentation(presentationRequest: PresentationRequestPayload, credentials: string[]) Promise(PresetationResolve)
    storePresentation(presentationJwt: string, presentationCbu: string) Promise(void)
    revokePresentationsInBackend(presentations: PresentationEntity.default[]) Promise(void)
    revokePresentationsInBlockchain(presentationsPmHashes: string[]) Promise(void)
    registerInBlockchain(presentation: string) Promise(void)
    sendPresentation(presentation: string, url: string) Promise(void)
}
PresentationService <|--|> PresentationRequest
PresentationService <|-- PresentationRequestPayload
PresentationService --|> Presentation
PresentationService --|> PresetationResolve

```
