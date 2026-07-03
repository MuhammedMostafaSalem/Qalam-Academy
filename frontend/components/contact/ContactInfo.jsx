import { fadeRight } from "@/lib/animationHelpers";
import Link from "next/link";
import {
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlinePhone,
    HiOutlineClock,
} from "react-icons/hi2";

const contactItems = [
    {
        id: 1,
        icon: HiOutlinePhone,
        title: "رقم الهاتف",
        value: "+20 100 123 4567",
        href: "tel:+201001234567",
    },
    {
        id: 2,
        icon: HiOutlineEnvelope,
        title: "البريد الإلكتروني",
        value: "info@qlam-academy.dev",
        href: "mailto:info@qlam-academy.dev",
    },
    {
        id: 3,
        icon: HiOutlineMapPin,
        title: "العنوان",
        value: "القاهرة، مصر",
    },
    {
        id: 4,
        icon: HiOutlineClock,
        title: "ساعات العمل",
        value: "الأحد - الخميس | 9:00 ص - 6:00 م",
    },
];

const ContactInfo = () => {
    return (
        <div {...fadeRight()} className="flex h-full flex-col">

            <div>

                <span
                    className="
                        inline-flex
                        rounded-full
                        bg-primary/10
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-primary
                    "
                >
                    معلومات التواصل
                </span>

                <h2
                    className="
                        mt-5
                        text-3xl
                        font-bold
                        text-text-primary
                    "
                >
                    يسعدنا سماعك
                </h2>

                <p
                    className="
                        mt-4
                        leading-7
                        text-text-secondary
                    "
                >
                    يمكنك التواصل معنا عبر أي من الوسائل التالية،
                    وسنحرص على الرد عليك في أقرب وقت ممكن.
                </p>

            </div>

            <div className="mt-10 space-y-6">

                {contactItems.map((item) => {
                    const Icon = item.icon;

                    const content = (
                        <>
                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <Icon className="h-7 w-7" />
                            </div>

                            <div>
                                <p className="text-sm text-text-secondary">
                                    {item.title}
                                </p>

                                <p
                                    className="
                                        mt-1
                                        font-semibold
                                        text-text-primary
                                    "
                                >
                                    {item.value}
                                </p>
                            </div>
                        </>
                    );

                    return item.href ? (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="
                                flex
                                items-start
                                gap-4
                                transition-colors
                                duration-300
                                hover:text-primary
                            "
                        >
                            {content}
                        </Link>
                    ) : (
                        <div
                            key={item.id}
                            className="flex items-start gap-4"
                        >
                            {content}
                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default ContactInfo;