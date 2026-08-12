"use client";

import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { createPortfolioAction } from "@/actions/portfolioActions";
import { getCategoriesAction } from "@/actions/categoryActions";
import useToast from "@/hooks/useToast";

const AddPortfolioModal = ({ isOpen, onClose, onSuccess }) => {
    const [titleAr, setTitleAr] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [descriptionAr, setDescriptionAr] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [category, setCategory] = useState("");
    const [projectUrl, setProjectUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState(null);

    const [categories, setCategories] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const { successMessage, errorMessage } = useToast();

    useEffect(() => {
        if (isOpen && categories.length === 0) {
            const fetchCategories = async () => {
                const res = await getCategoriesAction("limit=100");
                if (res.success) {
                    const list = res.data?.categories || res.data?.documents || res.data || [];
                    setCategories(list);
                }
            };
            fetchCategories();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.append("titleAr", titleAr);
        formData.append("titleEn", titleEn);
        formData.append("descriptionAr", descriptionAr);
        formData.append("descriptionEn", descriptionEn);
        formData.append("category", category);
        if (projectUrl) formData.append("projectUrl", projectUrl);
        if (githubUrl) formData.append("githubUrl", githubUrl);
        if (tags) formData.append("tags", tags);
        if (image) formData.append("image", image);

        const result = await createPortfolioAction(null, formData);
        
        setIsPending(false);

        if (result.success) {
            successMessage(result.message);
            setTitleAr("");
            setTitleEn("");
            setDescriptionAr("");
            setDescriptionEn("");
            setCategory("");
            setProjectUrl("");
            setGithubUrl("");
            setTags("");
            setImage(null);
            onSuccess();
        } else {
            errorMessage(result.message);
        }
    };

    return (
        <div onClick={onClose} className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-black/60 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button type="button" onClick={onClose} className="absolute left-6 top-6 text-text-secondary hover:text-text-primary transition p-1 rounded-xl hover:bg-background">
                    <HiXMark size={24} />
                </button>
                <h2 className="text-xl font-bold mb-6 text-text-primary">إضافة مشروع جديد</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">العنوان بالعربية</label>
                            <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">العنوان بالإنجليزية</label>
                            <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">الوصف بالعربية</label>
                            <textarea value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} required rows={3} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">الوصف بالإنجليزية</label>
                            <textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} required rows={3} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">التصنيف</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary">
                                <option value="" disabled>اختر التصنيف</option>
                                {categories.map(c => <option key={c._id} value={c._id}>{c.title?.ar || c.title}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">صورة المشروع (اختياري)</label>
                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white cursor-pointer" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">رابط المشروع (اختياري)</label>
                            <input type="url" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary text-left" dir="ltr" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">رابط جيت هب (اختياري)</label>
                            <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary text-left" dir="ltr" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">العلامات (Tags) - افصل بينها بفاصلة</label>
                        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="مثال: React, Node.js, Design" className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                        <button type="button" onClick={onClose} disabled={isPending} className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-background transition font-medium">إلغاء</button>
                        <button type="submit" disabled={isPending} className="gradient-button px-6 py-2.5 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20">{isPending ? "جاري الإضافة..." : "إضافة المشروع"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPortfolioModal;
