const SectionDescription = ({
    children,
    center = false,
}) => {
    return (
        <p
            className={`
                max-w-[380px]
                text-sm
                text-text-secondary
                ${center ? "mx-auto text-center" : ""}
            `}
        >
            {children}
        </p>
    );
}

export default SectionDescription