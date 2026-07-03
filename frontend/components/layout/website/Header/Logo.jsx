import Image from "next/image"
import Link from "next/link"
import logo from "@/public/assets/logos/logo-blue.png"
import { animations } from "@/lib/animations"

const Logo = () => {
    return (
        <Link
            href="/"
            aria-label="Qalam Academy"
            className={`
                flex
                items-center
                gap-2
                ${animations.transition}
                hover:scale-105
            `}
        >
            <Image
                src={logo}
                alt="Qalam Academy Logo"
                height={55}
                priority
                className="w-auto h-auto"
            />
            <span>قلم أكاديمي</span>
        </Link>
    )
}

export default Logo