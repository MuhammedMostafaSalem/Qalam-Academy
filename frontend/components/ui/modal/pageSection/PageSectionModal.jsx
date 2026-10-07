"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    MdAdd,
    MdClose,
    MdDeleteOutline,
    MdExpandMore,
    MdExpandLess,
} from "react-icons/md";
import {
    createPageSectionAction,
    updatePageSectionAction,
} from "@/actions/pageSectionActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";
import PageSectionIconPicker from "./PageSectionIconPicker";

const createEmptyItem = () => ({
    _id: null,
    icon: "",
    content: { title: { ar: "", en: "" }, description: { ar: "", en: "" } },
});

const createEmptyForm = () => ({
    page: "",
    section: "",
    content: {
        badge: { ar: "", en: "" },
        title: { ar: "", en: "" },
        description: { ar: "", en: "" },
    },
    items: [],
    // isActive: true,
});

const PageSectionModal = ({
    isOpen,
    onClose,
    mode = "create",
    section = null,
    onSuccess,
}) => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const { successMessage, errorMessage } = useToast();
    const [formData, setFormData] = useState(createEmptyForm());
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [expandedItem, setExpandedItem] = useState(null);
    const isEdit = mode === "update";

    /** * Fill form when editing. */
    useEffect(() => {
        if (!isOpen) {
            return;
        }
        if (isEdit && section) {
            setFormData({
                page: section.page || "",
                section: section.section || "",
                content: {
                    badge: {
                        ar: section.content?.badge?.ar || "",
                        en: section.content?.badge?.en || "",
                    },
                    title: {
                        ar: section.content?.title?.ar || "",
                        en: section.content?.title?.en || "",
                    },
                    description: {
                        ar: section.content?.description?.ar || "",
                        en: section.content?.description?.en || "",
                    },
                },
                items: Array.isArray(section.items)
                    ? section.items.map((item, index) => {
                        const translatedItem = section._translations?.items?.[index];

                        return {
                            _id: item._id || null,
                            icon: item.icon || "",
                            content: {
                                title: {
                                    ar: translatedItem?.title?.ar || "",
                                    en: translatedItem?.title?.en || "",
                                },
                                description: {
                                    ar: translatedItem?.description?.ar || "",
                                    en: translatedItem?.description?.en || "",
                                },
                            },
                        };
                    })
                    : [],
                // isActive: section.isActive ?? true,
            });
            setErrors({});
            setExpandedItem(section.items?.length ? 0 : null);
        } else {
            setFormData(createEmptyForm());
            setErrors({});
            setExpandedItem(null);
        }
    }, [isOpen, isEdit, section]);

    /** * Close modal. */
    const handleClose = () => {
        if (loading) {
            return;
        }
        setFormData(createEmptyForm());
        setErrors({});
        setExpandedItem(null);
        onClose();
    };

    /** * Basic input change. */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    /** * Section content localized change. */
    const handleLocalizedChange = (
        field,
        lang,
        value,
    ) => {
        setFormData((prev) => ({
            ...prev,
            content: {
                ...prev.content,
                [field]: { ...prev.content[field], [lang]: value },
            },
        }));
        setErrors((prev) => ({ ...prev, [`content.${field}`]: "" }));
    };

    /** * Item localized change. */
    const handleItemLocalizedChange = (
        index,
        field,
        lang,
        value,
    ) => {
        setFormData((prev) => {
            const items = [...prev.items];
            items[index] = {
                ...items[index],
                content: {
                    ...items[index].content,
                    [field]: { ...items[index].content[field], [lang]: value },
                },
            };
            return { ...prev, items };
        });
        setErrors((prev) => ({ ...prev, [`items.${index}.content.${field}`]: "" }));
    };

    /** * Item icon change. */
    const handleItemIconChange = (index, icon) => {
        setFormData((prev) => {
            const items = [...prev.items];
            items[index] = { ...items[index], icon };
            return { ...prev, items };
        });
        setErrors((prev) => ({ ...prev, [`items.${index}.icon`]: "" }));
    };

    /** * Add new item. */
    const handleAddItem = () => {
        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, createEmptyItem()],
        }));
        setExpandedItem(formData.items.length);
    };

    /** * Remove item. */
    const handleRemoveItem = (index) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.filter((_, itemIndex) => itemIndex !== index),
        }));
        setErrors((prev) => {
            const newErrors = {};
            Object.entries(prev).forEach(([key, value]) => {
                if (!key.startsWith(`items.${index}.`)) {
                    newErrors[key] = value;
                }
            });
            return newErrors;
        });
        setExpandedItem((current) => {
            if (current === null) {
                return null;
            }
            if (current === index) {
                return null;
            }
            if (current > index) {
                return current - 1;
            }
            return current;
        });
    };

    /** * Toggle item. */
    const toggleItem = (index) => {
        setExpandedItem((current) => (current === index ? null : index));
    };

    /** * Active status. */
    // const handleActiveChange = (e) => {
    //     setFormData((prev) => ({ ...prev, isActive: e.target.checked }));
    // };

    /** * Validate localized field. * * Empty fields are allowed. * If one language is entered, * the other language can remain empty. */
    const validateLocalizedField = (value) => {
        const ar = value?.ar?.trim() || "";
        const en = value?.en?.trim() || "";
        return ar || en;
    };

    /** * Validation. */
    const validateForm = () => {
        const newErrors = {};
        if (!formData.page.trim()) {
            newErrors.page = isEn ? "Page is required" : "الصفحة مطلوبة";
        }
        if (!formData.section.trim()) {
            newErrors.section = isEn ? "Section is required" : "القسم مطلوب";
        }
        const localizedFields = ["badge", "title", "description"];
        localizedFields.forEach((field) => {
            const value = formData.content[field];
            validateLocalizedField(value);
        });
        formData.items.forEach((item, index) => {
            const title = item.content?.title;
            const description = item.content?.description;
            const hasTitle = validateLocalizedField(title);
            const hasDescription = validateLocalizedField(description);

            /** * Completely empty items * are not allowed. */
            if (
                !item.icon &&
                !hasTitle &&
                !hasDescription
            ) {
                newErrors[`items.${index}`] = isEn
                    ? "Item cannot be completely empty"
                    : "لا يمكن أن يكون العنصر فارغًا بالكامل";
            }

            /** * If item has content, * title is recommended/required. */
            if (
                !hasTitle &&
                (item.icon || hasDescription)
            ) {
                newErrors[`items.${index}.content.title`] = isEn
                    ? "Item title is required"
                    : "عنوان العنصر مطلوب";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /** * Clean localized field. */
    const cleanLocalizedField = (value) => {
        const ar = value?.ar?.trim() || "";
        const en = value?.en?.trim() || "";
        if (!ar && !en) {
            return null;
        }
        return { ar, en };
    };

    /** * Submit. */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) {
            return;
        }
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        try {
            const payload = {
                page: formData.page.trim(),
                section: formData.section.trim(),
                content: {
                    badge: cleanLocalizedField(formData.content.badge),
                    title: cleanLocalizedField(formData.content.title),
                    description: cleanLocalizedField(formData.content.description),
                },
                items: formData.items.map((item) => ({
                    ...(item._id ? { _id: item._id } : {}),
                    icon: item.icon?.trim() || "",
                    content: {
                        title: cleanLocalizedField(item.content?.title),
                        description: cleanLocalizedField(item.content?.description),
                    },
                })),
                // isActive: formData.isActive,
            };
            let result;
            if (isEdit && section?._id) {
                result = await updatePageSectionAction(section._id, payload);
            } else {
                result = await createPageSectionAction(payload);
            }
            if (result.success) {
                successMessage(
                    result.message ||
                    (isEn
                        ? isEdit
                            ? "Page section updated successfully"
                            : "Page section created successfully"
                        : isEdit
                            ? "تم تحديث قسم الصفحة بنجاح"
                            : "تم إنشاء قسم الصفحة بنجاح"),
                );
                if (typeof window !== "undefined") {
                    window.dispatchEvent(new Event("page-section-updated"));
                }
                if (onSuccess) {
                    onSuccess(result.data);
                }
            } else {
                errorMessage(
                    result.message || (isEn ? "Something went wrong" : "حدث خطأ ما"),
                );
                if (result.errors) {
                    setErrors(result.errors);
                }
            }
        } catch (error) {
            errorMessage(
                error?.message || (isEn ? "Something went wrong" : "حدث خطأ ما"),
            );
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            role="presentation"
            className=" fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 "
        >
            {" "}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="page-section-modal-title"
                className=" w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border p-6 shadow-2xl animate-in fade-in zoom-in duration-200 "
            >
                {" "}
                {/* Header */}{" "}
                <div className=" flex items-center justify-between gap-4 mb-6 ">
                    {" "}
                    <div>
                        {" "}
                        <h2
                            id="page-section-modal-title"
                            className=" text-xl font-bold text-text-primary "
                        >
                            {" "}
                            {isEdit
                                ? isEn
                                    ? "Edit Page Section"
                                    : "تعديل قسم الصفحة"
                                : isEn
                                    ? "Add New Page Section"
                                    : "إضافة قسم صفحة جديد"}{" "}
                        </h2>{" "}
                        <p className="mt-1 text-sm text-text-secondary">
                            {" "}
                            {isEdit
                                ? isEn
                                    ? "Update the page section content and items"
                                    : "تعديل محتوى وعناصر قسم الصفحة"
                                : isEn
                                    ? "Create a reusable page section"
                                    : "إنشاء قسم قابل لإعادة الاستخدام"}{" "}
                        </p>{" "}
                    </div>{" "}
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={loading}
                        className=" flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-secondary transition hover:bg-card-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50 "
                    >
                        {" "}
                        <MdClose size={22} />{" "}
                    </button>{" "}
                </div>{" "}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {" "}
                    {/* Basic Information */}{" "}
                    <div className=" rounded-2xl border border-border p-5 ">
                        {" "}
                        <h3 className="mb-4 text-base font-semibold">
                            {" "}
                            {isEn ? "Basic Information" : "المعلومات الأساسية"}{" "}
                        </h3>{" "}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {" "}
                            {/* Page */}{" "}
                            <div>
                                {" "}
                                <label
                                    htmlFor="page"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    {" "}
                                    {isEn ? "Page" : "الصفحة"}{" "}
                                </label>{" "}
                                <input
                                    id="page"
                                    name="page"
                                    type="text"
                                    value={formData.page}
                                    onChange={handleChange}
                                    placeholder="services"
                                    className=" w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary "
                                />{" "}
                                {errors.page && (
                                    <p className="mt-1 text-xs text-error"> {errors.page} </p>
                                )}{" "}
                            </div>{" "}
                            {/* Section */}{" "}
                            <div>
                                {" "}
                                <label
                                    htmlFor="section"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    {" "}
                                    {isEn ? "Section" : "القسم"}{" "}
                                </label>{" "}
                                <input
                                    id="section"
                                    name="section"
                                    type="text"
                                    value={formData.section}
                                    onChange={handleChange}
                                    placeholder="why-choose"
                                    className=" w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-mono outline-none transition focus:border-primary "
                                />{" "}
                                {errors.section && (
                                    <p className="mt-1 text-xs text-error"> {errors.section} </p>
                                )}{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                    {/* Badge */}{" "}
                    <div className=" rounded-2xl border border-border p-5 ">
                        {" "}
                        <h3 className="mb-4 text-base font-semibold">
                            {" "}
                            {isEn ? "Badge" : "الشارة"}{" "}
                        </h3>{" "}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {" "}
                            <div>
                                {" "}
                                <label className="mb-2 block text-sm font-medium">
                                    {" "}
                                    العربية{" "}
                                </label>{" "}
                                <input
                                    type="text"
                                    dir="rtl"
                                    value={formData.content.badge.ar}
                                    onChange={(e) =>
                                        handleLocalizedChange("badge", "ar", e.target.value)
                                    }
                                    placeholder="مثال: دورات مميزة"
                                    className=" w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary "
                                />{" "}
                            </div>{" "}
                            <div>
                                {" "}
                                <label className="mb-2 block text-sm font-medium">
                                    {" "}
                                    English{" "}
                                </label>{" "}
                                <input
                                    type="text"
                                    dir="ltr"
                                    value={formData.content.badge.en}
                                    onChange={(e) =>
                                        handleLocalizedChange("badge", "en", e.target.value)
                                    }
                                    placeholder="Example: Featured Courses"
                                    className=" w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary "
                                />{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                    {/* Title */}{" "}
                    <div className=" rounded-2xl border border-border p-5 ">
                        {" "}
                        <h3 className="mb-4 text-base font-semibold">
                            {" "}
                            {isEn ? "Title" : "العنوان"}{" "}
                        </h3>{" "}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {" "}
                            <div>
                                {" "}
                                <label className="mb-2 block text-sm font-medium">
                                    {" "}
                                    العربية{" "}
                                </label>{" "}
                                <input
                                    type="text"
                                    dir="rtl"
                                    value={formData.content.title.ar}
                                    onChange={(e) =>
                                        handleLocalizedChange("title", "ar", e.target.value)
                                    }
                                    placeholder="أدخل العنوان بالعربية"
                                    className=" w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary "
                                />{" "}
                            </div>{" "}
                            <div>
                                {" "}
                                <label className="mb-2 block text-sm font-medium">
                                    {" "}
                                    English{" "}
                                </label>{" "}
                                <input
                                    type="text"
                                    dir="ltr"
                                    value={formData.content.title.en}
                                    onChange={(e) =>
                                        handleLocalizedChange("title", "en", e.target.value)
                                    }
                                    placeholder="Enter title in English"
                                    className=" w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary "
                                />{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                    {/* Description */}{" "}
                    <div className=" rounded-2xl border border-border p-5 ">
                        {" "}
                        <h3 className="mb-4 text-base font-semibold">
                            {" "}
                            {isEn ? "Description" : "الوصف"}{" "}
                        </h3>{" "}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {" "}
                            <div>
                                {" "}
                                <label className="mb-2 block text-sm font-medium">
                                    {" "}
                                    العربية{" "}
                                </label>{" "}
                                <textarea
                                    dir="rtl"
                                    rows={4}
                                    value={formData.content.description.ar}
                                    onChange={(e) =>
                                        handleLocalizedChange("description", "ar", e.target.value)
                                    }
                                    placeholder="أدخل الوصف بالعربية"
                                    className=" w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary "
                                />{" "}
                            </div>{" "}
                            <div>
                                {" "}
                                <label className="mb-2 block text-sm font-medium">
                                    {" "}
                                    English{" "}
                                </label>{" "}
                                <textarea
                                    dir="ltr"
                                    rows={4}
                                    value={formData.content.description.en}
                                    onChange={(e) =>
                                        handleLocalizedChange("description", "en", e.target.value)
                                    }
                                    placeholder="Enter description in English"
                                    className=" w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary "
                                />{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                    {/* Items */}{" "}
                    <div className=" rounded-2xl border border-border p-5 ">
                        {" "}
                        <div className=" mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
                            {" "}
                            <div>
                                {" "}
                                <h3 className="text-base font-semibold">
                                    {" "}
                                    {isEn ? "Section Items" : "عناصر القسم"}{" "}
                                </h3>{" "}
                                <p className="mt-1 text-sm text-text-secondary">
                                    {" "}
                                    {isEn
                                        ? "Add optional items with icons and localized content."
                                        : "أضف عناصر اختيارية مع أيقونات ومحتوى متعدد اللغات."}{" "}
                                </p>{" "}
                            </div>{" "}
                            <button
                                type="button"
                                onClick={handleAddItem}
                                disabled={loading}
                                className=" flex items-center justify-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50 "
                            >
                                {" "}
                                <MdAdd size={20} /> {isEn ? "Add Item" : "إضافة عنصر"}{" "}
                            </button>{" "}
                        </div>{" "}
                        {formData.items.length === 0 ? (
                            <div className=" rounded-2xl border border-dashed border-border p-8 text-center ">
                                {" "}
                                <p className="text-sm text-text-secondary">
                                    {" "}
                                    {isEn
                                        ? "No items added. This section can work without items."
                                        : "لم تتم إضافة أي عناصر. يمكن للقسم العمل بدون عناصر."}{" "}
                                </p>{" "}
                                <button
                                    type="button"
                                    onClick={handleAddItem}
                                    className=" mt-4 text-sm font-medium text-primary hover:underline "
                                >
                                    {" "}
                                    {isEn ? "Add your first item" : "أضف أول عنصر"}{" "}
                                </button>{" "}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {" "}
                                {formData.items.map((item, index) => {
                                    const Icon = item.icon
                                        ? require("@/lib/icons/pageSectionIcons")
                                            .pageSectionIconRegistry[item.icon]
                                        : null;
                                    const isExpanded = expandedItem === index;
                                    return (
                                        <div
                                            key={item._id || `new-item-${index}`}
                                            className=" overflow-hidden rounded-2xl border border-border bg-background "
                                        >
                                            {" "}
                                            {/* Item Header */}{" "}
                                            <div className=" flex items-center gap-3 p-4 ">
                                                {" "}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleItem(index)}
                                                    className=" flex min-w-0 flex-1 items-center gap-3 text-start "
                                                >
                                                    {" "}
                                                    <div className=" flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ">
                                                        {" "}
                                                        {Icon ? (
                                                            <Icon className="h-5 w-5" />
                                                        ) : (
                                                            <span className="text-xs"> {index + 1} </span>
                                                        )}{" "}
                                                    </div>{" "}
                                                    <div className="min-w-0">
                                                        {" "}
                                                        <p className="truncate text-sm font-semibold text-text-primary">
                                                            {" "}
                                                            {item.content?.title?.[language] ||
                                                                item.content?.title?.en ||
                                                                item.content?.title?.ar ||
                                                                (isEn
                                                                    ? `Item ${index + 1}`
                                                                    : `العنصر ${index + 1}`)}{" "}
                                                        </p>{" "}
                                                        <p className="mt-1 text-xs text-text-secondary">
                                                            {" "}
                                                            {item.icon ||
                                                                (isEn
                                                                    ? "No icon selected"
                                                                    : "لم يتم اختيار أيقونة")}{" "}
                                                        </p>{" "}
                                                    </div>{" "}
                                                    {isExpanded ? (
                                                        <MdExpandLess
                                                            size={22}
                                                            className="shrink-0 text-text-secondary"
                                                        />
                                                    ) : (
                                                        <MdExpandMore
                                                            size={22}
                                                            className="shrink-0 text-text-secondary"
                                                        />
                                                    )}{" "}
                                                </button>{" "}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveItem(index)}
                                                    disabled={loading}
                                                    className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-error transition hover:bg-error/10 disabled:cursor-not-allowed disabled:opacity-50 "
                                                    title={isEn ? "Delete item" : "حذف العنصر"}
                                                >
                                                    {" "}
                                                    <MdDeleteOutline size={21} />{" "}
                                                </button>{" "}
                                            </div>{" "}
                                            {isExpanded && (
                                                <div className=" space-y-5 border-t border-border p-5 ">
                                                    {" "}
                                                    {/* Icon */}{" "}
                                                    <div>
                                                        {" "}
                                                        <h4 className="mb-3 text-sm font-semibold">
                                                            {" "}
                                                            {isEn ? "Icon" : "الأيقونة"}{" "}
                                                        </h4>{" "}
                                                        <PageSectionIconPicker
                                                            value={item.icon}
                                                            onChange={(icon) =>
                                                                handleItemIconChange(index, icon)
                                                            }
                                                        />{" "}
                                                        {errors[`items.${index}.icon`] && (
                                                            <p className="mt-2 text-xs text-error">
                                                                {" "}
                                                                {errors[`items.${index}.icon`]}{" "}
                                                            </p>
                                                        )}{" "}
                                                    </div>{" "}
                                                    {/* Item Title */}{" "}
                                                    <div>
                                                        {" "}
                                                        <h4 className="mb-3 text-sm font-semibold">
                                                            {" "}
                                                            {isEn ? "Title" : "العنوان"}{" "}
                                                        </h4>{" "}
                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            {" "}
                                                            <div>
                                                                {" "}
                                                                <label className="mb-2 block text-sm font-medium">
                                                                    {" "}
                                                                    العربية{" "}
                                                                </label>{" "}
                                                                <input
                                                                    type="text"
                                                                    dir="rtl"
                                                                    value={item.content?.title?.ar || ""}
                                                                    onChange={(e) =>
                                                                        handleItemLocalizedChange(
                                                                            index,
                                                                            "title",
                                                                            "ar",
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    placeholder="أدخل عنوان العنصر بالعربية"
                                                                    className=" w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary "
                                                                />{" "}
                                                            </div>{" "}
                                                            <div>
                                                                {" "}
                                                                <label className="mb-2 block text-sm font-medium">
                                                                    {" "}
                                                                    English{" "}
                                                                </label>{" "}
                                                                <input
                                                                    type="text"
                                                                    dir="ltr"
                                                                    value={item.content?.title?.en || ""}
                                                                    onChange={(e) =>
                                                                        handleItemLocalizedChange(
                                                                            index,
                                                                            "title",
                                                                            "en",
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    placeholder="Enter item title in English"
                                                                    className=" w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary "
                                                                />{" "}
                                                            </div>{" "}
                                                        </div>{" "}
                                                        {errors[`items.${index}.content.title`] && (
                                                            <p className="mt-2 text-xs text-error">
                                                                {" "}
                                                                {errors[`items.${index}.content.title`]}{" "}
                                                            </p>
                                                        )}{" "}
                                                    </div>{" "}
                                                    {/* Item Description */}{" "}
                                                    <div>
                                                        {" "}
                                                        <h4 className="mb-3 text-sm font-semibold">
                                                            {" "}
                                                            {isEn ? "Description" : "الوصف"}{" "}
                                                        </h4>{" "}
                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            {" "}
                                                            <div>
                                                                {" "}
                                                                <label className="mb-2 block text-sm font-medium">
                                                                    {" "}
                                                                    العربية{" "}
                                                                </label>{" "}
                                                                <textarea
                                                                    dir="rtl"
                                                                    rows={4}
                                                                    value={item.content?.description?.ar || ""}
                                                                    onChange={(e) =>
                                                                        handleItemLocalizedChange(
                                                                            index,
                                                                            "description",
                                                                            "ar",
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    placeholder="أدخل وصف العنصر بالعربية"
                                                                    className=" w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary "
                                                                />{" "}
                                                            </div>{" "}
                                                            <div>
                                                                {" "}
                                                                <label className="mb-2 block text-sm font-medium">
                                                                    {" "}
                                                                    English{" "}
                                                                </label>{" "}
                                                                <textarea
                                                                    dir="ltr"
                                                                    rows={4}
                                                                    value={item.content?.description?.en || ""}
                                                                    onChange={(e) =>
                                                                        handleItemLocalizedChange(
                                                                            index,
                                                                            "description",
                                                                            "en",
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    placeholder="Enter item description in English"
                                                                    className=" w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary "
                                                                />{" "}
                                                            </div>{" "}
                                                        </div>{" "}
                                                    </div>{" "}
                                                </div>
                                            )}{" "}
                                        </div>
                                    );
                                })}{" "}
                            </div>
                        )}{" "}
                    </div>{" "}
                    {/* Status */}{" "}
                    {/* <div className=" flex items-center justify-between gap-4 rounded-2xl border border-border p-5 ">
                        {" "}
                        <div>
                            {" "}
                            <h3 className="text-base font-semibold">
                                {" "}
                                {isEn ? "Section Status" : "حالة القسم"}{" "}
                            </h3>{" "}
                            <p className="mt-1 text-sm text-text-secondary">
                                {" "}
                                {isEn
                                    ? "Control whether this section is active"
                                    : "تحكم في ظهور وتفعيل هذا القسم"}{" "}
                            </p>{" "}
                        </div>{" "}
                        <label className="flex cursor-pointer items-center gap-3">
                            {" "}
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={handleActiveChange}
                                className=" h-5 w-5 rounded border-border accent-primary "
                            />{" "}
                            <span className="text-sm font-medium">
                                {" "}
                                {formData.isActive
                                    ? isEn
                                        ? "Active"
                                        : "نشط"
                                    : isEn
                                        ? "Inactive"
                                        : "غير نشط"}{" "}
                            </span>{" "}
                        </label>{" "}
                    </div>{" "} */}
                    {/* Actions */}{" "}
                    <div className=" flex flex-col-reverse gap-3 pt-2 sm:flex-row ">
                        {" "}
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className=" flex-1 rounded-xl border border-border py-3 text-sm transition hover:bg-card-hover disabled:cursor-not-allowed disabled:opacity-50 "
                        >
                            {" "}
                            {isEn ? "Cancel" : "إلغاء"}{" "}
                        </button>{" "}
                        <button
                            type="submit"
                            disabled={loading}
                            className=" flex-1 rounded-xl gradient-button py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 "
                        >
                            {" "}
                            {loading
                                ? isEn
                                    ? "Saving..."
                                    : "جاري الحفظ..."
                                : isEdit
                                    ? isEn
                                        ? "Update Section"
                                        : "تحديث القسم"
                                    : isEn
                                        ? "Create Section"
                                        : "إنشاء القسم"}{" "}
                        </button>{" "}
                    </div>{" "}
                </form>{" "}
            </div>{" "}
        </div>
    );
};
export default PageSectionModal;
