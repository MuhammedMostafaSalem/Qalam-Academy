"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import userIcon from '@/public/assets/user-icon.png';
import RoleDropdown from "@/components/shared/RoleDropdown";
import StatusDropdown from "@/components/shared/StatusDropdown";
import DeleteModal from "@/components/ui/modal/DeleteModal";
import useUserActions from "@/hooks/users/useUserActions";
import { useLanguage } from "@/providers/LanguageProvider";

const UsersTable = ({ users = [], refetch, hasMore = false, onLoadMore, loadingMore = false }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const {
        handleUpdateField,
        handleDelete,
        handleDeleteRequest
    } = useUserActions(refetch);

    const titleHead = isEn ? [
        "User",
        "Role",
        "Status",
        "Creation Date",
        "Actions",
    ] : [
        "المستخدم",
        "الدور",
        "الحالة",
        "تاريخ الإنشاء",
        "الإجراءات",
    ];

    return (
        <div className="mt-[20px]">
            <div className="overflow-x-auto min-h-[250px] pb-10">
                <Table>
                    <Table.Head>
                        <Table.Row>
                            {titleHead.map((title, index) => (
                                <Table.Th key={index}>{title}</Table.Th>
                            ))}
                        </Table.Row>
                    </Table.Head>

                    <Table.Body>
                        {users.length === 0 ? (
                            <Table.Row>
                                <Table.Td colSpan={5}>
                                    <div className="text-center py-6 text-text-muted">
                                        {isEn ? "No users available" : "لا يوجد مستخدمين متاحين"}
                                    </div>
                                </Table.Td>
                            </Table.Row>
                        ) : (
                            users.map(user => (
                                <Table.Row key={user._id}>
                                    <Table.Td>
                                        <CardTable
                                            data={{
                                                image: user.avatar || userIcon,
                                                name: `${user.firstName} ${user.lastName}`,
                                                description: user.email,
                                            }}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        <RoleDropdown
                                            currentRole={user.role}
                                            onSelect={(newRole) => handleUpdateField(user._id, "role", newRole)}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        <StatusDropdown
                                            isActive={user.isActive}
                                            onSelect={(newStatus) => handleUpdateField(user._id, "isActive", newStatus)}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        {user.createdAt
                                            ? new Date(user.createdAt).toLocaleDateString(isEn ? "en-US" : "ar-EG")
                                            : "—"}
                                    </Table.Td>

                                    <Table.Td>
                                        <ActionsTable
                                            actions={
                                                <div className="flex gap-3 justify-center items-center text-[20px]">
                                                    <div
                                                        onClick={() => handleDeleteRequest(user)}
                                                        className="text-error cursor-pointer hover:opacity-80 transition"
                                                        title={isEn ? "Delete User" : "حذف المستخدم"}
                                                    >
                                                        <MdOutlineDelete />
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </Table.Td>
                                    
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
                <DeleteModal onConfirmAction={handleDelete} />

                {hasMore && <LoadMore onClick={onLoadMore} loading={loadingMore} />}
            </div>
        </div>
    );
};

export default UsersTable;
