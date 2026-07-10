const CourseInfoForm = () => {
    return (
        <form
            className="
                grid
                gap-6
            "
        >
            {/* اسم الكورس */}

            <div>
                <label className="mb-2 block font-medium">
                    اسم الكورس
                </label>

                <input
                    type="text"
                    defaultValue="Frontend Development"
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-border
                        bg-background
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-primary
                    "
                />
            </div>

            {/* الوصف */}

            <div>
                <label className="mb-2 block font-medium">
                    وصف الكورس
                </label>

                <textarea
                    rows={6}
                    defaultValue="تعلم تطوير واجهات المواقع باستخدام HTML و CSS و JavaScript و React و Next.js."
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-border
                        bg-background
                        px-4
                        py-3
                        outline-none
                        resize-none
                        transition
                        focus:border-primary
                    "
                />
            </div>

            {/* السعر */}

            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                "
            >
                <div>
                    <label className="mb-2 block font-medium">
                        السعر
                    </label>

                    <input
                        type="number"
                        defaultValue={799}
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-border
                            bg-background
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-primary
                        "
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        السعر قبل الخصم
                    </label>

                    <input
                        type="number"
                        defaultValue={999}
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-border
                            bg-background
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-primary
                        "
                    />
                </div>
            </div>

            {/* التصنيف والمستوى */}

            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                "
            >
                <div>
                    <label className="mb-2 block font-medium">
                        التصنيف
                    </label>

                    <select
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-border
                            bg-background
                            px-4
                            py-3
                            outline-none
                        "
                    >
                        <option>Frontend</option>
                        <option>Backend</option>
                        <option>Flutter</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        المستوى
                    </label>

                    <select
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-border
                            bg-background
                            px-4
                            py-3
                            outline-none
                        "
                    >
                        <option>مبتدئ</option>
                        <option>متوسط</option>
                        <option>متقدم</option>
                    </select>
                </div>
            </div>

            {/* اللغة والمدة */}

            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                "
            >
                <div>
                    <label className="mb-2 block font-medium">
                        اللغة
                    </label>

                    <input
                        defaultValue="العربية"
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-border
                            bg-background
                            px-4
                            py-3
                            outline-none
                        "
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        مدة الكورس
                    </label>

                    <input
                        defaultValue="28 ساعة"
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-border
                            bg-background
                            px-4
                            py-3
                            outline-none
                        "
                    />
                </div>
            </div>

            {/* الصورة */}

            <div>
                <label className="mb-2 block font-medium">
                    صورة الكورس
                </label>

                <input
                    type="file"
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-border
                        bg-background
                        px-4
                        py-3
                    "
                />
            </div>

            {/* فيديو المعاينة */}

            <div>
                <label className="mb-2 block font-medium">
                    رابط فيديو المعاينة
                </label>

                <input
                    defaultValue="https://youtube.com/..."
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-border
                        bg-background
                        px-4
                        py-3
                        outline-none
                    "
                />
            </div>

            {/* النشر */}

            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >
                <input
                    type="checkbox"
                    defaultChecked
                />

                <span>
                    نشر الكورس
                </span>
            </div>

            {/* زر الحفظ */}

            <div className="flex justify-end">
                <button
                    className="
                        rounded-2xl
                        bg-primary
                        px-6
                        py-3
                        text-white
                        transition
                        hover:opacity-90
                    "
                >
                    حفظ التعديلات
                </button>
            </div>
        </form>
    );
};

export default CourseInfoForm;