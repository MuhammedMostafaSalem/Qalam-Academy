"use client";

import { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import Image from "next/image";
import useAddCategory from "@/hooks/category/useAddCategory";

const AddCategoryModal = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
    const {
        titleAr,
        titleEn,
        descAr,
        descEn,
        type,
        imagePreview,

        setTitleAr,
        setTitleEn,
        setDescAr,
        setDescEn,
        setType,

        handleImageChange,
        handleSubmit,

        state,
        isPending,
    } = useAddCategory({ isOpen, onClose, onSuccess });

    if (!isOpen) return null;


    return (
        <div
            onClick={onClose}
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-black/60 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200 my-auto"
            >
                {/* Close */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute left-6 top-6 text-text-secondary hover:text-text-primary transition p-1 rounded-xl hover:bg-background"
                >
                    <HiXMark size={24} />
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold mb-6 text-text-primary">
                    إضافة تصنيف جديد
                </h2>

                <form
                    action={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    {/* Titles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                العنوان بالعربية
                            </label>

                            <input
                                type="text"
                                name="titleAr"
                                value={titleAr}
                                onChange={(e) => setTitleAr(e.target.value)}
                                required
                                // disabled={isPending}
                                placeholder="أدخل العنوان بالعربية"
                                className={`
                                    w-full h-12
                                    rounded-xl border
                                    bg-background
                                    px-4
                                    text-text-primary
                                    outline-none
                                    transition
                                    
                                    ${state?.errors?.["title.ar"]
                                        ? "border-error"
                                        : "border-border focus:border-primary"
                                    }
                                `}
                            />

                            {state?.errors?.["title.ar"] && (
                                <p className="mt-1 text-xs text-error">
                                    {state.errors["title.ar"]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                العنوان بالإنجليزية
                            </label>

                            <input
                                type="text"
                                name="titleEn"
                                value={titleEn}
                                onChange={(e) => setTitleEn(e.target.value)}
                                required
                                // disabled={isPending}
                                placeholder="Enter category title"
                                className={`
                                    w-full h-12
                                    rounded-xl border
                                    bg-background
                                    px-4
                                    text-text-primary
                                    outline-none
                                    transition
                                    
                                    ${state?.errors?.["title.en"]
                                        ? "border-error"
                                        : "border-border focus:border-primary"
                                    }
                                `}
                            />

                            {state?.errors?.["title.en"] && (
                                <p className="mt-1 text-xs text-error">
                                    {state.errors["title.en"]}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                الوصف بالعربية
                            </label>

                            <textarea
                                name="descriptionAr"
                                value={descAr}
                                onChange={(e) => setDescAr(e.target.value)}
                                // disabled={isPending}
                                placeholder="أدخل وصف التصنيف بالعربية"
                                rows={3}
                                className={`
                                    w-full
                                    rounded-xl border
                                    bg-background
                                    p-3
                                    text-text-primary
                                    outline-none
                                    focus:border-primary
                                    transition
                                    resize-none
                                    
                                    ${state?.errors?.["description.ar"]
                                        ? "border-error"
                                        : "border-border focus:border-primary"
                                    }
                                `}
                            />

                            {state?.errors?.["description.ar"] && (
                                <p className="mt-1 text-xs text-error">
                                    {state.errors["description.ar"]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                الوصف بالإنجليزية
                            </label>

                            <textarea
                                name="descriptionEn"
                                value={descEn}
                                onChange={(e) => setDescEn(e.target.value)}
                                // disabled={isPending}
                                placeholder="Enter category description"
                                rows={3}
                                className={`
                                    w-full
                                    rounded-xl border
                                    bg-background
                                    p-3
                                    text-text-primary
                                    outline-none
                                    focus:border-primary
                                    transition
                                    resize-none
                                    
                                    ${state?.errors?.["description.en"]
                                        ? "border-error"
                                        : "border-border focus:border-primary"
                                    }
                                `}
                            />

                            {state?.errors?.["description.en"] && (
                                <p className="mt-1 text-xs text-error">
                                    {state.errors["description.en"]}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            نوع التصنيف
                        </label>

                        <select
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            disabled={isPending}
                            className={`
                                w-full h-12
                                rounded-xl border
                                bg-background
                                px-4
                                text-text-primary
                                outline-none
                                transition
                                
                                ${state?.errors?.type
                                    ? "border-error"
                                    : "border-border focus:border-primary"
                                }
                            `}
                        >
                            <option value="" disabled>اختر نوع التصنيف</option>
                            <option value="course">كورس (Course)</option>
                            <option value="product">منتج (Product)</option>
                            <option value="portfolio">معرض أعمال (Portfolio)</option>
                            <option value="service">خدمة (Service)</option>
                            <option value="blog">مدونة (Blog)</option>
                        </select>

                        {state?.errors?.type && (
                            <p className="mt-1 text-xs text-error">
                                {state.errors.type}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            صورة التصنيف
                        </label>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={isPending}
                            className="
                                w-full
                                text-text-secondary
                                file:mr-4
                                file:py-2
                                file:px-4
                                file:rounded-xl
                                file:border-0
                                file:text-sm
                                file:font-semibold
                                file:bg-primary
                                file:text-white
                                hover:file:opacity-90
                                cursor-pointer
                            "
                        />
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="flex items-center gap-4 mt-2 bg-background/50 p-3 rounded-2xl border border-border">
                            <span className="text-sm text-text-secondary font-medium">
                                معاينة الصورة:
                            </span>

                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border shadow-sm">
                                <Image
                                    src={imagePreview}
                                    alt="Category preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-background transition font-medium"
                        >
                            إلغاء
                        </button>

                        <button
                            type="submit"
                            disabled={isPending || !type}
                            className="gradient-button px-6 py-2.5 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20"
                        >
                            {
                                isPending
                                ? "جاري الإضافة..."
                                : "إضافة"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategoryModal