"use client";

import Link from "next/link";
import {
    HiOutlineCalendar,
    HiOutlineGlobeAlt,
    HiOutlineCodeBracket,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const ProjectSidebar = ({ project }) => {
    const { language, localize } = useLanguage();
    const technologies = Array.isArray(project?.technologies) ? project.technologies : [];
    const category = localize(project?.category?.title, language === "en" ? "General" : "عام");
    const createdAt = project?.createdAt
        ? new Date(project.createdAt).toLocaleDateString(language === "en" ? "en-US" : "ar-EG")
        : "—";
    const projectInfo = [
        { icon: HiOutlineCalendar, label: language === "en" ? "Added" : "تاريخ الإضافة", value: createdAt },
        { icon: HiOutlineGlobeAlt, label: language === "en" ? "Category" : "نوع المشروع", value: category },
    ];
    return (
        <aside
            className="
                h-fit
                rounded-3xl
                border
                border-border
                bg-card
                p-8
                sticky
                top-28
            "
        >
            {/* Project Info */}
            <div>
                <h3 className="mb-6 text-xl font-bold">
                    {language === "en" ? "Project information" : "معلومات المشروع"}
                </h3>

                <div className="space-y-6">
                    {projectInfo.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className="flex items-start gap-4"
                            >
                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/10
                                        text-primary
                                    "
                                >
                                    <Icon size={22} />
                                </div>

                                <div>
                                    <p className="text-sm text-text-secondary">
                                        {item.label}
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Divider */}
            {technologies.length > 0 && <>
            <div className="my-8 border-t border-border" />
            <div>
                <div className="mb-5 flex items-center gap-2">
                    <HiOutlineCodeBracket
                        className="text-primary"
                        size={22}
                    />

                    <h3 className="text-xl font-bold">
                        {language === "en" ? "Technologies" : "التقنيات المستخدمة"}
                    </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                    {technologies.map((tech) => (
                        <span
                            key={tech}
                            className="
                                rounded-full
                                bg-primary/10
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-primary
                            "
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            </>}

            {(project?.projectUrl || project?.githubUrl) && <>
            <div className="my-8 border-t border-border" />
            <div className="space-y-4">
                {project?.projectUrl && (
                <Link
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        flex
                        justify-center
                        rounded-xl
                        gradient-button
                        px-5
                        py-3
                    "
                >
                    {language === "en" ? "View project" : "مشاهدة المشروع"}
                </Link>
                )}
                {project?.githubUrl && (
                <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        flex
                        justify-center
                        rounded-xl
                        border
                        border-border
                        px-5
                        py-3
                        transition
                        hover:border-primary
                    "
                >
                    GitHub Repository
                </Link>
                )}
            </div>
            </>}
        </aside>
    );
};

export default ProjectSidebar;
