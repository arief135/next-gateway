import { CredentialProperties, Proxy as ProxyEntity } from '@prisma/client'

export class Proxy implements ProxyEntity {

    uuid: string;
    name: string;
    endpoint: string;
    targetURL: string;
    status: number;
    credential: number;
    credentialProperties: CredentialProperties[]

    constructor(proxy: ProxyEntity, creds: CredentialProperties[]) {
        this.uuid = proxy.uuid
        this.name = proxy.name
        this.endpoint = proxy.endpoint
        this.targetURL = proxy.targetURL
        this.status = proxy.status
        this.credential = proxy.credential
        this.credentialProperties = creds
    }
}
