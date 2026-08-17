import Image from "next/image";
import { HiStar } from "react-icons/hi";

const TestimonialCard = ({ testimonial }) => {
    const name = testimonial?.name || "طالب بالأكاديمية";
    const avatar = (testimonial?.avatar && typeof testimonial.avatar === 'string' && testimonial.avatar.trim() !== '')
        ? testimonial.avatar
        : "/assets/user-icon.png";

    return (
        <article
            className="
                rounded-card
                glass
                p-8
                flex
                flex-col
                gap-3
            "
        >
            {/* Review */}
            <blockquote
                className="
                    px-5
                    text-base
                    leading-8
                    text-text-secondary
                "
            >
                "{testimonial.review}"
            </blockquote>

            {/* Rating */}
            <div className="flex items-center gap-1">

                {Array.from({ length: testimonial.rating || 5 }).map((_, index) => (
                    <HiStar
                        key={index}
                        className="
                            h-5
                            w-5
                            text-yellow-400
                        "
                    />
                ))}

            </div>

            {/* User */}
            <div className="flex items-center gap-4">

                <div
                    className="
                        relative
                        h-14
                        w-14
                        overflow-hidden
                        rounded-full
                    "
                >
                    <Image
                        src={avatar}
                        alt={name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

                <div>

                    <h3
                        className="
                            font-semibold
                            text-text-primary
                        "
                    >
                        {testimonial.name}
                    </h3>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-text-secondary
                        "
                    >
                        {testimonial.position}
                    </p>

                </div>

            </div>

        </article>
    )
}

export default TestimonialCard