"use client";

import { getMyProductsAction } from "@/actions/enrollmentActions";
import ActionsTable from "@/components/shared/ActionsTable";
import LoadMore from "@/components/shared/LoadMore";
import Table from "@/components/ui/Table";
import { useEffect, useState } from "react";
import {
    HiOutlineArrowDownTray,
    HiOutlineDocument,
    HiOutlineArchiveBox,
    HiOutlineFilm,
    HiOutlineCodeBracket,
} from "react-icons/hi2";

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
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError(err?.message || "حدث خطأ غير متوقع");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="py-10 text-center text-gray-500">
                جاري تحميل الملفات...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-10 text-center text-red-500">
                {error}
            </div>
        );
    }

    if (!enrollments || enrollments.length === 0) {
        return (
            <div className="py-10 text-center text-gray-500">
                لا يوجد ملفات متاحة للتحميل
            </div>
        );
    }

    return (
        <div>
            <Table>
                <Table.Head>
                    <Table.Row
                        className="
                            text-right
                        "
                    >
                        <Table.Th>
                            الملف
                        </Table.Th>

                        <Table.Th>
                            الكورس
                        </Table.Th>

                        <Table.Th>
                            الحجم
                        </Table.Th>

                        <Table.Th>
                            النوع
                        </Table.Th>

                        <Table.Th>
                            تاريخ الإضافة
                        </Table.Th>

                        <Table.Th>
                            تحميل
                        </Table.Th>
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {enrollments.map((enrollment) => {
                        const fileType = enrollment.product?.pdf ? "PDF" : "ZIP";
                        const Icon = getIcon(fileType);
                        const fileName = enrollment.product?.title || "—";
                        const downloadUrl = enrollment.product?.pdf || null;
                        const purchaseDate = enrollment.createdAt
                            ? new Date(enrollment.createdAt).toLocaleDateString("ar-EG")
                            : "—";

                        return (
                            <Table.Row
                                key={enrollment._id}
                            >
                                <Table.Td>
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >
                                        <div
                                            className="
                                                text-primary
                                            "
                                        >
                                            <Icon size={22} />
                                        </div>

                                        <span className="font-medium">
                                            {fileName}
                                        </span>
                                    </div>
                                </Table.Td>

                                <Table.Td>
                                    {enrollment.product?.title || "—"}
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
                                                    <a
                                                        href={downloadUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        download
                                                    >
                                                        <HiOutlineArrowDownTray size={18} />
                                                    </a>
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

            <LoadMore />
        </div>
    );
};

export default DownloadsTable;