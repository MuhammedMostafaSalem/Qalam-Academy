import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import { IoRocketOutline } from "react-icons/io5";

const HeroContent = () => {
    return (
        <div className="flex flex-col justify-center">
            {/* Heading */}
            <h1 className="mt-6 max-w-2xl">
                <span className="block text-4xl md:text-5xl lg:text-[60px] text-white">
                    نحو مستقبل رقمي
                </span>

                <span className="block mt-2 text-4xl md:text-5xl lg:text-[60px]">
                    <span className="text-white">نصنع </span>

                    <span className="bg-gradient-to-r from-[#3ABEFF] via-[#4F8BFF] to-[#7A5CFF] bg-clip-text text-transparent">
                        الحلول البرمجية
                    </span>
                </span>
            </h1>

            {/* Description */}

            <p
                className="
                    mt-6
                    max-w-xl
                    text-lg
                    leading-8
                    text-text-secondary
                "
            >
                نحن شركة برمجيات متكاملة. تساعد الشركات و الافراد على تحويل أفكارهم الى منتجات رقمية مبتكرة وفعالة
            </p>

            <HeroButtons />

            <HeroStats />

        </div>
    );
}

export default HeroContent