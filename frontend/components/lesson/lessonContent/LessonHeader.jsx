import Link from "next/link";
import { HiOutlineClock, HiOutlineBookOpen, HiOutlineUser } from "react-icons/hi2";

const LessonHeader = ({ lesson }) => {
    const title = lesson?.title?.ar || lesson?.title?.en || lesson?.title || "الدرس الحالي";
    const courseTitle = lesson?.course?.title?.ar || lesson?.course?.title?.en || lesson?.course?.title || "الكورس";
    const courseSlug = lesson?.course?.slug;
    const description = lesson?.description?.ar || lesson?.description?.en || lesson?.description || "";
    const duration = lesson?.duration ? `${lesson.duration} دقيقة` : "—";
    const instructorName = lesson?.course?.instructor
        ? `${lesson.course.instructor.firstName || ""} ${lesson.course.instructor.lastName || ""}`.trim()
        : null;
    const level = lesson?.course?.level === "beginner"
        ? "مبتدئ"
        : lesson?.course?.level === "intermediate"
            ? "متوسط"
            : lesson?.course?.level === "advanced"
                ? "متقدم"
                : lesson?.course?.level || "";

    return (
        <header className="space-y-4">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                {courseSlug ? (
                    <Link href={`/courses/${courseSlug}`} className="hover:text-primary transition-colors">
                        {courseTitle}
                    </Link>
                ) : (
                    <span>{courseTitle}</span>
                )}

                <span>/</span>

                <span className="text-text-primary font-medium">{title}</span>
            </div>

            {/* Lesson Title */}
            <h1
                className="
                    text-3xl
                    font-bold
                    text-text-primary
                "
            >
                {title}
            </h1>

            {/* Description */}
            {description && (
                <p
                    className="
                        max-w-3xl
                        leading-8
                        text-text-secondary
                    "
                >
                    {description}
                </p>
            )}

            {/* Meta */}
            <div
                className="
                    flex
                    flex-wrap
                    items-center
                    gap-6
                    text-sm
                    text-text-secondary
                "
            >
                <div className="flex items-center gap-2">
                    <HiOutlineClock className="text-primary" size={18} />
                    <span>{duration}</span>
                </div>

                {instructorName && (
                    <div className="flex items-center gap-2">
                        <HiOutlineUser className="text-primary" size={18} />
                        <span>{instructorName}</span>
                    </div>
                )}

                {level && (
                    <div className="flex items-center gap-2">
                        <HiOutlineBookOpen className="text-primary" size={18} />
                        <span>{level}</span>
                    </div>
                )}
            </div>
        </header>
    );
};

export default LessonHeader;