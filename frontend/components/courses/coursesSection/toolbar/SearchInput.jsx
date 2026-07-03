import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchInput = () => {
    return (
        <div className="relative w-full lg:w-[250px]">
            <HiOutlineMagnifyingGlass
                className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-xl
                    text-text-secondary
                "
            />

            <input
                type="text"
                placeholder="ابحث عن دورة..."
                className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-border
                    bg-background-alt
                    pr-14
                    pl-5
                    text-text-primary
                    outline-none
                    transition-all
                    duration-300

                    placeholder:text-text-muted

                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                "
            />
        </div>
    );
};

export default SearchInput;