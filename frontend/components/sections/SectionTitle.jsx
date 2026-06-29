const SectionTitle = ({
    children,
    center = false,
}) => {
    return (
        <h2
            className={`
                mt-5
                text-4xl
                font-bold
                leading-tight
                text-white
                md:text-5xl
                ${center ? "text-center" : ""}
            `}
        >
            {children}
        </h2>
    );
}

export default SectionTitle