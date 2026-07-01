import Image from "next/image";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import storyImage from "@/public/assets/images/story-image.png";

const StoryImage = () => {
    return (
        <div className="relative hidden lg:block">

            {/* Glow */}

            <div
                className="
                    absolute
                    inset-0
                    -z-10
                    scale-95
                    rounded-3xl
                    bg-primary/20
                    blur-3xl
                "
            />

            {/* Image */}

            <div
                className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-card
                "
            >
                <Image
                    src={storyImage}
                    alt="Qalam Academy Story"
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        hover:scale-105
                    "
                />
            </div>

            {/* Floating Card */}

            <div
                className="
                    absolute
                    -bottom-8
                    -left-6
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-card/90
                    px-6
                    py-4
                    backdrop-blur-xl
                    shadow-2xl
                "
            >
                <div>
                    <h4 className="text-lg font-semibold">
                        نلتزم بالجودة
                    </h4>

                    <p className="text-sm text-muted-foreground">
                        في كل ما نقدمه
                    </p>
                </div>

                <HiOutlineShieldCheck size={30} className="text-primary" />

            </div>

        </div>
    )
}

export default StoryImage