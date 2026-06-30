import SectionBadge from "./SectionBadge";
import SectionDescription from "./SectionDescription";
import SectionTitle from "./SectionTitle";

const SectionHeader = ({
    badge,
    title,
    description,
    center = false,
    className,
}) => {
    return (
        <div
            // className={center ? "text-center" : ""}
            className={`
                flex
                flex-col
                gap-2
                ${center ? "items-center text-center" : ""}
                ${className}
            `}
        >
            {badge && (
                <SectionBadge>
                    {badge}
                </SectionBadge>
            )}

            <SectionTitle center={center}>
                {title}
            </SectionTitle>

            {description && (
                <SectionDescription center={center}>
                    {description}
                </SectionDescription>
            )}
        </div>
    );
}

export default SectionHeader