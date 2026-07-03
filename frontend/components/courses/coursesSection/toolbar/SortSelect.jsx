import { HiChevronDown } from "react-icons/hi2";

const SortSelect = () => {
    return (
        <div className="relative">
            <select
                className="
                    h-14
                    min-w-[190px]
                    appearance-none
                    rounded-2xl
                    border
                    border-border
                    bg-background-alt
                    px-5
                    text-text-primary
                    outline-none
                    transition-all
                    duration-300

                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                "
            >
                <option>ترتيب حسب</option>
                <option>الأحدث</option>
                <option>الأعلى تقييماً</option>
                <option>السعر الأقل</option>
                <option>السعر الأعلى</option>
            </select>

            <HiChevronDown
                className="
                    pointer-events-none
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-text-secondary
                "
            />
        </div>
    );
};

export default SortSelect;