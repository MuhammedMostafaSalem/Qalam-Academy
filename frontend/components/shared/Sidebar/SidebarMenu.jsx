"use client";

import SidebarItem from "./SidebarItem";
import { useLanguage } from "@/providers/LanguageProvider";

const SidebarMenu = ({ menu, collapsed }) => {
    const { localize } = useLanguage();

    return (
        <nav className="space-y-6">
            {menu.map((group, idx) => (
                <div key={idx}>
                    {!collapsed && (
                        <h3
                            className="
                                px-6
                                mb-3
                                text-xs
                                font-semibold
                                text-text-secondary
                            "
                        >
                            {localize(group.section)}
                        </h3>
                    )}

                    <div className="space-y-1">
                        {group.items.map((item) => (
                            <SidebarItem
                                key={item.href}
                                {...item}
                                collapsed={collapsed}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    );
};

export default SidebarMenu;