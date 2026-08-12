"use client";

import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { updateBlogAction } from "@/actions/blogActions";
import { getCategoriesAction } from "@/actions/categoryActions";
import useToast from "@/hooks/useToast";

const UpdateBlogModal = ({ isOpen, onClose, blog, onSuccess }) => {
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
                const res = await getCategoriesAction("limit=100");
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
            setTitleAr(blog.title?.ar || blog.title || "");
            setTitleEn(blog.title?.en || blog.title || "");
            setExcerptAr(blog.excerpt?.ar || blog.excerpt || "");
            setExcerptEn(blog.excerpt?.en || blog.excerpt || "");
            setContentAr(blog.content?.ar || blog.content || "");
            setContentEn(blog.content?.en || blog.content || "");
            setCategory(blog.category?._id || blog.category || "");
            setTags(blog.tags ? (typeof blog.tags[0] === 'string' ? blog.tags.join(", ") : blog.tags.map(t => t.ar || t).join(", ")) : "");
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
        if (tags) formData.append("tags", tags);
        formData.append("isPublished", isPublished);
        if (featuredImage) formData.append("featuredImage", featuredImage);

        const result = await updateBlogAction(blog._id, null, formData);
        
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
            <div onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button type="button" onClick={onClose} className="absolute left-6 top-6 text-text-secondary hover:text-text-primary transition p-1 rounded-xl hover:bg-background">
                    <HiXMark size={24} />
                </button>
                <h2 className="text-xl font-bold mb-6 text-text-primary">تعديل المقال</h2>
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
                            <label className="block text-sm text-text-secondary mb-1">مقتطف بالعربية (اختياري)</label>
                            <textarea value={excerptAr} onChange={(e) => setExcerptAr(e.target.value)} rows={2} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">مقتطف بالإنجليزية (اختياري)</label>
                            <textarea value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} rows={2} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">المحتوى بالعربية</label>
                            <textarea value={contentAr} onChange={(e) => setContentAr(e.target.value)} required rows={4} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">المحتوى بالإنجليزية</label>
                            <textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} required rows={4} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
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
                            <label className="block text-sm text-text-secondary mb-1">صورة المقال (اختياري)</label>
                            <input type="file" accept="image/*" onChange={(e) => setFeaturedImage(e.target.files[0])} className="w-full text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white cursor-pointer" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">العلامات (Tags) - افصل بينها بفاصلة</label>
                        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="مثال: React, Node.js, Design" className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="isPublishedUpdate" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4 cursor-pointer" />
                        <label htmlFor="isPublishedUpdate" className="text-sm cursor-pointer select-none">نشر المقال</label>
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

export default UpdateBlogModal;
