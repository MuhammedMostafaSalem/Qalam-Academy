import {
    HiOutlineStar,
    HiOutlineUserGroup,
    HiOutlineClock,
    HiOutlineAcademicCap,
} from "react-icons/hi2";
import MetaItem from "./MetaItem";
import { fadeUp } from "@/lib/animationHelpers";

const HeroMeta = ({ course }) => {
    const totalStudents = course?.totalStudents ?? course?.studentsCount ?? 0;
    const totalLessons = course?.totalLessons ?? course?.lessonsCount ?? course?.lessons?.length ?? 0;
    const rating = course?.averageRating !== undefined && course?.averageRating !== null 
        ? Number(course.averageRating).toFixed(1) 
        : "0.0";
    const duration = course?.duration 
        ? (typeof course.duration === "number" ? `${course.duration} دقيقة` : course.duration)
        : "—";

    const metas = [
        {
            id: "rating",
            icon: HiOutlineStar,
            title: rating,
            subtitle: "التقييم"
        },
        {
            id: "students",
            icon: HiOutlineUserGroup,
            title: `${totalStudents}`,
            subtitle: "طالب"
        },
        {
            id: "duration",
            icon: HiOutlineClock,
            title: duration,
            subtitle: "مدة الكورس"
        },
        {
            id: "lessons",
            icon: HiOutlineAcademicCap,
            title: `${totalLessons}`,
            subtitle: "درس"
        },
    ];

    return (
        <div
            {...fadeUp()}
            className="
                mt-10
                grid
                gap-6

                sm:grid-cols-2
            "
        >
            {metas.map((item, index) => (
                <MetaItem
                    key={item.id}
                    index={index}
                    item={item}
                />
            ))}
        </div>
    );
};

export default HeroMeta;