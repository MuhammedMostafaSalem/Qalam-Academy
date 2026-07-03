import {
    HiOutlineDocumentText,
    HiOutlineUserGroup,
    HiOutlineEye,
    HiOutlineStar,
} from "react-icons/hi2";

const stats = [
    {
        id: 1,
        icon: HiOutlineDocumentText,
        value: "150+",
        label: "مقال",
    },
    {
        id: 2,
        icon: HiOutlineUserGroup,
        value: "15+",
        label: "كاتب",
    },
    {
        id: 3,
        icon: HiOutlineEye,
        value: "100K+",
        label: "قراءة",
    },
    {
        id: 4,
        icon: HiOutlineStar,
        value: "4.9",
        label: "متوسط التقييم",
    },
];

const HeroStats = () => {
    return (
        <div
            className="
                mt-16
                grid
                w-full
                gap-6

                grid-cols-2
                md:grid-cols-4
            "
        >
            {stats.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.id}
                        className="
                            group
                            rounded-2xl
                            border
                            border-border
                            bg-card/60
                            p-6
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:-translate-y-2
                            hover:border-primary
                        "
                    >
                        <div
                            className="
                                mx-auto
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-primary/10
                                text-primary
                                transition-all
                                duration-300
                                group-hover:bg-primary
                                group-hover:text-white
                            "
                        >
                            <Icon size={28} />
                        </div>

                        <h3
                            className="
                                mt-5
                                text-3xl
                                font-bold
                            "
                        >
                            {item.value}
                        </h3>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-text-secondary
                            "
                        >
                            {item.label}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default HeroStats;