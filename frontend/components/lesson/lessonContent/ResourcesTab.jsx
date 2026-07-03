import {
    HiArrowDownTray,
    HiDocumentText,
} from "react-icons/hi2";

const resources = [
    {
        id: 1,
        title: "Slides.pdf",
        size: "2.4 MB",
    },
    {
        id: 2,
        title: "Starter Code.zip",
        size: "4.8 MB",
    },
    {
        id: 3,
        title: "Exercise Files.zip",
        size: "6.2 MB",
    },
];

const ResourcesTab = () => {
    return (
        <div>
            <h2 className="mb-6 text-xl font-bold">
                ملفات الدرس
            </h2>

            <div className="space-y-4">
                {resources.map((file) => (
                    <div
                        key={file.id}
                        className="
                            flex
                            items-center
                            justify-between
                            rounded-2xl
                            border
                            border-border
                            p-5
                        "
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="
                                    rounded-xl
                                    bg-primary/10
                                    p-3
                                    text-primary
                                "
                            >
                                <HiDocumentText size={22} />
                            </div>

                            <div>
                                <h3 className="font-medium">
                                    {file.title}
                                </h3>

                                <p className="text-sm text-text-secondary">
                                    {file.size}
                                </p>
                            </div>
                        </div>

                        <button
                            className="
                                rounded-xl
                                bg-primary
                                p-3
                                text-white
                                transition
                                hover:scale-105
                            "
                        >
                            <HiArrowDownTray size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesTab;