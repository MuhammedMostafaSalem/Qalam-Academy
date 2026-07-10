"use client";

import Section from "@/components/sections/Section";
import Image from "next/image";
import {
    HiOutlineAcademicCap,
    HiOutlineCurrencyDollar,
    HiOutlinePencilSquare,
    HiOutlineUsers,
    HiOutlineVideoCamera,
} from "react-icons/hi2";


const CourseHeader = () => {

    return (
        <Section
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-6

                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                "
            >
                {/* Course Info */}
                <div
                    className="
                        flex
                        flex-col
                        gap-5

                        md:flex-row
                        md:items-center
                    "
                >
                    {/* Image */}
                    <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                        alt="Course"
                        width={160}
                        height={160}
                        className="
                            h-36
                            w-36

                            rounded-3xl

                            object-cover

                            border
                            border-border
                        "
                    />

                    {/* Details */}
                    <div>
                        <div
                            className="
                                flex
                                flex-wrap
                                items-center
                                gap-3
                            "
                        >
                            <h1
                                className="
                                    text-3xl
                                    font-bold
                                "
                            >
                                Frontend Development
                            </h1>

                            <span
                                className="
                                    rounded-full

                                    bg-green-500/10

                                    px-4
                                    py-1.5

                                    text-sm

                                    font-medium

                                    text-green-500
                                "
                            >
                                Published
                            </span>
                        </div>

                        <p
                            className="
                                mt-3
                                max-w-2xl

                                text-text-secondary
                            "
                        >
                            تعلم تطوير واجهات المستخدم باستخدام
                            HTML و CSS و JavaScript و React و Next.js.
                        </p>

                        {/* Stats */}
                        <div
                            className="
                                mt-6

                                grid

                                grid-cols-2
                                gap-4

                                sm:grid-cols-3
                            "
                        >
                            <StatCard
                                icon={HiOutlineVideoCamera}
                                label="الدروس"
                                value="24"
                            />
                            <StatCard
                                icon={HiOutlineUsers}
                                label="الطلاب"
                                value="340"
                            />
                            <StatCard
                                icon={HiOutlineCurrencyDollar}
                                label="السعر"
                                value="$99"
                            />
                        </div>
                    </div>
                </div>



                {/* Actions */}
                <div>
                    <button
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2

                            rounded-2xl

                            bg-primary

                            px-6
                            py-3

                            text-white

                            transition

                            hover:opacity-90
                        "
                    >
                        <HiOutlinePencilSquare size={20} />
                        تعديل الكورس
                    </button>
                </div>
            </div>
        </Section>
    );
};



const StatCard = ({
    icon: Icon,
    label,
    value,
}) => {

    return (
        <div
            className="
                flex
                items-center
                gap-3
            "
        >
            <div
                className="
                    flex
                    h-10
                    w-10

                    items-center
                    justify-center

                    rounded-xl

                    bg-primary/10

                    text-primary
                "
            >
                <Icon size={20} />
            </div>

            <div>
                <p
                    className="
                        text-xs
                        text-text-secondary
                    "
                >
                    {label}
                </p>
                <h4
                    className="
                        font-semibold
                    "
                >
                    {value}
                </h4>
            </div>
        </div>
    );
};



export default CourseHeader;