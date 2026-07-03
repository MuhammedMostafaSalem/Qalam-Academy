import {
    HiOutlineStar,
    HiOutlineUserGroup,
    HiOutlineClock,
    HiOutlineAcademicCap,
} from "react-icons/hi2";
import MetaItem from "./MetaItem";

const HeroMeta = () => {
    return (
        <div
            className="
                mt-10
                grid
                gap-6

                sm:grid-cols-2
            "
        >
            <MetaItem
                icon={HiOutlineStar}
                title="4.9"
                subtitle="التقييم"
            />

            <MetaItem
                icon={HiOutlineUserGroup}
                title="1,250+"
                subtitle="طالب"
            />

            <MetaItem
                icon={HiOutlineClock}
                title="12 أسبوع"
                subtitle="مدة الكورس"
            />

            <MetaItem
                icon={HiOutlineAcademicCap}
                title="48"
                subtitle="درس"
            />
        </div>
    );
};


export default HeroMeta;