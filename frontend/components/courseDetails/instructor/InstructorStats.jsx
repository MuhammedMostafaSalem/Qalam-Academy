import {
    HiOutlineAcademicCap,
    HiOutlineUsers,
    HiOutlineStar,
    HiOutlineBriefcase,
} from "react-icons/hi2";
import instructor from "./instructor";

const stats = [
    {
        icon: HiOutlineBriefcase,
        value: instructor.experience,
        label: "الخبرة",
    },
    {
        icon: HiOutlineUsers,
        value: instructor.students,
        label: "طالب",
    },
    {
        icon: HiOutlineAcademicCap,
        value: instructor.courses,
        label: "كورس",
    },
    {
        icon: HiOutlineStar,
        value: instructor.rating,
        label: "التقييم",
    },
];

const InstructorStats = () => {
    return (
        <div>
            <p className="leading-8 text-text-secondary">
                {instructor.bio}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">

                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="
                                rounded-2xl
                                border
                                border-border
                                bg-card
                                p-6
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-4
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/10
                                        text-primary
                                    "
                                >
                                    <Icon size={28} />
                                </div>

                                <div>
                                    <h4 className="text-2xl font-bold">
                                        {item.value}
                                    </h4>

                                    <p className="text-text-secondary">
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InstructorStats;