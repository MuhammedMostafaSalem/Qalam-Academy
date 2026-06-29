import Image from "next/image"
import Link from "next/link"
import logo from "@/public/assets/logos/logo-blue.png"

const Logo = () => {
    return (
        <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Qalam Academy"
        >
            <Image
                src={logo}
                alt="Qalam Academy Logo"
                height={55}
                priority
                className="w-auto h-aut"
            />
            <span>قلم أكاديمي</span>
        </Link>
    )
}

export default Logo