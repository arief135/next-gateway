"use client";

import React from "react";
import { BiBuoy } from "react-icons/bi";
import {
    HiChartPie,
    HiInbox,
    HiUser,
    HiViewBoards,
} from "react-icons/hi";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import { SidebarProvider } from "../context/SidebarContext";

export default function Index(): JSX.Element {
    return (
        <SidebarProvider>
            <Header />
            <div className="flex dark:bg-gray-900">
                <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
                    <HomePage />
                </main>
                <div className="order-1">
                    <ActualSidebar />
                </div>
            </div>
        </SidebarProvider>
    );
}

function ActualSidebar(): JSX.Element {
    return (
        <Sidebar>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiViewBoards}>
                        Messages
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiInbox}>
                        Proxy
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={HiUser}>
                        Users
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={BiBuoy}>
                        Help
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
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
