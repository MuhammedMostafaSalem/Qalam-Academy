const ProjectMeta = ({
    category,
}) => {
    return (
        <span
            className="
                inline-flex
                rounded-full
                bg-secondary/10
                px-3
                py-1
                text-xs
                font-medium
                text-secondary
            "
        >
            {category}
        </span>
    );
};

export default ProjectMeta;