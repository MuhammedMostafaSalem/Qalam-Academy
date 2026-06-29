import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import { IoRocketOutline } from "react-icons/io5";

const HeroContent = () => {
    return (
        <div className="flex flex-col justify-center">

            {/* Badge */}
            <span
                className="
                    inline-flex
                    items-center gap-3
                    w-fit
                    rounded-full
                    border
                    border-primary/20
                    bg-primary/10
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-primary
                "
            >
                <IoRocketOutline className="text-text-primary" size={15} /> مرحبًا بكم في قلم أكاديمي
            </span>

            {/* Heading */}
            <h1
                className="
                    mt-6
                    max-w-2xl
                    text-5xl
                    font-extrabold
                    leading-tight
                    text-text-primary
                    lg:text-6xl
                "
            >
                تعلم مهارات.
                <br />

                ابنِ مستقبلك
                <br />

                بثقة.
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
                انضم إلى آلاف الطلاب الذين يتعلمون البرمجة والتكنولوجيا والمهارات الرقمية من خلال دورات عملية قائمة على المشاريع ومصممة لتلائم متطلبات الواقع العملي.
            </p>

            <HeroButtons />

            <HeroStats />

        </div>
    );
}

export default HeroContent