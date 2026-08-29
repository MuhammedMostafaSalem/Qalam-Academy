"use client";

import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { createProductAction } from "@/actions/productActions";
import { getCategoriesAction } from "@/actions/categoryActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const AddProductModal = ({ isOpen, onClose, onSuccess }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const [titleAr, setTitleAr] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [descriptionAr, setDescriptionAr] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);

    const [categories, setCategories] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const { successMessage, errorMessage } = useToast();

    useEffect(() => {
        if (isOpen && categories.length === 0) {
            const fetchCategories = async () => {
                const res = await getCategoriesAction("type=product&limit=100");
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

        if (descriptionAr.trim().length < 20 || descriptionEn.trim().length < 20) {
            errorMessage(isEn
                ? "Arabic and English descriptions must each contain at least 20 characters"
                : "يجب ألا يقل الوصف العربي والإنجليزي عن 20 حرفًا لكل منهما");
            setIsPending(false);
            return;
        }

        if (discountPrice !== "" && Number(discountPrice) > Number(price)) {
            errorMessage(isEn
                ? "Discount price cannot be greater than the original price"
                : "لا يمكن أن يكون سعر الخصم أكبر من السعر الأصلي");
            setIsPending(false);
            return;
        }

        const formData = new FormData();
        formData.append("titleAr", titleAr);
        formData.append("titleEn", titleEn);
        formData.append("descriptionAr", descriptionAr);
        formData.append("descriptionEn", descriptionEn);
        formData.append("category", category);
        formData.append("price", price);
        if (discountPrice) formData.append("discountPrice", discountPrice);
        formData.append("stock", stock);
        if (image) formData.append("image", image);
        if (pdf) formData.append("pdf", pdf);

        const result = await createProductAction(null, formData);
        
        setIsPending(false);

        if (result.success) {
            successMessage(result.message || (isEn ? "Product added successfully" : "تم إضافة المنتج بنجاح"));
            setTitleAr("");
            setTitleEn("");
            setDescriptionAr("");
            setDescriptionEn("");
            setCategory("");
            setPrice("");
            setDiscountPrice("");
            setStock("");
            setImage(null);
            setPdf(null);
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("product-updated"));
            }
            onSuccess();
        } else {
            const firstValidationError = Object.values(result.errors || {}).find(Boolean);
            errorMessage(firstValidationError || result.message || (isEn ? "Failed to add product" : "فشل إضافة المنتج"));
        }
    };

    return (
        <div onClick={onClose} className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-black/60 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button type="button" onClick={onClose} className="absolute rtl:left-6 rtl:right-auto ltr:right-6 ltr:left-auto top-6 text-text-secondary hover:text-text-primary transition p-1 rounded-xl hover:bg-background">
                    <HiXMark size={24} />
                </button>
                <h2 className="text-xl font-bold mb-6 text-text-primary">
                    {isEn ? "Add New Product" : "إضافة منتج جديد"}
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
                                {isEn ? "Description (Arabic)" : "الوصف بالعربية"}
                            </label>
                            <textarea value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} required minLength={20} maxLength={10000} rows={3} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Description (English)" : "الوصف بالإنجليزية"}
                            </label>
                            <textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} required minLength={20} maxLength={10000} rows={3} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
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
                                {isEn ? "Stock" : "المخزون"}
                            </label>
                            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required min="0" className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Price (EGP)" : "السعر (ج.م)"}
                            </label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Discount Price (EGP)" : "سعر الخصم (ج.م)"}
                            </label>
                            <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} min="0" max={price || undefined} step="0.01" className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Product Image" : "صورة المنتج"}
                            </label>
                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white cursor-pointer" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "PDF File (Optional)" : "ملف PDF (اختياري)"}
                            </label>
                            <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} className="w-full text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                        <button type="button" onClick={onClose} disabled={isPending} className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-background transition font-medium">
                            {isEn ? "Cancel" : "إلغاء"}
                        </button>
                        <button type="submit" disabled={isPending} className="gradient-button px-6 py-2.5 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20">
                            {isPending ? (isEn ? "Adding..." : "جاري الإضافة...") : (isEn ? "Add Product" : "إضافة المنتج")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
