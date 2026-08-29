"use client";

import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { createTeamMemberAction } from "@/actions/teamActions";
import { getUsersAction } from "@/actions/userActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const AddTeamModal = ({ isOpen, onClose, onSuccess }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const [user, setUser] = useState("");
    const [position, setPosition] = useState("");
    const [isActive, setIsActive] = useState(true);

    const [users, setUsers] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const { successMessage, errorMessage } = useToast();

    useEffect(() => {
        if (isOpen && users.length === 0) {
            const fetchUsers = async () => {
                const res = await getUsersAction("limit=100");
                if (res.success) {
                    const list = res.data?.users || res.data?.documents || res.data || [];
                    setUsers(list);
                }
            };
            fetchUsers();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.append("user", user);
        formData.append("position", position);
        formData.append("isActive", isActive);

        const result = await createTeamMemberAction(null, formData);
        
        setIsPending(false);

        if (result.success) {
            successMessage(result.message || (isEn ? "Team member added successfully" : "تم إضافة العضو بنجاح"));
            setUser("");
            setPosition("");
            setIsActive(true);
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("team-updated"));
            }
            onSuccess();
        } else {
            errorMessage(result.message || (isEn ? "Failed to add team member" : "فشل إضافة العضو"));
        }
    };

    return (
        <div onClick={onClose} className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-black/60 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button type="button" onClick={onClose} className="absolute rtl:left-6 rtl:right-auto ltr:right-6 ltr:left-auto top-6 text-text-secondary hover:text-text-primary transition p-1 rounded-xl hover:bg-background">
                    <HiXMark size={24} />
                </button>
                <h2 className="text-xl font-bold mb-6 text-text-primary">
                    {isEn ? "Add Team Member" : "إضافة عضو فريق"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            {isEn ? "User" : "المستخدم"}
                        </label>
                        <select value={user} onChange={(e) => setUser(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary">
                            <option value="" disabled>{isEn ? "Select User" : "اختر المستخدم"}</option>
                            {users.map(u => (
                                <option key={u._id} value={u._id}>
                                    {u.firstName} {u.lastName} ({u.email})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            {isEn ? "Position / Job Title" : "المنصب"}
                        </label>
                        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 cursor-pointer" />
                        <label htmlFor="isActive" className="text-sm cursor-pointer select-none">
                            {isEn ? "Active" : "نشط"}
                        </label>
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                        <button type="button" onClick={onClose} disabled={isPending} className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-background transition font-medium">
                            {isEn ? "Cancel" : "إلغاء"}
                        </button>
                        <button type="submit" disabled={isPending} className="gradient-button px-6 py-2.5 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20">
                            {isPending ? (isEn ? "Adding..." : "جاري الإضافة...") : (isEn ? "Add Member" : "إضافة العضو")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTeamModal;
