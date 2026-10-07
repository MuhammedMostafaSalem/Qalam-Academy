import { fadeUp } from "@/lib/animationHelpers"
import ValueCard from "./ValueCard"
import values from "./values"

const ValuesGrid = ({items}) => {
    return (
        <div
            {...fadeUp()}
            className="
                grid
                gap-6
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-6
            "
        >
            {
                items?.isActive === true ?
                    items?.items.map((value, index) => (
                        <ValueCard
                            key={index}
                            index={index}
                            value={value}
                        />
                    ))
                : values.map((value, index) => (
                    <ValueCard
                        key={index}
                        index={index}
                        value={value}
                    />
                ))
            }
        </div>
    )
}

export default ValuesGrid