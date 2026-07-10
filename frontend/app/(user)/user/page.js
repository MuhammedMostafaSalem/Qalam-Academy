import PageHeader from "@/components/dashboard/PageHeader";
import StatsCards from "@/components/ui/StatsCards";
import ContinueLearning from "@/components/user/dashboard/home/ContinueLearning";
import MyCoursesPreview from "@/components/user/dashboard/home/MyCoursesPreview";
import userDahsboardStats from "@/constants/userDashboardStats";

export default function UserDashboard() {
    
    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
                space-y-6
            "
        >
            <PageHeader
                title="مرحبًا بعودتك، مروان سالم"
                description="جاهز تكمل رحلتك التعليمية؟"
            />
            <StatsCards stats={userDahsboardStats} />
            <ContinueLearning />
            <MyCoursesPreview />
        </div>
    )
}