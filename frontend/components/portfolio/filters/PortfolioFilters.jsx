"use client";

import Container from "@/components/ui/Container";
import Toolbar from "@/components/ui/Toolbar";
import Select from "@/components/ui/Select";
import Section from "@/components/sections/Section";
import ViewSwitcher from "./ViewSwitcher";

const PortfolioFilters = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories = [] }) => {
    const categoryOptions = [
        { value: "all", label: "جميع المجالات" },
        ...categories.map((cat) => ({
            value: cat._id || cat.name,
            label: cat.title?.ar || cat.name?.ar || cat.name || cat.title || "مجال",
        })),
    ];

    return (
        <Section className="my-10">
            <Container>
                <Toolbar
                    inputPlaceholder="ابحث في المعرض..."
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filters={
                        <Select
                            value={selectedCategory || "all"}
                            onChange={(e) => setSelectedCategory && setSelectedCategory(e.target.value)}
                            options={categoryOptions}
                        />
                    }
                    actions={
                        <ViewSwitcher />
                    }
                />
            </Container>
        </Section>
    );
};

export default PortfolioFilters;