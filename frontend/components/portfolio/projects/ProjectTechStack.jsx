const ProjectTechStack = ({ technologies }) => {
    return (
        <div className="mt-5 flex flex-wrap gap-2">
            {technologies.map((tech) => (
                <span
                    key={tech}
                    className="
                        rounded-full
                        bg-primary/10
                        px-3
                        py-1
                        text-xs
                        text-primary
                    "
                >
                    {tech}
                </span>
            ))}
        </div>
    );
};

export default ProjectTechStack;