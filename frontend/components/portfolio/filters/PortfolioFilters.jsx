"use client";

import Container from "@/components/ui/Container";
import Toolbar from "@/components/ui/Toolbar";
import Select from "@/components/ui/Select";
import Section from "@/components/sections/Section";
import ViewSwitcher from "./ViewSwitcher";
import { useLanguage } from "@/providers/LanguageProvider";

const PortfolioFilters = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories = [] }) => {
    const { language, localize } = useLanguage();
    const categoryOptions = [
        { value: "all", label: language === "en" ? "All Categories" : "جميع المجالات" },
        ...categories.map((cat) => ({
            value: cat._id || cat.name,
            label: localize(cat.title || cat.name, language === "en" ? "Category" : "مجال"),
        })),
    ];

    return (
        <Section className="my-10">
            <Container>
                <Toolbar
                    inputPlaceholder={language === "en" ? "Search projects..." : "ابحث في المعرض..."}
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
