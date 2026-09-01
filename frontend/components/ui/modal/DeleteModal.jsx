"use client";

import { useDispatch, useSelector } from "react-redux";
import { MdWarningAmber } from "react-icons/md";
import { closeModalDelete } from "@/store/slices/modalDeleteSlice";
import { useLanguage } from "@/providers/LanguageProvider";

const DeleteModal = ({ onConfirmAction }) => {
    const dispatch = useDispatch();
    const { language } = useLanguage();
    const { isOpen, title, message, itemId, confirmLabel } = useSelector((state) => state.modalDelete);
    const isEn = language === "en";

    if (!isOpen) return null;

    return (
        <div
            role="presentation"
            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-sm
        ">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
                className="
                w-[400px]
                rounded-3xl
                bg-card
                border
                border-border
                p-6
                shadow-2xl
                animate-in
                fade-in
                zoom-in
                duration-200
            ">
                <div className="flex flex-col items-center text-center">
                    <MdWarningAmber className="text-5xl text-error mb-4" />
                    <h2 id="delete-modal-title" className="text-xl font-bold text-text-primary">{title}</h2>
                    <p className="text-text-secondary mt-2">{message}</p>
                </div>

                <div className="mt-8 flex gap-3">
                    <button
                        type="button"
                        onClick={() => dispatch(closeModalDelete())}
                        className="
                            flex-1
                            rounded-xl
                            py-3
                            text-sm
                            border
                            border-border
                            hover:bg-card-hover
                            transition
                        "
                    >
                        {isEn ? "Cancel" : "إلغاء"}
                    </button>
                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                if (itemId) {
                                    await onConfirmAction(itemId);
                                }
                            } finally {
                                dispatch(closeModalDelete());
                            }
                        }}
                        className="
                            flex-1
                            rounded-xl
                            py-3
                            text-sm
                            bg-error
                            text-white
                            hover:opacity-90
                            transition
                        "
                    >
                        {confirmLabel || (isEn ? "Confirm Delete" : "تأكيد الحذف")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
