import PasswordCard from "@/components/profile/PasswordCard";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import ProfileHeroCard from "@/components/profile/ProfileHeroCard";

export default function StudentProfile() {
    return (
        <div className="space-y-6">
            <ProfileHeroCard />
            <PersonalInfoCard />
            <PasswordCard />
        </div>
    );
}
