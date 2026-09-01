"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import StatusDropdown from "@/components/shared/StatusDropdown";
import { MdOutlineDelete } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import userIcon from '@/public/assets/user-icon.png';
import useUserActions from "@/hooks/users/useUserActions";
import { useLanguage } from "@/providers/LanguageProvider";
import DeleteModal from "@/components/ui/modal/DeleteModal";

const StudentsTable = ({ students = [], refetch, hasMore = false, onLoadMore, loadingMore = false }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const {
        handleUpdateField,
        handleDelete,
        handleDeleteRequest
    } = useUserActions(refetch);

    const titleHead = isEn ? [
        "Student",
        "Status",
        "Registration Date",
        "Actions",
    ] : [
        "الطالب",
        "الحالة",
        "تاريخ التسجيل",
        "الإجراءات",
    ];

    return (
        <div className="mt-[20px]">
            {students.length === 0 ? (
                <div className="text-center py-6 text-text-muted">
                    {isEn ? "No students available" : "لا يوجد طلاب متاحين"}
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
                            {students.map(student => (
                                <Table.Row key={student._id}>
                                    <Table.Td>
                                        <CardTable
                                            data={{
                                                image: student.avatar || userIcon,
                                                name: `${student.firstName} ${student.lastName}`,
                                                description: student.email,
                                            }}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        <StatusDropdown
                                            isActive={student.isActive}
                                            onSelect={(newStatus) => handleUpdateField(student._id, "isActive", newStatus)}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        {student.createdAt
                                            ? new Date(student.createdAt).toLocaleDateString(isEn ? "en-US" : "ar-EG")
                                            : "—"}
                                    </Table.Td>

                                    <Table.Td>
                                        <ActionsTable
                                            actions={
                                                <div className="flex gap-3 justify-center items-center text-[20px]">
                                                    <div
                                                        onClick={() => handleDeleteRequest(student)}
                                                        className="text-error cursor-pointer hover:opacity-80 transition"
                                                        title={isEn ? "Delete Student" : "حذف الطالب"}
                                                    >
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

                    {hasMore && <LoadMore onClick={onLoadMore} loading={loadingMore} />}
                    <DeleteModal onConfirmAction={handleDelete} />
                </div>
            )}
        </div>
    );
};

export default StudentsTable;
