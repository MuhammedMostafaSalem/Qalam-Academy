"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";
import { useLanguage } from "@/providers/LanguageProvider";

const TeamToolbar = ({ searchQuery, setSearchQuery, selectedRole, setSelectedRole }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const roleOptions = [
        { value: "all", label: isEn ? "All Positions" : "جميع المسميات" },
        { value: "instructor", label: isEn ? "Instructor" : "محاضر" },
        { value: "developer", label: isEn ? "Developer" : "مطور" },
        { value: "designer", label: isEn ? "Designer" : "مصمم" },
    ];

    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder={isEn ? "Search team members..." : "ابحث عن عضو في الفريق..."}
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