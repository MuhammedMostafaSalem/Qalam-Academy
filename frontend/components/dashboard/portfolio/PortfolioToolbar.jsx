"use client";

import Toolbar from '@/components/ui/Toolbar';
import Select from '@/components/ui/Select';
import { useLanguage } from '@/providers/LanguageProvider';

const PortfolioToolbar = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories = [] }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const categoryOptions = [
        { value: "all", label: isEn ? "All Categories" : "جميع التصنيفات" },
        ...categories.map((cat) => ({
            value: cat._id || cat.name,
            label: localize(cat.title || cat.name, isEn ? "Category" : "تصنيف"),
        })),
    ];

    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder={isEn ? "Search projects..." : "ابحث عن مشروع..."}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filters={
                    <Select
                        value={selectedCategory || "all"}
                        onChange={(e) => setSelectedCategory && setSelectedCategory(e.target.value)}
                        options={categoryOptions}
                    />
                }
            />
        </div>
    );
};

export default PortfolioToolbar;