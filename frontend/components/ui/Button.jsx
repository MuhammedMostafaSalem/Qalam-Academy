import { animations } from "@/lib/animations"

const Button = ({
    children,
    variant = "primary",
    className = "",
    ...props
}) => {
    const variants = {
        primary:
            "bg-primary text-white hover:bg-primary-hover",

        secondary:
            "border border-primary text-primary hover:bg-primary hover:text-white",

        ghost:
            "text-primary hover:bg-blue-50",
    };

    return (
        <button
            className={`
                rounded-button
                px-6
                py-3
                font-semibold
                duration-300
                ${variants[variant]}
                ${animations.transition}
                ${animations.press}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button