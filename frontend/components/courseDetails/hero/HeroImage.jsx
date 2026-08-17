import Image from "next/image";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";

const HeroImage = ({ course }) => {
    const rawTitle = course?.title?.ar || course?.title?.en || course?.title;
    const title = typeof rawTitle === "string" && rawTitle.trim() !== "" ? rawTitle : "دورة تعليمية";
    const imageUrl = (course?.thumbnail && typeof course.thumbnail === 'string' && course.thumbnail.trim() !== '')
        ? (course.thumbnail.startsWith('http')
            ? course.thumbnail
            : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}${course.thumbnail}`)
        : '/assets/images/course-details-hero.png';

    const duration = course?.duration || "—";

    return (
        <div {...heroAnimation.image} className="relative">
            {/* Glow */}
            <div
                className="
                    absolute
                    inset-0
                    -z-10
                    rounded-full
                    bg-primary/20
                    blur-[120px]
                "
            />

            {/* Image */}
            <div
                className="
                    overflow-hidden
                    rounded-fullCard
                    glass
                "
            >
                <Image
                    src={imageUrl}
                    alt={title}
                    width={600}
                    height={600}
                    priority
                    className={`
                        h-full
                        w-full
                        object-cover
                        ${animations.floating}
                    `}
                />
            </div>

            {/* Floating Badge */}
            <div
                className={`
                    absolute
                    -bottom-6
                    left-6
                    rounded-2xl
                    border
                    border-border
                    bg-card/90
                    px-6
                    py-4
                    backdrop-blur-xl
                    ${animations.floating}
                `}
            >
                <h3 className="text-2xl font-bold text-primary">
                    {duration}
                </h3>

                <p className="text-sm text-text-secondary">
                    محتوى تدريبي
                </p>
            </div>
        </div>
    );
};

export default HeroImage;