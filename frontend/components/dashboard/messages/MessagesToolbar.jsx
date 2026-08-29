"use client";

import Section from "@/components/sections/Section";
import {
    HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const MessagesToolbar = ({ messagesLength, searchQuery, setSearchQuery, statusFilter, setStatusFilter }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    return (
        <Section
            className="
                mb-6

                flex
                flex-col
                gap-5

                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >
            {/* Title */}
            <div>
                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <h2
                        className="
                            text-xl
                            font-bold
                        "
                    >
                        {isEn ? "Messages" : "الرسائل"}
                    </h2>

                    <span
                        className="
                            rounded-full
                            bg-primary/10
                            px-3
                            py-1
                            text-sm
                            font-medium
                            text-primary
                        "
                    >
                        {messagesLength} {isEn ? (messagesLength === 1 ? "Message" : "Messages") : "رسالة"}
                    </span>
                </div>
                <p
                    className="
                        mt-2
                        text-sm
                        text-text-secondary
                    "
                >
                    {isEn ? "Manage customer messages and inquiries." : "إدارة رسائل العملاء والاستفسارات الواردة."}
                </p>

            </div>

            {/* Actions */}
            <div
                className="
                    flex
                    flex-col
                    gap-3

                    sm:flex-row
                "
            >
                {/* Search */}
                <div
                    className="
                        relative
                    "
                >
                    <HiOutlineMagnifyingGlass
                        size={20}
                        className={`
                            absolute
                            ${isEn ? "left-4" : "right-4"}
                            top-1/2
                            -translate-y-1/2
                            text-text-secondary
                        `}
                    />

                    <input
                        type="text"
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                        placeholder={isEn ? "Search messages..." : "البحث في الرسائل..."}
                        className={`
                            h-12

                            w-full
                            sm:w-72

                            rounded-2xl

                            border
                            border-border

                            bg-background

                            ${isEn ? "pl-11 pr-4" : "pr-11 pl-4"}

                            outline-none

                            transition

                            focus:border-primary
                        `}
                    />

                </div>

                {/* Filter */}
                <select
                    value={statusFilter || "all"}
                    onChange={(e) => setStatusFilter && setStatusFilter(e.target.value)}
                    className="
                        h-12

                        rounded-2xl

                        border
                        border-border

                        bg-background

                        px-4

                        outline-none

                        focus:border-primary
                    "
                >
                    <option value="all">
                        {isEn ? "All Messages" : "كل الرسائل"}
                    </option>

                    <option value="unread">
                        {isEn ? "Unread" : "غير مقروءة"}
                    </option>

                    <option value="read">
                        {isEn ? "Read" : "مقروءة"}
                    </option>
                </select>
            </div>
        </Section>
    );
};

export default MessagesToolbar;