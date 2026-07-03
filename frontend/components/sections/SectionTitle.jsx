import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";

const SectionTitle = ({
    children,
    center = false,
}) => {
    return (
        <h2
            {...heroAnimation.title}
            className={`
                text-lg
                md:text-2xl
                font-bold
                leading-tight
                text-white
                ${center ? "text-center" : ""}
                ${animations.transition}
            `}
        >
            {children}
        </h2>
    );
}

export default SectionTitle