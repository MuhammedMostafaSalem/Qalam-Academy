import { cardAnimation } from "@/lib/animation/cardAnimation"
import { animations } from "@/lib/animations"

const CompanyStatCard = ({
    icon: Icon,
    value,
    label,
    isLast,
    index,
}) => {
    return (
        <div
            {...cardAnimation(index)}
            className={`
                relative
                p-8
                ${animations.hoverLift}
            `}
        >
            <div
                className="
                    flex
                    items-center
                    justify-center
                    gap-5
                "
            >
                <div>

                    <h3 className="text-4xl font-bold">
                        {value}
                    </h3>

                    <p className="mt-1 text-muted-foreground">
                        {label}
                    </p>

                </div>

                <div
                    className={`
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-primary/10
                        text-primary
                        ${animations.hoverIcon}
                    `}
                >
                    <Icon size={30} />
                </div>
            </div>

            {!isLast && (
                <div
                    className="
            absolute
            left-0
            top-1/2
            h-2/3
            w-px
            -translate-y-1/2
            bg-white/10
        "
                />
            )}
        </div>
    )
}

export default CompanyStatCard