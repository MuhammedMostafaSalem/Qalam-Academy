import Image from "next/image";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const UserCoursesCard = ({ course }) => {
    const rawImage = course?.image;
    const imageSrc = (rawImage && typeof rawImage === "string" && rawImage.trim() !== "")
        ? (rawImage.startsWith("http") ? rawImage : `${baseUrl}${rawImage}`)
        : null;

    const courseSlugOrId = course?.slug || course?.id || "";

    const rawTitle = course?.title;
    const title = typeof rawTitle === "string"
        ? rawTitle
        : (typeof rawTitle === "object" && rawTitle ? (rawTitle.ar || rawTitle.en || "كورس") : "كورس");

    const rawInstructor = course?.instructor;
    const instructor = typeof rawInstructor === "string"
        ? rawInstructor
        : (typeof rawInstructor === "object" && rawInstructor ? `${rawInstructor.firstName || ''} ${rawInstructor.lastName || ''}`.trim() : "—");

    return (
        <div
            className="
                glass
                overflow-hidden
                rounded-3xl
                border
                border-border
                shadow-sm
                transition
                hover:-translate-y-1
            "
        >
            {/* Image */}
            <div
                className="
                    relative
                    h-44
                    w-full
                    bg-white/5
                "
            >
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="
                            object-cover
                        "
                        unoptimized
                    />
                ) : null}
            </div>

            {/* Content */}
            <div
                className="
                    p-4
                "
            >
                <h3
                    className="
                        line-clamp-2
                        min-h-12
                        font-bold
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-2
                        text-sm
                        text-text-secondary
                    "
                >
                    {instructor}
                </p>

                {/* Progress */}
                <div
                    className="
                        mt-4
                    "
                >
                    <div
                        className="
                            mb-2
                            flex
                            justify-between
                            text-xs
                        "
                    >
                        <span>
                            التقدم
                        </span>

                        <span>
                            {course?.progress || 0}%
                        </span>
                    </div>

                    <div
                        className="
                            h-2
                            rounded-full
                            bg-background-alt
                            overflow-hidden
                        "
                    >
                        <div
                            className="
                                h-full
                                rounded-full
                                bg-primary
                            "
                            style={{
                                width: `${course?.progress || 0}%`,
                            }}
                        />
                    </div>
                </div>

                <Link
                    href={courseSlugOrId ? `/courses/${courseSlugOrId}` : "#"}
                    className="
                        mt-4
                        block
                        rounded-2xl
                        bg-primary
                        py-2.5
                        text-center
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:opacity-90
                    "
                >
                    فتح الكورس
                </Link>
            </div>
        </div>
    );
};

export default UserCoursesCard