"use client";

import Table from "@/components/ui/Table";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import ActionsTable from "@/components/shared/ActionsTable";
import useCoupons from "@/hooks/coupons/useCoupons";
import useToast from "@/hooks/useToast";
import { deleteCouponAction } from "@/actions/couponActions";
import { useState } from "react";

const CouponsTable = () => {
    const { coupons, loading, error, refetch } = useCoupons();
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);

    const titleHead = [
        "الكوبون",
        "قيمة الخصم",
        "تاريخ الانتهاء",
        "الحالة",
        "الإجراءات",
    ];

    const handleDelete = async (couponId) => {
        if (!confirm("هل أنت متأكد من حذف هذا الكوبون؟")) return;

        setDeletingId(couponId);
        const result = await deleteCouponAction(couponId);

        if (result.success) {
            successMessage(result.message || "تم حذف الكوبون بنجاح");
            refetch();
        } else {
            errorMessage(result.message || "فشل حذف الكوبون");
        }

        setDeletingId(null);
    };

    const isExpired = (expireDate) => {
        return new Date(expireDate) < new Date();
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">جاري تحميل الكوبونات...</p>
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

    return (
        <div className="mt-[20px]">
            {coupons.length === 0 ? (
                <div className="text-center py-6 text-text-muted">
                    لا يوجد كوبونات متاحة
                </div>
            ) : (
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
                            {coupons.map(coupon => (
                                <Table.Row key={coupon._id}>
                                    <Table.Td>
                                        <span className="font-mono font-bold text-primary">
                                            {coupon.name}
                                        </span>
                                    </Table.Td>

                                    <Table.Td>{coupon.discount}%</Table.Td>

                                    <Table.Td>
                                        {new Date(coupon.expire).toLocaleDateString("ar-EG")}
                                    </Table.Td>

                                    <Table.Td>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                isExpired(coupon.expire)
                                                    ? "bg-error/20 text-error"
                                                    : "bg-success/20 text-success"
                                            }`}
                                        >
                                            {isExpired(coupon.expire) ? "منتهي" : "نشط"}
                                        </span>
                                    </Table.Td>

                                    <Table.Td>
                                        <ActionsTable
                                            actions={
                                                <div className="flex gap-3 justify-center items-center text-[20px]">
                                                    <MdOutlineEdit className="text-primary cursor-pointer" />
                                                    <div
                                                        className="text-error cursor-pointer"
                                                        onClick={() => handleDelete(coupon._id)}
                                                    >
                                                        {deletingId === coupon._id ? (
                                                            <span className="text-sm">...</span>
                                                        ) : (
                                                            <MdOutlineDelete />
                                                        )}
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </Table.Td>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>

                    <LoadMore />
                </div>
            )}
        </div>
    );
};

export default CouponsTable;