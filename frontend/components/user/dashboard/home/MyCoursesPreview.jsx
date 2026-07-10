import Link from "next/link";
import imgCourse from '@/public/assets/img-card.jpg';
import Section from "@/components/sections/Section";
import UserCoursesCard from "@/components/ui/UserCoursesCard";

const courses = [
    {
        id: 1,
        title: "تعلم Next.js من الصفر للاحتراف",
        instructor: "أحمد محمد",
        progress: 65,
        image: imgCourse,
    },
    {
        id: 2,
        title: "React Advanced",
        instructor: "محمد علي",
        progress: 100,
        image: imgCourse,
    },
    {
        id: 3,
        title: "UI/UX Design للمبتدئين",
        instructor: "سارة أحمد",
        progress: 30,
        image: imgCourse,
    },
    {
        id: 4,
        title: "Node.js Backend",
        instructor: "خالد حسن",
        progress: 45,
        image: imgCourse,
    },
];


const MyCoursesPreview = () => {
    return (
        <Section
            className="
                space-y-5
            "
        >
            {/* Header */}
            <div
                className="
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
                        كورساتي
                    </h2>

                    <p
                        className="
                            mt-1

                            text-sm

                            text-text-secondary
                        "
                    >
                        الكورسات التي بدأت تعلمها
                    </p>
                </div>

                <Link
                    href="/user/my-courses"
                    className="
                        text-sm
                        font-medium

                        text-primary

                        hover:underline
                    "
                >
                    عرض الكل
                </Link>
            </div>

            {/* Courses */}
            <div
                className="
                    grid

                    grid-cols-1

                    sm:grid-cols-2

                    xl:grid-cols-4

                    gap-5
                "
            >
                {courses.map((course) => (
                    <UserCoursesCard
                        key={course.id}
                        course={course}
                    />
                ))}
            </div>
        </Section>
    );
};


export default MyCoursesPreview;