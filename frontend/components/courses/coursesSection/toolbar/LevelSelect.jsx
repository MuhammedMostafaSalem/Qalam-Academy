import { HiChevronDown } from "react-icons/hi2";

const LevelSelect = () => {
    return (
        <div className="relative">
            <select
                className="
                    h-14
                    w-full
                    md:w-[170px]
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
                <option>المستوى</option>
                <option>مبتدئ</option>
                <option>متوسط</option>
                <option>متقدم</option>
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

export default LevelSelect;