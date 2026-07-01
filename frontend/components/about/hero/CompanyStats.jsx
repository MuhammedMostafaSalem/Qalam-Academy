import {
    HiOutlineFaceSmile,
    HiOutlineCodeBracket,
    HiOutlineUsers,
    HiOutlineAcademicCap,
} from "react-icons/hi2";
import CompanyStatCard from "./CompanyStatCard";

const stats = [
    {
        id: 1,
        icon: HiOutlineFaceSmile,
        value: "250+",
        label: "طالب ناجح",
    },
    {
        id: 2,
        icon: HiOutlineCodeBracket,
        value: "350+",
        label: "مشروع مكتمل",
    },
    {
        id: 3,
        icon: HiOutlineUsers,
        value: "30+",
        label: "مدرب محترف",
    },
    {
        id: 4,
        icon: HiOutlineAcademicCap,
        value: "7+",
        label: "سنوات خبرة",
    },
];

const CompanyStats = () => {
    return (
        <section className="mt-20">

            <div
                className="
                    grid
                    grid-cols-2
                    lg:grid-cols-4
                    overflow-hidden
                    rounded-3xl
                    glass
                "
            >
                {stats.map((stat, index) => (
                    <CompanyStatCard
                        key={stat.id}
                        {...stat}
                        isLast={index === stats.length - 1}
                    />
                ))}
            </div>

        </section>
    )
}

export default CompanyStats