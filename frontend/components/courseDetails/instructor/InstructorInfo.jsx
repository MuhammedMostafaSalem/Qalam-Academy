import Image from "next/image";
import instructor from "./instructor";

const InstructorInfo = () => {
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
                src={instructor.image}
                alt={instructor.name}
                className="
                    mx-auto
                    h-40
                    w-40
                    rounded-full
                    object-cover
                "
            />

            <h3 className="mt-6 text-2xl font-bold">
                {instructor.name}
            </h3>

            <p className="mt-2 text-primary">
                {instructor.role}
            </p>

            <div
                className="
                    mt-8
                    flex
                    flex-wrap
                    justify-center
                    gap-2
                "
            >
                {instructor.skills.map((skill) => (
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
        </div>
    );
};

export default InstructorInfo;