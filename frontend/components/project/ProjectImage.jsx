import Image from "next/image";
import projectImage from "@/public/assets/images/story-image.png";
import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "../sections/SectionTitle";
import SectionDescription from "../sections/SectionDescription";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations"

const ProjectImage = () => {
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
                            منصة تعليم إلكتروني
                        </span>

                        <SectionTitle>
                            Learning Management System
                        </SectionTitle>

                        <SectionDescription>
                            منصة متكاملة لإدارة الكورسات، متابعة الطلاب،
                            وإجراء الاختبارات مع لوحة تحكم احترافية.
                        </SectionDescription>
                    </div>

                    <Image
                        src={projectImage}
                        alt="Project Preview"
                        priority
                        className="
                            aspect-video
                            w-full h-auto
                            object-cover
                        "
                    />
                </div>
            </Container>
        </Section>
    );
};

export default ProjectImage;