"use client";

import Section from "@/components/sections/Section";
import ActionsTable from "@/components/shared/ActionsTable";
import Table from "@/components/ui/Table";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState, useEffect } from "react";
import useMessages from "@/hooks/messages/useMessages";
import { deleteMessageAction } from "@/actions/contactActions";
import useToast from "@/hooks/useToast";

const MessagesTable = ({ setMessagesLength }) => {
    const { messages, loading, error, refetch } = useMessages();
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        if (messages) {
            setMessagesLength(messages.length);
        } else {
            setMessagesLength(0);
        }
    }, [messages, setMessagesLength]);

    const handleDelete = async (messageId) => {
        if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;

        setDeletingId(messageId);
        const result = await deleteMessageAction(messageId);

        if (result.success) {
            successMessage(result.message || "تم حذف الرسالة بنجاح");
            refetch();
        } else {
            errorMessage(result.message || "فشل حذف الرسالة");
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

    if (!messages || messages.length === 0) {
        return (
            <div className="mt-[20px] text-center py-10">
                <div className="text-center py-6 text-text-muted">لا يوجد بيانات متاحة</div>
            </div>
        );
    }
    
    return (
        <Section className="overflow-x-auto">
            <div className="overflow-x-auto overflow-y-hidden">
                <Table className="w-full min-w-[1000px]">
                    <Table.Head>
                        <Table.Row>
                            <Table.Th>الاسم</Table.Th>
                            <Table.Th>البريد</Table.Th>
                            <Table.Th>الموضوع</Table.Th>
                            <Table.Th>الرسالة</Table.Th>
                            <Table.Th>التاريخ</Table.Th>
                            <Table.Th>الإجراءات</Table.Th>
                        </Table.Row>
                    </Table.Head>

                    <Table.Body>
                        {messages.map((message) => (
                            <Table.Row key={message._id}>
                                <Table.Td>{message.name || "—"}</Table.Td>

                                <Table.Td>{message.email || "—"}</Table.Td>

                                <Table.Td>
                                    <p className="max-w-xs truncate">{message.subject || "—"}</p>
                                </Table.Td>

                                <Table.Td>
                                    <p className="max-w-xs truncate">
                                        {message.message
                                            ? message.message.slice(0, 50) + (message.message.length > 50 ? "..." : "")
                                            : "—"}
                                    </p>
                                </Table.Td>

                                <Table.Td>
                                    {message.createdAt
                                        ? new Date(message.createdAt).toLocaleDateString("ar-EG")
                                        : "—"}
                                </Table.Td>

                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div className="flex justify-center items-center gap-4 text-[20px]">
                                                <button
                                                    onClick={() => handleDelete(message._id)}
                                                    disabled={deletingId === message._id}
                                                    className="cursor-pointer text-error disabled:opacity-50"
                                                    type="button"
                                                >
                                                    <HiOutlineTrash />
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
        </Section>
    );
};

export default MessagesTable;