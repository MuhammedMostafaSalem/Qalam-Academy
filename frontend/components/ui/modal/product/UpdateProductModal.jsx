"use client";

import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { updateProductAction } from "@/actions/productActions";
import { getCategoriesAction } from "@/actions/categoryActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const UpdateProductModal = ({ isOpen, onClose, product, onSuccess }) => {
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

    useEffect(() => {
        if (product) {
            setTitleAr(product._translations?.title?.ar || product.title?.ar || (typeof product.title === "string" ? product.title : ""));
            setTitleEn(product._translations?.title?.en || product.title?.en || "");
            setDescriptionAr(product._translations?.description?.ar || product.description?.ar || (typeof product.description === "string" ? product.description : ""));
            setDescriptionEn(product._translations?.description?.en || product.description?.en || "");
            setCategory(product.category?._id || product.category || "");
            setPrice(product.price || "");
            setDiscountPrice(product.discountPrice || "");
            setStock(product.stock || "");
            setImage(null);
            setPdf(null);
        }
    }, [product]);

    if (!isOpen || !product) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.append("titleAr", titleAr);
        formData.append("titleEn", titleEn);
        formData.append("descriptionAr", descriptionAr);
        formData.append("descriptionEn", descriptionEn);
        formData.append("category", category);
        formData.append("price", price);
        if (discountPrice) formData.append("discountPrice", discountPrice);
        if (stock) formData.append("stock", stock);
        if (image) formData.append("image", image);
        if (pdf) formData.append("pdf", pdf);

        const res = await updateProductAction(product._id, formData);
        
        setIsPending(false);

        if (res.success) {
            successMessage(res.message || (isEn ? "Product updated successfully" : "تم تعديل المنتج بنجاح"));
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("product-updated"));
            }
            if (onSuccess) onSuccess();
            onClose();
        } else {
            errorMessage(res.message || (isEn ? "Failed to update product" : "حدث خطأ أثناء تعديل المنتج"));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-card rounded-2xl border border-border p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
                <button onClick={onClose} className="absolute rtl:left-4 rtl:right-auto ltr:right-4 ltr:left-auto top-4 text-text-secondary hover:text-text-primary transition">
                    <HiXMark size={24} />
                </button>
                <h2 className="text-xl font-bold text-text-primary mb-6">
                    {isEn ? "Edit Product" : "تعديل المنتج"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Product Title (Arabic)" : "اسم المنتج بالعربية"}
                            </label>
                            <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Product Title (English)" : "اسم المنتج بالإنجليزية"}
                            </label>
                            <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Description (Arabic)" : "الوصف بالعربية"}
                            </label>
                            <textarea value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} required rows={3} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Description (English)" : "الوصف بالإنجليزية"}
                            </label>
                            <textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} required rows={3} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
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
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Discount Price (EGP)" : "سعر الخصم (ج.م)"}
                            </label>
                            <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} min="0" className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Product Image (Optional)" : "صورة المنتج (اختياري)"}
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
                            {isPending ? (isEn ? "Saving..." : "جاري الحفظ...") : (isEn ? "Save Changes" : "حفظ التعديلات")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductModal;
