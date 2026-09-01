import PasswordCard from "@/components/profile/PasswordCard";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import ProfileHeroCard from "@/components/profile/ProfileHeroCard";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/user/profile",
        title: {
            ar: "الملف الشخصي",
            en: "My Profile",
        },
        description: {
            ar: "تعديل البيانات الشخصية وكلمة المرور في أكاديمية قلم.",
            en: "Update your personal information and password settings on Qalam Academy.",
        },
        noIndex: true,
    });
}

export default function StudentProfile() {
    return (
        <div className="space-y-6">
            <ProfileHeroCard />
            <PersonalInfoCard />
            <PasswordCard />
        </div>
    );
}
