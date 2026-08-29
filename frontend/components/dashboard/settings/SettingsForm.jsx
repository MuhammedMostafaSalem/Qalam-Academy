"use client";

import { useEffect, useState } from "react";
import useSettings from "@/hooks/settings/useSettings";
import { updateSettingsAction } from "@/actions/settingsActions";
import useToast from "@/hooks/useToast";
import Section from "@/components/sections/Section";
import CardTable from "@/components/shared/CardTable";
import { useLanguage } from "@/providers/LanguageProvider";
import { usePlatformSettings } from "@/providers/SettingsProvider";

const SettingsForm = () => {
    const { settings, loading, error, refetch } = useSettings();
    const { successMessage, errorMessage } = useToast();
    const { language } = useLanguage();
    const isEn = language === "en";
    const { replaceSettings } = usePlatformSettings();
    const [isPending, setIsPending] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        siteName: "",
        siteDescription: "",
        supportEmail: "",
        supportPhone: "",
        whatsapp: "",
        address: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        youtube: "",
        twitter: "",
        tiktok: "",
        allowRegistration: true,
        maintenanceMode: false,
        seoTitle: "",
        seoDescription: "",
        seoKeywordsString: "",
        currency: "EGP",
        defaultLanguage: "ar"
    });

    const [logoDark, setLogoDark] = useState(null);
    const [logoLight, setLogoLight] = useState(null);
    const [favicon, setFavicon] = useState(null);

    useEffect(() => {
        if (settings) {
            setFormData({
                siteName: settings.siteName || "",
                siteDescription: settings.siteDescription || "",
                supportEmail: settings.supportEmail || "",
                supportPhone: settings.supportPhone || "",
                whatsapp: settings.whatsapp || "",
                address: settings.address || "",
                facebook: settings.facebook || "",
                instagram: settings.instagram || "",
                linkedin: settings.linkedin || "",
                youtube: settings.youtube || "",
                twitter: settings.twitter || "",
                tiktok: settings.tiktok || "",
                allowRegistration: settings.allowRegistration !== false,
                maintenanceMode: settings.maintenanceMode === true,
                seoTitle: settings.seoTitle || "",
                seoDescription: settings.seoDescription || "",
                seoKeywordsString: settings.seoKeywords ? settings.seoKeywords.join(", ") : "",
                currency: settings.currency || "EGP",
                defaultLanguage: settings.defaultLanguage || "ar"
            });
        }
    }, [settings]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            submitData.append(key, value);
        });

        if (logoDark) submitData.append("logoDark", logoDark);
        if (logoLight) submitData.append("logoLight", logoLight);
        if (favicon) submitData.append("favicon", favicon);

        const result = await updateSettingsAction(null, submitData);

        setIsPending(false);

        if (result.success) {
            successMessage(result.message || (isEn ? "Settings updated successfully" : "تم حفظ الإعدادات بنجاح"));
            replaceSettings(result.data);
            refetch();
        } else {
            errorMessage(result.message || (isEn ? "Failed to update settings" : "فشل حفظ الإعدادات"));
        }
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">{isEn ? "Loading settings..." : "جاري تحميل الإعدادات..."}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-error">{error}</p>
            </div>
        );
    }

    return (
        <Section className="mt-[20px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                {/* General Information */}
                <div className="bg-card border border-border p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4 text-text-primary">
                        {isEn ? "General Information" : "المعلومات الأساسية"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Website Name" : "اسم الموقع"}
                            </label>
                            <input type="text" name="siteName" value={formData.siteName} onChange={handleChange} required className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Website Description" : "وصف الموقع"}
                            </label>
                            <input type="text" name="siteDescription" value={formData.siteDescription} onChange={handleChange} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                    </div>
                </div>

                {/* Media */}
                <div className="bg-card border border-border p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4 text-text-primary">
                        {isEn ? "Logos & Media" : "الصور والشعارات"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Dark Logo" : "الشعار الداكن"}
                            </label>
                            {settings?.logoDark && <div className="mb-2"><img src={settings.logoDark} alt="Dark Logo" className="h-12 object-contain" /></div>}
                            <input type="file" accept="image/*" onChange={(e) => setLogoDark(e.target.files[0])} className="w-full text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white cursor-pointer" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Light Logo" : "الشعار الفاتح"}
                            </label>
                            {settings?.logoLight && <div className="mb-2 bg-gray-200 p-2 rounded-xl w-fit"><img src={settings.logoLight} alt="Light Logo" className="h-12 object-contain" /></div>}
                            <input type="file" accept="image/*" onChange={(e) => setLogoLight(e.target.files[0])} className="w-full text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white cursor-pointer" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Favicon" : "الأيقونة (Favicon)"}
                            </label>
                            {settings?.favicon && <div className="mb-2"><img src={settings.favicon} alt="Favicon" className="h-12 object-contain" /></div>}
                            <input type="file" accept="image/*" onChange={(e) => setFavicon(e.target.files[0])} className="w-full text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-card border border-border p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4 text-text-primary">
                        {isEn ? "Contact Information" : "معلومات التواصل"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Support Email" : "البريد الإلكتروني للدعم"}
                            </label>
                            <input type="email" name="supportEmail" value={formData.supportEmail} onChange={handleChange} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary text-left" dir="ltr" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Support Phone" : "رقم هاتف الدعم"}
                            </label>
                            <input type="text" name="supportPhone" value={formData.supportPhone} onChange={handleChange} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary text-left" dir="ltr" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "WhatsApp" : "واتساب"}
                            </label>
                            <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary text-left" dir="ltr" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Address" : "العنوان"}
                            </label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-card border border-border p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4 text-text-primary">
                        {isEn ? "Social Media Links" : "روابط التواصل الاجتماعي"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {["facebook", "instagram", "linkedin", "youtube", "twitter", "tiktok"].map((platform) => (
                            <div key={platform}>
                                <label className="block text-sm text-text-secondary mb-1 capitalize">{platform}</label>
                                <input type="url" name={platform} value={formData[platform]} onChange={handleChange} placeholder={`https://${platform}.com/...`} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary text-left" dir="ltr" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEO Config */}
                <div className="bg-card border border-border p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4 text-text-primary">
                        {isEn ? "Search Engine Optimization (SEO)" : "إعدادات تحسين محركات البحث (SEO)"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "SEO Title" : "عنوان SEO"}
                            </label>
                            <input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleChange} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "SEO Keywords (comma separated)" : "الكلمات المفتاحية (SEO Keywords) - مفصولة بفاصلة"}
                            </label>
                            <input type="text" name="seoKeywordsString" value={formData.seoKeywordsString} onChange={handleChange} placeholder={isEn ? "e.g. education, courses, academy" : "مثال: تعليم, كورسات, أكاديمية"} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "SEO Description" : "وصف SEO"}
                            </label>
                            <textarea name="seoDescription" value={formData.seoDescription} onChange={handleChange} rows={3} className="w-full rounded-xl border bg-background p-3 text-text-primary outline-none transition border-border focus:border-primary resize-none" />
                        </div>
                    </div>
                </div>

                {/* Advanced Settings */}
                <div className="bg-card border border-border p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4 text-text-primary">
                        {isEn ? "Platform Preferences" : "إعدادات المنصة"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Default Currency" : "العملة الافتراضية"}
                            </label>
                            <input type="text" name="currency" value={formData.currency} onChange={handleChange} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">
                                {isEn ? "Default Language" : "اللغة الافتراضية"}
                            </label>
                            <select name="defaultLanguage" value={formData.defaultLanguage} onChange={handleChange} className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary">
                                <option value="ar">{isEn ? "Arabic" : "العربية"}</option>
                                <option value="en">{isEn ? "English" : "الإنجليزية"}</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 border-t border-border pt-4">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="allowRegistration" name="allowRegistration" checked={formData.allowRegistration} onChange={handleChange} className="w-4 h-4 cursor-pointer" />
                            <label htmlFor="allowRegistration" className="text-sm cursor-pointer select-none">
                                {isEn ? "Allow New User Registration" : "السماح بتسجيل مستخدمين جدد"}
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="maintenanceMode" name="maintenanceMode" checked={formData.maintenanceMode} onChange={handleChange} className="w-4 h-4 cursor-pointer" />
                            <label htmlFor="maintenanceMode" className="text-sm cursor-pointer select-none">
                                {isEn ? "Enable Maintenance Mode" : "تفعيل وضع الصيانة"}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 pb-10">
                    <button type="submit" disabled={isPending} className="gradient-button px-8 py-3 rounded-xl text-white font-bold hover:opacity-90 transition shadow-lg shadow-primary/20 text-lg">
                        {isPending ? (isEn ? "Saving..." : "جاري الحفظ...") : (isEn ? "Save Platform Settings" : "حفظ إعدادات المنصة")}
                    </button>
                </div>
            </form>
        </Section>
    );
};

export default SettingsForm;
