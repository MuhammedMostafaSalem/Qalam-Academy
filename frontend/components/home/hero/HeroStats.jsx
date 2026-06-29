const HeroStats = () => {
    const stats = [
        {
            id: 1,
            value: "500+",
            label: "الطلاب",
        },
        {
            id: 2,
            value: "50+",
            label: "الكورسات",
        },
        {
            id: 3,
            value: "15+",
            label: "الخبراء",
        },
    ];

    return (
        <div className="mt-14 flex flex-wrap gap-10">

            {stats.map((item) => (
                <div key={item.id}>

                    <h3 className="text-3xl font-bold text-primary">
                        {item.value}
                    </h3>

                    <p className="mt-2 text-text-secondary">
                        {item.label}
                    </p>

                </div>
            ))}

        </div>
    )
}

export default HeroStats