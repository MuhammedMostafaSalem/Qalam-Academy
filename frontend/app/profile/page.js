import ProfileHeader from "@/components/dashboard/profile/ProfileHeader";
import PasswordCard from "@/components/profile/PasswordCard";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import ProfileHeroCard from "@/components/profile/ProfileHeroCard";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function AdminProfile () {
    return (
        <div className="p-[20px] flex flex-col gap-4">
            <Breadcrumb />
            {/* <ProfileHeader /> */}
            <ProfileHeroCard />
            {/* تعديل البيانات الشخصية */}
            <PersonalInfoCard />
            {/* مسؤولة عن تغيير كلمة المرور فقط */}
            <PasswordCard />
        </div>
    )
}