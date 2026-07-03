import { fadeUp } from "@/lib/animationHelpers"
import process from "./process"
import ProcessCard from "./ProcessCard"
const ProcessGrid = () => {
    return (
        <div {...fadeUp()} className="relative">

            {/* Connection Line (Desktop) */}

            <div
                className="
                    absolute
                    left-0
                    right-0
                    top-10
                    hidden
                    h-0.5
                    bg-border
                    lg:block
                "
            />

            <div
                className="
                    relative
                    grid
                    gap-12
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-4
                    lg:gap-8
                "
            >
                {process.map((step, index) => (
                    <ProcessCard
                        key={index}
                        index={index}
                        step={step}
                    />
                ))}
            </div>

        </div>
    )
}

export default ProcessGrid