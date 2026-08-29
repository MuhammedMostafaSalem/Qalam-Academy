"use client";

import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { createBlogAction } from "@/actions/blogActions";
import { getCategoriesAction } from "@/actions/categoryActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const AddBlogModal = ({ isOpen, onClose, onSuccess }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const [titleAr, setTitleAr] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [excerptAr, setExcerptAr] = useState("");
    const [excerptEn, setExcerptEn] = useState("");
    const [contentAr, setContentAr] = useState("");
    const [contentEn, setContentEn] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [isPublished, setIsPublished] = useState(true);
    const [featuredImage, setFeaturedImage] = useState(null);

    const [categories, setCategories] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const { successMessage, errorMessage } = useToast();

    useEffect(() => {
        if (isOpen && categories.length === 0) {
            const fetchCategories = async () => {
                const res = await getCategoriesAction("type=blog&limit=100");
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
        formData.append("excerptAr", excerptAr);
        formData.append("excerptEn", excerptEn);
        formData.append("contentAr", contentAr);
        formData.append("contentEn", contentEn);
        formData.append("category", category);
        if (tags) formData.append("tags", tags);
        formData.append("isPublished", isPublished);
        if (featuredImage) formData.append("featuredImage", featuredImage);

        const result = await createBlogAction(null, formData);
        
        setIsPending(false);

        if (result.success) {
            successMessage(result.message || (isEn ? "Article created successfully" : "تم إنشاء المقال بنجاح"));
            setTitleAr("");
            setTitleEn("");
            setExcerptAr("");
            setExcerptEn("");
            setContentAr("");
            setContentEn("");
            setCategory("");
            setTags("");
            setIsPublished(true);
            setFeaturedImage(null);
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("blog-updated"));
            }
            onSuccess();
        } else {
            errorMessage(result.message || (isEn ? "Failed to create article" : "فشل إنشاء المقال"));
        }
    };

    return (
        <div onClick={onClose} className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-black/60 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button type="button" onClick={onClose} className="absolute rtl:left-6 rtl:right-auto ltr:right-6 ltr:left-auto top-6 text-text-secondary hover:text-text-primary transition p-1 rounded-xl hover:bg-background">
                    <HiXMark size={24} />
                </button>
                <h2 className="text-xl font-bold mb-6 text-text-primary">
                    {isEn ? "Add New Article" : "إضافة مقال جديد"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Title (Arabic)" : "العنوان بالعربية"}
                            </label>
                            <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Title (English)" : "العنوان بالإنجليزية"}
                            </label>
                            <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Excerpt (Arabic - optional)" : "مقتطف بالعربية (اختياري)"}
                            </label>
                            <textarea value={excerptAr} onChange={(e) => setExcerptAr(e.target.value)} rows={2} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Excerpt (English - optional)" : "مقتطف بالإنجليزية (اختياري)"}
                            </label>
                            <textarea value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} rows={2} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Content (Arabic)" : "المحتوى بالعربية"}
                            </label>
                            <textarea value={contentAr} onChange={(e) => setContentAr(e.target.value)} required rows={4} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Content (English)" : "المحتوى بالإنجليزية"}
                            </label>
                            <textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} required rows={4} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Category" : "التصنيف"}
                            </label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary">
                                <option value="" disabled>{isEn ? "Select Category" : "اختر التصنيف"}</option>
                                {categories.map(c => <option key={c._id} value={c._id}>{localize(c.title, isEn ? "Category" : "تصنيف")}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Featured Image (Optional)" : "صورة المقال (اختياري)"}
                            </label>
                            <input type="file" accept="image/*" onChange={(e) => setFeaturedImage(e.target.files[0])} className="w-full text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white cursor-pointer" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            {isEn ? "Tags (comma separated)" : "العلامات (Tags) - افصل بينها بفاصلة"}
                        </label>
                        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder={isEn ? "e.g. React, Next.js, Design" : "مثال: React, Node.js, Design"} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="isPublished" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4 cursor-pointer" />
                        <label htmlFor="isPublished" className="text-sm cursor-pointer select-none">
                            {isEn ? "Publish Article" : "نشر المقال"}
                        </label>
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                        <button type="button" onClick={onClose} disabled={isPending} className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-background transition font-medium">
                            {isEn ? "Cancel" : "إلغاء"}
                        </button>
                        <button type="submit" disabled={isPending} className="gradient-button px-6 py-2.5 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20">
                            {isPending ? (isEn ? "Adding..." : "جاري الإضافة...") : (isEn ? "Add Article" : "إضافة المقال")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlogModal;
