import { sortOptions } from "./filtersData";

const SortFilter = () => {
    return (
        <select
            className="
                h-12
                rounded-xl
                border
                border-border
                bg-card
                px-4
                outline-none
                focus:border-primary
            "
        >
            {sortOptions.map((item) => (
                <option
                    key={item.value}
                    value={item.value}
                >
                    {item.label}
                </option>
            ))}
        </select>
    );
};

export default SortFilter;