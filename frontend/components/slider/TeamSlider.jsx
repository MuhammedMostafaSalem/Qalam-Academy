"use client";

import TeamCard from "../about/team/TeamCard";
import Slider from "@/components/ui/Slider";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { getTeamAction } from "@/actions/teamActions";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const TeamSlider = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTeamAction("limit=20").then((result) => {
            if (result.success) setTeamMembers(result.data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="py-10 text-center text-text-secondary">
                جاري تحميل الفريق...
            </div>
        );
    }

    if (teamMembers.length === 0) {
        return (
            <div className="py-10 text-center text-text-muted">
                لا يوجد أعضاء في الفريق حالياً
            </div>
        );
    }

    return (
        <Slider
            ButtonPrev={
                <button className="team-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                    <IoIosArrowBack size={22} />
                </button>
            }
            ButtonNext={
                <button className="team-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                    <IoIosArrowForward size={22} />
                </button>
            }
            prevEl=".team-prev"
            nextEl=".team-next"
        >
            {teamMembers.map((member) => (
                <TeamCard
                    key={member._id}
                    member={{
                        name: member.user
                            ? `${member.user.firstName} ${member.user.lastName}`
                            : "—",
                        role: member.position || "",
                        image: member.user?.avatar
                            ? `${BASE_URL}${member.user.avatar}`
                            : "/assets/user-icon.png",
                        socials: {
                            linkedin: member.socialLinks?.linkedin || "#",
                            github: member.socialLinks?.github || "#",
                            twitter: member.socialLinks?.twitter || "#",
                        },
                    }}
                />
            ))}
        </Slider>
    );
};

export default TeamSlider;