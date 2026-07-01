import timeline from "./timeline";

const Timeline = () => {
    // <div className="relative w-[220px]">

    //     {/* Vertical Line */}
    //     <div
    //         className="
    //             absolute
    //             right-[7px]
    //             top-[16px]
    //             bottom-[16px]
    //             w-[2px]
    //             rounded-full
    //             bg-primary
    //         "
    //     />

    //     <div className="flex flex-col gap-8">

    //         {timeline.map((item, index) => (

    //             <div
    //                 key={item.id}
    //                 className="relative min-h-[60px]"
    //             >

    //                 {/* Dot */}

    //                 <div
    //                     className="
    //                         absolute
    //                         right-0
    //                         top-2
    //                         z-10
    //                     "
    //                 >

    //                     {index === 0 ? (

    //                         <div className="h-[14px] w-[14px] rounded-full bg-primary" />

    //                     ) : (

    //                         <div
    //                             className="
    //                                 flex
    //                                 h-[14px]
    //                                 w-[14px]
    //                                 items-center
    //                                 justify-center
    //                                 rounded-full
    //                                 border-2
    //                                 border-primary
    //                                 bg-[#08101F]
    //                             "
    //                         >
    //                             <div className="h-[5px] w-[5px] rounded-full bg-primary" />
    //                         </div>

    //                     )}

    //                 </div>

    //                 {/* Text */}

    //                 <div className="pr-10 text-right">

    //                     <h3
    //                         className="
    //                             text-[28px]
    //                             font-bold
    //                             leading-none
    //                             text-primary
    //                         "
    //                     >
    //                         {item.year}
    //                     </h3>

    //                     <p
    //                         className="
    //                             mt-2
    //                             text-[17px]
    //                             leading-6
    //                             text-white
    //                         "
    //                     >
    //                         {item.title}
    //                     </p>

    //                 </div>

    //             </div>

    //         ))}

    //     </div>

    // </div>
    return (
        <div className="relative w-full md:w-[220px]">

            {/* Horizontal Line (Mobile) */}
            <div
                className="
                    absolute
                    left-4
                    right-4
                    top-[7px]
                    h-[2px]
                    rounded-full
                    bg-primary
                    md:hidden
                "
            />

            {/* Vertical Line (Desktop) */}
            <div
                className="
                    hidden
                    md:block
                    absolute
                    right-[7px]
                    top-[16px]
                    bottom-[16px]
                    w-[2px]
                    rounded-full
                    bg-primary
                "
            />

            <div
                className="
                    flex
                    flex-row
                    justify-between
                    md:flex-col
                    md:gap-8
                "
            >
                {timeline.map((item, index) => (
                    <div
                        key={item.id}
                        className="
                            relative
                            flex-1
                            md:flex-none
                            md:min-h-[60px]
                        "
                    >
                        {/* Dot */}
                        <div
                            className="
                                absolute
                                left-1/2
                                -translate-x-1/2
                                top-0
                                z-10

                                md:left-auto
                                md:translate-x-0
                                md:right-0
                                md:top-2
                            "
                        >
                            {index === 0 ? (
                                <div className="h-[14px] w-[14px] rounded-full bg-primary" />
                            ) : (
                                <div
                                    className="
                                        flex
                                        h-[14px]
                                        w-[14px]
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-2
                                        border-primary
                                        bg-[#08101F]
                                    "
                                >
                                    <div className="h-[5px] w-[5px] rounded-full bg-primary" />
                                </div>
                            )}
                        </div>

                        {/* Text */}
                        <div
                            className="
                                pt-8
                                text-center

                                md:pt-0
                                md:pr-10
                                md:text-right
                            "
                        >
                            <h3
                                className="
                                    text-xl
                                    font-bold
                                    leading-none
                                    text-primary
                                    md:text-[28px]
                                "
                            >
                                {item.year}
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-5
                                    text-white
                                    md:text-[17px]
                                    md:leading-6
                                "
                            >
                                {item.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Timeline