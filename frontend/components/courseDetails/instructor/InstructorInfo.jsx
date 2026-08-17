import Image from "next/image";
import { HiOutlineEnvelope } from "react-icons/hi2";

const InstructorInfo = ({ instructor }) => {
    if (!instructor) return null;

    const name = (instructor.firstName || instructor.lastName)
        ? `${instructor.firstName || ""} ${instructor.lastName || ""}`.trim()
        : instructor.name || "المدرب";

    const role = instructor.role === "instructor" 
        ? "مدرب معتمد" 
        : instructor.role || "محاضر ومطور برمجيات";

    const avatarSrc = instructor.avatar || instructor.image || "/assets/user-icon.png";
    const email = instructor.email;
    const skills = instructor.skills || ["تطوير البرمجيات", "حل المشكلات", "تطبيقات الويب"];

    return (
        <div
            className="
                rounded-3xl
                border
                border-border
                bg-card
                p-8
                text-center
            "
        >
            <Image
                src={avatarSrc}
                alt={name}
                width={160}
                height={160}
                className="
                    mx-auto
                    h-40
                    w-40
                    rounded-full
                    object-cover
                "
            />

            <h3 className="mt-6 text-2xl font-bold">
                {name}
            </h3>

            <p className="mt-2 text-primary font-medium">
                {role}
            </p>

            {email && (
                <div
                    className="
                        mt-4
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-sm
                        text-text-secondary
                    "
                >
                    <HiOutlineEnvelope className="text-primary text-base shrink-0" />
                    <a
                        href={`mailto:${email}`}
                        className="hover:text-primary transition-colors dir-ltr"
                    >
                        {email}
                    </a>
                </div>
            )}

            {skills && skills.length > 0 && (
                <div
                    className="
                        mt-8
                        flex
                        flex-wrap
                        justify-center
                        gap-2
                    "
                >
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="
                                rounded-full
                                bg-primary/10
                                px-4
                                py-2
                                text-sm
                                text-primary
                            "
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InstructorInfo;