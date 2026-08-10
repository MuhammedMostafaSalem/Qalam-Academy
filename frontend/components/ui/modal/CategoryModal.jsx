"use client";

import { HiXMark } from "react-icons/hi2";
import Image from "next/image";

const CategoryModal = ({ isOpen, onClose, onSubmit, onDelete, initialData, mode }) => {

    if (!isOpen) return null;

    return (
        <div 
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200 my-auto"
            >
                <button
                    onClick={onClose}
                    className="absolute left-6 top-6 text-text-secondary hover:text-text-primary transition p-1 rounded-xl hover:bg-background"
                >
                    <HiXMark size={24} />
                </button>

                <h2 className="text-xl font-bold mb-6 text-text-primary">
                    {mode === "create" && "إضافة تصنيف جديد"}
                    {mode === "edit" && "تعديل التصنيف"}
                    {mode === "delete" && "حذف التصنيف"}
                </h2>

                {mode === "delete" ? (
                    <div>
                        <p className="text-text-secondary mb-6 leading-relaxed">
                            هل أنت متأكد من رغبتك في حذف التصنيف <span className="font-bold text-text-primary">{initialData?.title?.ar}</span>؟ لا يمكن التراجع عن هذا الإجراء.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-background transition font-medium"
                            >
                                إلغاء
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-5 py-2.5 rounded-xl bg-error text-white hover:opacity-90 transition font-medium"
                            >
                                تأكيد الحذف
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-text-secondary mb-1">العنوان بالعربية</label>
                                <input
                                    type="text"
                                    value={titleAr}
                                    onChange={(e) => setTitleAr(e.target.value)}
                                    required
                                    placeholder="أدخل العنوان بالعربية"
                                    className="w-full h-12 rounded-xl border border-border bg-background px-4 text-text-primary outline-none focus:border-primary transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-text-secondary mb-1">العنوان بالإنجليزية</label>
                                <input
                                    type="text"
                                    value={titleEn}
                                    onChange={(e) => setTitleEn(e.target.value)}
                                    required
                                    placeholder="أدخل العنوان بالإنجليزية"
                                    className="w-full h-12 rounded-xl border border-border bg-background px-4 text-text-primary outline-none focus:border-primary transition"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-text-secondary mb-1">الوصف بالعربية</label>
                                <textarea
                                    value={descAr}
                                    onChange={(e) => setDescAr(e.target.value)}
                                    placeholder="أدخل وصف التصنيف بالعربية"
                                    rows={2}
                                    className="w-full rounded-xl border border-border bg-background p-3 text-text-primary outline-none focus:border-primary transition resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-text-secondary mb-1">الوصف بالإنجليزية</label>
                                <textarea
                                    value={descEn}
                                    onChange={(e) => setDescEn(e.target.value)}
                                    placeholder="أدخل وصف التصنيف بالانجليزية"
                                    rows={2}
                                    className="w-full rounded-xl border border-border bg-background p-3 text-text-primary outline-none focus:border-primary transition resize-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-text-secondary mb-1">ترتيب العرض</label>
                            <div className="grid grid-cols-2 gap-3 h-12">
                                <button
                                    type="button"
                                    onClick={() => setType("course")}
                                    className={`rounded-xl border font-medium text-sm transition flex items-center justify-center gap-2 ${
                                        type === "course"
                                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                                            : "border-border bg-background text-text-secondary hover:border-text-secondary"
                                    }`}
                                >
                                    <span>كورس (Course)</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setType("product")}
                                    className={`rounded-xl border font-medium text-sm transition flex items-center justify-center gap-2 ${
                                        type === "product"
                                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                                            : "border-border bg-background text-text-secondary hover:border-text-secondary"
                                    }`}
                                >
                                    <span>منتج (Product)</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-text-secondary mb-1">صورة التصنيف</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:opacity-90 cursor-pointer"
                            />
                        </div>

                        {/* معاينة الصورة المرفوعة */}
                        {imagePreview && (
                            <div className="flex items-center gap-4 mt-2 bg-background/50 p-3 rounded-2xl border border-border">
                                <span className="text-sm text-text-secondary font-medium">معاينة الصورة:</span>
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border shadow-sm">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-background transition font-medium"
                            >
                                إلغاء
                            </button>
                            <button
                                type="submit"
                                className="gradient-button px-6 py-2.5 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20"
                            >
                                {mode === "create" ? "إضافة" : "تعديل"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>,
        document.body
    );
};

export default CategoryModal;