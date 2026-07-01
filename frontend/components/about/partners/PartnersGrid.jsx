import PartnerCard from "./PartnerCard"
import partners from "./partners"

const PartnersGrid = () => {
    return (
        <div
            className="
                grid
                grid-cols-2
                gap-6
                sm:grid-cols-3
                lg:grid-cols-5
            "
        >
            {partners.map((partner) => (
                <PartnerCard
                    key={partner.id}
                    partner={partner}
                />
            ))}
        </div>
    )
}

export default PartnersGrid