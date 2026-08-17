"use client";

import Toolbar from '@/components/ui/Toolbar';
import Select from '@/components/ui/Select';

const PortfolioToolbar = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories = [] }) => {
    const categoryOptions = [
        { value: "all", label: "جميع التصنيفات" },
        ...categories.map((cat) => ({
            value: cat._id || cat.name,
            label: cat.title?.ar || cat.name?.ar || cat.name || cat.title || "تصنيف",
        })),
    ];

    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder="ابحث عن مشروع..."
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