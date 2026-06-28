import { HiOutlineBars3 } from "react-icons/hi2";

const MobileMenu = () => {
    return (
        <button
            className="rounded-button p-2 lg:hidden"
            aria-label="Open menu"
        >
            <HiOutlineBars3 size={28} />
        </button>
    )
}

export default MobileMenu