import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";

const SectionDescription = ({
    children,
    center = false,
}) => {
    return (
        <p
            {...heroAnimation.description}
            className={`
                text-sm
                text-text-secondary
                ${center ? "mx-auto text-center" : ""}
                ${animations.transition}
            `}
        >
            {children}
        </p>
    );
}

export default SectionDescription