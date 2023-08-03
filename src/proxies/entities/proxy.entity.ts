import { CredentialProperties, Credential, Proxy } from '@prisma/client'

export class ProxyEntity {

    credentialProperties: CredentialProperties[]
    credential: Credential

    constructor(proxy: Proxy, credential: Credential, credentialProperties: CredentialProperties[]) {
        Object.assign(this, proxy)
        this.credential = credential
        this.credentialProperties = credentialProperties
    }
}
