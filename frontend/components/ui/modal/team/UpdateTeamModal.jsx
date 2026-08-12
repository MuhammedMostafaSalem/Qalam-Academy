"use client";

import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { updateTeamMemberAction } from "@/actions/teamActions";
import useToast from "@/hooks/useToast";

const UpdateTeamModal = ({ isOpen, onClose, teamMember, onSuccess }) => {
    const [position, setPosition] = useState("");
    const [isActive, setIsActive] = useState(true);

    const [isPending, setIsPending] = useState(false);
    const { successMessage, errorMessage } = useToast();

    useEffect(() => {
        if (teamMember) {
            setPosition(teamMember.position || "");
            setIsActive(teamMember.isActive !== false);
        }
    }, [teamMember]);

    if (!isOpen || !teamMember) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const updateData = {
            position,
            isActive
        };

        const result = await updateTeamMemberAction(teamMember._id, updateData);
        
        setIsPending(false);

        if (result.success) {
            successMessage(result.message);
            onSuccess();
        } else {
            errorMessage(result.message);
        }
    };

    return (
        <div onClick={onClose} className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-black/60 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button type="button" onClick={onClose} className="absolute left-6 top-6 text-text-secondary hover:text-text-primary transition p-1 rounded-xl hover:bg-background">
                    <HiXMark size={24} />
                </button>
                <h2 className="text-xl font-bold mb-6 text-text-primary">تعديل عضو الفريق</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">المستخدم</label>
                        <input type="text" value={teamMember.user?.firstName + " " + teamMember.user?.lastName} disabled className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none border-border opacity-60" />
                    </div>
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">المنصب</label>
                        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="isActiveUpdate" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 cursor-pointer" />
                        <label htmlFor="isActiveUpdate" className="text-sm cursor-pointer select-none">نشط</label>
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                        <button type="button" onClick={onClose} disabled={isPending} className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-background transition font-medium">إلغاء</button>
                        <button type="submit" disabled={isPending} className="gradient-button px-6 py-2.5 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20">{isPending ? "جاري الحفظ..." : "حفظ التعديلات"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTeamModal;
