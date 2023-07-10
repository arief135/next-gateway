"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
                    <p className="mb-5">Create New Proxy</p>
                    <CreateForm />
                </div>
            </section>
        </div>
    );
}

const CreateForm = () => {

    const [endpoint, setEndpoint] = useState('')

    const proxyChanged = (proxyName: string) => {
        let ep = proxyName
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "-")
            .replace(/\s/g, "-")
            .toLowerCase()
        setEndpoint(ep)
    }

    return (
        <form className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Proxy Name" />
                </div>
                <TextInput
                    id="name"
                    placeholder=""
                    required
                    type="text"
                    onChange={(e) => proxyChanged(e.target.value)}
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="endpoint"
                        value="Endpoint"
                    />
                </div>
                <div>
                    <TextInput
                        addon='http://localhost:3000/api/proxy/'
                        id="endpoint"
                        required
                        type="text"
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                    />
                </div>
            </div>
            <Button type="submit">
                Submit
            </Button>
        </form>
    )
}
