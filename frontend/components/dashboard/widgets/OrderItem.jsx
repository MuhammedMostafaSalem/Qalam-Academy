const statusStyles = {
    paid:
        "bg-success/10 text-success",

    pending:
        "bg-warning/10 text-warning",

    cancelled:
        "bg-error/10 text-error",
};

const OrderItem = ({
    id,
    customer,
    amount,
    status,
    statusLabel,
    date,
}) => {
    return (
        <div
            className="
                flex
                items-center
                justify-between

                rounded-2xl

                border
                border-border

                p-4

                transition-all
                duration-300

                hover:border-primary/30
                hover:bg-background-alt
            "
        >
            <div>
                <h4 className="font-semibold">
                    {id}
                </h4>

                <p className="mt-1 text-sm text-text-secondary">
                    {customer}
                </p>
            </div>

            <div className="text-right">
                <h4 className="font-semibold">
                    {amount}
                </h4>

                <span
                    className={`
                        mt-2
                        inline-flex

                        rounded-full

                        px-3
                        py-1

                        text-xs
                        font-medium

                        ${statusStyles[status] || "bg-card-hover text-text-secondary"}
                    `}
                >
                    {statusLabel}
                </span>

                <p className="mt-2 text-xs text-text-secondary">
                    {date}
                </p>
            </div>
        </div>
    );
};

export default OrderItem;
