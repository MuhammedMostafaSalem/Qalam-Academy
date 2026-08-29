"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/header/DashboardHeader";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { menu } from "./menu";
import { useLanguage } from "@/providers/LanguageProvider";

const UserDashboardLayout = ({ children }) => {
    const { isRtl } = useLanguage();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <ProtectedRoute
            allowedRoles={["student"]}
        >
            <div className="flex min-h-screen bg-background">
                <Sidebar
                    menu={menu}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                    isRtl={isRtl}
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

export default UserDashboardLayout;