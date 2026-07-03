import { technologies } from "./filtersData";

const TechnologyFilter = () => {
    return (
        <select
            className="
                h-12
                rounded-xl
                border
                border-border
                bg-card
                px-4
                outline-none
                focus:border-primary
            "
        >
            {technologies.map((tech) => (
                <option
                    key={tech}
                    value={tech}
                >
                    {tech}
                </option>
            ))}
        </select>
    );
};

export default TechnologyFilter;