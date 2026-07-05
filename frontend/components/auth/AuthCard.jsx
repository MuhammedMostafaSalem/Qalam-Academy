const AuthCard = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={`
                rounded-fullCard
                border
                border-border
                bg-card/70
                backdrop-blur-xl
                shadow-xl
                p-8
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default AuthCard;