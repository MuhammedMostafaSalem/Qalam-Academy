import Image from "next/image";

const CardTable = ({ data }) => {
    return (
        <div className="flex items-center gap-4 w-[200px]">
            {
                data.image === null ?
                    null
                : (
                    <div
                        className="
                            relative
                            h-12
                            w-12
                            shrink-0
                            overflow-hidden
                            rounded-xl
                            bg-card
                        "
                    >
                        <img
                            src={data.image}
                            alt={data.name}
                            sizes="48px"
                            className=" w-auto h-auto object-cover"
                        />
                    </div>
                )
            }

            <div className="min-w-0 flex flex-col gap-2">
                <h3 className="text-[12px] md:text-md font-semibold text-text-primary">
                    {data.name}
                </h3>

                <p className="text-[10px] md:text-md line-clamp-2 leading-4 text-text-secondary">
                    {data.description}
                </p>
            </div>
        </div>
    )
}

export default CardTable
