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

        // <article
        //     className="
        //         group
        //         overflow-hidden
        //         rounded-3xl
        //         border
        //         border-border
        //         bg-background-alt
        //         transition-all
        //         duration-300
        //         hover:-translate-y-2
        //         hover:border-primary/40
        //         hover:shadow-xl
        //         hover:shadow-primary/10
        //     "
        // >
        //     {/* Image */}

        //     <div className="relative aspect-[4/5] overflow-hidden">

        //         <Image
        //             src={member.image}
        //             alt={member.name}
        //             className="
        //                 transition-transform
        //                 duration-500
        //                 group-hover:scale-105
        //                 rounded-full
        //             "
        //         />

        //         {/* Overlay */}

        //         <div
        //             className="
        //                 absolute
        //                 inset-0
        //                 flex
        //                 items-center
        //                 justify-center
        //                 gap-3
        //                 bg-primary/80
        //                 opacity-0
        //                 transition-opacity
        //                 duration-300
        //                 group-hover:opacity-100
        //             "
        //         >
        //             {socialLinks.map((social) => {
        //                 const Icon = social.icon;

        //                 return (
        //                     <Link
        //                         key={social.label}
        //                         href={social.href}
        //                         aria-label={social.label}
        //                         target="_blank"
        //                         rel="noopener noreferrer"
        //                         className="
        //                             flex
        //                             h-11
        //                             w-11
        //                             items-center
        //                             justify-center
        //                             rounded-full
        //                             bg-white
        //                             text-primary
        //                             transition-all
        //                             duration-300
        //                             hover:scale-110
        //                         "
        //                     >
        //                         <Icon className="h-5 w-5" />
        //                     </Link>
        //                 );
        //             })}
        //         </div>

        //     </div>

        //     {/* Content */}

        //     <div className="p-6">

        //         <h3
        //             className="
        //                 text-xl
        //                 font-bold
        //                 text-text-primary
        //             "
        //         >
        //             {member.name}
        //         </h3>

        //         <div
        //             className="
        //                 mt-2
        //                 flex
        //                 items-center
        //                 gap-2
        //                 text-primary
        //             "
        //         >
        //             <HiOutlineBriefcase className="h-5 w-5" />

        //             <span className="text-sm font-medium">
        //                 {member.role}
        //             </span>

        //         </div>

        //         <p
        //             className="
        //                 mt-4
        //                 line-clamp-3
        //                 text-sm
        //                 leading-7
        //                 text-text-secondary
        //             "
        //         >
        //             {member.bio}
        //         </p>

        //     </div>

        // </article>
    return (
        <article
            className="
                group
                w-full
                max-w-[220px]
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