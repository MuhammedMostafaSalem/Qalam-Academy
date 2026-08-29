"use client";

import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { updatePartnerAction } from "@/actions/partnerActions";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const UpdatePartnerModal = ({ isOpen, onClose, partner, onSuccess }) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const [name, setName] = useState("");
    const [partnerUrl, setPartnerUrl] = useState("");
    const [image, setImage] = useState(null);

    const [isPending, setIsPending] = useState(false);
    const { successMessage, errorMessage } = useToast();

    useEffect(() => {
        if (partner) {
            setName(partner.name || "");
            setPartnerUrl(partner.partnerUrl || "");
            setImage(null);
        }
    }, [partner]);

    if (!isOpen || !partner) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.append("name", name);
        if (partnerUrl) formData.append("partnerUrl", partnerUrl);
        if (image) formData.append("image", image);

        const result = await updatePartnerAction(partner._id, null, formData);
        
        setIsPending(false);

        if (result.success) {
            successMessage(result.message || (isEn ? "Partner updated successfully" : "تم تعديل الشريك بنجاح"));
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("partner-updated"));
            }
            onSuccess();
        } else {
            errorMessage(result.message || (isEn ? "Failed to update partner" : "فشل تعديل الشريك"));
        }
    };

    return (
      <div
        onClick={onClose}
        className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-black/60 p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-card border border-border rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute rtl:left-6 rtl:right-auto ltr:right-6 ltr:left-auto top-6 text-text-secondary hover:text-text-primary transition p-1 rounded-xl hover:bg-background"
          >
            <HiXMark size={24} />
          </button>
          <h2 className="text-xl font-bold mb-6 text-text-primary">
            {isEn ? "Edit Partner" : "تعديل الشريك"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                {isEn ? "Partner Name" : "اسم الشريك"}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                {isEn ? "Website URL (Optional)" : "الموقع الإلكتروني (اختياري)"}
              </label>
              <input
                type="url"
                value={partnerUrl}
                onChange={(e) => setPartnerUrl(e.target.value)}
                className="w-full h-12 rounded-xl border bg-background px-4 text-text-primary outline-none transition border-border focus:border-primary text-left"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                {isEn ? "Partner Logo (Change Logo)" : "صورة الشريك (تغيير الشعار)"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white cursor-pointer"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="px-5 py-2.5 rounded-xl border border-border text-text-primary hover:bg-background transition font-medium"
              >
                {isEn ? "Cancel" : "إلغاء"}
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="gradient-button px-6 py-2.5 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20"
              >
                {isPending ? (isEn ? "Saving..." : "جاري الحفظ...") : (isEn ? "Save Changes" : "حفظ التعديلات")}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default UpdatePartnerModal;
