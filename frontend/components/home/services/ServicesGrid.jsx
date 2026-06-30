import ServiceCard from "@/components/services/ServiceCard"
import services from "@/constants/services"

const ServicesGrid = () => {
    return (
        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-6
            "
        >
            {services.map((service) => (
                <ServiceCard
                    key={service.id}
                    service={service}
                />
            ))}
        </div>
    )
}

export default ServicesGrid