const AuthCard = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={`
                rounded-[28px]
                border
                border-border
                bg-card/70
                backdrop-blur-xl
                shadow-xl
                p-8
                md:p-10
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default AuthCard;