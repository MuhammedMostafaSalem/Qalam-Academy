import { FiInbox } from "react-icons/fi";

const EmptyState = ({
    title = "No Data",
    description = "Nothing to display.",
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <FiInbox
                size={60}
                className="text-primary"
            />

            <h3 className="mt-6 text-2xl font-bold">
                {title}
            </h3>

            <p className="mt-3 max-w-md text-text-secondary">
                {description}
            </p>
        </div>
    )
}

export default EmptyState