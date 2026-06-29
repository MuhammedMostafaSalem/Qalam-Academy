const SectionDescription = ({
    children,
    center = false,
}) => {
    return (
        <p
            className={`
                mt-5
                max-w-2xl
                text-lg
                leading-8
                text-text-secondary
                ${center ? "mx-auto text-center" : ""}
            `}
        >
            {children}
        </p>
    );
}

export default SectionDescription