import {
    HiArrowDownTray,
    HiDocumentText,
    HiOutlineFolderOpen,
} from "react-icons/hi2";

const ResourcesTab = ({ lesson }) => {
    const attachment = lesson?.attachment;
    const attachmentUrl = attachment?.startsWith("http")
        ? attachment
        : attachment
            ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}${attachment}`
            : null;

    return (
        <div>
            <h2 className="mb-6 text-xl font-bold">
                ملفات الدرس
            </h2>

            {attachmentUrl ? (
                <div className="space-y-4">
                    <div
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
                                    مرفق الدرس (PDF)
                                </h3>

                                <p className="text-sm text-text-secondary">
                                    ملف مرفق
                                </p>
                            </div>
                        </div>

                        <a
                            href={attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="
                                rounded-xl
                                bg-primary
                                p-3
                                text-white
                                transition
                                hover:scale-105
                                inline-flex
                                items-center
                                justify-center
                            "
                        >
                            <HiArrowDownTray size={20} />
                        </a>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background border border-border text-text-secondary mb-4">
                        <HiOutlineFolderOpen size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                        لا توجد مرفقات
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                        لا توجد ملفات أو مرفقات مضافة لهذا الدرس.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ResourcesTab;