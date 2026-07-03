import {
    HiOutlineStar,
    HiOutlineUserGroup,
    HiOutlineClock,
    HiOutlineAcademicCap,
} from "react-icons/hi2";
import MetaItem from "./MetaItem";
import { fadeUp } from "@/lib/animationHelpers";

const metas = [
    {
        icon: HiOutlineStar,
        title: "4.9",
        subtitle: "التقييم"
    },
    {
        icon: HiOutlineUserGroup,
        title: "1,250+",
        subtitle: "طالب"
    },
    {
        icon: HiOutlineClock,
        title: "12 أسبوع",
        subtitle: "مدة الكورس"
    },
    {
        icon: HiOutlineAcademicCap,
        title: "48",
        subtitle: "درس"
    },
]
const HeroMeta = () => {
    return (
        <div
            {...fadeUp()}
            className="
                mt-10
                grid
                gap-6

                sm:grid-cols-2
            "
        >

            {
                metas.map((item, index) => {
                    return (
                        <MetaItem
                            key={index}
                            index={index}
                            item={item}
                        />
                    )
                })
            }
        </div>
    );
};


export default HeroMeta;