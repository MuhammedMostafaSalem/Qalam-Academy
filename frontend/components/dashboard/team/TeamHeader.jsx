"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddTeamModal from "@/components/ui/modal/team/AddTeamModal";
import { useRouter } from "next/navigation";

const TeamHeader = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="أعضاء الفريق"
                description="ادارة وعرض جميع أعضاء الفريق"
                button="اضافة عضو جديد"
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddTeamModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    router.refresh(); // Refresh the page to show new team member
                }}
            />
        </>
    );
};

export default TeamHeader;
