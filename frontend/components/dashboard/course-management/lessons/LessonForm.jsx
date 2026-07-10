"use client";

import Section from "@/components/sections/Section";
import {
    HiOutlineVideoCamera,
    HiOutlineDocumentText,
    HiOutlineCloudArrowUp,
} from "react-icons/hi2";


const LessonForm = ({
    mode = "create",
    lesson,
}) => {
    return (
        <Section
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
            "
        >
            {/* Header */}
            <div className="mb-8">
                <h2
                    className="
                        text-xl
                        font-bold
                    "
                >
                    {
                        mode === "create"
                            ?
                            "إضافة درس جديد"
                            :
                            "تعديل الدرس"
                    }
                </h2>
                <p
                    className="
                        mt-2
                        text-text-secondary
                    "
                >
                    إدارة محتوى الدرس وإعداداته.
                </p>
            </div>

            <form
                className="
                    space-y-6
                "
            >
                {/* Title */}
                <div>
                    <label
                        className="
                            mb-2
                            block
                            font-medium
                        "
                    >
                        عنوان الدرس
                    </label>
                    <input
                        defaultValue={lesson?.title}
                        placeholder="مثال: Introduction to React"
                        className="
                            input-style
                        "
                    />
                </div>

                {/* Description */}
                <div>
                    <label
                        className="
                            mb-2
                            block
                            font-medium
                        "
                    >
                        وصف الدرس
                    </label>
                    <textarea
                        rows={5}
                        defaultValue={lesson?.description}
                        placeholder="اكتب وصف مختصر للدرس..."
                        className="
                            input-style
                            resize-none
                        "
                    />
                </div>

                {/* Type + Duration */}
                <div
                    className="
                        grid
                        gap-6

                        md:grid-cols-2
                    "
                >
                    {/* Type */}
                    <div>
                        <label
                            className="
                                mb-2
                                block
                                font-medium
                            "
                        >
                            نوع المحتوى
                        </label>
                        <select
                            className="
                                input-style
                            "
                        >
                            <option>
                                Video
                            </option>

                            <option>
                                PDF
                            </option>

                            <option>
                                Text
                            </option>
                        </select>
                    </div>

                    {/* Duration */}
                    <div>
                        <label
                            className="
                                mb-2
                                block
                                font-medium
                            "
                        >
                            مدة الدرس
                        </label>
                        <input
                            defaultValue={lesson?.duration}
                            placeholder="مثال: 20:30"
                            className="
                                input-style
                            "
                        />
                    </div>
                </div>

                {/* Video */}
                <div>
                    <label
                        className="
                            mb-2
                            flex
                            items-center
                            gap-2

                            font-medium
                        "
                    >

                        <HiOutlineVideoCamera />

                        رابط الفيديو

                    </label>
                    <input
                        defaultValue={lesson?.videoUrl}
                        placeholder="https://youtube.com/..."
                        className="
                            input-style
                        "
                    />
                </div>

                {/* Upload */}
                <div>
                    <label
                        className="
                            mb-2
                            flex
                            items-center
                            gap-2

                            font-medium
                        "
                    >

                        <HiOutlineCloudArrowUp />

                        ملف الدرس

                    </label>
                    <input
                        type="file"
                        className="
                            input-style
                        "
                    />
                </div>

                {/* Settings */}
                <div
                    className="
                        grid
                        gap-6

                        md:grid-cols-2
                    "
                >
                    {/* Status */}
                    <div>
                        <label
                            className="
                                mb-2
                                block
                                font-medium
                            "
                        >
                            الحالة
                        </label>
                        <select
                            className="
                                input-style
                            "
                        >
                            <option>
                                Published
                            </option>
                            <option>
                                Draft
                            </option>
                        </select>
                    </div>

                    {/* Free */}
                    <div
                        className="
                            flex
                            items-center
                            gap-3

                            mt-8
                        "
                    >
                        <input
                            type="checkbox"
                            className="
                                h-5
                                w-5
                            "
                        />
                        <span>
                            درس مجاني
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div
                    className="
                        flex
                        justify-end
                        gap-3
                    "
                >
                    <button
                        type="button"
                        className="
                            rounded-2xl
                            border
                            border-border

                            px-6
                            py-3

                            hover:bg-background-alt
                        "
                    >
                        إلغاء
                    </button>

                    <button
                        className="
                            rounded-2xl

                            bg-primary

                            px-6
                            py-3

                            text-white

                            hover:opacity-90
                        "
                    >
                        {
                            mode === "create"
                                ?
                                "حفظ الدرس"
                                :
                                "تحديث الدرس"
                        }
                    </button>
                </div>
            </form>
        </Section>
    );
};


export default LessonForm;