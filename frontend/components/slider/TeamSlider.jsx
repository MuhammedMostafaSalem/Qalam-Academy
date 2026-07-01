import team from "../about/team/team";
import TeamCard from "../about/team/TeamCard";
import Slider from "../ui/Slider";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TeamSlider = () => {
    return (
        <div className="relative px-16">
            {/* Prev */}
            <button className="prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                <IoIosArrowBack size={22} />
            </button>
            <Slider>
                {team.map((member) => (
                    <TeamCard key={member.id} member={member} />
                ))}
            </Slider>
            {/* Next */}
            <button className="next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                <IoIosArrowForward size={22} />
            </button>
        </div>
    )
}

export default TeamSlider