import { CredentialProperties, Credential, Proxy } from '@prisma/client'

export interface ProxyEntity extends Proxy {
    credentialInfo: Credential,
    credentialProperties: CredentialProperties[]
}