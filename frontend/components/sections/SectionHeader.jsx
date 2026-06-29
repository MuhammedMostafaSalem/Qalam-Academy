import SectionBadge from "./SectionBadge";
import SectionDescription from "./SectionDescription";
import SectionTitle from "./SectionTitle";

const SectionHeader = ({
    badge,
    title,
    description,
    center = false,
}) => {
    return (
        <div className={center ? "text-center" : ""}>
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