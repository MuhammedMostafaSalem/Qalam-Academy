import { cardAnimation } from "@/lib/animation/cardAnimation";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const PartnerCard = ({ partner, index }) => {
    const name = partner?.name || "شريك النجاح";
    const rawImg = partner?.image || partner?.logo;
    const imageSrc = (rawImg && typeof rawImg === "string" && rawImg.trim() !== "")
        ? (rawImg.startsWith("http") ? rawImg : `${BASE_URL}${rawImg}`)
        : null;

    return (
        <Link
            {...cardAnimation(index)}
            href={partner?.website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="
                group
                flex
                h-36
                items-center
                justify-center
            "
        >
            <div className="relative h-12 w-36 flex items-center justify-center">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={name}
                        fill
                        className="
                            object-contain
                            transition-all
                            duration-300
                            group-hover:grayscale-0
                            group-hover:opacity-100
                            group-hover:scale-110
                        "
                        unoptimized
                    />
                ) : (
                    <span className="text-sm font-bold text-text-secondary">{name}</span>
                )}
            </div>
        </Link>
    );
};

export default PartnerCard;
