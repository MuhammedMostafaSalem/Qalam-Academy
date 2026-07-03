import Image from "next/image";
import instructorImage from "@/public/assets/images/instructor.png";
import Button from "@/components/ui/Button";

import {
    HiOutlineEnvelope,
    HiOutlineUsers,
} from "react-icons/hi2";

const InstructorCard = () => {
    return (
        <div
            className="
                rounded-3xl
                border
                border-border
                bg-card
                p-7
            "
        >
            <Image
                src={instructorImage}
                alt="Instructor"
                className="
                    mx-auto
                    h-32
                    w-32
                    rounded-full
                    object-cover
                "
            />

            <div className="mt-5 text-center">

                <h3 className="text-xl font-bold">
                    أحمد مصطفى
                </h3>

                <p className="mt-2 text-text-secondary">
                    Senior Frontend Engineer
                </p>

            </div>

            <div className="mt-6 space-y-4">

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <HiOutlineUsers className="text-primary" />

                    <span className="text-sm">
                        +12,000 طالب
                    </span>
                </div>

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <HiOutlineEnvelope className="text-primary" />

                    <span className="text-sm">
                        instructor@qalam.dev
                    </span>
                </div>

            </div>

            <p
                className="
                    mt-6
                    text-sm
                    leading-7
                    text-text-secondary
                "
            >
                يعمل في مجال تطوير الويب منذ أكثر من 8 سنوات،
                وساعد آلاف الطلاب على دخول سوق العمل.
            </p>

            <Button
                className="
                    gradient-button
                    mt-8
                    w-full
                "
            >
                عرض الملف الشخصي
            </Button>
        </div>
    );
};

export default InstructorCard;