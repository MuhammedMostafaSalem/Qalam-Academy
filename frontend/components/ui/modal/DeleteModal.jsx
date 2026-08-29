"use client";

import { useDispatch, useSelector } from "react-redux";
import { MdWarningAmber } from "react-icons/md";
import { closeModalDelete } from "@/store/slices/modalDeleteSlice";

const DeleteModal = ({ onConfirmAction }) => {
    const dispatch = useDispatch();
    const { isOpen, title, message, itemId } = useSelector((state) => state.modalDelete);

    if (!isOpen) return null;

    return (
        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-sm
        ">
            <div className="
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
                    <h2 className="text-xl font-bold text-text-primary">{title}</h2>
                    <p className="text-text-secondary mt-2">{message}</p>
                </div>

                <div className="mt-8 flex gap-3">
                    <button
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
                        إلغاء
                    </button>
                    <button
                        onClick={() => {
                            if (itemId) {
                                onConfirmAction(itemId); // تنفيذ دالة الحذف وإرسال الـ ID
                            }

                            setTimeout(() => {
                                dispatch(closeModalDelete());
                            }, 500);
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
                        تأكيد الحذف
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
