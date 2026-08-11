import {
    HiOutlineStar,
    HiOutlineUserGroup,
    HiOutlineClock,
    HiOutlineAcademicCap,
} from "react-icons/hi2";
import MetaItem from "./MetaItem";
import { fadeUp } from "@/lib/animationHelpers";

const HeroMeta = ({ course }) => {
    const metas = [
        {
            icon: HiOutlineStar,
            title: course?.averageRating ? course.averageRating.toFixed(1) : "0.0",
            subtitle: "التقييم"
        },
        {
            icon: HiOutlineUserGroup,
            title: course?.studentsCount ? `${course.studentsCount}+` : "0",
            subtitle: "طالب"
        },
        {
            icon: HiOutlineClock,
            title: course?.duration || "—",
            subtitle: "مدة الكورس"
        },
        {
            icon: HiOutlineAcademicCap,
            title: course?.lessonsCount || "0",
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
                    key={index}
                    index={index}
                    item={item}
                />
            ))}
        </div>
    );
};

export default HeroMeta;