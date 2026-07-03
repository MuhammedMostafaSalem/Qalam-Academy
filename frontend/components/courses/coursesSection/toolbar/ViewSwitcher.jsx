import { HiOutlineSquares2X2, HiOutlineBars3 } from "react-icons/hi2";

const ViewSwitcher = ({ view, toggleSwitcher }) => {
    return (
        <div
            className="
                hidden
                md:flex
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-background-alt
            "
        >
            <button
                type="button"
                onClick={() => toggleSwitcher("grid")}
                className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    transition-all
                    duration-300

                    ${view === "grid"
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-primary"
                    }
                `}
            >
                <HiOutlineSquares2X2 size={22} />
            </button>

            <button
                type="button"
                onClick={() => toggleSwitcher("list")}
                className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    transition-all
                    duration-300

                    ${view === "list"
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-primary"
                    }
                `}
            >
                <HiOutlineBars3 size={22} />
            </button>
        </div>
    );
};

export default ViewSwitcher;