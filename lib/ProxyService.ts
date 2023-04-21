
type ProxySystem = {
    backend: string,
    baseUrl: string,
    queryString: { [key: string]: string }
}

const systemMap: { [sId: string]: ProxySystem } = {
    'adhi-odata-100': {
        backend: 'S/4HANA',
        baseUrl: 'https://vhptrds4ci.sap.adhi.co.id:44300/sap/opu/odata/sap',
        queryString: {
            'sap-client': '100',
            'sap-language': 'EN'
        },
    }
}



export class ProxyService {

    private sId: string
    private sysDetails: ProxySystem

    constructor(sId: string) {
        if (sId in systemMap) {
            this.sId = sId
            this.sysDetails = systemMap[this.sId]
        } else {
            throw new Error(`System ID ${sId} not found`);
        }
    }

    public mapUrl(src: string) {
        return this.sysDetails.baseUrl + '/' + src
    } 
}