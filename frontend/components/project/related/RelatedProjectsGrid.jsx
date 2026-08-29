"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { cardAnimation } from "@/lib/animation/cardAnimation";
import { getPortfoliosAction } from "@/actions/portfolioActions";
import { useLanguage } from "@/providers/LanguageProvider";

const RelatedProjectsGrid = ({ excludeId, categoryId }) => {
    const { language } = useLanguage();
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const params = new URLSearchParams({ limit: "4", isActive: "true" });
                if (categoryId) params.set("category", categoryId);
                const res = await getPortfoliosAction(params.toString());
                if (res.success && Array.isArray(res.data)) {
                    setPortfolios(res.data.filter((item) => item._id !== excludeId).slice(0, 3));
                } else setError(res.message);
            } catch (err) {
                setError(err?.message || "Failed to fetch related projects");
            } finally {
                setLoading(false);
            }
        };
        fetchRelated();
    }, [categoryId, excludeId, language]);

    if (loading) {
        return <div className="py-10 text-center text-text-secondary">{language === "en" ? "Loading related projects..." : "جاري تحميل المشاريع المشابهة..."}</div>;
    }

    if (error) return <div className="py-10 text-center text-error">{error}</div>;

    if (portfolios.length === 0) return null;

    return (
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
    );
};

export default RelatedProjectsGrid;
