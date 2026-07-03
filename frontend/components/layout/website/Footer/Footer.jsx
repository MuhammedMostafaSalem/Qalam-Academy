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
} from "react-icons/fa";

import Container from "@/components/ui/Container"
import logo from "@/public/assets/logos/logo-white.png"
import Image from "next/image";

import { gridAnimation } from "@/lib/animation/gridAnimation";
import { animations } from "@/lib/animations";

const Footer = () => {
    return (
        <footer className="relative bg-background border-t border-border mt-[80px]">
            <Container className="py-10">

                <div className="grid gap-10 lg:grid-cols-5 md:grid-cols-2">

                    {/* Logo */}
                    <div {...gridAnimation(0)}>
                        <div className="flex items-center gap-3 mb-5">
                            <Image
                                src={logo}
                                alt="Qalam Academy Logo"
                                width={16}
                                priority
                                className={`w-auto h-auto ${animations.transition} hover:scale-105`}
                            />

                            <div>
                                <h2 className="text-2xl font-bold">
                                    قلم أكاديمي
                                </h2>

                                <p className="text-sm text-text-secondary">
                                    لتطوير البرمجيات
                                </p>
                            </div>
                        </div>

                        <p className="text-text-secondary leading-8">
                            نحن شركة برمجيات متخصصة، نساعد الشركات والأفراد على
                            تحويل أفكارهم إلى منتجات رقمية مبتكرة.
                        </p>
                    </div>

                    {/* Resources */}
                    <div {...gridAnimation(1)}>
                        <h3 className="font-bold text-lg mb-6">الموارد</h3>

                        <ul className="space-y-4 text-text-secondary">
                            {
                                [
                                    "كورساتنا",
                                    "المدونة",
                                    "الأسئلة الشائعة",
                                    "سياسة الخصوصية",
                                    "الشروط والأحكام",
                                ].map(item => (
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
                        <h3 className="font-bold text-lg mb-6">خدماتنا</h3>

                        <ul className="space-y-4 text-text-secondary">
                            {
                                [
                                    "تطوير المواقع",
                                    "تطبيقات الجوال",
                                    "الأنظمة المخصصة",
                                    "تصميم UI/UX",
                                    "التسويق الرقمي",
                                ].map(item => (
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
                        <h3 className="font-bold text-lg mb-6">روابط سريعة</h3>

                        <ul className="space-y-4 text-text-secondary">
                            {
                                [
                                    "الرئيسية",
                                    "من نحن",
                                    "خدماتنا",
                                    "المعرض",
                                    "تواصل معنا",
                                ].map((item) => (
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

                    {/* Contact */}
                    <div {...gridAnimation(4)}>
                        <h3 className="font-bold text-lg mb-6">تواصل معنا</h3>

                        <div className="space-y-5">

                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className={`mt-1 text-primary ${animations.floating}`} />

                                <p className="text-text-secondary leading-7">
                                    مصر
                                    <br />
                                    الفيوم
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-primary" />

                                <span className="text-text-secondary">
                                    info@qlam-academy.dev
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-primary" />

                                <span className="text-text-secondary">
                                    +20 100 123 4567
                                </span>
                            </div>

                            {/* Social */}
                            <div className="flex gap-3 pt-3">

                                {[
                                    FaLinkedinIn,
                                    FaYoutube,
                                    FaTwitter,
                                    FaInstagram,
                                ].map((Icon, index) => (
                                    <Link
                                        key={index}
                                        href="#"
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
                        جميع الحقوق محفوظة ل © Qalam Academy 2024 - صمم بواسطة{" "}
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