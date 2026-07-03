import { cardAnimation } from "@/lib/animation/cardAnimation";
import Image from "next/image";
import Link from "next/link";
const PartnerCard = ({ partner, index }) => {
    return (
        <Link
            {...cardAnimation(index)}
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={partner.name}
            className="
                group
                flex
                h-36
                items-center
                justify-center
            "
        >
            <div className="relative h-12 w-36">
                <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="
                        object-contain
                        transition-all
                        duration-300
                        group-hover:grayscale-0
                        group-hover:opacity-100
                        group-hover:scale-110
                    "
                />
            </div>
        </Link>
    )
}

export default PartnerCard