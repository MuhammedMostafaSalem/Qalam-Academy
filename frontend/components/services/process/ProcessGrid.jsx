import { fadeUp } from "@/lib/animationHelpers"
import process from "./process"
import ProcessCard from "./ProcessCard"

const ProcessGrid = ({items}) => {
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
                    flex
                    flex-wrap
                    justify-center
                    gap-12
                    lg:gap-8
                "
            >
                {
                    items?.isActive === true ?
                        items?.items.map((step, index) => (
                            <ProcessCard
                                key={index}
                                index={index}
                                step={step}
                                isActive={items?.isActive}
                            />
                        ))
                    : process.map((step, index) => (
                        <ProcessCard
                            key={index}
                            index={index}
                            step={step}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default ProcessGrid