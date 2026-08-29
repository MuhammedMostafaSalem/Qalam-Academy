"use client";

import Image from "next/image";
import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "../sections/SectionTitle";
import SectionDescription from "../sections/SectionDescription";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations"
import { useLanguage } from "@/providers/LanguageProvider";

const ProjectImage = ({ project }) => {
    const { language, localize } = useLanguage();
    const title = localize(project?.title, language === "en" ? "Project" : "مشروع");
    const description = localize(project?.description);
    const category = localize(project?.category?.title, language === "en" ? "Project" : "مشروع");
    const rawImage = project?.image;
    const imageUrl = rawImage
        ? (rawImage.startsWith("http") ? rawImage : `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}${rawImage}`)
        : "/assets/img-card.jpg";

    return (
        <Section className="pt-[140px] pb-16">
            <Container>

                {/* Image */}
                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[32px]
                        border
                        border-border
                        bg-card
                        shadow-2xl
                        h-[400px]
                    "
                >
                    {/* Overlay */}
                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            gap-3
                            items-center
                            justify-center
                            bg-black/50
                            px-6
                            text-center
                            text-white
                            h-auto
                            z-10
                        "
                    >
                        <span
                            {...heroAnimation.badge}
                            className={`
                                inline-flex
                                rounded-full
                                bg-white/20
                                px-4
                                py-2
                                text-sm
                                backdrop-blur-sm
                                ${animations.transition}
                            `}
                        >
                            {category}
                        </span>

                        <SectionTitle>
                            {title}
                        </SectionTitle>

                        <SectionDescription>
                            {description}
                        </SectionDescription>
                    </div>

                    <Image
                        src={imageUrl}
                        alt={title}
                        priority
                        fill
                        unoptimized
                        className="
                            w-full h-full
                            object-cover
                        "
                    />
                </div>
            </Container>
        </Section>
    );
};

export default ProjectImage;
