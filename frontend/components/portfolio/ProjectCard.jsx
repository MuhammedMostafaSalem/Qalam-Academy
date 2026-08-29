"use client";

import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight, HiTag } from "react-icons/hi";
import { useLanguage } from "@/providers/LanguageProvider";

const ProjectCard = ({ project }) => {
    const { language, isRtl, localize } = useLanguage();
    const rawImage = project?.image;
    const imageUrl = (typeof rawImage === "string" && rawImage.trim() !== "")
        ? (rawImage.startsWith("http") ? rawImage : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}${rawImage}`)
        : (rawImage || '/assets/img-card.jpg');

    const title = localize(project?.title, language === "en" ? "Project" : "مشروع");
    const description = localize(project?.description, "");
    const defaultCat = language === "en" ? "General" : "عام";
    const category = localize(project?.category?.title || project?.category?.name || project?.category, defaultCat);
    const viewProjectText = language === "en" ? "View Project" : "عرض المشروع";
    const projectIdentifier = project?.slug || project?._id;

    return (
        <article
            className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-border
                bg-background-alt
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-primary/40
                hover:shadow-xl
                hover:shadow-primary/10
            "
        >
            {/* Image */}
            <div className="relative overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={500}
                    height={320}
                    unoptimized
                    className="
                        h-56
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-3">
                {/* Meta */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        text-sm
                        text-text-secondary
                    "
                >
                    <div className="flex items-center gap-2">
                        <HiTag className="text-primary" />
                        <span>{category}</span>
                    </div>
                </div>

                {/* Title */}
                <h3
                    className="
                        line-clamp-2
                        text-xl
                        font-bold
                        text-text-primary
                    "
                >
                    {title}
                </h3>

                {/* Description */}
                <p
                    className="
                        line-clamp-2
                        leading-7
                        text-text-secondary
                    "
                >
                    {description}
                </p>

                {/* Footer */}
                <Link
                    href={projectIdentifier ? `/portfolio/${projectIdentifier}` : "/portfolio"}
                    className="
                        flex
                        gap-3
                        items-center
                        hover:text-primary
                    "
                >
                    <div>{viewProjectText}</div>
                    {isRtl ? <HiArrowLeft size={22} /> : <HiArrowRight size={22} />}
                </Link>
            </div>
        </article>
    );
};

export default ProjectCard;
