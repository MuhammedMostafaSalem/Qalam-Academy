import LoadMore from "@/components/shared/LoadMore";
import UserCoursesCard from "@/components/ui/UserCoursesCard";
import imgCourse from '@/public/assets/img-card.jpg';

const MyCoursesGrid = () => {
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

    return (
        <div className="flex-1">
            {/* Grid */}
            <div
                className={`
                    grid
                    gap-8
                    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                `}
            >
                {courses.map((course, index) => (
                    <UserCoursesCard
                        key={index}
                        course={course}
                    />
                ))}
            </div>

            <LoadMore />
        </div>
    )
}

export default MyCoursesGrid