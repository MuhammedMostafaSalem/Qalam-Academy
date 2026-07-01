import ValueCard from "./ValueCard"
import values from "./values"

const ValuesGrid = () => {
    return (
        <div
            className="
                grid
                gap-6
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-6
            "
        >
            {values.map((value) => (
                <ValueCard
                    key={value.id}
                    value={value}
                />
            ))}
        </div>
    )
}

export default ValuesGrid