import team from "../about/team/team";
import TeamCard from "../about/team/TeamCard";
import Slider from "@/components/ui/Slider";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TeamSlider = () => {
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
            {team.map((member, index) => (
                <TeamCard
                    key={index}
                    member={member}
                />
            ))}
        </Slider>
    )
}

export default TeamSlider