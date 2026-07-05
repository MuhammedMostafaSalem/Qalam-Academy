import { MdOutlineHighQuality } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";

const HeroStats = () => {
        const stats = [
            {
                id: 1,
                icon: MdOutlineHighQuality,
                value: "جودة عالية",
                label: "محتوى منظم ومجرب",
            },
            {
                id: 2,
                icon: FiDownload,
                value: "تحميل فوري",
                label: "ملفات جازة للتحميل",
            },
            {
                id: 3,
                icon: GoShieldCheck,
                value: "+أمان في الدفع",
                label: "دفع آمن 100%",
            },
        ]
    return (
        <div className="mt-16 flex justify-center gap-5">
            {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.id}
                        className="relative flex flex-col items-center text-center gap-2 pe-5"
                    >
                        <Icon
                            size={18}
                            className="
                                text-[#36C8FF]
                            "
                        />

                        <h3 className="
                            text-[10px]
                            sm:text-[12px]
                            md:text-[14px]
                            leading-none
                            text-white
                        ">
                            {item.value}
                        </h3>

                        <p className="
                            text-[8px]
                            sm:text-[10px]
                            md:text-[12px]
                            text-[#A6B0CF]
                        ">
                            {item.label}
                        </p>

                        {index !== stats.length - 1 && (
                            <span
                                className="
                                    absolute
                                    left-0
                                    top-1/2
                                    -translate-y-1/2
                                    h-[40px]
                                    w-[1px]
                                    bg-white/5
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