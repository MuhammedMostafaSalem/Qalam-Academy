"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    HiOutlineArrowTopRightOnSquare,
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
    HiOutlinePencilSquare,
    HiOutlinePlus,
} from "react-icons/hi2";
import PageHeader from "@/components/dashboard/PageHeader";
import { useAdminHeroes } from "@/hooks/heroes/useAdminHeroes";
import { useLanguage } from "@/providers/LanguageProvider";
import HeroEditorModal from "./HeroEditorModal";
import { HERO_PAGE_OPTIONS } from "./heroPages";

const HeroesManager = () => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";
    const { heroes, loading, error, refetch } = useAdminHeroes();
    const [selectedPage, setSelectedPage] = useState(null);

    const heroesByPage = useMemo(
        () => new Map(heroes.map((hero) => [hero.page, hero])),
        [heroes]
    );

    const configuredCount = HERO_PAGE_OPTIONS.filter(({ page }) => heroesByPage.has(page)).length;
    const selectedHero = selectedPage ? heroesByPage.get(selectedPage.page) || null : null;

    return (
        <div className="glass rounded-3xl border border-border p-5 shadow-sm md:p-6">
            <PageHeader
                title={isEn ? "Page Heroes" : "هيرو الصفحات"}
                description={
                    isEn
                        ? "Manage the public hero content shown on every page in the website navigation."
                        : "إدارة محتوى الهيرو الظاهر في كل صفحة من صفحات القائمة الرئيسية للموقع."
                }
            />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background/60 p-4">
                <div>
                    <p className="font-semibold text-text-primary">
                        {isEn ? "Configuration progress" : "اكتمال الإعداد"}
                    </p>
                    <p className="text-sm text-text-secondary">
                        {isEn
                            ? `${configuredCount} of ${HERO_PAGE_OPTIONS.length} navbar pages configured`
                            : `تم إعداد ${configuredCount} من ${HERO_PAGE_OPTIONS.length} صفحات`}
                    </p>
                </div>
                <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-border">
                    <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(configuredCount / HERO_PAGE_OPTIONS.length) * 100}%` }}
                    />
                </div>
            </div>

            {loading && (
                <div className="py-16 text-center text-text-secondary">
                    {isEn ? "Loading page heroes..." : "جاري تحميل هيرو الصفحات..."}
                </div>
            )}

            {!loading && error && (
                <div className="mt-6 rounded-2xl border border-error/30 bg-error/10 p-5 text-center text-error">
                    <p>{error}</p>
                    <button type="button" onClick={refetch} className="mt-3 rounded-xl border border-error/30 px-4 py-2 text-sm font-medium">
                        {isEn ? "Try again" : "إعادة المحاولة"}
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {HERO_PAGE_OPTIONS.map((pageConfig) => {
                        const hero = heroesByPage.get(pageConfig.page);
                        const title = hero ? localize(hero.title) : "";

                        return (
                            <article key={pageConfig.page} className="flex min-h-56 flex-col rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{pageConfig.page}</p>
                                        <h2 className="mt-1 text-lg font-bold text-text-primary">{localize(pageConfig.label)}</h2>
                                    </div>
                                    {hero ? (
                                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${hero.isActive ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                                            {hero.isActive ? <HiOutlineCheckCircle /> : <HiOutlineExclamationCircle />}
                                            {hero.isActive
                                                ? (isEn ? "Active" : "نشط")
                                                : (isEn ? "Inactive" : "معطل")}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning">
                                            <HiOutlineExclamationCircle />
                                            {isEn ? "Not configured" : "غير مُعد"}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-5 flex-1">
                                    <p className="text-xs text-text-secondary">{isEn ? "Current title" : "العنوان الحالي"}</p>
                                    <p className="mt-1 line-clamp-2 font-medium text-text-primary">
                                        {title || (isEn ? "The page uses its default content" : "تستخدم الصفحة المحتوى الافتراضي")}
                                    </p>
                                </div>

                                <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPage(pageConfig)}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
                                    >
                                        {hero ? <HiOutlinePencilSquare size={18} /> : <HiOutlinePlus size={18} />}
                                        {hero
                                            ? (isEn ? "Edit hero" : "تعديل الهيرو")
                                            : (isEn ? "Create hero" : "إنشاء الهيرو")}
                                    </button>
                                    <Link
                                        href={pageConfig.href}
                                        target="_blank"
                                        aria-label={isEn ? "Preview page" : "معاينة الصفحة"}
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-text-secondary transition hover:border-primary hover:text-primary"
                                    >
                                        <HiOutlineArrowTopRightOnSquare size={18} />
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}

            {selectedPage && (
                <HeroEditorModal
                    key={`${selectedPage.page}-${selectedHero?._id || "new"}`}
                    pageConfig={selectedPage}
                    hero={selectedHero}
                    onClose={() => setSelectedPage(null)}
                    onSuccess={async () => {
                        await refetch();
                        setSelectedPage(null);
                    }}
                />
            )}
        </div>
    );
};

export default HeroesManager;
