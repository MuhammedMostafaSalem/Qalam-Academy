"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import LoadMore from "@/components/shared/LoadMore";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import usePartners from "@/hooks/partners/usePartners";
import { deletePartnerAction } from "@/actions/partnerActions";
import useToast from "@/hooks/useToast";

const PartnersTable = () => {
    const { partners, loading, error, meta, refetch } = usePartners();
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);

    const titleHead = [
        "الشريك",
        "الرابط",
        "تاريخ الاضافة",
        "الإجراءات",
    ];

    const handleDelete = async (partnerId) => {
        if (!confirm("هل أنت متأكد من حذف هذا الشريك؟")) return;

        setDeletingId(partnerId);
        const result = await deletePartnerAction(partnerId);

        if (result.success) {
            successMessage(result.message || "تم حذف الشريك بنجاح");
            refetch();
        } else {
            errorMessage(result.message || "فشل حذف الشريك");
        }

        setDeletingId(null);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">جاري التحميل...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-error">{error}</p>
            </div>
        );
    }

    if (!partners || partners.length === 0) {
        return (
            <div className="mt-[20px] text-center py-10">
                <div className="text-center py-6 text-text-muted">لا يوجد بيانات متاحة</div>
            </div>
        );
    }

    return (
        <div className="mt-[20px]">
            <div className="overflow-x-auto overflow-y-hidden">
                <Table>
                    <Table.Head>
                        <Table.Row>
                            {titleHead.map((title, index) => (
                                <Table.Th key={index}>{title}</Table.Th>
                            ))}
                        </Table.Row>
                    </Table.Head>

                    <Table.Body>
                        {partners.map((partner) => (
                            <Table.Row key={partner._id}>
                                <Table.Td>
                                    <CardTable
                                        data={{
                                            id: partner._id,
                                            image: partner.image,
                                            name: partner.name,
                                        }}
                                    />
                                </Table.Td>

                                <Table.Td>
                                    {partner.website ? (
                                        <a
                                            href={partner.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {partner.website}
                                        </a>
                                    ) : (
                                        "—"
                                    )}
                                </Table.Td>

                                <Table.Td>
                                    {partner.createdAt
                                        ? new Date(partner.createdAt).toLocaleDateString("ar-EG")
                                        : "—"}
                                </Table.Td>

                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div className="flex gap-3 justify-center items-center text-[20px]">
                                                <MdOutlineEdit className="text-primary cursor-pointer" />
                                                <button
                                                    onClick={() => handleDelete(partner._id)}
                                                    disabled={deletingId === partner._id}
                                                    className="text-error cursor-pointer disabled:opacity-50"
                                                    type="button"
                                                >
                                                    <MdOutlineDelete />
                                                </button>
                                            </div>
                                        }
                                    />
                                </Table.Td>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            {meta && meta.hasMore && <LoadMore />}
        </div>
    );
};

export default PartnersTable;