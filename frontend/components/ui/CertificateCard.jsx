"use client";

import { useEffect, useMemo, useState } from "react";
import {
    HiOutlineArrowDownTray,
    HiOutlineEye,
    HiXMark,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const CERTIFICATE_WIDTH = 1400;
const CERTIFICATE_HEIGHT = 990;

const escapeXml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const truncateLine = (value, maxLength) => {
    if (value.length <= maxLength) return value;
    return `${value.slice(0, Math.max(1, maxLength - 1)).trim()}…`;
};

const wrapText = (value, maxCharacters = 42, maxLines = 2) => {
    const words = String(value || "").trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [""];

    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
        const candidate = currentLine ? `${currentLine} ${word}` : word;

        if (candidate.length <= maxCharacters) {
            currentLine = candidate;
            return;
        }

        if (currentLine) lines.push(currentLine);
        currentLine = word;
    });

    if (currentLine) lines.push(currentLine);

    if (lines.length <= maxLines) {
        return lines.map((line) => truncateLine(line, maxCharacters));
    }

    const visibleLines = lines.slice(0, maxLines);
    const remainingText = lines.slice(maxLines - 1).join(" ");
    visibleLines[maxLines - 1] = truncateLine(remainingText, maxCharacters);
    return visibleLines;
};

const adaptiveFontSize = (value, maximum, minimum, preferredLength) => {
    const length = String(value || "").trim().length;
    if (length <= preferredLength) return maximum;

    const reduction = Math.ceil((length - preferredLength) / 2);
    return Math.max(minimum, maximum - reduction);
};

