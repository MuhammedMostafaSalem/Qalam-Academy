import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";

const SectionBadge = ({
    children,
}) => {
    return (
        <span
            {...heroAnimation.badge}
            className={`
                text-sm
                font-medium
                text-primary
                ${animations.transition}
            `}
        >
            {children}
        </span>
    );
}

export default SectionBadge