"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProjectCard from "../portfolio/ProjectCard";
import Slider from "@/components/ui/Slider";
import { useEffect, useState } from "react";
import { getPortfoliosAction } from "@/actions/portfolioActions";
import { useLanguage } from "@/providers/LanguageProvider";

const PortfolioSlider = () => {
    const { language } = useLanguage();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPortfoliosAction("limit=10").then((result) => {
            if (result.success) setProjects(result.data);
            setLoading(false);
        });
    }, [language]);

    if (loading) {
        return (
            <div className="py-10 text-center text-text-secondary">
                {language === "en" ? "Loading projects..." : "جاري تحميل المشاريع..."}
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="py-10 text-center text-text-muted">
                {language === "en" ? "No projects available currently" : "لا توجد مشاريع متاحة حالياً"}
            </div>
        );
    }

    return (
        <Slider
            ButtonPrev={
                <button className="projects-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                    <IoIosArrowBack size={22} />
                </button>
            }
            ButtonNext={
                <button className="projects-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                    <IoIosArrowForward size={22} />
                </button>
            }
            prevEl=".projects-prev"
            nextEl=".projects-next"
        >
            {projects.map((portfolio) => (
                <ProjectCard
                    key={portfolio._id}
                    project={{
                        _id: portfolio._id,
                        slug: portfolio.slug,
                        image: portfolio.image,
                        title: portfolio.title,
                        description: portfolio.description,
                        category: portfolio.category,
                        technologies: portfolio.technologies || [],
                        projectUrl: portfolio.projectUrl || "#",
                        githubUrl: portfolio.githubUrl,
                    }}
                />
            ))}
        </Slider>
    );
};

export default PortfolioSlider;
