import Image from "next/image";
import Link from "next/link";

import logo from "@/public/assets/logos/logo-blue.png";

const SidebarLogo = ({ collapsed }) => {
    return (
        <Link
            href="/dashboard"
            className="
                flex
                items-center
                gap-3

                overflow-hidden

                transition-all
                duration-300
                ease-in-out
            "
        >
            <Image
                src={logo}
                alt="Qalam Academy"
                width={42}
                height={42}
                priority
                className="shrink-0"
            />

            <div
                className={`
                    overflow-hidden
                    whitespace-nowrap

                    transition-all
                    duration-300
                    ease-in-out

                    ${collapsed
                        ? "w-0 opacity-0"
                        : "w-auto opacity-100"
                    }
                `}
            >
                <h2 className="text-lg font-bold">
                    قلم أكاديمي
                </h2>
            </div>
        </Link>
    );
};

export default SidebarLogo;