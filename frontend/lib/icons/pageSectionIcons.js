import {
    HiOutlineShieldCheck,
    HiOutlineUsers,
    HiOutlineClock,
    HiOutlineLifebuoy,
    HiOutlineSparkles,
    HiOutlineLightBulb,
    HiOutlineBriefcase,
    HiOutlineChartBar,
    HiOutlineMagnifyingGlass,
    HiOutlineClipboardDocumentCheck,
    HiOutlineCodeBracketSquare,
    HiOutlineRocketLaunch,
    HiOutlineAcademicCap,
    HiOutlineCheckBadge,
    HiOutlineCog6Tooth,
    HiOutlineUserGroup,
    HiOutlineGlobeAlt,
    HiOutlineHeart,
    HiOutlineStar,
    HiOutlineBookOpen,
    HiOutlineComputerDesktop,
    HiOutlinePresentationChartLine,
} from "react-icons/hi2";

import {
    MdOutlineHighQuality,
    MdOutlineSecurity,
    MdOutlineSupportAgent,
    MdOutlineSchool,
    MdOutlineWorkspacePremium,
} from "react-icons/md";

import {
    FiDownload,
    FiUsers,
    FiCheckCircle,
    FiClock,
    FiSettings,
    FiTrendingUp,
} from "react-icons/fi";

import { GoShieldCheck, GoRocket, GoCode } from "react-icons/go";

/**
 * Controlled icon registry.
 * The backend stores only the icon name.
 * The frontend resolves that name to
 * the actual React component.
 */
export const pageSectionIconRegistry = {
    HiOutlineShieldCheck,
    HiOutlineUsers,
    HiOutlineClock,
    HiOutlineLifebuoy,
    HiOutlineSparkles,
    HiOutlineLightBulb,
    HiOutlineBriefcase,
    HiOutlineChartBar,
    HiOutlineMagnifyingGlass,
    HiOutlineClipboardDocumentCheck,
    HiOutlineCodeBracketSquare,
    HiOutlineRocketLaunch,
    HiOutlineAcademicCap,
    HiOutlineCheckBadge,
    HiOutlineCog6Tooth,
    HiOutlineUserGroup,
    HiOutlineGlobeAlt,
    HiOutlineHeart,
    HiOutlineStar,
    HiOutlineBookOpen,
    HiOutlineComputerDesktop,
    HiOutlinePresentationChartLine,
    MdOutlineHighQuality,
    MdOutlineSecurity,
    MdOutlineSupportAgent,
    MdOutlineSchool,
    MdOutlineWorkspacePremium,
    FiDownload,
    FiUsers,
    FiCheckCircle,
    FiClock,
    FiSettings,
    FiTrendingUp,
    GoShieldCheck,
    GoRocket,
    GoCode,
};

export const pageSectionIconOptions = Object.keys(
    pageSectionIconRegistry
);

export const getPageSectionIcon = (iconName) => {
    return (
        pageSectionIconRegistry[iconName] ||
        HiOutlineSparkles
    );
};
