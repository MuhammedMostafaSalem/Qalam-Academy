import Image from "next/image";
import Link from "next/link";

import {
    HiOutlineHeart,
    HiOutlineShoppingCart,
} from "react-icons/hi2";


const WishlistCard = ({ course }) => {
    return (
        <div
            className="
                glass

                overflow-hidden

                rounded-3xl

                border
                border-border

                shadow-sm

                transition

                hover:-translate-y-1
            "
        >
            {/* Image */}
            <div
                className="
                    relative

                    h-48

                    w-full
                "
            >
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="
                        object-cover
                    "
                />

                {/* Remove */}
                <button
                    className="
                        absolute

                        left-4
                        top-4

                        flex

                        h-10
                        w-10

                        items-center
                        justify-center

                        rounded-full

                        bg-white/90

                        text-red-500

                        shadow

                        transition

                        hover:bg-red-500

                        hover:text-white
                    "
                >
                    <HiOutlineHeart
                        size={22}
                    />
                </button>
            </div>

            {/* Content */}
            <div
                className="
                    p-5
                "
            >
                <h3
                    className="
                        line-clamp-2

                        min-h-12

                        font-bold
                    "
                >
                    {course.title}
                </h3>

                <p
                    className="
                        mt-2

                        text-sm

                        text-text-secondary
                    "
                >
                    {course.instructor}
                </p>

                <div
                    className="
                        mt-4

                        flex

                        items-center

                        justify-between
                    "
                >
                    <span
                        className="
                            text-lg

                            font-bold

                            text-primary
                        "
                    >
                        {course.price} ج.م
                    </span>
                </div>

                {/* Actions */}
                <div
                    className="
                        mt-5

                        flex

                        gap-3
                    "
                >
                    <Link
                        href={`/courses/${course.id}`}
                        className="
                            flex-1

                            rounded-2xl

                            border
                            border-border

                            py-2.5

                            text-center

                            text-sm

                            font-medium

                            transition

                            hover:bg-background-alt
                        "
                    >
                        عرض
                    </Link>

                    <button
                        className="
                            flex-1

                            flex

                            items-center
                            justify-center

                            gap-2

                            rounded-2xl

                            bg-primary

                            py-2.5

                            text-sm

                            font-medium

                            text-white

                            transition

                            hover:opacity-90
                        "
                    >
                        <HiOutlineShoppingCart size={18} />

                        شراء
                    </button>
                </div>
            </div>
        </div>
    );
};


export default WishlistCard;