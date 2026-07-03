import {
    HiOutlineInformationCircle,
} from "react-icons/hi2";

const requirements = [
    "امتلاك جهاز كمبيوتر أو Laptop.",
    "لا تحتاج لأي خبرة برمجية سابقة.",
    "اتصال جيد بالإنترنت.",
    "الرغبة في التعلم والتطبيق العملي.",
];

const Requirements = () => {
    return (
        <section className="mt-14">
            <h2 className="text-2xl font-bold">
                متطلبات الكورس
            </h2>

            <div
                className="
                    mt-8
                    rounded-3xl
                    border
                    border-border
                    bg-card
                    p-8
                "
            >
                <ul className="space-y-5">
                    {requirements.map((item) => (
                        <li
                            key={item}
                            className="
                                flex
                                items-start
                                gap-3
                            "
                        >
                            <HiOutlineInformationCircle
                                className="
                                    mt-1
                                    text-primary
                                "
                                size={22}
                            />

                            <span className="text-text-secondary">
                                {item}
                            </span>

                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Requirements;