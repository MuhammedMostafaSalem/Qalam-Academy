"use client";

import { useState, useEffect } from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import LoadMore from "@/components/shared/LoadMore";
import ActionsTable from "@/components/shared/ActionsTable";
import useTeam from "@/hooks/team/useTeam";
import useToast from "@/hooks/useToast";
import { deleteTeamMemberAction } from "@/actions/teamActions";
import userIcon from "@/public/assets/user-icon.png";
import UpdateTeamModal from "@/components/ui/modal/team/UpdateTeamModal";
import { useLanguage } from "@/providers/LanguageProvider";
import { useSearchParams } from "next/navigation";

const TeamTable = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const searchParams = useSearchParams();
    const { team, loading, error, meta, refetch } = useTeam(searchParams.toString());
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);
    const [editingTeamMember, setEditingTeamMember] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        const handleTeamUpdated = () => {
            refetch();
        };
        window.addEventListener("team-updated", handleTeamUpdated);
        return () => {
            window.removeEventListener("team-updated", handleTeamUpdated);
        };
    }, [refetch]);

    const titleHead = isEn ? [
        "Member",
        "Position",
        "Creation Date",
        "Actions",
    ] : [
        "العضو",
        "المنصب",
        "تاريخ الإنشاء",
        "الإجراءات",
    ];

    const handleDelete = async (memberId) => {
        if (!confirm(isEn ? "Are you sure you want to delete this team member?" : "هل أنت متأكد من حذف هذا العضو من الفريق؟")) return;

        setDeletingId(memberId);
        const result = await deleteTeamMemberAction(memberId);

        if (result.success) {
            successMessage(result.message || (isEn ? "Team member deleted successfully" : "تم حذف العضو بنجاح"));
            refetch();
        } else {
            errorMessage(result.message || (isEn ? "Failed to delete team member" : "فشل حذف العضو"));
        }

        setDeletingId(null);
    };

    const handleEditClick = (member) => {
        setEditingTeamMember(member);
        setIsUpdateModalOpen(true);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">{isEn ? "Loading team members..." : "جاري تحميل أعضاء الفريق..."}</p>
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
                    {isEn ? "No team members available" : "لا يوجد أعضاء فريق متاحون"}
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
                                            {member.createdAt
                                                ? new Date(member.createdAt).toLocaleDateString(isEn ? "en-US" : "ar-EG")
                                                : "—"}
                                        </Table.Td>

                                        <Table.Td>
                                            <ActionsTable
                                                actions={
                                                    <div className="flex gap-3 justify-center items-center text-[20px]">
                                                        <MdOutlineEdit 
                                                            className="text-primary cursor-pointer" 
                                                            onClick={() => handleEditClick(member)}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="text-error cursor-pointer"
                                                            onClick={() => handleDelete(member._id)}
                                                            disabled={deletingId === member._id}
                                                        >
                                                            {deletingId === member._id ? (
                                                                <span className="text-sm">...</span>
                                                            ) : (
                                                                <MdOutlineDelete />
                                                            )}
                                                        </button>
                                                    </div>
                                                }
                                            />
                                        </Table.Td>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>

                    {meta?.hasMore && <LoadMore />}

                    <UpdateTeamModal
                        isOpen={isUpdateModalOpen}
                        onClose={() => {
                            setIsUpdateModalOpen(false);
                            setEditingTeamMember(null);
                        }}
                        teamMember={editingTeamMember}
                        onSuccess={() => {
                            setIsUpdateModalOpen(false);
                            setEditingTeamMember(null);
                            refetch();
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default TeamTable;
