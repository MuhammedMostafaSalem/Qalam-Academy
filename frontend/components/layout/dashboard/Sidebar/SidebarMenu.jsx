import SidebarItem from "./SidebarItem";
import menu from "./menu";

const SidebarMenu = ({ collapsed }) => {

    return (
        <nav className="space-y-6">
            {menu.map((group) => (
                <div key={group.section}>
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
                            {group.section}
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