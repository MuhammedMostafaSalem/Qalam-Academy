"use client";

import Image from "next/image";
import { HiXMark } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import useUpdateCategory from "@/hooks/category/useUpdateCategory";
import { useLanguage } from "@/providers/LanguageProvider";

const UpdateCategoryModal = ({ isOpen, onClose, category, onSuccess }) => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const { formAction, isPending, values, handlers } = useUpdateCategory(category, onSuccess, onClose);

    if (!isOpen || !category) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-black/60 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
                <button type="button" onClick={onClose} className="absolute rtl:left-6 rtl:right-auto ltr:right-6 ltr:left-auto top-6 text-text-secondary hover:text-text-primary transition p-1 rounded-xl hover:bg-background">
                    <HiXMark size={24} />
                </button>

                <h2 className="text-xl font-bold mb-6 text-text-primary">
                    {isEn ? "Edit Category" : "تعديل التصنيف"}
                </h2>

                <form action={formAction} className="flex flex-col gap-4">
                    {/* Titles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Title (Arabic)" : "العنوان بالعربية"}
                            </label>
                            <input type="text" name="titleAr" value={values.titleAr} onChange={(e) => values.setTitleAr(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none border-border focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Title (English)" : "العنوان بالإنجليزية"}
                            </label>
                            <input type="text" name="titleEn" value={values.titleEn} onChange={(e) => values.setTitleEn(e.target.value)} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none border-border focus:border-primary" />
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Description (Arabic)" : "الوصف بالعربية"}
                            </label>
                            <textarea name="descriptionAr" value={values.descAr} onChange={(e) => values.setDescAr(e.target.value)} rows={3} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Description (English)" : "الوصف بالإنجليزية"}
                            </label>
                            <textarea name="descriptionEn" value={values.descEn} onChange={(e) => values.setDescEn(e.target.value)} rows={3} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none focus:border-primary resize-none border-border" />
                        </div>
                    </div>

                    {/* Type Selection */}
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            {isEn ? "Category Type" : "نوع التصنيف"}
                        </label>
                        <select
                            name="type"
                            value={values.type}
                            onChange={(e) => values.setType(e.target.value)}
                            className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none border-border focus:border-primary transition"
                        >
                            <option value="course">{isEn ? "Course" : "كورس (Course)"}</option>
                            <option value="product">{isEn ? "Product" : "منتج (Product)"}</option>
                            <option value="portfolio">{isEn ? "Portfolio" : "معرض أعمال (Portfolio)"}</option>
                            <option value="service">{isEn ? "Service" : "خدمة (Service)"}</option>
                            <option value="blog">{isEn ? "Blog" : "مدونة (Blog)"}</option>
                        </select>
                    </div>

                    {/* Active Status & Remove Image Flags */}
                    <input type="hidden" name="isActive" value={values.isActive} />
                    <input type="hidden" name="removeImage" value={values.removeImage} />

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            {isEn ? "Category Image" : "صورة التصنيف"}
                        </label>
                        <input type="file" name="image" accept="image/*" onChange={handlers.handleImageChange} className="w-full text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white cursor-pointer" />
                    </div>

                    {values.imagePreview && (
                        <div className="flex items-center justify-between bg-background/50 p-3 rounded-2xl border border-border">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-text-secondary font-medium">
                                    {isEn ? "Image Preview:" : "معاينة الصورة:"}
                                </span>
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border shadow-sm">
                                    <img src={values.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <button type="button" onClick={handlers.handleRemoveCurrentImage} className="text-error hover:bg-error/10 p-2 rounded-xl transition flex items-center gap-1 text-sm">
                                <MdDelete size={20} /> {isEn ? "Delete Image" : "حذف الصورة"}
                            </button>
                        </div>
                    )}

                    {/* Actions */}
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

export default UpdateCategoryModal;