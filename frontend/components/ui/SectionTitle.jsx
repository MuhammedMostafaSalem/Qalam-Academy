const SectionTitle = ({
    badge,
    title,
    description,
    center = false,
}) => {
    return (
        <div className={`${center ? "text-center" : ""} mb-14`}>
            {badge && (
                <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-primary">
                    {badge}
                </span>
            )}

            <h2 className="mt-4 text-4xl font-bold text-text-primary md:text-5xl">
                {title}
            </h2>

            {description && (
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-text-secondary">
                    {description}
                </p>
            )}
        </div>
    )
}

export default SectionTitle