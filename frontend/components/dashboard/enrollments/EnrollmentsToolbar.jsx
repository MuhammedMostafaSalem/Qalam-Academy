"use client";

import Toolbar from "@/components/ui/Toolbar";
import { useLanguage } from "@/providers/LanguageProvider";

const EnrollmentsToolbar = ({ searchQuery, setSearchQuery }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder={isEn ? "Search enrollments..." : "ابحث عن اشتراك..."}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
        </div>
    );
};

export default EnrollmentsToolbar;