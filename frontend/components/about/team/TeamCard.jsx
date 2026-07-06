import Image from "next/image";
import Link from "next/link";

import {
    HiOutlineBriefcase,
} from "react-icons/hi2";

import {
    FaGithub,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

const TeamCard = ({ member }) => {
    const socialLinks = [
        {
            icon: FaLinkedinIn,
            href: member.socials.linkedin,
            label: "LinkedIn",
        },
        {
            icon: FaGithub,
            href: member.socials.github,
            label: "GitHub",
        },
        {
            icon: FaXTwitter,
            href: member.socials.twitter,
            label: "X",
        },
    ];

    return (
        <article
            className="
                group
                w-full
                rounded-2xl
                border
                border-[#29405f]
                glass
                p-6
                text-center
                transition-all
                duration-300
                hover:border-primary
            "
        >
            {/* Avatar */}
            <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full">
                <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* Name */}
            <h3 className="text-lg font-bold text-white">
                {member.name}
            </h3>

            {/* Role */}
            <p className="mt-1 text-sm text-primary">
                {member.role}
            </p>

            {/* Social */}
            <div className="mt-5 flex justify-center gap-3">
                {socialLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                        <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-white/10
                                text-gray-300
                                transition
                                hover:bg-primary
                                hover:text-white
                            "
                        >
                            <Icon size={16} />
                        </Link>
                    );
                })}
            </div>
        </article>
    )
}

export default TeamCard