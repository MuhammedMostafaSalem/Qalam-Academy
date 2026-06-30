import {
    HiOutlineFolder,
    HiOutlineUsers,
    HiOutlineClock,
    HiOutlineAcademicCap,
} from "react-icons/hi2";

const HeroStats = () => {
    const stats = [
        {
            id: 1,
            icon: HiOutlineAcademicCap,
            value: "+25",
            label: "محاضر",
        },
        {
            id: 2,
            icon: HiOutlineClock,
            value: "+7",
            label: "سنوات خبرة",
        },
        {
            id: 3,
            icon: HiOutlineUsers,
            value: "+80",
            label: "عميل سعيد",
        },
        {
            id: 4,
            icon: HiOutlineFolder,
            value: "+150",
            label: "مشروع مكتمل",
        },
    ]

    return (
        <div className="mt-16 flex items-center justify-between max-w-2xl">
            {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.id}
                        className="relative flex flex-col items-center text-center flex-1"
                    >
                        <Icon
                            size={18}
                            className="mb-2 text-[#36C8FF]"
                        />

                        <h3 className="text-[26px] leading-none text-white">
                            {item.value}
                        </h3>

                        <p className="mt-2 text-xs text-[#A6B0CF]">
                            {item.label}
                        </p>

                        {index !== stats.length - 1 && (
                            <span
                                className="
                                    absolute
                                    left-0
                                    top-1/2
                                    -translate-y-1/2
                                    h-full
                                    w-[2px]
                                    bg-white/10
                                "
                            />
                        )}
                    </div>
                );
            })}
        </div>
    )
}

export default HeroStats