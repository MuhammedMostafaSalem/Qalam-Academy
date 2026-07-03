import { fadeUp } from '@/lib/animationHelpers';
import { animations } from '@/lib/animations'

const HeroPartners = () => {
    const partners = [
        {
            id: 1,
            name: "SaaSMax",
        },
        {
            id: 2,
            name: "Uideck",
        },
        {
            id: 3,
            name: "Layers",
        },
        {
            id: 4,
            name: "Circle",
        },
        {
            id: 5,
            name: "Catalog",
        },
        {
            id: 6,
            name: "Luminous",
        },
    ];

    return (
        <div
            className="
                mt-[60px]
            "
        >
            <div className="px-8 pb-8">
                <div className="mb-8 flex items-center">
                    <div className="h-px flex-1 bg-white/10" />

                    <span
                        className="
                            px-4
                            text-sm
                            font-medium
                            text-white/60
                            whitespace-nowrap
                        "
                    >
                        نثق برفقة عملائنا
                    </span>

                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <div
                    className="
                        grid
                        grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-6
                        gap-8
                    "
                >
                    {partners.map((partner) => (
                        <div
                            {...fadeUp(partner.id * 80)}
                            key={partner.id}
                            className={`
                                flex
                                justify-center
                                text-lg
                                font-semibold
                                text-white/50

                                ${animations.transition}
                                hover:text-primary
                                hover:scale-110
                            `}
                        >
                            {partner.name}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default HeroPartners