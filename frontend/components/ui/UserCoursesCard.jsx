import Image from "next/image";
import Link from "next/link";

const UserCoursesCard = ({ course }) => {
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
                    {course.title}
                </h3>

                <p
                    className="
                        mt-2

                        text-sm

                        text-text-secondary
                    "
                >
                    {course.instructor}
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
                            {course.progress}%
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
                                width: `${course.progress}%`,
                            }}
                        />
                    </div>
                </div>

                <Link
                    href={`/courses/${course.id}`}
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
    )
}

export default UserCoursesCard