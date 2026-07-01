import Image from "next/image";
import { HiStar } from "react-icons/hi2";
import { FaRegSmileBeam } from "react-icons/fa";
import whyChooseImage from "@/public/assets/images/why-choose.png";

const WhyChooseImage = () => {
    return (
        <div className="relative">
            {/* Background Dots */}
            <div
                className="
                    absolute
                    -top-6
                    -right-6
                    -z-10
                    h-40
                    w-40
                    bg-[radial-gradient(circle,#2563eb_1.5px,transparent_1.5px)]
                    [background-size:14px_14px]
                    opacity-40
                "
            />

            {/* Image */}

            <div
                className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-primary/30
                    glass
                    shadow-[0_0_60px_rgba(59,130,246,.12)]
                "
            >
                <Image
                    src={whyChooseImage}
                    alt="Development Team"
                    className="
                        h-auto
                        w-full
                        object-cover
                    "
                    priority
                />
            </div>

            {/* Rating Card */}

            <div
                className="
                    absolute
                    -bottom-8
                    right-6
                    w-72
                    rounded-2xl
                    border
                    border-primary/30
                    bg-background-alt/95
                    p-5
                    backdrop-blur-xl
                    shadow-xl
                "
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            "
                        >
                            <FaRegSmileBeam className="text-2xl" />
                        </div>

                        <div>
                            <h4 className="font-bold text-text-primary">
                                رضا عملائنا
                            </h4>

                            <p className="mt-1 text-sm text-text-secondary">
                                4.9 / 5
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <HiStar
                                key={index}
                                className="text-yellow-400 text-lg"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyChooseImage