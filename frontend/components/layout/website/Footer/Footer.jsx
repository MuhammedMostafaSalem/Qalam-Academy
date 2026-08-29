"use client";

import Link from "next/link";
import {
    FaLinkedinIn,
    FaYoutube,
    FaTwitter,
    FaInstagram,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaArrowUp,
    FaFacebookF,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

import Container from "@/components/ui/Container"
import logo from "@/public/assets/logos/logo-white.png"
import Image from "next/image";

import { gridAnimation } from "@/lib/animation/gridAnimation";
import { animations } from "@/lib/animations";
import { useLanguage } from "@/providers/LanguageProvider";
import { usePlatformSettings } from "@/providers/SettingsProvider";

const Footer = () => {
    const { language } = useLanguage();
    const { settings } = usePlatformSettings();
    const isEnglish = language === "en";
    const siteName = settings.siteName || (isEnglish ? "Qalam Academy" : "أكاديمية قلم");
    const siteDescription = settings.siteDescription || (isEnglish
        ? "Software & Learning Solutions"
        : "لحلول البرمجيات والتعليم");
    const footerLogo = settings.logoLight || settings.logoDark;
    const socialLinks = [
        { Icon: FaFacebookF, href: settings.facebook, label: "Facebook" },
        { Icon: FaLinkedinIn, href: settings.linkedin, label: "LinkedIn" },
        { Icon: FaYoutube, href: settings.youtube, label: "YouTube" },
        { Icon: FaTwitter, href: settings.twitter, label: "Twitter" },
        { Icon: FaInstagram, href: settings.instagram, label: "Instagram" },
        { Icon: FaTiktok, href: settings.tiktok, label: "TikTok" },
    ].filter((item) => item.href);
    const resources = isEnglish
        ? ["Our Courses", "Blog", "Frequently Asked Questions", "Privacy Policy", "Terms and Conditions"]
        : ["دوراتنا", "المدونة", "الأسئلة الشائعة", "سياسة الخصوصية", "الشروط والأحكام"];
    const services = isEnglish
        ? ["Web Development", "Mobile Applications", "Custom Systems", "UI/UX Design", "Digital Marketing"]
        : ["تطوير المواقع", "تطبيقات الجوال", "الأنظمة المخصصة", "تصميم UI/UX", "التسويق الرقمي"];
    const quickLinks = isEnglish
        ? [
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Contact Us", href: "/contact" },
        ]
        : [
            { label: "الرئيسية", href: "/" },
            { label: "من نحن", href: "/about" },
            { label: "خدماتنا", href: "/services" },
            { label: "أعمالنا", href: "/portfolio" },
            { label: "تواصل معنا", href: "/contact" },
        ];

    return (
        <footer className="relative bg-background border-t border-border mt-[80px]">
            <Container className="py-10">

                <div className="grid gap-10 lg:grid-cols-5 md:grid-cols-2">

                    {/* Logo */}
                    <div {...gridAnimation(0)}>
                        <div className="flex items-center gap-3 mb-5">
                            {footerLogo ? (
                                <img src={footerLogo} alt={`${siteName} logo`} className={`h-14 w-auto object-contain ${animations.transition} hover:scale-105`} />
                            ) : (
                                <Image
                                    src={logo}
                                    alt={`${siteName} logo`}
                                    width={55}
                                    priority
                                    className={`h-auto w-auto ${animations.transition} hover:scale-105`}
                                />
                            )}

                            <div>
                                <h2 className="text-2xl font-bold">
                                    {siteName}
                                </h2>

                                <p className="text-sm text-text-secondary">
                                    {siteDescription}
                                </p>
                            </div>
                        </div>

                        <p className="text-text-secondary leading-8">
                            {settings.siteDescription || (isEnglish
                                ? "We build software and learning experiences that help businesses and individuals turn ideas into innovative digital products."
                                : "نطوّر حلولًا برمجية وتجارب تعليمية تساعد الشركات والأفراد على تحويل أفكارهم إلى منتجات رقمية مبتكرة.")}
                        </p>
                    </div>

                    {/* Resources */}
                    <div {...gridAnimation(1)}>
                        <h3 className="font-bold text-lg mb-6">{isEnglish ? "Resources" : "الموارد"}</h3>

                        <ul className="space-y-4 text-text-secondary">
                            {
                                resources.map(item => (
                                    <li key={item}>
                                        <Link
                                            href="/"
                                            className={`${animations.transition} hover:text-primary`}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Services */}
                    <div {...gridAnimation(2)}>
                        <h3 className="font-bold text-lg mb-6">{isEnglish ? "Our Services" : "خدماتنا"}</h3>

                        <ul className="space-y-4 text-text-secondary">
                            {
                                services.map(item => (
                                    <li
                                        key={item}
                                        className={`${animations.transition} hover:text-primary`}>
                                        {item}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div {...gridAnimation(3)}>
                        <h3 className="font-bold text-lg mb-6">{isEnglish ? "Quick Links" : "روابط سريعة"}</h3>

                        <ul className="space-y-4 text-text-secondary">
                            {
                                quickLinks.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`${animations.transition} hover:text-primary`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Contact */}
                    <div {...gridAnimation(4)}>
                        <h3 className="font-bold text-lg mb-6">{isEnglish ? "Contact Us" : "تواصل معنا"}</h3>

                        <div className="space-y-5">

                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className={`mt-1 text-primary ${animations.floating}`} />

                                <p className="text-text-secondary leading-7">
                                    {settings.address || (isEnglish ? "Fayoum, Egypt" : "الفيوم، مصر")}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-primary" />

                                <span className="text-text-secondary">
                                    {settings.supportEmail || "info@qlam-academy.dev"}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-primary" />

                                <span className="text-text-secondary">
                                    {settings.supportPhone || "+20 100 123 4567"}
                                </span>
                            </div>

                            {/* Social */}
                            <div className="flex gap-3 pt-3">

                                {socialLinks.map(({ Icon, href, label }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className={`
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-border
                                            bg-card

                                            ${animations.transition}
                                            ${animations.hoverLift}

                                            hover:bg-primary
                                            hover:text-white
                                        `}
                                    >
                                        <Icon size={16} />
                                    </Link>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}

                <div
                    {...gridAnimation(5)}
                    className="mt-14 pt-6 border-t border-border flex items-center justify-center relative">
                    <p className="text-text-muted text-sm">
                        © {siteName}{" "}
                        {new Date().getFullYear()}
                        {isEnglish ? ". All rights reserved. Designed by " : ". جميع الحقوق محفوظة. تصميم "}
                        <Link
                            href="https://taninss.com/"
                            className={`${animations.transition} text-primary hover:underline`}
                        >
                            Digital Dragon
                        </Link>
                    </p>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
