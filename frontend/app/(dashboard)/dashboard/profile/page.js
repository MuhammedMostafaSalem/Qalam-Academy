import ProfileHeader from "@/components/dashboard/profile/ProfileHeader";
import PasswordCard from "@/components/profile/PasswordCard";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import ProfileHeroCard from "@/components/profile/ProfileHeroCard";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/profile",
        title: {
            ar: "الملف الشخصي للمشرف",
            en: "Admin Profile",
        },
        noIndex: true,
    });
}

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