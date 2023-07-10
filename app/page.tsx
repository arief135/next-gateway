"use client";

import React from "react";

export default function Index(): JSX.Element {
    return (
        <HomePage />
    );
}

function HomePage(): JSX.Element {
    return (
        <div className="p-6">
            <section>
                <header>
                    <h1 className="mb-6 text-5xl font-extrabold dark:text-white">
                        Welcome to <code>Flowbite</code> on <code>Next.js</code>!
                    </h1>
                </header>
            </section>
        </div>
    );
}
