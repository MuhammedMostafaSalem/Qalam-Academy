import Image from "next/image";
import {
    HiOutlineArrowDownTray,
    HiOutlineEye,
} from "react-icons/hi2";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const CertificateCard = ({ certificate }) => {
    const rawImage = certificate?.image;
    const imageSrc = (rawImage && typeof rawImage === "string" && rawImage.trim() !== "")
        ? (rawImage.startsWith("http") ? rawImage : `${baseUrl}${rawImage}`)
        : null;

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
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={certificate?.title || "Certificate"}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40 font-bold text-sm bg-white/5">
                        شهادة أكاديمية قلم
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="line-clamp-2 min-h-12 font-bold">
                    {certificate?.title}
                </h3>

                <p className="mt-2 text-sm text-text-secondary">
                    {certificate?.instructor}
                </p>

                <p className="mt-1 text-xs text-text-secondary">
                    حصلت عليها في {certificate?.date}
                </p>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
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