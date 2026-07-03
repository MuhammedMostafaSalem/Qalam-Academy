"use client";

import { useState } from "react";

const NotesTab = () => {
    const [notes, setNotes] = useState("");

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold">
                    ملاحظاتك
                </h2>

                <p className="mt-2 text-text-secondary">
                    يمكنك كتابة ملاحظاتك أثناء مشاهدة الدرس.
                </p>
            </div>

            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="اكتب ملاحظاتك هنا..."
                className="
                    h-72
                    w-full
                    rounded-2xl
                    border
                    border-border
                    bg-background
                    p-5
                    outline-none
                    focus:border-primary
                "
            />

            <button
                className="
                    rounded-xl
                    bg-primary
                    px-6
                    py-3
                    text-white
                "
            >
                حفظ الملاحظات
            </button>
        </div>
    );
};

export default NotesTab;