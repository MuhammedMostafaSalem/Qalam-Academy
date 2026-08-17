"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";

const TeamToolbar = ({ searchQuery, setSearchQuery, selectedRole, setSelectedRole }) => {
    const roleOptions = [
        { value: "all", label: "جميع المسميات" },
        { value: "instructor", label: "محاضر" },
        { value: "developer", label: "مطور" },
        { value: "designer", label: "مصمم" },
    ];

    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder="ابحث عن عضو في الفريق..."
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filters={
                    <Select
                        value={selectedRole || "all"}
                        onChange={(e) => setSelectedRole && setSelectedRole(e.target.value)}
                        options={roleOptions}
                    />
                }
            />
        </div>
    );
};

export default TeamToolbar;