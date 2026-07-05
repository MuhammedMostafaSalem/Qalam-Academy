const statusStyles = {
    Completed:
        "bg-emerald-500/10 text-emerald-500",

    Pending:
        "bg-amber-500/10 text-amber-500",

    Cancelled:
        "bg-red-500/10 text-red-500",
};

const OrderItem = ({
    id,
    customer,
    amount,
    status,
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

                        ${statusStyles[status]}
                    `}
                >
                    {status}
                </span>

                <p className="mt-2 text-xs text-text-secondary">
                    {date}
                </p>
            </div>
        </div>
    );
};

export default OrderItem;