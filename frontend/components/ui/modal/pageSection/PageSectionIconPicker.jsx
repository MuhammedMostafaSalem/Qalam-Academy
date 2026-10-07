"use client";
import { useMemo, useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import { useLanguage } from "@/providers/LanguageProvider";
import {
    pageSectionIconOptions,
    pageSectionIconRegistry,
} from "@/lib/icons/pageSectionIcons";


const PageSectionIconPicker = ({ value = "", onChange }) => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const [search, setSearch] = useState("");
    const filteredIcons = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) {
            return pageSectionIconOptions;
        }
        return pageSectionIconOptions.filter((iconName) =>
            iconName.toLowerCase().includes(query),
        );
    }, [search]);
    const SelectedIcon =
        value && pageSectionIconRegistry[value]
            ? pageSectionIconRegistry[value]
            : null;
    return (
        <div className="space-y-4">
            {" "}
            {/* Selected Icon */}{" "}
            <div className=" flex items-center justify-between gap-4 rounded-xl border border-border bg-background p-4 ">
                {" "}
                <div className="flex items-center gap-3">
                    {" "}
                    <div className=" flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ">
                        {" "}
                        {SelectedIcon ? (
                            <SelectedIcon className="h-6 w-6" />
                        ) : (
                            <span className="text-xs text-text-secondary"> — </span>
                        )}{" "}
                    </div>{" "}
                    <div>
                        {" "}
                        <p className="text-sm font-medium text-text-primary">
                            {" "}
                            {isEn ? "Selected Icon" : "الأيقونة المختارة"}{" "}
                        </p>{" "}
                        <p className="mt-1 text-xs text-text-secondary">
                            {" "}
                            {value ||
                                (isEn ? "No icon selected" : "لم يتم اختيار أيقونة")}{" "}
                        </p>{" "}
                    </div>{" "}
                </div>{" "}
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className=" flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition hover:bg-card-hover hover:text-error "
                        title={isEn ? "Remove icon" : "إزالة الأيقونة"}
                    >
                        {" "}
                        <MdClose size={18} />{" "}
                    </button>
                )}{" "}
            </div>{" "}
            {/* Search */}{" "}
            <div className="relative">
                {" "}
                <MdSearch
                    size={20}
                    className=" absolute start-4 top-1/2 -translate-y-1/2 text-text-secondary "
                />{" "}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={isEn ? "Search icons..." : "ابحث عن أيقونة..."}
                    className=" w-full rounded-xl border border-border bg-background py-3 pe-4 ps-11 text-sm outline-none transition focus:border-primary "
                />{" "}
            </div>{" "}
            {/* Icons */}{" "}
            <div className=" grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 ">
                {" "}
                {filteredIcons.map((iconName) => {
                    const Icon = pageSectionIconRegistry[iconName];
                    const isSelected = value === iconName;
                    return (
                        <button
                            key={iconName}
                            type="button"
                            onClick={() => onChange(iconName)}
                            title={iconName}
                            className={` flex h-14 items-center justify-center rounded-xl border transition ${isSelected ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-text-secondary hover:border-primary/40 hover:bg-card-hover hover:text-primary"} `}
                        >
                            {" "}
                            <Icon className="h-6 w-6" />{" "}
                        </button>
                    );
                })}{" "}
            </div>{" "}
            {filteredIcons.length === 0 && (
                <div className=" rounded-xl border border-dashed border-border p-8 text-center text-sm text-text-secondary ">
                    {" "}
                    {isEn ? "No icons found" : "لم يتم العثور على أيقونات"}{" "}
                </div>
            )}{" "}
        </div>
    );
};

export default PageSectionIconPicker;