"use client";

import { useState } from "react";
import Sidebar from "../../shared/Sidebar/Sidebar";
import DashboardHeader from "@/components/dashboard/header/DashboardHeader";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import menu from "./menu";

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <ProtectedRoute
            allowedRoles={["admin", "instructor"]}
        >
            <div className="flex min-screen bg-background">
                <Sidebar
                    menu={menu}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                />

                <div className="flex min-w-0 flex-1 flex-col">
                    <DashboardHeader
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        setMobileOpen={setMobileOpen}
                    />

                    <main
                        className="
                            flex-1
                            overflow-y-auto
                            p-3
                            transition-all
                            duration-300
                        "
                    >
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default DashboardLayout;