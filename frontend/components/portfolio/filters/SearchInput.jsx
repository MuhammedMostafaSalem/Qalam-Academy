import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchInput = () => {
    return (
        <div className="relative w-full">

            <HiOutlineMagnifyingGlass
                className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-text-secondary
                "
                size={20}
            />

            <input
                type="text"
                placeholder="ابحث عن مشروع..."
                className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-border
                    bg-card
                    pr-12
                    pl-4
                    outline-none
                    transition
                    focus:border-primary
                "
            />

        </div>
    );
};

export default SearchInput;