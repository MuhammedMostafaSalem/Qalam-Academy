"use client";

import { useState } from "react";
import Sidebar from "../../shared/Sidebar/Sidebar";
import DashboardHeader from "@/components/dashboard/header/DashboardHeader";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";
import menu from "./menu";
import { useLanguage } from "@/providers/LanguageProvider";

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user } = useAuth();
    const { localize, isRtl } = useLanguage();

    // Filter sidebar menu items based on role
    const filteredMenu = menu
        .filter((section) => !section.roles || section.roles.includes(user?.role))
        .map((section) => ({
            ...section,
            section: localize(section.section),
            items: section.items.filter(
                (item) => !item.roles || item.roles.includes(user?.role)
            ).map((item) => ({
                ...item,
                title: localize(item.title),
            })),
        }))
        .filter((section) => section.items.length > 0);

    return (
        <ProtectedRoute
            allowedRoles={["admin", "instructor"]}
        >
            <div className="flex min-screen bg-background">
                <Sidebar
                    menu={filteredMenu}
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
