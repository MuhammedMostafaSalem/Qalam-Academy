"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import LoadMore from "@/components/shared/LoadMore";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import useTeam from "@/hooks/team/useTeam";
import useToast from "@/hooks/useToast";
import { deleteTeamMemberAction } from "@/actions/teamActions";
import { useState } from "react";
import userIcon from "@/public/assets/user-icon.png";

const TeamTable = () => {
    const { team, loading, error, refetch } = useTeam();
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);

    const titleHead = [
        "العضو",
        "المنصب",
        "تاريخ الإنشاء",
        "الإجراءات",
    ];

    const handleDelete = async (memberId) => {
        if (!confirm("هل أنت متأكد من حذف هذا العضو من الفريق؟")) return;

        setDeletingId(memberId);
        const result = await deleteTeamMemberAction(memberId);

        if (result.success) {
            successMessage(result.message || "تم حذف العضو بنجاح");
            refetch();
        } else {
            errorMessage(result.message || "فشل حذف العضو");
        }

        setDeletingId(null);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">جاري تحميل أعضاء الفريق...</p>
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
            {team.length === 0 ? (
                <div className="text-center py-6 text-text-muted">
                    لا يوجد أعضاء فريق متاحون
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
                            {team.map(member => {
                                const user = member.user;
                                return (
                                    <Table.Row key={member._id}>
                                        <Table.Td>
                                            <CardTable
                                                data={{
                                                    image: user?.avatar || userIcon,
                                                    name: user ? `${user.firstName} ${user.lastName}` : "—",
                                                    description: user?.email || "",
                                                }}
                                            />
                                        </Table.Td>

                                        <Table.Td>{member.position || "—"}</Table.Td>

                                        <Table.Td>
                                            {new Date(member.createdAt).toLocaleDateString("ar-EG")}
                                        </Table.Td>

                                        <Table.Td>
                                            <ActionsTable
                                                actions={
                                                    <div className="flex gap-3 justify-center items-center text-[20px]">
                                                        <MdOutlineEdit className="text-primary cursor-pointer" />
                                                        <div
                                                            className="text-error cursor-pointer"
                                                            onClick={() => handleDelete(member._id)}
                                                        >
                                                            {deletingId === member._id ? (
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
                                );
                            })}
                        </Table.Body>
                    </Table>

                    <LoadMore />
                </div>
            )}
        </div>
    );
};

export default TeamTable;