import {
    HiOutlinePlus,
} from "react-icons/hi2";
import Section from "../sections/Section";
import Link from "next/link";

const PageHeader = ({
    title,
    description,
    button,
    buttonHref,
    onButtonClick
}) => {
    return (
        <Section>
            {/* Top */}
            <div
                className="
                    flex
                    flex-col
                    sm:flex-row
                    justify-start
                    sm:justify-between
                    gap-6
                "
            >
                {/* Left */}
                <div>
                    {/* Title */}
                    <h1 className="text-md md:text-lg lg:text-xl font-bold">
                        {title}
                    </h1>

                    {/* Description */}
                    <p
                        className="
                            max-w-2xl
                            leading-6
                            text-sm
                            text-text-secondary
                        "
                    >
                        {description}
                    </p>
                </div>

                {/* Right */}
                {
                    button && buttonHref ? (
                        <Link
                            href={buttonHref}
                            className="
                                gradient-button
                                flex
                                items-center
                                gap-2
                                rounded-2xl
                                px-6
                                py-3
                            "
                        >
                            <HiOutlinePlus size={20} />
                            {button}
                        </Link>
                    ) : button ? (
                        <button
                            type="button"
                            onClick={onButtonClick}
                            className="
                                gradient-button
                                flex
                                items-center
                                gap-2
                                rounded-2xl
                                px-6
                                py-3
                            "
                        >
                            <HiOutlinePlus size={20} />
                            {button}
                        </button>
                    ) : null
                }
            </div>
        </Section>
    );
};

export default PageHeader;