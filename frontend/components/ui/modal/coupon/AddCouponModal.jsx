"use client";

import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { createCouponAction } from "@/actions/couponActions";
import useToast from "@/hooks/useToast";

const AddCouponModal = ({ isOpen, onClose, onSuccess }) => {
    const [name, setName] = useState("");
    const [discount, setDiscount] = useState("");
    const [expire, setExpire] = useState("");
    const [isPending, setIsPending] = useState(false);
    const { successMessage, errorMessage } = useToast();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("discount", discount);
        formData.append("expire", expire);

        const result = await createCouponAction(null, formData);
        
        setIsPending(false);

        if (result.success) {
            successMessage(result.message);
            setName("");
            setDiscount("");
            setExpire("");
            onSuccess();
        } else {
            errorMessage(result.message);
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-black/60 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200"
            >
                {/* Close */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute left-6 top-6 text-text-secondary hover:text-text-primary transition p-1 rounded-xl hover:bg-background"
                >
                    <HiXMark size={24} />
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold mb-6 text-text-primary">
                    إضافة كوبون جديد
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            اسم الكوبون
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="مثال: WELCOME10"
                            className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary uppercase"
                        />
                    </div>

                    {/* Discount */}
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            نسبة الخصم (%)
                        </label>
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            required
                            min="1"
                            max="100"
                            placeholder="مثال: 15"
                            className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary"
                        />
                    </div>

                    {/* Expire Date */}
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            تاريخ الانتهاء
                        </label>
                        <input
                            type="date"
                            value={expire}
                            onChange={(e) => setExpire(e.target.value)}
                            required
                            className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-background transition font-medium"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="gradient-button px-6 py-2.5 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20"
                        >
                            {isPending ? "جاري الإضافة..." : "إضافة الكوبون"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCouponModal;
