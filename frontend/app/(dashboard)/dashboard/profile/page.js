import ProfileHeader from "@/components/dashboard/profile/ProfileHeader";
import PasswordCard from "@/components/profile/PasswordCard";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import ProfileHeroCard from "@/components/profile/ProfileHeroCard";

export default function AdminProfile () {
    return (
        <>
            {/* <ProfileHeader /> */}
            <ProfileHeroCard />
            {/* تعديل البيانات الشخصية */}
            <PersonalInfoCard />
            {/* مسؤولة عن تغيير كلمة المرور فقط */}
            <PasswordCard />
        </>
    )
}