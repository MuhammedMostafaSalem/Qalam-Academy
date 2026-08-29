"use client";

import Image from "next/image";
import {
    HiOutlineArrowDownTray,
    HiOutlineEye,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const escapeXml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const CertificateCard = ({ certificate }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const rawImage = certificate?.image;
    const imageSrc = (rawImage && typeof rawImage === "string" && rawImage.trim() !== "")
        ? (rawImage.startsWith("http") ? rawImage : `${baseUrl}${rawImage}`)
        : null;

    const title = certificate?.title ? localize(certificate.title) : (isEn ? "Certificate" : "شهادة إتمام");
    const student = certificate?.student || (isEn ? "Qalam Academy Student" : "طالب أكاديمية قلم");
    const certificateNumber = String(certificate?.id || "QALAM").slice(-10).toUpperCase();

    const createCertificateBlob = () => {
        const direction = isEn ? "ltr" : "rtl";
        const heading = isEn ? "CERTIFICATE OF COMPLETION" : "شهادة إتمام";
        const intro = isEn ? "This certificate is proudly presented to" : "تُمنح هذه الشهادة بكل فخر إلى";
        const courseLabel = isEn ? "for successfully completing" : "لإتمامه بنجاح";
        const instructorLabel = isEn ? "Instructor" : "المدرب";
        const dateLabel = isEn ? "Date" : "التاريخ";

        const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="990" viewBox="0 0 1400 990">
  <rect width="1400" height="990" fill="#F8FAFC"/>
  <rect x="34" y="34" width="1332" height="922" rx="24" fill="none" stroke="#2563EB" stroke-width="8"/>
  <rect x="58" y="58" width="1284" height="874" rx="18" fill="none" stroke="#14B8A6" stroke-width="2"/>
  <circle cx="700" cy="170" r="58" fill="#2563EB"/>
  <text x="700" y="188" text-anchor="middle" fill="#FFFFFF" font-size="48" font-weight="700" font-family="Arial, sans-serif">Q</text>
  <g direction="${direction}" font-family="Arial, 'Noto Sans Arabic', sans-serif" text-anchor="middle">
    <text x="700" y="285" fill="#0F172A" font-size="48" font-weight="700">${escapeXml(heading)}</text>
    <text x="700" y="355" fill="#64748B" font-size="25">${escapeXml(intro)}</text>
    <text x="700" y="435" fill="#2563EB" font-size="50" font-weight="700">${escapeXml(student)}</text>
    <line x1="330" y1="466" x2="1070" y2="466" stroke="#CBD5E1" stroke-width="2"/>
    <text x="700" y="535" fill="#64748B" font-size="25">${escapeXml(courseLabel)}</text>
    <text x="700" y="615" fill="#0F172A" font-size="42" font-weight="700">${escapeXml(title)}</text>
    <text x="700" y="690" fill="#475569" font-size="23">${escapeXml(instructorLabel)}: ${escapeXml(certificate?.instructor || "Qalam Academy")}</text>
    <text x="420" y="805" fill="#475569" font-size="22">${escapeXml(dateLabel)}: ${escapeXml(certificate?.date || "—")}</text>
    <text x="980" y="805" fill="#475569" font-size="22">ID: ${escapeXml(certificateNumber)}</text>
    <text x="700" y="885" fill="#2563EB" font-size="24" font-weight="700">Qalam Academy</text>
  </g>
</svg>`;

        return new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    };

    const handleView = () => {
        const objectUrl = URL.createObjectURL(createCertificateBlob());
        const anchor = document.createElement("a");
        anchor.href = objectUrl;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
    };

    const handleDownload = () => {
        const objectUrl = URL.createObjectURL(createCertificateBlob());
        const anchor = document.createElement("a");
        const safeTitle = title.replace(/[\\/:*?"<>|]+/g, "-").trim() || "certificate";
        anchor.href = objectUrl;
        anchor.download = `${safeTitle}-certificate.svg`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(objectUrl);
    };

    return (
        <div
            className="
                glass
                overflow-hidden
                rounded-3xl
                border
                border-border
                shadow-sm
                transition
                hover:-translate-y-1
            "
        >
            {/* Certificate Image */}
            <div
                className="
                    relative
                    h-52
                    w-full
                    bg-background-alt
                "
            >
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted font-bold text-sm bg-card-hover">
                        {isEn ? "Qalam Academy Certificate" : "شهادة أكاديمية قلم"}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="line-clamp-2 min-h-12 font-bold">
                    {title}
                </h3>

                <p className="mt-2 text-sm text-text-secondary">
                    {certificate?.instructor}
                </p>

                <p className="mt-1 text-xs text-text-secondary">
                    {isEn ? `Earned on ${certificate?.date}` : `حصلت عليها في ${certificate?.date}`}
                </p>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                    <button
                        type="button"
                        onClick={handleView}
                        className="
                            flex-1
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            border
                            border-border
                            py-2.5
                            text-sm
                            font-medium
                            transition
                            hover:bg-background-alt
                        "
                    >
                        <HiOutlineEye size={18} />
                        {isEn ? "View" : "عرض"}
                    </button>

                    <button
                        type="button"
                        onClick={handleDownload}
                        className="
                            flex-1
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            bg-primary
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:opacity-90
                        "
                    >
                        <HiOutlineArrowDownTray size={18} />
                        {isEn ? "Download" : "تحميل"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CertificateCard;
