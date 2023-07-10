"use client";

import { Breadcrumb, Button, Table } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { HiHome, HiPlusCircle } from "react-icons/hi";

export default function Index(): JSX.Element {
    const router = useRouter()

    return (
        <div className="p-6">
            <section>
                <header>
                    <h1 className="mb-6 font-extrabold dark:text-white">
                        API Proxy Configurations
                    </h1>
                </header>
                <div>
                    <Button className="mb-2" onClick={() => router.push('/proxy/create')}>
                        <HiPlusCircle className="mr-2 h-5 w-5" />
                        New Proxy
                    </Button>
                    <ProxyTable />
                </div>
            </section>
        </div>
    );
}

class Proxy {

    static proxyMap: any = {
        'adhi-100': {
            backend: 'S/4HANA',
            baseUrl: 'https://vhptrds4ci.sap.adhi.co.id:44300/sap/opu/odata/sap'
        }
    }

    constructor(private proxyName: string) { }

    /**
     * getEndpoint
     */
    public getEndpoint(): string {
        return `/api/proxy/${this.proxyName}`
    }

}

const ProxyTable = () => {

    const proxyMap: any = {
        'adhi-100': {
            backend: 'S/4HANA',
            baseUrl: 'https://vhptrds4ci.sap.adhi.co.id:44300/sap/opu/odata/sap'
        }
    }

    const children = []

    for (const key in proxyMap) {
        const element = proxyMap[key];
        const proxy = new Proxy(key)
        children.push(
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                    {key}
                </Table.Cell>
                <Table.Cell>
                    {element.backend}
                </Table.Cell>
                <Table.Cell>
                    <Link href={proxy.getEndpoint()}>{proxy.getEndpoint()}</Link>
                </Table.Cell>
                <Table.Cell>
                    {element.baseUrl}
                </Table.Cell>
            </Table.Row>
        )
    }

    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>
                    Proxy Name
                </Table.HeadCell>
                <Table.HeadCell>
                    Backend
                </Table.HeadCell>
                <Table.HeadCell>
                    Endpoint
                </Table.HeadCell>
                <Table.HeadCell>
                    Target Endpoint
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {children}
            </Table.Body>
        </Table>
    )
}