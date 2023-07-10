"use client"

import { FC, PropsWithChildren } from "react";
import FlowbiteContext from "./context/FlowbiteContext";
import "./globals.css";
import { SidebarProvider } from "./context/SidebarContext";
import Header from "./components/Header";
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiChartPie, HiViewBoards, HiInbox, HiUser } from "react-icons/hi";

const RootLayout: FC<PropsWithChildren> = function ({ children }) {
    return (
        <html lang="en">
            <body>
                <FlowbiteContext>
                    <SidebarProvider>
                        <Header />
                        <div className="flex dark:bg-gray-900">
                            <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
                                {children}
                            </main>
                            <div className="order-1">
                                <ActualSidebar />
                            </div>
                        </div>
                    </SidebarProvider>
                </FlowbiteContext>
            </body>
        </html>
    );
};


function ActualSidebar(): JSX.Element {
    return (
        <Sidebar>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/proxy" icon={HiInbox}>
                        Proxy
                    </Sidebar.Item>
                    <Sidebar.Item href="/" icon={HiViewBoards}>
                        Messages
                    </Sidebar.Item>
                    <Sidebar.Item href="/" icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiUser}>
                        Users
                    </Sidebar.Item>
                    <Sidebar.Item href="/" icon={BiBuoy}>
                        Help
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default RootLayout;
