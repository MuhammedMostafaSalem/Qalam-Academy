"use client";

import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { updateBlogAction } from "@/actions/blogActions";
import { getCategoriesAction } from "@/actions/categoryActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const UpdateBlogModal = ({ isOpen, onClose, blog, onSuccess }) => {
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

    useEffect(() => {
        if (blog) {
            setTitleAr(blog._translations?.title?.ar || blog.title?.ar || (typeof blog.title === "string" ? blog.title : ""));
            setTitleEn(blog._translations?.title?.en || blog.title?.en || "");
            setExcerptAr(blog._translations?.excerpt?.ar || blog.excerpt?.ar || (typeof blog.excerpt === "string" ? blog.excerpt : ""));
            setExcerptEn(blog._translations?.excerpt?.en || blog.excerpt?.en || "");
            setContentAr(blog._translations?.content?.ar || blog.content?.ar || (typeof blog.content === "string" ? blog.content : ""));
            setContentEn(blog._translations?.content?.en || blog.content?.en || "");
            setCategory(blog.category?._id || blog.category || "");
            setTags(blog.tags ? (typeof blog.tags[0] === 'string' ? blog.tags.join(", ") : blog.tags.map(t => t?.ar || t?.en || t).join(", ")) : "");
            setIsPublished(blog.isPublished !== false);
            setFeaturedImage(null);
        }
    }, [blog]);

    if (!isOpen || !blog) return null;

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
        formData.append("tags", tags);
        formData.append("isPublished", isPublished ? "true" : "false");
        if (featuredImage) {
            formData.append("featuredImage", featuredImage);
        }

        const res = await updateBlogAction(blog._id, formData);
        setIsPending(false);

        if (res.success) {
            successMessage(res.message || (isEn ? "Article updated successfully" : "تم تعديل المقال بنجاح"));
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("blog-updated"));
            }
            if (onSuccess) onSuccess();
            onClose();
        } else {
            errorMessage(res.message || (isEn ? "Failed to update article" : "حدث خطأ أثناء تعديل المقال"));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-card rounded-2xl border border-border p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
                <button onClick={onClose} className="absolute rtl:left-4 rtl:right-auto ltr:right-4 ltr:left-auto top-4 text-text-secondary hover:text-text-primary transition">
                    <HiXMark size={24} />
                </button>
                <h2 className="text-xl font-bold text-text-primary mb-6">
                    {isEn ? "Edit Article" : "تعديل المقال"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                                {isEn ? "Excerpt (Arabic)" : "المقتطف بالعربية"}
                            </label>
                            <textarea value={excerptAr} onChange={(e) => setExcerptAr(e.target.value)} required rows={2} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Excerpt (English)" : "المقتطف بالإنجليزية"}
                            </label>
                            <textarea value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} required rows={2} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
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
                        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder={isEn ? "e.g. React, Node.js, Design" : "مثال: React, Node.js, Design"} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="isPublishedUpdate" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4 cursor-pointer" />
                        <label htmlFor="isPublishedUpdate" className="text-sm cursor-pointer select-none">
                            {isEn ? "Publish Article" : "نشر المقال"}
                        </label>
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                        <button type="button" onClick={onClose} disabled={isPending} className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-background transition font-medium">
                            {isEn ? "Cancel" : "إلغاء"}
                        </button>
                        <button type="submit" disabled={isPending} className="gradient-button px-6 py-2.5 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20">
                            {isPending ? (isEn ? "Saving..." : "جاري الحفظ...") : (isEn ? "Save Changes" : "حفظ التعديلات")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBlogModal;
