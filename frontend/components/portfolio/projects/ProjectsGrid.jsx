"use client";

import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import ProjectCard from "../ProjectCard";
import { cardAnimation } from "@/lib/animation/cardAnimation";
import usePortfolios from "@/hooks/portfolio/usePortfolios";
import { useLanguage } from "@/providers/LanguageProvider";
import PortfolioFilters from "../filters/PortfolioFilters";
import { getCategoriesAction } from "@/actions/categoryActions";
import { useEffect, useMemo, useState } from "react";

const ProjectsGrid = () => {
    const { language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [categories, setCategories] = useState([]);

    const queryString = useMemo(() => {
        const params = new URLSearchParams({ limit: "20", isActive: "true" });
        if (searchQuery.trim()) params.set("search", searchQuery.trim());
        if (selectedCategory !== "all") params.set("category", selectedCategory);
        return params.toString();
    }, [searchQuery, selectedCategory]);

    const { portfolios, loading, error } = usePortfolios(queryString);

    useEffect(() => {
        getCategoriesAction("type=portfolio&isActive=true&limit=100").then((result) => {
            if (result.success && Array.isArray(result.data)) setCategories(result.data);
        });
    }, [language]);

    if (loading) {
        return (
            <Section className="pb-24">
                <Container>
                    <div className="text-center py-12 text-text-secondary">
                        {language === "en" ? "Loading projects..." : "جاري تحميل المشاريع..."}
                    </div>
                </Container>
            </Section>
        );
    }

    if (error) {
        return (
            <>
                <PortfolioFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                />
                <Section className="pb-24">
                    <Container>
                        <div className="text-center py-12 text-error">{error}</div>
                    </Container>
                </Section>
            </>
        );
    }

    return (
        <>
            <PortfolioFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
            />
            <Section className="pb-24">
                <Container>
                {portfolios.length === 0 ? (
                    <div className="text-center py-12 text-text-muted">
                        {language === "en" ? "No projects match the selected filters" : "لا توجد مشاريع تطابق عوامل التصفية"}
                    </div>
                ) : (
                <div
                    className="
                        grid
                        gap-8
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {portfolios.map((project, index) => (
                        <div
                            key={project._id}
                            {...cardAnimation(index)}
                        >
                            <ProjectCard
                                project={project}
                            />
                        </div>
                    ))}
                </div>
                )}
                </Container>
            </Section>
        </>
    );
};

export default ProjectsGrid;
