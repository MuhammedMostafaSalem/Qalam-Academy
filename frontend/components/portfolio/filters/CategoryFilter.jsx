import { categories } from "./filtersData";

const CategoryFilter = () => {
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
            {categories.map((category) => (
                <option
                    key={category}
                    value={category}
                >
                    {category}
                </option>
            ))}
        </select>
    );
};

export default CategoryFilter;