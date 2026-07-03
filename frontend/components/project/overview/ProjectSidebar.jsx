import Link from "next/link";
import {
    HiOutlineCalendar,
    HiOutlineBuildingOffice2,
    HiOutlineClock,
    HiOutlineGlobeAlt,
    HiOutlineCodeBracket,
} from "react-icons/hi2";

const technologies = [
    "Next.js",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
];

const projectInfo = [
    {
        icon: HiOutlineBuildingOffice2,
        label: "العميل",
        value: "Qalam Academy",
    },
    {
        icon: HiOutlineCalendar,
        label: "السنة",
        value: "2026",
    },
    {
        icon: HiOutlineClock,
        label: "مدة التنفيذ",
        value: "4 أشهر",
    },
    {
        icon: HiOutlineGlobeAlt,
        label: "نوع المشروع",
        value: "منصة تعليم إلكتروني",
    },
];

const ProjectSidebar = () => {
    return (
        <aside
            className="
                h-fit
                rounded-3xl
                border
                border-border
                bg-card
                p-8
                sticky
                top-28
            "
        >
            {/* Project Info */}
            <div>
                <h3 className="mb-6 text-xl font-bold">
                    معلومات المشروع
                </h3>

                <div className="space-y-6">
                    {projectInfo.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className="flex items-start gap-4"
                            >
                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/10
                                        text-primary
                                    "
                                >
                                    <Icon size={22} />
                                </div>

                                <div>
                                    <p className="text-sm text-text-secondary">
                                        {item.label}
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-border" />

            {/* Tech Stack */}
            <div>
                <div className="mb-5 flex items-center gap-2">
                    <HiOutlineCodeBracket
                        className="text-primary"
                        size={22}
                    />

                    <h3 className="text-xl font-bold">
                        التقنيات المستخدمة
                    </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                    {technologies.map((tech) => (
                        <span
                            key={tech}
                            className="
                                rounded-full
                                bg-primary/10
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-primary
                            "
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-border" />

            {/* Links */}
            <div className="space-y-4">
                <Link
                    href="#"
                    className="
                        flex
                        justify-center
                        rounded-xl
                        gradient-button
                        px-5
                        py-3
                    "
                >
                    مشاهدة المشروع
                </Link>

                <Link
                    href="#"
                    className="
                        flex
                        justify-center
                        rounded-xl
                        border
                        border-border
                        px-5
                        py-3
                        transition
                        hover:border-primary
                    "
                >
                    GitHub Repository
                </Link>

            </div>
        </aside>
    );
};

export default ProjectSidebar;