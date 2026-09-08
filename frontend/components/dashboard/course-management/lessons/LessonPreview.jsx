"use client";

import Section from "@/components/sections/Section";
import {
    HiOutlineClock,
    HiOutlineVideoCamera,
    HiOutlineDocumentText,
    HiOutlineCheckCircle,
} from "react-icons/hi2";


const LessonPreview = ({
    lesson,
}) => {
    // دالة بسيطة لاستخراج معرف يوتيوب من الروابط المختلفة
const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
    }

    return (
        <Section
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
            "
        >
            {/* Header */}
            <div
                className="
                    mb-6
                    flex
                    flex-col
                    gap-3
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >
                <div>
                    <h1
                        className="
                            text-2xl
                            font-bold
                        "
                    >
                        {lesson?.title || "Introduction to React"}
                    </h1>
                </div>
                <span
                    className="
                        inline-flex
                        items-center
                        gap-2

                        w-fit

                        rounded-full

                        bg-success/10

                        px-4
                        py-2

                        text-sm

                        text-success
                    "
                >
                    <HiOutlineCheckCircle />
                    Published
                </span>
            </div>

            {/* Content Preview */}
            <div
                className="
                    overflow-hidden

                    rounded-3xl

                    border
                    border-border

                    bg-black
                "
            >
                {
                    lesson?.videoYoutube ? (
                        <iframe
                            src={getYoutubeEmbedUrl(lesson.videoYoutube)}
                            title="YouTube video player"
                            className="aspect-video w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <video
                            controls
                            className="
                                aspect-video
                                w-full
                            "
                        >
                            <source
                                src={lesson.video}
                                type="video/mp4"
                            />
                            Your browser does not support video.
                        </video>
                    )
                }
            </div>

            {/* Details */}
            <div
                className="
                    mt-6

                    grid

                    gap-5

                    sm:grid-cols-2
                "
            >
                <InfoItem
                    icon={HiOutlineClock}
                    label="مدة الدرس"
                    value={
                        lesson?.duration || "20:30"
                    }
                />
                <InfoItem
                    icon={HiOutlineVideoCamera}
                    label="نوع المحتوى"
                    value={
                        lesson?.type || "Video"
                    }
                />
            </div>

            {/* Description */}
            <div
                className="
                    mt-6

                    rounded-2xl

                    border

                    border-border

                    p-5
                "
            >

                <h3
                    className="
                        mb-3
                        font-semibold
                    "
                >
                    وصف الدرس
                </h3>
                <p
                    className="
                        leading-8
                        text-text-secondary
                    "
                >
                    {
                        lesson?.description
                        ||
                        "شرح أساسيات تطوير الواجهات باستخدام React و Next.js."
                    }
                </p>
            </div>
        </Section>
    );
};





const InfoItem = ({
    icon: Icon,
    label,
    value,
}) => {

    return (
        <div
            className="
                flex
                items-center
                gap-3

                rounded-2xl

                border

                border-border

                p-4
            "
        >
            <div
                className="
                    flex
                    h-10
                    w-10

                    items-center
                    justify-center

                    rounded-xl

                    bg-primary/10

                    text-primary
                "
            >
                <Icon size={20} />
            </div>

            <div>
                <p
                    className="
                        text-sm
                        text-text-secondary
                    "
                >
                    {label}
                </p>
                <p
                    className="
                        font-semibold
                    "
                >
                    {value}
                </p>
            </div>
        </div>
    );
};



export default LessonPreview;
