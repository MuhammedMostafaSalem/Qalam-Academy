import {
    HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

const questions = [
    {
        id: 1,
        user: "محمد",
        question: "هل يمكن استخدام useState داخل Loop؟",
    },
    {
        id: 2,
        user: "سارة",
        question: "ما الفرق بين State و Props؟",
    },
];

const QATab = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold">
                    الأسئلة والمناقشات
                </h2>

                <p className="mt-2 text-text-secondary">
                    اطرح سؤالك أو تصفح أسئلة الطلاب الآخرين.
                </p>
            </div>

            <textarea
                placeholder="اكتب سؤالك..."
                className="
                    h-32
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
                إرسال السؤال
            </button>

            <div className="space-y-5">
                {questions.map((question) => (
                    <div
                        key={question.id}
                        className="
                            rounded-2xl
                            border
                            border-border
                            p-5
                        "
                    >
                        <div className="flex items-center gap-3">
                            <HiOutlineChatBubbleLeftRight
                                className="text-primary"
                                size={22}
                            />

                            <h3 className="font-semibold">
                                {question.user}
                            </h3>
                        </div>

                        <p className="mt-4 leading-7 text-text-secondary">
                            {question.question}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QATab;