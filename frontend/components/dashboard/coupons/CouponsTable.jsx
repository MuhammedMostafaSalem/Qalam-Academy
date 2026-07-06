import Table from "@/components/ui/Table";
import coupons from "./coupons";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import ActionsTable from "@/components/shared/ActionsTable";

const CouponsTable = () => {
    const titleHead = [
        "الكوبون",
        "قيمة الخصم",
        "الاستخدام",
        "تاريخ الانتهاء",
        "الحالة",
        "الإجراءات",
    ];

    return (
        <div className="mt-[20px]">
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
                        <Table.Row key={coupon.id}>
                            <Table.Td>{coupon.coupon}</Table.Td>

                            <Table.Td>{coupon.DiscountValue}</Table.Td>

                            <Table.Td>{coupon.used}</Table.Td>

                            <Table.Td>{coupon.createdAt}</Table.Td>

                            <Table.Td>{coupon.status}</Table.Td>

                            <Table.Td>
                                <ActionsTable
                                    actions={
                                        <div className="flex gap-3 justify-center items-center text-[20px]">
                                            <MdOutlineEdit className="text-primary cursor-pointer" />
                                            <div className="text-error cursor-pointer">
                                                <MdOutlineDelete />
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
    )
}

export default CouponsTable