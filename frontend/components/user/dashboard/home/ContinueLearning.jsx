import Image from "next/image";
import Section from "@/components/sections/Section";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import imgCourse from '@/public/assets/img-card.jpg';

const ContinueLearning = () => {
    const course = {
        title: "تعلم Next.js من الصفر للاحتراف",
        lesson: "الدرس 12: Routing و Dynamic Routes",
        progress: 65,
        image: imgCourse,
    };

    return (
        <Section
            className="
                glass

                rounded-3xl

                border
                border-border

                p-6

                shadow-sm
            "
        >
            {/* Header */}
            <div
                className="
                    mb-5

                    flex
                    items-center
                    justify-between
                "
            >
                <div>
                    <h2
                        className="
                            text-xl
                            font-bold
                        "
                    >
                        أكمل تعلمك
                    </h2>

                    <p
                        className="
                            mt-1

                            text-sm

                            text-text-secondary
                        "
                    >
                        تابع من حيث توقفت
                    </p>
                </div>
            </div>

            {/* Content */}
            <div
                className="
                    flex
                    flex-col

                    gap-5

                    md:flex-row
                    md:items-center
                "
            >
                {/* Image */}
                <div
                    className="
                        relative

                        h-48
                        w-full

                        overflow-hidden

                        rounded-2xl

                        md:h-36
                        md:w-60
                    "
                >
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="
                            object-cover
                        "
                    />
                </div>

                {/* Info */}
                <div
                    className="
                        flex-1
                    "
                >
                    <h3
                        className="
                            text-lg
                            font-bold
                        "
                    >
                        {course.title}
                    </h3>

                    <p
                        className="
                            mt-2

                            text-sm

                            text-text-secondary
                        "
                    >
                        {course.lesson}
                    </p>

                    {/* Progress */}
                    <div
                        className="
                            mt-5
                        "
                    >
                        <div
                            className="
                                mb-2

                                flex
                                items-center
                                justify-between

                                text-sm
                            "
                        >
                            <span>
                                التقدم
                            </span>

                            <span
                                className="
                                    font-medium
                                "
                            >
                                {course.progress}%
                            </span>
                        </div>

                        <div
                            className="
                                h-2

                                overflow-hidden

                                rounded-full

                                bg-background-alt
                            "
                        >
                            <div
                                className="
                                    h-full

                                    rounded-full

                                    bg-primary

                                    transition-all
                                "
                                style={{
                                    width: `${course.progress}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        className="
                            mt-5

                            flex
                            items-center
                            justify-center

                            gap-2

                            rounded-2xl

                            bg-primary

                            px-5
                            py-3

                            text-sm

                            font-medium

                            text-white

                            transition

                            hover:opacity-90
                        "
                    >
                        <HiOutlinePlayCircle size={20} />

                        متابعة التعلم
                    </button>
                </div>
            </div>
        </Section>
    );
};

export default ContinueLearning;