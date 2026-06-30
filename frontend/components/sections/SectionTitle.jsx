const SectionTitle = ({
    children,
    center = false,
}) => {
    return (
        <h2
            className={`
                text-lg
                md:text-2xl
                font-bold
                leading-tight
                text-white
                ${center ? "text-center" : ""}
            `}
        >
            {children}
        </h2>
    );
}

export default SectionTitle