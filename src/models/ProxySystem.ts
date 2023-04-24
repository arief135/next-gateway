export type QueryString = { [key: string]: string }

type BasicAuth = {
    user: string,
    password: string
}

export type ProxySystem = {
    backend: string,
    baseUrl: string,
    queryString: QueryString,
    auth: BasicAuth
}

export const ProxySystemMap: { [sId: string]: ProxySystem } = {
    'adhi-odata-100': {
        backend: 'S/4HANA',
        baseUrl: 'https://vhptrds4ci.sap.adhi.co.id:44300/sap/opu/odata/sap',
        queryString: {
            'sap-client': '100',
            'sap-language': 'EN'
        },
        auth: {
            user: process.env.SAP_USER as string,
            password: process.env.SAP_PASSWORD as string
        }
    }
}
