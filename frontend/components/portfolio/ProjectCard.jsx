import Image from "next/image";
import Link from "next/link";

import { HiArrowLeft, HiTag, HiCode } from "react-icons/hi";

const ProjectCard = ({ project }) => {
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
                    src={project.image}
                    alt={project.title}
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

                {/* <span
                    className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        bg-primary
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-white
                    "
                >
                    {project.category}
                </span> */}

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
                        <span>{project.category}</span>
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
                    {project.title}
                </h3>

                {/* Description */}

                <p
                    className="
                        line-clamp-2
                        leading-7
                        text-text-secondary
                    "
                >
                    {project.description}
                </p>

                {/* Footer */}
                <Link
                    href={`/portfolio/${project.slug}`}
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