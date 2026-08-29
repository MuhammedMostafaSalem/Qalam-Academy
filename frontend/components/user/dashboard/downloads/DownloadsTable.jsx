"use client";

import { getMyProductsAction } from "@/actions/enrollmentActions";
import ActionsTable from "@/components/shared/ActionsTable";
import Table from "@/components/ui/Table";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";
import {
    HiOutlineArrowDownTray,
    HiOutlineDocument,
    HiOutlineArchiveBox,
    HiOutlineFilm,
    HiOutlineCodeBracket,
} from "react-icons/hi2";
import useToast from "@/hooks/useToast";

const getIcon = (type) => {
    switch (type) {
        case "PDF":
            return HiOutlineDocument;
        case "ZIP":
            return HiOutlineArchiveBox;
        case "Video":
            return HiOutlineFilm;
        case "Code":
            return HiOutlineCodeBracket;
        default:
            return HiOutlineDocument;
    }
};

const DownloadsTable = () => {
    const { language, localize } = useLanguage();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [downloadingKey, setDownloadingKey] = useState(null);
    const { successMessage, errorMessage } = useToast();
    const searchParams = useSearchParams();

    const searchQuery = (searchParams.get("search") || "").toLowerCase().trim();
    const typeFilter = searchParams.get("type") || "all";

    const handleDownload = async (url, fileName, key) => {
        if (!url || downloadingKey) return;

        setDownloadingKey(key);
        try {
            const response = await fetch(url, { credentials: "include" });
            if (!response.ok) throw new Error(`Download failed (${response.status})`);

            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            const safeName = fileName.replace(/[\\/:*?"<>|]+/g, "-").trim() || "download";

            anchor.href = objectUrl;
            anchor.download = safeName.toLowerCase().endsWith(".pdf") ? safeName : `${safeName}.pdf`;
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(objectUrl);
            successMessage(language === "en" ? "Download started" : "بدأ تحميل الملف");
        } catch {
            errorMessage(language === "en" ? "Unable to download this file" : "تعذر تحميل هذا الملف");
        } finally {
            setDownloadingKey(null);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getMyProductsAction();
                if (result.success) {
                    setEnrollments(result.data || []);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError(err?.message || (language === "en" ? "An unexpected error occurred" : "حدث خطأ غير متوقع"));
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [language]);

    if (loading) {
        return (
            <div className="py-10 text-center text-text-secondary">
                {language === "en" ? "Loading downloads..." : "جاري تحميل الملفات..."}
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-10 text-center text-error">
                {error}
            </div>
        );
    }

    if (!enrollments || enrollments.length === 0) {
        return (
            <div className="py-10 text-center text-text-muted">
                {language === "en" ? "No downloads available" : "لا يوجد ملفات متاحة للتحميل"}
            </div>
        );
    }

    // Filter downloads based on URL query parameters
    const filteredEnrollments = enrollments.filter((enrollment) => {
        const titleStr = localize(enrollment.product?.title).toLowerCase();

        const matchesSearch = !searchQuery || titleStr.includes(searchQuery);

        const fileType = enrollment.product?.pdf ? "PDF" : "—";
        const matchesType = typeFilter === "all" || fileType === typeFilter;

        return matchesSearch && matchesType;
    });

    if (filteredEnrollments.length === 0) {
        return (
            <div className="py-10 text-center text-text-muted">
                {language === "en" ? "No files match your search and filter criteria" : "لا توجد ملفات تطابق خيارات التصفية والبحث المختارة"}
            </div>
        );
    }

    return (
        <div>
            <Table>
                <Table.Head>
                    <Table.Row>
                        <Table.Th>{language === "en" ? "File" : "الملف"}</Table.Th>
                        <Table.Th>{language === "en" ? "Product / Course" : "المنتج / الكورس"}</Table.Th>
                        <Table.Th>{language === "en" ? "Size" : "الحجم"}</Table.Th>
                        <Table.Th>{language === "en" ? "Type" : "النوع"}</Table.Th>
                        <Table.Th>{language === "en" ? "Date Added" : "تاريخ الإضافة"}</Table.Th>
                        <Table.Th>{language === "en" ? "Download" : "تحميل"}</Table.Th>
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {filteredEnrollments.map((enrollment, index) => {
                        const fileType = enrollment.product?.pdf ? "PDF" : "—";
                        const Icon = getIcon(fileType);
                        const fileName = localize(enrollment.product?.title, "—");

                        const rawPdf = enrollment.product?.pdf;
                        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
                        const downloadUrl = rawPdf
                            ? (rawPdf.startsWith("http") ? rawPdf : `${baseUrl}${rawPdf}`)
                            : null;

                        const dateLocale = language === "en" ? "en-US" : "ar-EG";
                        const purchaseDate = enrollment.purchasedAt || enrollment.createdAt
                            ? new Date(enrollment.purchasedAt || enrollment.createdAt).toLocaleDateString(dateLocale)
                            : "—";

                        const uniqueKey = enrollment._id || enrollment.id || `enrollment-${index}`;

                        return (
                            <Table.Row key={uniqueKey}>
                                <Table.Td>
                                    <div className="flex items-center gap-3">
                                        <div className="text-primary">
                                            <Icon size={22} />
                                        </div>
                                        <span className="font-medium">{fileName}</span>
                                    </div>
                                </Table.Td>

                                <Table.Td>
                                    {fileName}
                                </Table.Td>

                                <Table.Td>
                                    —
                                </Table.Td>

                                <Table.Td>
                                    {fileType}
                                </Table.Td>

                                <Table.Td>
                                    {purchaseDate}
                                </Table.Td>

                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div className="flex gap-3 justify-center items-center text-[20px]">
                                                {downloadUrl ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDownload(downloadUrl, fileName, uniqueKey)}
                                                        disabled={downloadingKey === uniqueKey}
                                                        title={language === "en" ? "Download File" : "تحميل الملف"}
                                                        className="text-primary transition hover:text-primary-hover disabled:cursor-wait disabled:opacity-50"
                                                    >
                                                        <HiOutlineArrowDownTray size={18} className={downloadingKey === uniqueKey ? "animate-bounce" : ""} />
                                                    </button>
                                                ) : (
                                                    <span className="opacity-40 cursor-not-allowed">
                                                        <HiOutlineArrowDownTray size={18} />
                                                    </span>
                                                )}
                                            </div>
                                        }
                                    />
                                </Table.Td>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </div>
    );
};

export default DownloadsTable;
