import { fadeUp } from "@/lib/animationHelpers"
import PartnerCard from "./PartnerCard"
import partners from "./partners"

const PartnersGrid = () => {
    return (
        <div
            {...fadeUp()}
            className="
                grid
                grid-cols-2
                gap-6
                sm:grid-cols-3
                lg:grid-cols-5
            "
        >
            {partners.map((partner, index) => (
                <PartnerCard
                    key={index}
                    index={index}
                    partner={partner}
                />
            ))}
        </div>
    )
}

export default PartnersGrid