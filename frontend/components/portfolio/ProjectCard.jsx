import Image from "next/image";
import Link from "next/link";

import { HiArrowLeft, HiTag, HiCode } from "react-icons/hi";

const ProjectCard = ({ project }) => {
    // Handle image URL properly
    const imageUrl = project?.image?.startsWith('http') 
        ? project.image 
        : project?.image 
            ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}${project.image}`
            : '/assets/img-card.jpg'; // Fallback image

    const title = project?.title?.ar || project?.title?.en || project?.title || "مشروع";
    const description = project?.description?.ar || project?.description?.en || project?.description || "";
    const category = project?.category?.name?.ar || project?.category?.name?.en || project?.category?.name || project?.category || "عام";

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
                    href={`/portfolio/${project?.slug || '#'}`}
                    className="
                        flex
                        gap-3
                        items-center
                        hover:text-primary
                    "
                >
                    <div>عرض المشروع</div>
                    <HiArrowLeft size={22} className="" />
                </Link>
            </div>
        </article>
    )
}

export default ProjectCard