"use client";

import { useCallback, useEffect, useState } from "react";
import {
    createTimelineAction,
    deleteTimelineAction,
    getTimelineAction,
    updateTimelineAction,
} from "@/actions/timelineActions";
import StatusDropdown from "@/components/shared/StatusDropdown";
import DeleteModal from "@/components/ui/modal/DeleteModal";
import Table from "@/components/ui/Table";
import useDeleteModal from "@/hooks/useDeleteModal";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";
import { MdAdd, MdClose, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

const EMPTY_FORM = {
    year: "",
    titleAr: "",
    titleEn: "",
    sortOrder: "",
    isActive: true,
};

const getTranslatedTitle = (item, language) => {
    const translations = item?._translations?.title;
    const rawTitle = typeof item?.title === "object" ? item.title : translations;

    return {
        ar: rawTitle?.ar || (language === "ar" && typeof item?.title === "string" ? item.title : ""),
        en: rawTitle?.en || (language === "en" && typeof item?.title === "string" ? item.title : ""),
    };
};

export default function JourneyTimelineManager() {
    const { language, localize } = useLanguage();
    const isEnglish = language === "en";
    const { successMessage, errorMessage } = useToast();
    const { requestDelete } = useDeleteModal();

    const [items, setItems] = useState([]);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [updatingStatusId, setUpdatingStatusId] = useState(null);

    const loadTimeline = useCallback(async () => {
        setLoading(true);
        const result = await getTimelineAction("limit=100");

        if (result.success) {
            setItems(result.data || []);
        } else {
            errorMessage(result.message || (isEnglish ? "Unable to load milestones" : "تعذر تحميل مراحل الرحلة"));
        }

        setLoading(false);
    }, [errorMessage, isEnglish]);

    useEffect(() => {
        loadTimeline();
    }, [loadTimeline]);

    const resetForm = () => {
        setForm(EMPTY_FORM);
        setEditingId(null);
        setShowForm(false);
    };

    const startCreate = () => {
        setForm(EMPTY_FORM);
        setEditingId(null);
        setShowForm(true);
    };

    const startEdit = (item) => {
        const title = getTranslatedTitle(item, language);
        setForm({
            year: String(item.year || ""),
            titleAr: title.ar,
            titleEn: title.en,
            sortOrder: String(item.sortOrder || 1),
            isActive: item.isActive !== false,
        });
        setEditingId(item._id);
        setShowForm(true);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);

        const data = new FormData(event.currentTarget);
        data.set("isActive", String(form.isActive));
        const result = editingId
            ? await updateTimelineAction(editingId, null, data)
            : await createTimelineAction(null, data);

        if (result.success) {
            successMessage(result.message || (isEnglish ? "Milestone saved successfully" : "تم حفظ مرحلة الرحلة بنجاح"));
            resetForm();
            await loadTimeline();
        } else {
            const validationMessage = Object.values(result.errors || {})
                .flat()
                .find((value) => typeof value === "string" && value);
            errorMessage(validationMessage || result.message || (isEnglish ? "Unable to save milestone" : "تعذر حفظ مرحلة الرحلة"));
        }

        setSaving(false);
    };

    const handleStatusChange = async (itemId, isActive) => {
        setUpdatingStatusId(itemId);
        const data = new FormData();
        data.set("isActive", String(isActive));
        const result = await updateTimelineAction(itemId, null, data);

        if (result.success) {
            successMessage(isEnglish ? "Visibility updated" : "تم تحديث حالة الظهور");
            await loadTimeline();
        } else {
            errorMessage(result.message || (isEnglish ? "Unable to update visibility" : "تعذر تحديث حالة الظهور"));
        }

        setUpdatingStatusId(null);
    };

    const handleDelete = async (itemId) => {
        const result = await deleteTimelineAction(itemId);

        if (result.success) {
            successMessage(result.message || (isEnglish ? "Milestone deleted" : "تم حذف مرحلة الرحلة"));
            if (editingId === itemId) resetForm();
            await loadTimeline();
        } else {
            errorMessage(result.message || (isEnglish ? "Unable to delete milestone" : "تعذر حذف مرحلة الرحلة"));
        }
    };

    const handleDeleteRequest = (item) => {
        requestDelete({
            itemId: item._id,
            title: isEnglish ? "Delete milestone" : "حذف مرحلة من الرحلة",
            message: isEnglish
                ? `Delete the ${item.year} milestone? This action cannot be undone.`
                : `هل تريد حذف مرحلة عام ${item.year}؟ لا يمكن التراجع عن هذا الإجراء.`,
        });
    };

    return (
        <section className="mt-10 border-t border-border pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-text-primary">
                        {isEnglish ? "Journey timeline" : "الخط الزمني للرحلة"}
                    </h2>
                    <p className="mt-1 text-sm text-text-secondary">
                        {isEnglish
                            ? "Add and arrange the milestones displayed on the About page."
                            : "أضف ورتّب المراحل التي تظهر في صفحة من نحن."}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={showForm ? resetForm : startCreate}
                    className="gradient-button inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold text-white"
                >
                    {showForm ? <MdClose size={20} /> : <MdAdd size={20} />}
                    {showForm
                        ? (isEnglish ? "Close form" : "إغلاق النموذج")
                        : (isEnglish ? "Add milestone" : "إضافة مرحلة")}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h3 className="font-bold text-text-primary">
                            {editingId
                                ? (isEnglish ? "Edit milestone" : "تعديل المرحلة")
                                : (isEnglish ? "New milestone" : "مرحلة جديدة")}
                        </h3>
                        {editingId && (
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                {isEnglish ? "Editing" : "قيد التعديل"}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <label className="block text-sm text-text-secondary">
                            <span className="mb-2 block">{isEnglish ? "Year" : "السنة"}</span>
                            <input
                                type="number"
                                name="year"
                                min="1900"
                                max="3000"
                                required
                                value={form.year}
                                onChange={handleChange}
                                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-text-primary outline-none focus:border-primary"
                            />
                        </label>

                        {editingId && (
                            <label className="block text-sm text-text-secondary">
                                <span className="mb-2 block">{isEnglish ? "Display order" : "ترتيب الظهور"}</span>
                                <input
                                    type="number"
                                    name="sortOrder"
                                    min="1"
                                    required
                                    value={form.sortOrder}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-text-primary outline-none focus:border-primary"
                                />
                            </label>
                        )}

                        <label className="block text-sm text-text-secondary">
                            <span className="mb-2 block">{isEnglish ? "Arabic title" : "العنوان بالعربية"}</span>
                            <input
                                type="text"
                                name="titleAr"
                                dir="rtl"
                                minLength="2"
                                maxLength="200"
                                required
                                value={form.titleAr}
                                onChange={handleChange}
                                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-text-primary outline-none focus:border-primary"
                            />
                        </label>

                        <label className="block text-sm text-text-secondary">
                            <span className="mb-2 block">{isEnglish ? "English title" : "العنوان بالإنجليزية"}</span>
                            <input
                                type="text"
                                name="titleEn"
                                dir="ltr"
                                minLength="2"
                                maxLength="200"
                                required
                                value={form.titleEn}
                                onChange={handleChange}
                                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-text-primary outline-none focus:border-primary"
                            />
                        </label>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        <label className="flex items-center gap-2 text-sm text-text-primary">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={form.isActive}
                                onChange={handleChange}
                                className="h-4 w-4 accent-primary"
                            />
                            {isEnglish ? "Show this milestone on the website" : "إظهار هذه المرحلة في الموقع"}
                        </label>

                        <button
                            type="submit"
                            disabled={saving}
                            className="gradient-button rounded-xl px-7 py-3 font-bold text-white disabled:cursor-wait disabled:opacity-60"
                        >
                            {saving
                                ? (isEnglish ? "Saving..." : "جاري الحفظ...")
                                : (isEnglish ? "Save milestone" : "حفظ المرحلة")}
                        </button>
                    </div>
                </form>
            )}

            <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
                {loading ? (
                    <p className="py-12 text-center text-text-secondary">
                        {isEnglish ? "Loading milestones..." : "جاري تحميل مراحل الرحلة..."}
                    </p>
                ) : items.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-text-muted">
                            {isEnglish ? "No milestones have been added yet." : "لم تتم إضافة مراحل للرحلة حتى الآن."}
                        </p>
                    </div>
                ) : (
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.Th>{isEnglish ? "Order" : "الترتيب"}</Table.Th>
                                <Table.Th>{isEnglish ? "Year" : "السنة"}</Table.Th>
                                <Table.Th>{isEnglish ? "Title" : "العنوان"}</Table.Th>
                                <Table.Th>{isEnglish ? "Visibility" : "الظهور"}</Table.Th>
                                <Table.Th>{isEnglish ? "Actions" : "الإجراءات"}</Table.Th>
                            </Table.Row>
                        </Table.Head>

                        <Table.Body>
                            {items.map((item) => {
                                const title = item._translations?.title || item.title;
                                return (
                                    <Table.Row key={item._id}>
                                        <Table.Td>{item.sortOrder}</Table.Td>
                                        <Table.Td>
                                            <span className="font-bold text-primary">{item.year}</span>
                                        </Table.Td>
                                        <Table.Td>
                                            <span className="font-medium text-text-primary">{localize(title, "—")}</span>
                                        </Table.Td>
                                        <Table.Td>
                                            <StatusDropdown
                                                isActive={item.isActive}
                                                disabled={updatingStatusId === item._id}
                                                activeLabel={isEnglish ? "Visible" : "ظاهر"}
                                                inactiveLabel={isEnglish ? "Hidden" : "مخفي"}
                                                onSelect={(status) => handleStatusChange(item._id, status)}
                                            />
                                        </Table.Td>
                                        <Table.Td>
                                            <div className="flex items-center justify-center gap-3 text-xl">
                                                <button
                                                    type="button"
                                                    onClick={() => startEdit(item)}
                                                    className="text-primary transition hover:opacity-70"
                                                    title={isEnglish ? "Edit" : "تعديل"}
                                                >
                                                    <MdOutlineEdit />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteRequest(item)}
                                                    className="text-error transition hover:opacity-70"
                                                    title={isEnglish ? "Delete" : "حذف"}
                                                >
                                                    <MdOutlineDelete />
                                                </button>
                                            </div>
                                        </Table.Td>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                )}
            </div>

            <DeleteModal onConfirmAction={handleDelete} />
        </section>
    );
}