const CertificateCard = ({ certificate }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const title = certificate?.title
        ? localize(certificate.title)
        : (isEn ? "Certificate" : "شهادة إتمام");
    const student = certificate?.student || (isEn ? "Qalam Academy Student" : "طالب أكاديمية قلم");
    const instructor = certificate?.instructor || (isEn ? "Qalam Academy" : "أكاديمية قلم");
    const certificateNumber = String(certificate?.id || "QALAM").slice(-10).toUpperCase();

    const certificateSvg = useMemo(() => {
        const direction = isEn ? "ltr" : "rtl";
        const locale = isEn ? "en" : "ar";
        const heading = isEn ? "CERTIFICATE OF COMPLETION" : "شهادة إتمام";
        const intro = isEn ? "This certificate is proudly presented to" : "تُمنح هذه الشهادة بكل فخر إلى";
        const courseLabel = isEn ? "for successfully completing" : "لإتمامه بنجاح";
        const instructorLabel = isEn ? "Instructor" : "المدرب";
        const dateLabel = isEn ? "Date" : "التاريخ";
        const courseLines = wrapText(title, isEn ? 46 : 38, 2);
        const studentFontSize = adaptiveFontSize(student, 50, 32, 28);
        const instructorText = `${instructorLabel}: ${instructor}`;
        const instructorFontSize = adaptiveFontSize(instructorText, 23, 17, 55);

        const courseText = courseLines.map((line, index) => (
            `<text x="700" y="${600 + (index * 52)}" class="certificate-text" direction="${direction}" unicode-bidi="plaintext" text-anchor="middle" fill="#0F172A" font-size="${courseLines.length > 1 ? 36 : 42}" font-weight="700">${escapeXml(line)}</text>`
        )).join("\n    ");

        return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${CERTIFICATE_WIDTH}" height="${CERTIFICATE_HEIGHT}" viewBox="0 0 ${CERTIFICATE_WIDTH} ${CERTIFICATE_HEIGHT}" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="certificate-title certificate-description" lang="${locale}">
  <title id="certificate-title">${escapeXml(heading)} - ${escapeXml(student)}</title>
  <desc id="certificate-description">${escapeXml(courseLabel)} ${escapeXml(title)}</desc>
  <defs>
    <linearGradient id="certificate-background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EFF6FF"/>
    </linearGradient>
    <linearGradient id="certificate-accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#14B8A6"/>
    </linearGradient>
    <style>
      .certificate-text {
        font-family: Arial, Tahoma, "Noto Sans Arabic", "Segoe UI", sans-serif;
      }
    </style>
  </defs>

  <rect width="1400" height="990" fill="url(#certificate-background)"/>
  <path d="M0 0 H310 L0 310 Z" fill="#2563EB" opacity="0.08"/>
  <path d="M1400 990 H1090 L1400 680 Z" fill="#14B8A6" opacity="0.10"/>
  <rect x="34" y="34" width="1332" height="922" rx="24" fill="none" stroke="#2563EB" stroke-width="8"/>
  <rect x="58" y="58" width="1284" height="874" rx="18" fill="none" stroke="#14B8A6" stroke-width="2"/>

  <circle cx="700" cy="155" r="58" fill="url(#certificate-accent)"/>
  <text x="700" y="173" class="certificate-text" text-anchor="middle" fill="#FFFFFF" font-size="48" font-weight="700">Q</text>

  <text x="700" y="275" class="certificate-text" direction="${direction}" unicode-bidi="plaintext" text-anchor="middle" fill="#0F172A" font-size="48" font-weight="700">${escapeXml(heading)}</text>
  <text x="700" y="345" class="certificate-text" direction="${direction}" unicode-bidi="plaintext" text-anchor="middle" fill="#64748B" font-size="25">${escapeXml(intro)}</text>
  <text x="700" y="425" class="certificate-text" direction="${direction}" unicode-bidi="plaintext" text-anchor="middle" fill="#2563EB" font-size="${studentFontSize}" font-weight="700">${escapeXml(student)}</text>
  <line x1="330" y1="462" x2="1070" y2="462" stroke="#CBD5E1" stroke-width="2"/>

  <text x="700" y="530" class="certificate-text" direction="${direction}" unicode-bidi="plaintext" text-anchor="middle" fill="#64748B" font-size="25">${escapeXml(courseLabel)}</text>
  ${courseText}

  <text x="700" y="720" class="certificate-text" direction="${direction}" unicode-bidi="plaintext" text-anchor="middle" fill="#475569" font-size="${instructorFontSize}">${escapeXml(instructorText)}</text>

  <g class="certificate-text" fill="#475569" font-size="22">
    <text x="400" y="815" direction="${direction}" unicode-bidi="plaintext" text-anchor="middle">${escapeXml(dateLabel)}: ${escapeXml(certificate?.date || "—")}</text>
    <text x="1000" y="815" direction="ltr" unicode-bidi="plaintext" text-anchor="middle">ID: ${escapeXml(certificateNumber)}</text>
  </g>

  <line x1="575" y1="865" x2="825" y2="865" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="700" y="905" class="certificate-text" text-anchor="middle" fill="#2563EB" font-size="24" font-weight="700">Qalam Academy</text>
</svg>`;
    }, [certificate?.date, certificateNumber, instructor, isEn, student, title]);

    const previewSource = useMemo(
        () => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(certificateSvg)}`,
        [certificateSvg]
    );

    useEffect(() => {
        if (!isPreviewOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") setIsPreviewOpen(false);
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isPreviewOpen]);

    const handleDownload = () => {
        const blob = new Blob([certificateSvg], { type: "image/svg+xml;charset=utf-8" });
        const objectUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        const safeTitle = title.replace(/[\\/:*?"<>|]+/g, "-").trim() || "certificate";

        anchor.href = objectUrl;
        anchor.download = `${safeTitle}-certificate.svg`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    };

    return (
        <>
            <article className="glass overflow-hidden rounded-3xl border border-border shadow-sm transition hover:-translate-y-1">
                <button
                    type="button"
                    onClick={() => setIsPreviewOpen(true)}
                    aria-label={isEn ? `View certificate for ${title}` : `عرض شهادة ${title}`}
                    className="block aspect-[1400/990] w-full overflow-hidden bg-slate-100 p-2"
                >
                    <img
                        src={previewSource}
                        alt={isEn ? `Certificate for ${title}` : `شهادة ${title}`}
                        className="h-full w-full object-contain"
                    />
                </button>

                <div className="p-5">
                    <h3 className="line-clamp-2 min-h-12 font-bold">{title}</h3>
                    <p className="mt-2 text-sm text-text-secondary">{instructor}</p>
                    <p className="mt-1 text-xs text-text-secondary">
                        {isEn ? `Earned on ${certificate?.date}` : `حصلت عليها في ${certificate?.date}`}
                    </p>

                    <div className="mt-5 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setIsPreviewOpen(true)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border py-2.5 text-sm font-medium transition hover:bg-background-alt"
                        >
                            <HiOutlineEye size={18} />
                            {isEn ? "View" : "عرض"}
                        </button>

                        <button
                            type="button"
                            onClick={handleDownload}
                            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            <HiOutlineArrowDownTray size={18} />
                            {isEn ? "Download" : "تحميل"}
                        </button>
                    </div>
                </div>
            </article>

            {isPreviewOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={isEn ? "Certificate preview" : "معاينة الشهادة"}
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm md:p-8"
                    onMouseDown={() => setIsPreviewOpen(false)}
                >
                    <div
                        className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <div className="absolute end-3 top-3 z-10 flex gap-2">
                            <button
                                type="button"
                                onClick={handleDownload}
                                aria-label={isEn ? "Download certificate" : "تحميل الشهادة"}
                                className="flex h-10 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-medium text-white shadow-lg"
                            >
                                <HiOutlineArrowDownTray size={18} />
                                <span className="hidden sm:inline">{isEn ? "Download" : "تحميل"}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsPreviewOpen(false)}
                                aria-label={isEn ? "Close preview" : "إغلاق المعاينة"}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 text-white shadow-lg"
                            >
                                <HiXMark size={22} />
                            </button>
                        </div>

                        <div className="max-h-[92vh] overflow-auto bg-slate-200 p-2 sm:p-4">
                            <img
                                src={previewSource}
                                alt={isEn ? `Certificate for ${title}` : `شهادة ${title}`}
                                className="mx-auto block h-auto w-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CertificateCard;
