import Image from "next/image";
import {
    HiOutlineArrowDownTray,
    HiOutlineEye,
} from "react-icons/hi2";


const CertificateCard = ({ certificate }) => {
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
            {/* Certificate Image */}
            <div
                className="
                    relative

                    h-52

                    w-full

                    bg-background-alt
                "
            >
                <Image
                    src={certificate.image}
                    alt={certificate.title}
                    fill
                    className="
                        object-cover
                    "
                />
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
                    {certificate.title}
                </h3>

                <p
                    className="
                        mt-2

                        text-sm

                        text-text-secondary
                    "
                >
                    {certificate.instructor}
                </p>

                <p
                    className="
                        mt-1

                        text-xs

                        text-text-secondary
                    "
                >
                    حصلت عليها في {certificate.date}
                </p>

                {/* Actions */}
                <div
                    className="
                        mt-5

                        flex

                        gap-3
                    "
                >

                    <button
                        className="
                            flex-1

                            flex

                            items-center
                            justify-center

                            gap-2

                            rounded-2xl

                            border
                            border-border

                            py-2.5

                            text-sm

                            font-medium

                            transition

                            hover:bg-background-alt
                        "
                    >
                        <HiOutlineEye size={18} />

                        عرض
                    </button>

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
                        <HiOutlineArrowDownTray size={18} />

                        تحميل
                    </button>
                </div>
            </div>
        </div>
    );
};


export default CertificateCard;