import Table from "@/components/ui/Table";
import {
    HiOutlineBanknotes,
    HiOutlineEye
} from "react-icons/hi2";

const payments = [
    {
        id: "TXN-10001",
        order: "#ORD-1001",
        method: "Visa",
        amount: "999 ج.م",
        status: "ناجحة",
        date: "10 يوليو 2026",
    },
    {
        id: "TXN-10002",
        order: "#ORD-1002",
        method: "Instapay",
        amount: "350 ج.م",
        status: "قيد المعالجة",
        date: "8 يوليو 2026",
    },
    {
        id: "TXN-10003",
        order: "#ORD-1003",
        method: "Vodafone Cash",
        amount: "1650 ج.م",
        status: "مستردة",
        date: "5 يوليو 2026",
    },
    {
        id: "TXN-10004",
        order: "#ORD-1004",
        method: "Fawry",
        amount: "220 ج.م",
        status: "فشلت",
        date: "2 يوليو 2026",
    },
];

const methodIcons = {
    Visa: HiOutlineBanknotes,
    MasterCard: HiOutlineBanknotes,
    Instapay: HiOutlineBanknotes,
    "Vodafone Cash": HiOutlineBanknotes,
    Fawry: HiOutlineBanknotes,
    PayPal: HiOutlineBanknotes,
    "Apple Pay": HiOutlineBanknotes,
    "Google Pay": HiOutlineBanknotes,
};

const statusColors = {
    "ناجحة": "bg-green-500/10 text-green-600",
    "قيد المعالجة": "bg-yellow-500/10 text-yellow-600",
    "فشلت": "bg-red-500/10 text-red-600",
    "مستردة": "bg-blue-500/10 text-blue-600",
};

const PaymentHistoryTable = () => {
    return (
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Th>رقم العملية</Table.Th>

                    <Table.Th>رقم الطلب</Table.Th>

                    <Table.Th>وسيلة الدفع</Table.Th>

                    <Table.Th>المبلغ</Table.Th>

                    <Table.Th>التاريخ</Table.Th>

                    <Table.Th>الحالة</Table.Th>

                    <Table.Th>الإيصال</Table.Th>
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {payments.map((payment) => {
                    const Icon =
                        methodIcons[payment.method] ||
                        HiOutlineBanknotes;

                    return (
                        <Table.Row
                            key={payment.id}
                        >
                            <Table.Td>
                                {payment.id}
                            </Table.Td>

                            <Table.Td>
                                {payment.order}
                            </Table.Td>

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
                                            flex

                                            h-10
                                            w-10

                                            items-center
                                            justify-center

                                            rounded-xl

                                            bg-primary/10

                                            text-primary
                                        "
                                    >
                                        <Icon size={20} />
                                    </div>

                                    {payment.method}
                                </div>
                            </Table.Td>

                            <Table.Td>
                                {payment.amount}
                            </Table.Td>

                            <Table.Td>
                                {payment.date}
                            </Table.Td>

                            <Table.Td>
                                <span
                                    className={`
                                            rounded-full

                                            px-3
                                            py-1

                                            text-xs

                                            font-medium

                                            ${statusColors[payment.status]}
                                        `}
                                >
                                    {payment.status}
                                </span>
                            </Table.Td>

                            <Table.Td>
                                <div
                                    className="
                                        flex
                                        justify-center
                                    "
                                >
                                    <button
                                        className="
                                                flex

                                                items-center
                                                gap-2
                                                
                                                px-4
                                                py-2

                                                text-sm
                                            "
                                    >
                                        <HiOutlineEye size={18} />
                                    </button>
                                </div>
                            </Table.Td>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default PaymentHistoryTable;